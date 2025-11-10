"use client";

import { useState } from "react";
import { Level, Language, LEVELS, LANGUAGES } from "@/types";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Globe, Sparkles, TrendingUp, BookOpen } from "lucide-react";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-7xl">🇩🇪</span>
          </motion.div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LearnDeutsch
          </h1>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Master German with AI-Powered Visual Stories
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </p>
        </motion.div>

        {/* Features Banner */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          variants={itemVariants}
        >
          {[
            {
              icon: <BookOpen className="w-6 h-6" />,
              text: "Interactive Lessons",
              color: "blue",
            },
            {
              icon: <Globe className="w-6 h-6" />,
              text: "Multilingual Support",
              color: "purple",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              text: "Adaptive Learning",
              color: "indigo",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-center gap-3 text-gray-700">
                <div className="text-blue-600">{feature.icon}</div>
                <span className="font-medium">{feature.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Native Language Selection */}
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-7 h-7 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Choose Your Native Language
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(LANGUAGES).map(([code, name]) => (
              <motion.button
                key={code}
                onClick={() => setSelectedLanguage(code as Language)}
                className={`p-4 rounded-xl border-2 transition-all font-medium ${
                  selectedLanguage === code
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-base">{name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Level Selection */}
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-800">
              Select Your Level
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(LEVELS).map(([level, { german, english }]) => (
              <motion.button
                key={level}
                onClick={() => setSelectedLevel(level as Level)}
                className={`relative p-8 rounded-2xl border-2 transition-all overflow-hidden ${
                  selectedLevel === level
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl"
                    : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg"
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {selectedLevel === level && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20"
                    layoutId="selectedLevel"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative text-center">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={
                      selectedLevel === level
                        ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {level === "beginner" && "🌱"}
                    {level === "intermediate" && "🌿"}
                    {level === "advanced" && "🌳"}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {english}
                  </h3>
                  <p className="text-gray-600 text-lg">{german}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Start Button */}
          {selectedLevel && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link href={`/lessons?level=${selectedLevel}&language=${selectedLanguage}`}>
                <motion.button
                  className="relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative">Start Learning</span>
                  <motion.span
                    className="relative"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
