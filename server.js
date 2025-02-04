const express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Sheets
const doc = new GoogleSpreadsheet("1YGOwos_TbFLa1JmdlT4lkKRc6bvcRlimmcBWtjsLPFk");

app.get("/", async (req, res) => {
    try {
        // Authenticate with Google Sheets
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        });

        await doc.loadInfo(); // Load document properties and worksheets
        res.send("Connected to Google Sheets!");
    } catch (error) {
        console.error("Error connecting to Google Sheets:", error);
        res.status(500).send("Failed to connect to Google Sheets");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
