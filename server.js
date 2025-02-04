const express = require("express");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library"); // ✅ Correct authentication
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Sheets
const doc = new GoogleSpreadsheet("1YGOwos_TbFLa1JmdlT4lkKRc6bvcRlimmcBWtjsLPFk");

app.get("/", async (req, res) => {
    try {
        // Authenticate with Google Sheets using the CORRECT method
        const auth = new JWT({
   
