import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function getGeminiResponse(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = result.response.candidates[0].content.parts[0].text;
    return response;
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "Error generating content";
  }
}


export {getGeminiResponse}