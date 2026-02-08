const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Testing gemini-1.5-flash...");
        const result = await model.generateContent("Hello");
        console.log("gemini-1.5-flash works!");
        console.log(result.response.text());
    } catch (error) {
        console.error("gemini-1.5-flash failed:", error);
        if (error.response) {
            console.error("Error response:", JSON.stringify(error.response, null, 2));
        }
    }
}

listModels();
