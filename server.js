const express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library"); // ✅ Correct authentication method
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Sheets
const doc = new GoogleSpreadsheet("1YGOwos_TbFLa1JmdlT4lkKRc6bvcRlimmcBWtjsLPFk");

app.get("/", async (req, res) => {
    try {
        // Authenticate with Google Sheets using the correct method
        const auth = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });

        await doc.auth.authenticate(auth); // ✅ Correct authentication method
        await doc.loadInfo(); // Load document properties and worksheets

        res.send(`Connected to Google Sheets: ${doc.title}`);
    } catch (error) {
        console.error("Error connecting to Google Sheets:", error);
        res.status(500).send(`Failed to connect to Google Sheets: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
