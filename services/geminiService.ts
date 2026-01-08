
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getResidentInsights(residentName: string, history: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o seguinte histórico clínico do residente ${residentName} de uma ILPI e forneça insights clínicos resumidos, alertas de risco (queda, nutrição, medicação) e sugestões de conduta em português. 
      
      Histórico:
      ${history}`,
      config: {
        systemInstruction: "Você é um assistente de gestão clínica especializado em gerontologia para ILPIs brasileiras.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Não foi possível gerar insights no momento.";
  }
}
