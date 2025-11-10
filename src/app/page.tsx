"use client";

import { useState } from "react";
import { Level, Language, LEVELS, LANGUAGES } from "@/types";
import Link from "next/link";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            LearnDeutsch 🇩🇪
          </h1>
          <p className="text-xl text-gray-700">
            Learn German with AI-powered visual stories
          </p>
        </div>

        {/* Native Language Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Choose Your Native Language
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <button
                key={code}
                onClick={() => setSelectedLanguage(code as Language)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedLanguage === code
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <span className="text-lg font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Select Your Level
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(LEVELS).map(([level, { german, english }]) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level as Level)}
                className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedLevel === level
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {level === "beginner" && "🌱"}
                    {level === "intermediate" && "🌿"}
                    {level === "advanced" && "🌳"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{english}</h3>
                  <p className="text-gray-600">{german}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Start Button */}
          {selectedLevel && (
            <div className="mt-8 text-center">
              <Link
                href={`/lessons?level=${selectedLevel}&language=${selectedLanguage}`}
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Start Learning →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
