// This is a Vercel Serverless Function, which will be located at /api/generate-challenge
import { GoogleGenAI, Type } from "@google/genai";
import { GameLevel } from '../types';
import { LEVEL_PROMPTS } from '../constants';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Allow': 'POST' },
    });
  }

  try {
    const body = await req.json();
    const level: GameLevel = body.level;

    if (!level || !Object.values(GameLevel).includes(level)) {
      return new Response(JSON.stringify({ message: 'Invalid level provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      return new Response(JSON.stringify({ message: 'Server configuration error: API key not found.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const ai = new GoogleGenAI({ apiKey });

    const prompt = LEVEL_PROMPTS[level];
    
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
        },
      },
    });

    const jsonString = geminiResponse.text.trim();
    const result = JSON.parse(jsonString);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in generate-challenge function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ message: 'Error fetching typing challenge from AI', error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
