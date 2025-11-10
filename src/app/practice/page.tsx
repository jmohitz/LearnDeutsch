"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Level, Language, LEVELS, LANGUAGES } from "@/types";

export default function PracticePage() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") as Level;
  const language = searchParams.get("language") as Language;

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Practice Exercises
          </h1>
          <p className="text-xl text-gray-700">
            {LEVELS[level]?.english} Level • {LANGUAGES[language]}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Coming Soon!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Practice exercises are under development. Soon you'll be able to:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
            <li className="flex items-center text-gray-700">
              <span className="text-2xl mr-3">✅</span>
              Fill-in-the-blank exercises
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-2xl mr-3">✅</span>
              Vocabulary matching games
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-2xl mr-3">✅</span>
              Pronunciation practice
            </li>
            <li className="flex items-center text-gray-700">
              <span className="text-2xl mr-3">✅</span>
              AI-powered writing feedback
            </li>
          </ul>
          <Link
            href={`/lessons?level=${level}&language=${language}`}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Lessons
          </Link>
        </div>
      </div>
    </main>
  );
}
