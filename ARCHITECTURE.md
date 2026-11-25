# System Architecture

## Implemented MVP architecture

```mermaid
flowchart LR
    C[Customer] --> UI[React Frontend]
    UI --> MIC[Browser Microphone]
    MIC --> STT[Speech-to-Text API]
    STT --> UI
    UI --> MEM[Conversation History / Contextual Memory]
    MEM --> API[Express.js Backend]
    API --> GEM[Gemini API]
    GEM --> API
    API --> UI
    UI --> TTS[Text-to-Speech API]
    TTS --> C
    UI -->|End conversation| SUM[AI Summarisation Module]
    SUM --> GEM
    GEM --> SUM
    SUM --> DASH[Business Insights Dashboard]
    DASH --> LS[LocalStorage]
    LS --> HIST[Conversation History]
```

## Implemented data flow
The customer speaks or types. Browser speech recognition converts voice to text. React keeps the current transcript and sends the latest message plus relevant history to Express. Express applies the TechNova sales prompt and calls Gemini. Gemini returns a short response, React displays it, and the browser Text-to-Speech API speaks it.

When the user ends the conversation, React sends the transcript to Express. The summarisation module asks Gemini to return JSON fields, validates missing values and interest level, then displays the result in Business Insights. Completed summaries are saved in browser LocalStorage and can be viewed or deleted.

## Proposed future production architecture

```mermaid
flowchart LR
    C[Customer] --> LB[Load Balancer]
    LB --> FE[React Frontend]
    FE --> BE[Multiple Express.js Services]
    BE --> ML[Multilingual Voice Services]
    BE --> RAG[RAG Knowledge Retrieval]
    BE --> AI[Gemini / AI Gateway]
    BE --> LEAD[Lead Qualification]
    BE --> SENT[Sentiment Analysis]
    BE --> APPT[Appointment Booking]
    BE --> CRM[External CRM Integration]
    BE --> PG[PostgreSQL]
    BE --> RD[Redis]
    BE --> MQ[Message Queue]
    MQ --> SUM[Background Summarisation]
```

The production diagram is a proposed architecture, not implemented in the MVP.
