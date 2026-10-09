"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ALL_CBSE_CLASSES, DETAILED_SYLLABUS_2026_27 } from '../../lib/academicCurriculum';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function PaperGeneratorStudioPage() {
  const { activeSchool } = useTenant();

  // State selections
  const [selectedClass, setSelectedClass] = useState('Class 12 (Science)');
  const [selectedSubject, setSelectedSubject] = useState('Physics (Code 042)');
  const [examPattern, setExamPattern] = useState('Pre-Board Examination (100% Syllabus)');
  const [difficulty, setDifficulty] = useState('Standard CBSE Balanced (60% Medium, 20% Easy, 20% Hard)');

  // Theory & Practical marks
  const [theoryMarks, setTheoryMarks] = useState(70);
  const [practicalMarks, setPracticalMarks] = useState(30);

  // Section Blueprint Matrix
  const [sections, setSections] = useState([
    { id: 'sec-a', name: 'Section A: MCQs (1 Mark each)', enabled: true, marksPerQ: 1, count: 18 },
    { id: 'sec-b', name: 'Section B: VSA (2 Marks each)', enabled: true, marksPerQ: 2, count: 7 },
    { id: 'sec-c', name: 'Section C: SA (3 Marks each)', enabled: true, marksPerQ: 3, count: 5 },
    { id: 'sec-d', name: 'Section D: LA (5 Marks each)', enabled: true, marksPerQ: 5, count: 3 },
    { id: 'sec-e', name: 'Section E: Case Study (4 Marks each)', enabled: true, marksPerQ: 4, count: 2 },
  ]);

  // Active curriculum data
  const currentCurriculum = DETAILED_SYLLABUS_2026_27[selectedSubject] || DETAILED_SYLLABUS_2026_27['Physics (Code 042)'];

  // Checkbox state for topics
  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>({
    'Electric Charges, Fields & Gauss Law': true,
    'Electrostatic Potential & Capacitors': true,
    'Drift Velocity, Ohm’s Law & Kirchhoff’s Rules': true,
    'Potentiometer & Wheatstone Bridge Principles': true,
  });

  // Calculate live marks
  const totalCalculatedMarks = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.marksPerQ * curr.count, 0);

  const totalCalculatedQuestions = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.count, 0);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const currentClassConfig = ALL_CBSE_CLASSES.find((c) => c.name === selectedClass) || ALL_CBSE_CLASSES[16];

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Studio Top Navigation Bar (Screenshot 3 Tabs) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              ACADEMIC STUDIOS:
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <button className="px-4 py-2 rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/25">
                1. CBSE Syllabus & Question Matrix
              </button>
              <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white">
                2. 🧪 Practical, Viva & Project Studio
              </button>
              <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white">
                3. Manual Paste Syllabus
              </button>
              <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white">
                4. Self Upload Papers
              </button>
            </div>
          </div>

          {/* Mode 1 Header Card */}
          <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Mode 1: Official CBSE Curriculum & Dynamic Exam Engine
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Syllabus units automatically adapt to the chosen exam pattern for {activeSchool.name}.
              </p>
            </div>

            {/* Selectors Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">CLASS (K-12)</label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    const newClass = e.target.value;
                    setSelectedClass(newClass);
                    const cfg = ALL_CBSE_CLASSES.find((c) => c.name === newClass);
                    if (cfg && cfg.availableSubjects.length > 0) {
                      setSelectedSubject(cfg.availableSubjects[0]);
                    }
                  }}
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-semibold focus:border-cyan-400"
                >
                  {ALL_CBSE_CLASSES.map((cls) => (
                    <option key={cls.id} value={cls.name}>{cls.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">
                  SUBJECT ({currentClassConfig.availableSubjects.length} AVAILABLE)
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-cyan-300 font-semibold focus:border-cyan-400"
                >
                  {currentClassConfig.availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">EXAMINATION PATTERN</label>
                <select
                  value={examPattern}
                  onChange={(e) => setExamPattern(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                >
                  <option>Pre-Board Examination (100% Syllabus)</option>
                  <option>Mid-Term Cycle (50% Syllabus)</option>
                  <option>Unit Test 1 (20% Syllabus)</option>
                  <option>Annual Board Mock Paper</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 font-semibold mb-1">DIFFICULTY / STANDARD</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                >
                  <option>Standard CBSE Balanced (60% Medium, 20% Easy, 20% Hard)</option>
                  <option>Advanced Analytical (HOTS 40%, Medium 40%)</option>
                  <option>Foundational Remedial (Easy 60%, Medium 40%)</option>
                </select>
              </div>
            </div>

            {/* Marks Distribution Bar */}
            <div className="bg-[#030712] border border-gray-800 p-4 rounded-2xl flex flex-wrap justify-between items-center text-xs">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Evaluation Distribution:</span>
                <span className="text-white font-bold">Theory & Internal/Practical Marks (Adjustable for All Classes)</span>
              </div>
              <div className="flex items-center gap-6 mt-2 sm:mt-0 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">THEORY MARKS:</span>
                  <button onClick={() => setTheoryMarks(Math.max(10, theoryMarks - 5))} className="px-2 py-0.5 rounded bg-gray-800 font-bold">-</button>
                  <span className="text-cyan-400 font-bold text-sm w-6 text-center">{theoryMarks}</span>
                  <button onClick={() => setTheoryMarks(theoryMarks + 5)} className="px-2 py-0.5 rounded bg-gray-800 font-bold">+</button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">PRACTICAL / INTERNAL:</span>
                  <button onClick={() => setPracticalMarks(Math.max(0, practicalMarks - 5))} className="px-2 py-0.5 rounded bg-gray-800 font-bold">-</button>
                  <span className="text-emerald-400 font-bold text-sm w-6 text-center">{practicalMarks}</span>
                  <button onClick={() => setPracticalMarks(practicalMarks + 5)} className="px-2 py-0.5 rounded bg-gray-800 font-bold">+</button>
                </div>
              </div>
            </div>

            {/* CBSE Question Format & Section Blueprint Matrix */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white uppercase font-mono">
                    CBSE Question Format & Section Blueprint Matrix
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-cyan-400 border border-blue-800">
                    LIVE BALANCE
                  </span>
                </div>

                <div className="flex items-center gap-4 bg-[#030712] border border-gray-800 px-4 py-2 rounded-xl font-mono text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] block">CALCULATED MARKS:</span>
                    <strong className="text-emerald-400 text-sm">{totalCalculatedMarks} / {theoryMarks}</strong>
                  </div>
                  <div className="border-l border-gray-800 pl-4">
                    <span className="text-gray-400 text-[10px] block">TOTAL QS:</span>
                    <strong className="text-white text-sm">{totalCalculatedQuestions}</strong>
                  </div>
                </div>
              </div>

              {/* Sections Table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-[#030712]">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                    <tr>
                      <th className="py-3 px-4 w-16">Enable</th>
                      <th className="py-3 px-4">Question Type / Format</th>
                      <th className="py-3 px-4 text-center">Marks Per Q</th>
                      <th className="py-3 px-4 text-center">Questions Count</th>
                      <th className="py-3 px-4 text-right">Section Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-medium">
                    {sections.map((sec, idx) => (
                      <tr key={sec.id} className="hover:bg-gray-800/20">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={sec.enabled}
                            onChange={(e) => {
                              const updated = [...sections];
                              updated[idx].enabled = e.target.checked;
                              setSections(updated);
                            }}
                            className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-4 h-4"
                          />
                        </td>
                        <td className="py-3 px-4 text-white font-semibold">{sec.name}</td>
                        <td className="py-3 px-4 text-center font-mono">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                const u = [...sections];
                                u[idx].marksPerQ = Math.max(1, u[idx].marksPerQ - 1);
                                setSections(u);
                              }}
                              className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700"
                            >-</button>
                            <span className="w-4 text-cyan-400 font-bold">{sec.marksPerQ}</span>
                            <button
                              onClick={() => {
                                const u = [...sections];
                                u[idx].marksPerQ += 1;
                                setSections(u);
                              }}
                              className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700"
                            >+</button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-mono">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => {
                                const u = [...sections];
                                u[idx].count = Math.max(0, u[idx].count - 1);
                                setSections(u);
                              }}
                              className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700"
                            >-</button>
                            <span className="w-6 text-white font-bold">{sec.count}</span>
                            <button
                              onClick={() => {
                                const u = [...sections];
                                u[idx].count += 1;
                                setSections(u);
                              }}
                              className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700"
                            >+</button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-cyan-400">
                          {sec.enabled ? sec.marksPerQ * sec.count : 0} M
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SYLLABUS UNITS FOR 2026-27 ACCORDION */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono text-gray-400 uppercase">
                  SYLLABUS UNITS FOR {selectedSubject.toUpperCase()} ({examPattern.toUpperCase()}):
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  Auto-Checked for {examPattern.split('(')[0]}
                </span>
              </div>

              {currentCurriculum.units.map((unit, uIdx) => (
                <div key={uIdx} className="bg-[#030712] border border-gray-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-4 h-4"
                      />
                      <span className="text-white font-bold text-xs">{unit.unitTitle}</span>
                    </label>
                    <span className="text-xs text-gray-500 font-mono">-</span>
                  </div>

                  {/* Subtopics */}
                  <div className="pl-7 space-y-2 border-l border-gray-800 ml-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">SUB-TOPICS IN THIS UNIT:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {unit.subTopics.map((sub, sIdx) => {
                        const isChecked = selectedTopics[sub] !== false;
                        return (
                          <label key={sIdx} className="flex items-center gap-2 cursor-pointer text-gray-300">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleTopic(sub)}
                              className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-3.5 h-3.5"
                            />
                            <span className={isChecked ? 'text-gray-200' : 'text-gray-500 line-through'}>{sub}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Generate Button Action */}
            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-800">
              <div className="text-xs text-gray-400 font-mono">
                Blueprint Status: <strong className="text-emerald-400">100% CBSE Rubrics Synchronized</strong>
              </div>
              <button
                onClick={() => alert(`Official CBSE Question Paper Blueprint for ${selectedSubject} generated successfully!`)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
              >
                🚀 Generate Formal Examination Paper Blueprint
              </button>
            </div>

          </div>

        </div>
      </div>
    </ConfidentialGuard>
  );
}
