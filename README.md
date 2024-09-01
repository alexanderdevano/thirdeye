# Third Eye
The theme of the "Third Eye" project revolves around accessibility and inclusivity for visually impaired individuals, striving to improve the quality of life for visually impaired individuals. This project works for visually impaired individuals using NFC technology, speech recognition, and chatbot capabilities.

## Project Description
This project aims to create an accessible and user-friendly application that integrates NFC technology, speech recognition, and chatbot capabilities to assist visually impaired individuals. This application provides an accessible solution for visually impaired individuals to access detailed information about products independently, hence enhancing their autonomy and independence in daily activities. As someone who heavily relies on glasses, I understand the importance of accessibility and the value of having reliable tools to aid in daily tasks.

This project leverages NFC technology to provide a seamless and accessible way for users to retrieve product information by scanning NFC tags attached to price tags with their mobile devices.

### Key Features
- NFC-Based Scanning: Users can quickly access detailed product information by scanning NFC tags with their smartphones, eliminating the need for manual search or input.
- Text-to-Speech (TTS) Support: Converts written product details into audible speech, enhancing accessibility for visually impaired users.
- Speech-to-Text (STT) Integration: Currently utilizes the device's native STT capabilities to allow users to ask questions and issue commands verbally.
- AI-Powered Chatbot: Integrates with the ChatGPT API to handle complex queries and enable nuanced, conversational interactions. Responses are audibly delivered through the TTS engine.

### Future Enhancements
- iOS Compatibility: Expand support to include iOS devices.
- Built-in STT Engine: Integrate a built-in Speech-to-Text engine to improve voice command accuracy and standardize user experience.
- Enhanced Chatbot Training: Further training to handle a broader range of queries more accurately.
- UI Optimization: Enhance the user interface for improved usability across different devices.

## System Overview

### 1. Client-Side Application
- HTML, CSS, JavaScript: Implements the user interface, handles NFC scanning, and processes user queries.
- NFC Technology: Scans and recognizes tags attached to product price tags, providing quick access to detailed product information.

### 2. Server-Side Application
- Server.js: Hosts API routes for processing NFC data, user queries, and interacting with ChatGPT.
    - /api/nfc-scan: Processes NFC data.
    - /api/query: Responds to user queries based on NFC data.
    - /api/ask: Interacts with the OpenAI API (ChatGPT) to answer user questions.

### 3. OpenAI Integration
Integrates the ChatGPT API to handle complex and inferential queries. The chatbot is fine-tuned using a custom dataset to provide context-aware, accurate responses.

### 4. Middleware and Networking
- Middleware: Utilizes CORS, Body Parser (JSON), and static file serving for efficient data processing and communication.
- Networking: Uses HTTP (TCP/IP) for client-server communication, with ngrok providing a secure tunnel for external access.
