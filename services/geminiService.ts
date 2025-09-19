import { GoogleGenAI, Type } from "@google/genai";
import { GameLevel } from '../types';
import { LEVEL_PROMPTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const fetchTypingChallenge = async (level: GameLevel): Promise<string[]> => {
  try {
    const prompt = LEVEL_PROMPTS[level];
    
    const response = await ai.models.generateContent({
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

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
      return result;
    } else {
      console.error("AI response is not a string array:", result);
      return ["An error occurred while generating words."];
    }
  } catch (error) {
    console.error("Error fetching typing challenge:", error);
    // Provide fallback data in case of an API error
    return ["The quick brown fox jumps over the lazy dog."];
  }
};
