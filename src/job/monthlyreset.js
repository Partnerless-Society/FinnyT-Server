import cron from 'node-cron';
import userquery from '../model/userquery.js';
import monthlyquery from '../model/monthlyreport.js';

cron.schedule('0 0 1 * *', async () => {
    try {
        const allUsers = await userquery.find({});
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        for (const user of allUsers) {
            const exists = await monthlyquery.findOne({
                userId: user._id,
                month: currentMonth,
                year: currentYear
            });

            if (!exists) {
                await monthlyquery.create({
                    userId: user._id,
                    month: currentMonth,
                    year: currentYear,
                    income: 0,
                    revenue: 0,
                    total: 0
                });
            }
        }
    } catch (err) {
        console.error("Cron Error:", err);
    }
});