import cron from 'node-cron';
import userquery from '../model/userquery.js';
import monthlyquery from '../model/monthlyreport.js';
import dataquery from '../model/dataquery.js';
import incomeoutcomquery from '../model/incomeoutcomquery.js';
import typequery from '../model/typequery.js';

cron.schedule('0 0 1 * *', async () => {
    console.log("🚀 Starting Monthly Report Generation...");

    try {
        const allUsers = await userquery.find({});
        const now = new Date();
        
        const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        const currentMonth = lastDayOfPrevMonth.getMonth() + 1;
        const currentYear = lastDayOfPrevMonth.getFullYear();

        const reportPromises = allUsers.map(async (user) => {
            try {
                const dashboarddata = await dataquery.findOne({ userId: user._id });

                const reportPayload = {
                    income: dashboarddata?.income || 0,
                    outcome: dashboarddata?.outcome || 0,
                    total: (dashboarddata?.income || 0) + (dashboarddata?.outcome || 0),
                    networth: (dashboarddata?.income || 0) - (dashboarddata?.outcome || 0),
                };

                await monthlyquery.findOneAndUpdate(
                    {
                        userId: user._id,
                        month: currentMonth,
                        year: currentYear
                    },
                    {
                        $set: reportPayload
                    },
                    {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    }
                );

                await incomeoutcomquery.findOneAndUpdate({
                    userId: user._id
                }, {
                    $set: {
                        data: []
                    }
                });

                await typequery.findOneAndUpdate({
                    userId: user._id
                }, {
                    $set: {
                        data: []
                    }
                })

                await dataquery.findOneAndUpdate({
                    userId : user._id
                },{
                    $set : {
                        income : 0,
                        outcome : 0
                    }
                })

            } catch (userErr) {
                console.error(`Failed to process report for user ${user._id}:`, userErr);
            }
        });

        await Promise.all(reportPromises);
        console.log("✅ All monthly reports updated successfully.");

    } catch (err) {
        console.error("CRITICAL Cron Error:", err);
    }
});