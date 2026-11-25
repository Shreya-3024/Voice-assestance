# SalesAI - Autonomous AI Sales Voice Agent

SalesAI is a beginner-friendly full-stack MVP that helps TechNova Solutions conduct initial sales conversations by voice or text. It uses Gemini to understand customer needs, remembers the current conversation, reads responses aloud, and produces structured business insights.

## Business problem
Manual first-contact sales requires employee time, repeated questions, and reliable capture of customer requirements. SalesAI automates this first stage and keeps a concise LocalStorage-based summary record.

## Implemented features
- Turn-based speech with browser Web Speech Recognition and Speech Synthesis
- Gemini-powered contextual sales conversation
- Professional sales prompts for five TechNova services
- Manual text fallback and clear status/error indicators
- AI-generated, validated business summaries
- Business Insights and Conversation History screens

## Technology stack
React.js, Vite, Tailwind CSS, Lucide React, Node.js, Express.js, Gemini API, Browser Speech APIs, and LocalStorage.

## System workflow
1. Start a conversation and receive a professional welcome.
2. Speak or type. Speech is converted to text in the browser.
3. React sends the message and recent transcript to Express.
4. Express adds the sales system prompt and calls Gemini.
5. The response appears in chat and is spoken through the browser.
6. End Conversation sends the transcript to Gemini for JSON summarisation.
7. The summary is validated, shown in Insights, and saved in LocalStorage.

## Folder structure
```text
SalesAI/
├── frontend/src/components, hooks, pages, services
├── backend/routes, services, prompts
├── PROJECT_REPORT.md
├── ARCHITECTURE.md
├── SCALABILITY.md
├── INTERVIEW_GUIDE.md
└── README.md
```

## Windows PowerShell setup
```powershell
cd C:\Users\PS\Desktop\inter\backend
Copy-Item .env.example .env
npm install
npm run dev
```
In a second VS Code terminal:
```powershell
cd C:\Users\PS\Desktop\inter\frontend
Copy-Item .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173`. The backend runs at `http://localhost:3001`.

## Gemini API configuration
1. Create an API key in Google AI Studio.
2. Put it only in `backend/.env`: `GEMINI_API_KEY=your_real_key`
3. Never place the key in frontend code or commit `.env`.
4. The backend tries `gemini-3.8-flash`, then falls back to `gemini-3.7-flash` and `gemini-3.5-flash` if the preferred model is unavailable.

## Demo conversation
- AI: “Hello! Welcome to TechNova Solutions. How can I help you today?”
- Customer: “I want to develop an e-commerce website.”
- Customer: “My budget is 50,000 rupees.”
- Customer: “I plan to start next month.”
- Customer: “My name is Rahul.”
- Click End Conversation and review the generated Business Insights.

## GitHub commands
```powershell
cd C:\Users\PS\Desktop\inter
git init
git add .
git commit -m "Add complete SalesAI MVP"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```

## Documentation
- [One-page project report](./PROJECT_REPORT.md)
- [System architecture](./ARCHITECTURE.md)
- [Scalability strategy](./SCALABILITY.md)
- [Interview guide](./INTERVIEW_GUIDE.md)

## Security, deployment and costs
Keep Gemini credentials in backend environment variables and use HTTPS in production. Obtain voice-processing consent, validate inputs, avoid unnecessary sensitive data, and use authentication and authorisation before storing real customer records. LocalStorage is browser-only and not suitable as secure business storage.

Deploy the frontend to Vercel and the backend to Render or another Node-compatible platform. Set `VITE_API_URL` to the public backend URL and set backend `ALLOWED_ORIGIN` to the frontend origin. AI, hosting, database, and storage costs are usage-dependent. Estimate spend from conversation count, average input/output tokens, Gemini quota, backend requests, hosting tier, and future database usage.

A commercial model could offer monthly plans for small, medium, and large businesses, with usage-based limits or overage charges.

## Known limitations
- Browser speech support varies; Chrome or Edge is recommended.
- Speech recognition requires microphone permission and localhost or HTTPS.
- Summaries and conversation context depend on Gemini availability.
- LocalStorage is not encrypted or synchronised across devices.
- This MVP has no database, authentication, CRM, RAG, or appointment booking.

## Future enhancements
Multilingual voice, RAG, advanced lead qualification, sentiment analysis, appointment booking, external CRM integration, production authentication, and persistent database storage.
