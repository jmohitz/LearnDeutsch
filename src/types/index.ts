/**
 * User's German proficiency level
 */
export type Level = "beginner" | "intermediate" | "advanced";

/**
 * Supported languages for explanations
 */
export type Language = "en" | "hi" | "es" | "fr" | "pt";

/**
 * Language options with display names
 */
export const LANGUAGES: Record<Language, string> = {
  en: "English",
  hi: "हिंदी (Hindi)",
  es: "Español (Spanish)",
  fr: "Français (French)",
  pt: "Português (Portuguese)",
};

/**
 * Lesson difficulty levels with German names
 */
export const LEVELS: Record<Level, { german: string; english: string }> = {
  beginner: { german: "Anfänger", english: "Beginner" },
  intermediate: { german: "Mittelstufe", english: "Intermediate" },
  advanced: { german: "Fortgeschritten", english: "Advanced" },
};

/**
 * Lesson content structure
 */
export interface Lesson {
  id: string;
  level: Level;
  title: string;
  titleGerman: string;
  story: string;
  storyGerman: string;
  vocabulary: VocabularyItem[];
  imageUrl?: string;
  audioUrl?: string;
  createdAt: Date;
}

/**
 * Vocabulary word with translations
 */
export interface VocabularyItem {
  german: string;
  translation: string;
  example: string;
  exampleTranslation: string;
}

/**
 * User profile data
 */
export interface UserProfile {
  id: string;
  email: string;
  nativeLanguage: Language;
  currentLevel: Level;
  streak: number;
  totalLessonsCompleted: number;
}

/**
 * AI generation request
 */
export interface GenerateLessonRequest {
  level: Level;
  nativeLanguage: Language;
  topic?: string;
}

/**
 * AI generation response
 */
export interface GenerateLessonResponse {
  lesson: Lesson;
  imageBase64?: string;
}
