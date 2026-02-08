const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function checkModels() {
    try {
        // There isn't a direct 'listModels' method exposed easily on the main class in some versions,
        // but the error message suggested calling it. 
        // We'll try to just test the requested model and the known fallback.

        const modelsToTest = ["gemini-2.5-flash", "gemini-2.0-flash-exp", "gemini-1.5-flash", "gemini-pro"];

        for (const modelName of modelsToTest) {
            console.log(`\nTesting model: ${modelName}...`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you there?");
                console.log(`✅ SUCCESS: ${modelName} is available.`);
                // console.log("Response:", result.response.text());
            } catch (error) {
                console.error(`❌ FAILED: ${modelName}`);
                // console.error(error.message);
            }
        }

    } catch (error) {
        console.error("Script error:", error);
    }
}

checkModels();
