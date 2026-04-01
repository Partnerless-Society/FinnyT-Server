import { tool } from "langchain";
import z from "zod";
import incomeoutcomquery from "../model/incomeoutcomquery.js";
import typequery from "../model/typequery.js";
import dataquery from "../model/dataquery.js";

export const Autoupdate = tool(
  async ({ userid, transactions }) => {
    for (const t of transactions) {
      const { type, source, category, amount } = t;
      const amt = Number(amount);

      await incomeoutcomquery.findOneAndUpdate(
        { userId: userid },
        {
          $push: {
            data: {
              type,
              amount: amt,
              category,
              source,
              date: new Date(),
            },
          },
        },
        { upsert: true }
      );

      const dataexist = await typequery.findOneAndUpdate(
        { userId: userid, "data.category": category },
        { $inc: { [`data.$.${type}`]: amt } },
        { new: true }
      );

      if (!dataexist) {
        await typequery.findOneAndUpdate(
          { userId: userid },
          {
            $push: {
              data: {
                category,
                income: type === "income" ? amt : 0,
                outcome: type === "outcome" ? amt : 0,
              },
            },
          },
          { upsert: true, new: true }
        );
      }

      if (type === "income") {
        await dataquery.findOneAndUpdate(
          { userId: userid },
          { $inc: { income: amt } },
          { upsert: true, new: true }
        );
      } else {
        await dataquery.findOneAndUpdate(
          { userId: userid },
          { $inc: { outcome: amt } },
          { upsert: true, new: true }
        );
      }
    }

    return `Successfully updated ${transactions.length} transaction(s) for user ${userid}`;
  },
  {
    name: "updateagent",
    description:
      "Read multiple transactions and a userid, then update them into all database collections",
    schema: z.object({
      userid: z.string().describe("User ID"),
      transactions: z
        .array(
          z.object({
            type: z.string().describe("income or outcome"),
            source: z.string().describe("Name of the source/shop"),
            category: z
              .string()
              .describe(
                "Choose food, transport, work, or other depending on image analysis"
              ),
            amount: z.number().describe("Amount of the transaction")
          })
        )
        .describe("List of transactions to add for the user")
    }),
  }
);