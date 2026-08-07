const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.get('/', (req, res) => {
    res.send('ASC Archivist Backend is active and online!');
});

app.post('/ask-archivist', async (req, res) => {
    console.log("➡️ Received request from Roblox:", req.body);
    try {
        const playerMessage = req.body.message;
        if (!playerMessage) return res.status(400).json({ error: "No message provided" });

        console.log("Calling Gemini API...");
        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: playerMessage,
            config: {
                systemInstruction: "You are the Grand Archivist of ASC (The Satanic Church in a Roblox game). Your role is to educate players on the philosophy, literary history of Satanism, and ASC game lore. Keep your tone dark, wise, eloquent, and immersive. Never encourage real-world harm, illegal acts, or target real groups. Keep responses concise (maximum 2 to 3 short sentences)."
            }
        });

        console.log("Gemini responded successfully!");
        res.json({ reply: response.text });
    } catch (err) {
        console.error("DETAILED BACKEND ERROR:", err);
        res.status(500).json({ error: "The archives are currently sealed..." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`ASC Backend running on port ${PORT}`));