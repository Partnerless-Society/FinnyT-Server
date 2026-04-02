import { google } from "googleapis";

export const testgmail = async (email, key) => {
    const auth = new google.auth.JWT({
        email: email,
        key: key
            .replace(/\\n/g, '\n')
            .replace(/"/g, '')
            .trim(),
        scopes: [
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive"
        ],
    });

    return auth.authorize();

}
