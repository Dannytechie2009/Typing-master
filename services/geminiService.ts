import { GameLevel } from '../types';

export const fetchTypingChallenge = async (level: GameLevel): Promise<string[]> => {
  try {
    const response = await fetch('/api/generate-challenge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ level }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    const result = await response.json();

    if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
      return result;
    } else {
      console.error("API response is not a string array:", result);
      throw new Error("Invalid data format from server.");
    }
  } catch (error) {
    console.error("Error fetching typing challenge:", error);
    // Provide fallback data in case of an API error
    return ["The quick brown fox jumps over the lazy dog."];
  }
};
