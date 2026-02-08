const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with a fallback mechanism
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model initialization moved inside generateItinerary for better error handling and fallback support.

const generateItinerary = async (destination, duration, budget, travelType, interests, arrivalTime = 'Morning', pace = 'Medium', transportMode = 'Mixed') => {
  const prompt = `
    You are an expert AI Travel Agent & Optimizer.
    Plan a detailed, logistics-optimized trip for:
    
    PLEASE RETURN ONLY JSON. NO MARKDOWN.

    **Trip Details:**
    - Destination: ${destination}
    - Duration: ${duration} Days
    - Budget: ${budget}
    - Group Type: ${travelType}
    - Interests: ${interests}
    - Arrival Time (Day 1): ${arrivalTime}
    - Preferred Pace: ${pace}
    - Transport Preference: ${transportMode}

    **Constraints & Intelligence:**
    1. **Arrival Logic**: If arrival is late (e.g., 4 PM), Day 1 should be light (dinner/walks only).
    2. **Travel Optimization**: Group nearby places. minimize travel time.
    3. **Transport Mode**: Suggest realistic transport (Cab/Walk/Metro) between stops based on distance.
    4. **Budget Tracking**: Estimate costs for tickets/travel/food.

    **Output JSON Structure**:
    {
      "trip_details": {
        "destination": "${destination}",
        "summary": "Short energetic summary of the trip vibe.",
        "currency_symbol": "₹"
      },
      "days": [
        {
          "day": 1,
          "theme": "Arrival & Local Flavors",
          "date_summary": "Relaxed evening walk and dinner.",
          "weather_forecast": "Sunny, 28°C",
          "stats": {
            "total_distance_km": 5.2,
            "total_travel_time": "45 mins",
            "estimated_cost": 1200
          },
          "activities": [
            {
              "type": "travel",
              "from": "Airport",
              "to": "Hotel",
              "mode": "Cab",
              "distance_km": 15,
              "duration": "45 mins",
              "cost": 800,
              "details": "Pre-paid taxi counter available."
            },
            {
              "type": "visit",
              "place": "City Center Market",
              "time": "18:00 - 20:00",
              "duration": "2h",
              "category": "Shopping",
              "ticket_price": 0,
              "description": "Bustling market famous for handicrafts.",
              "coordinates": { "lat": 26.9124, "lng": 75.7873 },
              "tips": "Bargain hard!"
            }
          ]
        }
      ]
    }
  `;

  async function callModel(modelName) {
    const model = genAI.getGenerativeModel({ model: modelName });
    return await model.generateContent(prompt);
  }

  try {
    // Try the user-requested model first
    console.log("Attempting to generate with gemini-2.5-flash...");
    const result = await callModel("gemini-2.5-flash");
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Primary model (gemini-2.5-flash) failed:", error.message);

    try {
      console.log("Falling back to gemini-1.5-flash...");
      const result = await callModel("gemini-1.5-flash");
      const response = await result.response;
      const text = response.text();
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '');
      return JSON.parse(cleanText);
    } catch (fallbackError) {
      console.error("Fallback model (gemini-1.5-flash) failed:", fallbackError.message);

      try {
        console.log("Falling back to gemini-pro...");
        const result = await callModel("gemini-pro");
        const response = await result.response;
        const text = response.text();
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '');
        return JSON.parse(cleanText);
      } catch (finalError) {
        console.error("All models failed.");
        throw new Error("Failed to generate itinerary with all available models.");
      }
    }
  }
};

module.exports = { generateItinerary };
