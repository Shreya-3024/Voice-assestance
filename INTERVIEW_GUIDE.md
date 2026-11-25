# Interview Preparation Guide

## How the project works
The customer starts a conversation, speaks or types, and React sends the message to Express. Express asks Gemini for a sales response. The response is shown in chat and spoken in the browser. Ending the conversation sends the transcript to Gemini for a JSON business summary.

## Frontend communication
`frontend/src/services/api.js` uses `fetch` to call `/api/chat` or `/api/summarize`. Express validates JSON requests and returns JSON or a clear error.

## Gemini integration
`backend/services/gemini.js` calls the Gemini REST API. The key is read from `backend/.env`, while route files apply the sales or summarisation prompt.

## Speech recognition
`frontend/src/hooks/useSpeech.js` uses `SpeechRecognition` or `webkitSpeechRecognition`. It is turn-based: the browser listens for one utterance and stops.

## Text-to-speech
Browser `SpeechSynthesisUtterance` reads Gemini responses aloud. Stop Speaking calls `speechSynthesis.cancel()`.

## Contextual memory
React stores messages in state and sends recent history with every customer message. This is short-lived context for the current conversation.

## Summarisation
The summarise route asks Gemini for JSON with fixed fields. The backend parses the response, validates interest level and replaces missing values with “Not provided.”

## Generative AI and agentic AI
Generative AI creates text or other content from learned patterns. Agentic AI follows goals through reasoning, memory and actions. SalesAI has a bounded goal and conversational actions, but it still requires human oversight and is not fully autonomous.

## Chatbot versus autonomous agent
A chatbot usually answers messages. An autonomous agent acts toward an objective using memory and tools. SalesAI is agent-like because it qualifies a lead and summarises outcomes, but it has a limited MVP scope.

## Limitations
Speech support varies by browser, Gemini depends on network availability, and summaries can vary. The MVP has no database or authentication, and LocalStorage is not secure for real customer data.

## Scaling
Use cloud deployment, load balancing, Docker, horizontal scaling, Redis, PostgreSQL, message queues and rate limiting. This is proposed and not load-tested.

## Protection and revenue
Protect API keys in backend environment variables, use HTTPS, obtain consent, validate and minimise data, and add authentication before production. Revenue could come from monthly business plans plus usage-based conversation or summary limits.

## 20 interview questions
1. **What problem does SalesAI solve?** It reduces repetitive first-contact work and captures sales requirements.
2. **Why React?** It provides reusable UI components and state.
3. **Why Express?** It hides credentials and exposes simple APIs.
4. **Why Tailwind?** It offers responsive utility classes.
5. **How does `/api/chat` work?** It validates text, adds history and calls Gemini.
6. **How does `/api/summarize` work?** It validates a transcript and requests JSON insights.
7. **How is the API key protected?** It is in backend `.env`, not React or Git.
8. **What is contextual memory?** Recent transcript messages are sent with the next request.
9. **How does speech recognition work?** The browser converts a customer utterance into text.
10. **How does text-to-speech work?** `SpeechSynthesisUtterance` speaks text aloud.
11. **How are microphone errors handled?** Permission, support and no-speech errors are displayed.
12. **How is malformed summary JSON handled?** Parsing failures return a backend error.
13. **Why validate summary fields?** It prevents missing or malformed dashboard data.
14. **Why LocalStorage?** It keeps the MVP simple and database-free.
15. **What are LocalStorage limitations?** It is browser-local and not secure or synchronised.
16. **What is CORS?** It limits which frontend origin can call the API.
17. **How would RAG be added?** Retrieve approved knowledge and include it in Gemini prompts.
18. **How would CRM integration work?** Send a verified summary to a CRM API.
19. **How would 100,000 users scale?** Add containers, load balancing, Redis, PostgreSQL and queues.
20. **What would you improve first?** Add authentication, database storage and stronger tests.

## Important live modifications
- Edit sales behaviour in `backend/prompts/salesPrompt.js`.
- Edit summary fields in `backend/prompts/summarizePrompt.js`.
- Change the Gemini model in `backend/services/gemini.js`.
- Change colours in `frontend/tailwind.config.js`.
- Change the API address in `frontend/.env`.
