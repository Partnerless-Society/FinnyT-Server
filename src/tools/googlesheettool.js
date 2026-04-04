import { google } from "googleapis"
import { tool } from "langchain"
import { z } from "zod"

export const readSheetData = tool(
    async ({ spreadsheet_id, range }, config) => {
        try {

            const { serviceAccountEmail, serviceAccountKey } = config.configurable;

            const authcheck = new google.auth.JWT({
                email: serviceAccountEmail,
                key: serviceAccountKey.replace(/\\n/g, '\n')
                    .replace(/"/g, '')
                    .trim(),
                scopes: [
                    "https://www.googleapis.com/auth/spreadsheets",
                    "https://www.googleapis.com/auth/drive"
                ],
            });

            const sheets = google.sheets({ version: "v4", auth: authcheck });
            const res = await sheets.spreadsheets.values.get({
                spreadsheetId: spreadsheet_id,
                range: range || "Sheet1!A1:Z100",
            });

            if (!res.data.values || res.data.values.length === 0) {
                return "The sheet is currently empty.";
            }

            return JSON.stringify(res.data.values);
        } catch (error) {
            return `Error reading sheet: ${error.message}`;
        }
    },
    {
        name: "google_sheets_read",
        description: "Read data from a specific Google Sheet to see current content.",
        schema: z.object({
            spreadsheet_id: z.string().describe("The ID of the spreadsheet"),
            range: z.string().optional().describe("The A1 range to read (e.g., 'Sheet1!A1:E20')")
        })
    }
);


export const editSheetData = tool(
    async ({ spreadsheet_id, range, values }, config) => {
        try {

            const { serviceAccountEmail, serviceAccountKey } = config.configurable;

            const authcheck = new google.auth.JWT({
                email: serviceAccountEmail,
                key: serviceAccountKey
                    .replace(/\\n/g, '\n')
                    .replace(/"/g, '')
                    .trim(),
                scopes: [
                    "https://www.googleapis.com/auth/spreadsheets",
                    "https://www.googleapis.com/auth/drive"
                ],
            });

            const sheets = google.sheets({ version: "v4", auth : authcheck });

            const res = await sheets.spreadsheets.values.update({
                spreadsheetId: spreadsheet_id,
                range: range,
                valueInputOption: "USER_ENTERED",
                requestBody: {
                    values: values,
                },
            });

            const meta = await sheets.spreadsheets.get({
                spreadsheetId: spreadsheet_id
            });

            const sheetName = range.split("!")[0];

            const sheet = meta.data.sheets.find(
                s => s.properties.title === sheetName
            );

            const sheetId = sheet.properties.sheetId;

            await sheets.spreadsheets.batchUpdate({
                spreadsheetId: spreadsheet_id,
                requestBody: {
                    requests: [
                        {
                            repeatCell: {
                                range: {
                                    sheetId: sheetId,
                                    startRowIndex: 0,
                                    endRowIndex: 1
                                },
                                cell: {
                                    userEnteredFormat: {
                                        textFormat: {
                                            bold: true
                                        }
                                    }
                                },
                                fields: "userEnteredFormat.textFormat.bold"
                            }
                        }
                    ]
                }
            });


            return `Updated ${res.data.updatedCells} cells in range ${res.data.updatedRange}.`;
        } catch (error) {
            return `Error editing sheet: ${error.message}`;
        }
    },
    {
        name: "google_sheets_edit",
        description: "Edit or overwrite data in a specific range of a Google Sheet.",
        schema: z.object({
            spreadsheet_id: z.string().describe("The ID of the spreadsheet"),
            range: z.string().describe("A1 notation of the cells to edit (e.g., 'Sheet1!A1:B2')"),
            values: z.array(z.array(z.any())).describe("2D array of values to insert")
        })
    }
);