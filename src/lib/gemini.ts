import { GoogleGenerativeAI } from "@google/generative-ai";
import { Level, Language, Lesson } from "@/types";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Generate a lesson with story and vocabulary using Gemini AI
 */
export async function generateLesson(
  level: Level,
  nativeLanguage: Language,
  topic?: string
): Promise<{ lesson: Omit<Lesson, "id" | "createdAt" | "imageUrl" | "audioUrl"> }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a German language teacher. Create a lesson for ${level} level students.
  
${topic ? `Topic: ${topic}` : "Choose an interesting everyday topic."}

Requirements:
1. Create a short story (3-4 sentences) in German appropriate for ${level} level
2. Translate the story to ${nativeLanguage}
3. Include 5 vocabulary words from the story with:
   - German word
   - Translation to ${nativeLanguage}
   - Example sentence in German
   - Translation of example to ${nativeLanguage}
4. Create an engaging title in both German and ${nativeLanguage}

Level guidelines:
- beginner: Use present tense, common words, simple sentences
- intermediate: Mix tenses, introduce compound sentences
- advanced: Use complex grammar, idioms, longer texts

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "level": "${level}",
  "title": "Title in ${nativeLanguage}",
  "titleGerman": "Titel auf Deutsch",
  "story": "Story in ${nativeLanguage}",
  "storyGerman": "Geschichte auf Deutsch",
  "vocabulary": [
    {
      "german": "word",
      "translation": "translation",
      "example": "German example sentence",
      "exampleTranslation": "Example translation"
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    console.log("Raw AI response:", response.substring(0, 200)); // Debug log
    
    // More aggressive cleaning to remove markdown and extra text
    let jsonText = response
      .replace(/```\n?/g, "")
      .replace(/^json\n?/gi, "")
      .trim();
    
    // Find the first { and last } to extract just the JSON
    const firstBrace = jsonText.indexOf("{");
    const lastBrace = jsonText.lastIndexOf("}");
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.substring(firstBrace, lastBrace + 1);
    }
    
    console.log("Cleaned JSON:", jsonText.substring(0, 200)); // Debug log
    
    const lessonData = JSON.parse(jsonText);
    
    return { lesson: lessonData };
  } catch (error) {
    console.error("Error generating lesson:", error);
    console.error("Failed to parse AI response");
    throw new Error("Failed to generate lesson content");
  }
}

/**
 * Get AI feedback on user's German writing
 */
export async function getWritingFeedback(
  userText: string,
  expectedLevel: Level,
  nativeLanguage: Language
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a German language teacher. Review this German text written by a ${expectedLevel} level student.

Student's text: "${userText}"

Provide constructive feedback in ${nativeLanguage} covering:
1. Grammar correctness
2. Vocabulary appropriateness for their level
3. Suggestions for improvement
4. Corrected version if needed

Be encouraging and specific.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting feedback:", error);
    throw new Error("Failed to generate feedback");
  }
}
