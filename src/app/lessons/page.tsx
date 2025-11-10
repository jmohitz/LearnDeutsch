"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Level, Language, Lesson, LEVELS, LANGUAGES } from "@/types";
import Link from "next/link";

export default function LessonsPage() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") as Level;
  const language = searchParams.get("language") as Language;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLesson = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
          nativeLanguage: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate lesson");
      }

      const data = await response.json();
      setLesson(data.lesson);
    } catch (err) {
      setError("Failed to generate lesson. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (level && language) {
      generateLesson();
    }
  }, [level, language]);

  if (!level || !language) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Missing Parameters
          </h1>
          <p className="text-gray-700 mb-8">
            Please select a level and language from the home page.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {LEVELS[level].english} Lesson
            </h1>
            <p className="text-gray-600">
              Learning in: {LANGUAGES[language]}
            </p>
          </div>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-700">
              Generating your personalized lesson...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This may take a few seconds
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 text-lg mb-4">{error}</p>
            <button
              onClick={generateLesson}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Lesson Content */}
        {lesson && !loading && (
          <div className="space-y-6">
            {/* Lesson Title */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {lesson.titleGerman}
                </h2>
                <p className="text-xl text-gray-600">{lesson.title}</p>
              </div>
            </div>

            {/* Story Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                📖 Story
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {lesson.storyGerman}
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {lesson.story}
                  </p>
                </div>
              </div>
            </div>

            {/* Vocabulary Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                📚 Vocabulary
              </h3>
              <div className="space-y-4">
                {lesson.vocabulary.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-purple-900">
                          {item.german}
                        </span>
                        <span className="text-xl text-gray-600 ml-4">
                          → {item.translation}
                        </span>
                      </div>
                      <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="space-y-2 mt-4">
                      <p className="text-gray-800 italic">
                        <span className="font-semibold">Example:</span>{" "}
                        {item.example}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Translation:</span>{" "}
                        {item.exampleTranslation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={generateLesson}
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
              >
                🔄 Generate New Lesson
              </button>
              <Link
                href={`/practice?level=${level}&language=${language}`}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                ✏️ Practice Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
