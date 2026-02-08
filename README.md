# AI-Powered Smart Itinerary Generator 🌍

An intelligent travel planner that uses Gemini AI to generate personalized day-wise itineraries, complete with hotel suggestions and route planning.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or cloud URI)
- Google Gemini API Key

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project root.

2.  **Setup Backend**:
    ```bash
    cd backend
    npm install
    cp .env.example .env # Create .env and add your GEMINI_API_KEY
    npm run dev
    ```

3.  **Setup Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to `http://localhost:5173`

## 🛠 Features
- **AI Itinerary Generation**: Day-wise plans based on your interests.
- **Trip Customization**: Set budget, duration, and travel style.
- **Responsive UI**: Built with React + Tailwind CSS.

## 📝 Configuration
Update `backend/.env` with your keys:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-travel-planner
GEMINI_API_KEY=your_gemini_api_key_here
```
