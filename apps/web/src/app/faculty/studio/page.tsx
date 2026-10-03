"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../../context/TenantContext';
import { getSubjectsByClass } from '../../../data/curriculum';

export default function FacultyStudioPage() {
  const { activeSchool, user } = useTenant();

  const classLevels = [
    'Nursery', 'LKG', 'UKG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10',
    'Class 11', 'Class 12',
  ];

  const examPatterns = [
    'Pre-Board Examination (100% Syllabus)',
    'Mid-Term Assessment (50% Syllabus)',
    'Unit Test 1 (Formative)',
    'Annual Final Board Mock (100% Syllabus)',
  ];

  const difficultyLevels = [
    'Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)',
    'Easy / Foundational (80% Direct, 20% Application)',
    'Advanced HOTS & Critical Thinking (Analytical & Case Heavy)',
    'Previous Years CBSE Board Mix (2020 - 2025 Series)',
    'Last 10 Years Most Repeated Board Questions (2015-2025)',
  ];

  const [selectedClass, setSelectedClass] = useState('Class 12');
  const [availableSubjects, setAvailableSubjects] = useState<{ code: string; name: string }[]>([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExamPattern, setSelectedExamPattern] = useState(examPatterns[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevels[0]);

  const [theoryMarks, setTheoryMarks] = useState(70);
  const [practicalMarks, setPracticalMarks] = useState(30);

  // Update dynamic subjects when class changes
  useEffect(() => {
    const list = getSubjectsByClass(selectedClass);
    setAvailableSubjects(list);
    if (list.length > 0) {
      setSelectedSubject(list[0].name);
    }

    // Auto mark distribution based on class
    if (selectedClass === 'Class 10' || selectedClass === 'Class 9') {
      setTheoryMarks(80);
      setPracticalMarks(20);
    } else if (selectedClass === 'Class 11' || selectedClass === 'Class 12') {
      setTheoryMarks(70);
      setPracticalMarks(30);
    } else {
      setTheoryMarks(80);
      setPracticalMarks(20);
    }
  }, [selectedClass]);

  return (
    <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Faculty Header (Matches 3rd-7th Screenshots) */}
        <div className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg text-white">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-white">{activeSchool.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 font-semibold uppercase">
                  {user?.role || 'TEACHER'}
                </span>
              </div>
              <p className="text-xs text-gray-400">Department: {user?.department || 'Computer Science'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400 font-mono">
              Created: <span className="text-white font-bold">133 Theory</span> | <span className="text-white font-bold">47 Practical</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>{user?.name || 'Alok Verma'}</span>
            </div>
            <button
              onClick={() => alert('Signing out session.')}
              className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Academic Studios Tab Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-gray-400 font-bold mr-2">ACADEMIC STUDIOS:</span>
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md">
            1. CBSE Syllabus & Question Matrix
          </button>
          <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 text-xs hover:bg-gray-800">
            2. ✍ Practical, Viva & Project Studio
          </button>
          <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 text-xs hover:bg-gray-800">
            3. Manual Paste Syllabus
          </button>
          <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 text-xs hover:bg-gray-800">
            4. Self Upload Papers
          </button>
        </div>

        {/* Dynamic Studio Form Workspace */}
        <div className="p-8 rounded-3xl bg-gray-900/40 border border-gray-800 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white">Mode 1: Official CBSE Curriculum & Dynamic Exam Engine</h2>
            <p className="text-xs text-gray-400 mt-0.5">Syllabus units automatically adapt to the chosen exam pattern.</p>
          </div>

          {/* Form Matrix: Class, Dynamic Subject, Exam Pattern & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Class Selector */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Class (K-12)</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-[#030712] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-semibold"
              >
                {classLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* 2. Dynamic CBSE Subject Dropdown */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">
                Subject ({availableSubjects.length} Available)
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#030712] border border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-semibold"
              >
                {availableSubjects.map((sub, i) => (
                  <option key={i} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Examination Pattern */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Examination Pattern</label>
              <select
                value={selectedExamPattern}
                onChange={(e) => setSelectedExamPattern(e.target.value)}
                className="w-full bg-[#030712] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {examPatterns.map((pat, i) => (
                  <option key={i} value={pat}>{pat}</option>
                ))}
              </select>
            </div>

            {/* 4. Difficulty Standard */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Difficulty / Standard</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-[#030712] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {difficultyLevels.map((dif, i) => (
                  <option key={i} value={dif}>{dif}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Theory vs Practical Marks Distribution */}
          <div className="pt-4 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-300">
              <span className="font-semibold text-white">Evaluation Distribution:</span> Theory & Internal/Practical Marks (Adjustable for All Classes)
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">THEORY MARKS:</span>
                <button onClick={() => setTheoryMarks(Math.max(10, theoryMarks - 5))} className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">−</button>
                <span className="w-8 text-center font-bold text-cyan-400">{theoryMarks}</span>
                <button onClick={() => setTheoryMarks(Math.min(100, theoryMarks + 5))} className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">+</button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-400">PRACTICAL / INTERNAL:</span>
                <button onClick={() => setPracticalMarks(Math.max(0, practicalMarks - 5))} className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">−</button>
                <span className="w-8 text-center font-bold text-amber-400">{practicalMarks}</span>
                <button onClick={() => setPracticalMarks(Math.min(50, practicalMarks + 5))} className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">+</button>
              </div>
            </div>
          </div>

          {/* Question Blueprint Live Calculator */}
          <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">CBSE Question Format & Section Blueprint Matrix</span>
                <span className="text-[10px] font-mono bg-blue-950 text-cyan-400 px-2 py-0.5 rounded border border-blue-800 font-semibold">LIVE BALANCE</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Check or uncheck question formats, adjust question count and marks per question.</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800">
                <span className="text-gray-400 text-[10px] block">CALCULATED MARKS:</span>
                <span className="text-cyan-400 font-black text-sm">{theoryMarks} / {theoryMarks}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800">
                <span className="text-gray-400 text-[10px] block">TOTAL QS:</span>
                <span className="text-white font-black text-sm">{selectedClass.includes('12') || selectedClass.includes('10') ? '35 - 38' : '25'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
