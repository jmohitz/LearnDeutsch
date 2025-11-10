import { NextRequest, NextResponse } from "next/server";
import { generateLesson } from "@/lib/gemini";
import { Level, Language } from "@/types";

/**
 * API endpoint to generate a new lesson
 * POST /api/ai/generate-lesson
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, nativeLanguage, topic } = body;

    // Validate input
    if (!level || !nativeLanguage) {
      return NextResponse.json(
        { error: "Missing required fields: level, nativeLanguage" },
        { status: 400 }
      );
    }

    // Generate lesson using Gemini AI
    const { lesson } = await generateLesson(
      level as Level,
      nativeLanguage as Language,
      topic
    );

    // Add metadata
    const fullLesson = {
      ...lesson,
      id: `lesson_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ lesson: fullLesson }, { status: 200 });
  } catch (error) {
    console.error("Error in generate-lesson API:", error);
    return NextResponse.json(
      { error: "Failed to generate lesson" },
      { status: 500 }
    );
  }
}
