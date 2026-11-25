# SalesAI - Autonomous AI Sales Voice Agent

**Project Title:** SalesAI - Autonomous AI Sales Voice Agent

**Project Objective:** SalesAI is developed to demonstrate an AI-powered sales assistant that communicates with customers, understands their business requirements, and converts conversation information into useful sales data.

**Business Problem:** Initial sales conversations often consume employee time, repeat the same questions, and make customer requirement management inconsistent. Valuable information can be missed or recorded only after a manual review of calls or notes.

**Proposed Solution:** SalesAI provides a working MVP that welcomes customers, conducts a focused conversation, asks for requirements, budget, timeline and name, and generates a structured business summary.

**Technology Stack:** React.js with Vite, Tailwind CSS, Node.js, Express.js, the Gemini API, Browser Web Speech Recognition and Speech Synthesis, Lucide React, and LocalStorage.

**Implemented Features:** The application supports real-time turn-based voice and text interaction, contextual conversation memory, Gemini-driven sales responses, microphone status and error handling, and AI-powered call summarisation. It provides a professional Business Insights dashboard and LocalStorage history for completed conversations.

**System Workflow:** The browser converts microphone speech into text and sends it with recent conversation messages to Express. Express applies a TechNova Solutions sales prompt and calls Gemini. The returned response is displayed and spoken through the browser. At the end of the conversation, the transcript is sent to Gemini for validation and structured summary generation.

**Commercial Feasibility:** Businesses could use SalesAI to reduce repetitive sales work, respond faster to enquiries, and capture consistent requirements before handing leads to a human sales team. It could operate as a subscription service with usage-based limits.

**Scalability:** A production deployment could run on AWS or another cloud provider behind a load balancer. Multiple backend containers could scale horizontally, Redis could manage cache and sessions, PostgreSQL could store customer data, and queues could process summaries. These changes are proposals and have not been load-tested.

**Data Security and Operational Costs:** Gemini keys must remain in backend environment variables. Production would require HTTPS, input validation, consent, privacy controls, authentication and authorisation. AI usage, hosting, database and storage costs depend on message volume and token consumption, so exact provider prices must be estimated before deployment.

**Future Enhancements:** Planned features include multilingual communication, RAG knowledge retrieval, advanced lead qualification, sentiment analysis, appointment booking and CRM integration.

**Conclusion:** SalesAI demonstrates a practical, understandable MVP for intelligent first-contact sales. It combines voice interaction, generative AI, memory and structured summarisation to create direct business value without relying on unnecessary databases or complex services.
