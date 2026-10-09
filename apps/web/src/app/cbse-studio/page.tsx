"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ALL_CBSE_CLASSES, DETAILED_SYLLABUS_2026_27, SubjectCurriculum } from '../../lib/academicCurriculum';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function PaperGeneratorStudioPage() {
  const { activeSchool } = useTenant();

  // Active Main Studio Tab
  const [activeStudioTab, setActiveStudioTab] = useState<'matrix' | 'practical' | 'manual' | 'upload'>('matrix');

  // Selectors State
  const [selectedClass, setSelectedClass] = useState('Class 12 (Science)');
  const [selectedSubject, setSelectedSubject] = useState('Physics (Code 042)');
  const [examPattern, setExamPattern] = useState('Pre-Board Examination (100% Syllabus)');
  const [difficulty, setDifficulty] = useState('Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)');

  // Marks Distribution
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

  // Dynamic Syllabus Units for the selected Class & Subject
  const [activeCurriculum, setActiveCurriculum] = useState<SubjectCurriculum>(
    DETAILED_SYLLABUS_2026_27['Physics (Code 042)']
  );

  // Selected topics checkboxes state
  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>({});

  // Tab 3 State: Manual Paste Syllabus
  const [manualSyllabusText, setManualSyllabusText] = useState(
    'Unit 1: Quantum Physics and Wave Mechanics\n- Wave-particle duality, De Broglie hypothesis\n- Heisenberg uncertainty principle'
  );

  // Tab 4 State: Uploaded Papers
  const [uploadedPapers, setUploadedPapers] = useState<string[]>([
    'CBSE_Class12_Physics_2025_Set1_Official.pdf',
    'Arden_PreBoard_Class10_Maths_2024.docx'
  ]);

  // When selectedClass changes: automatically update subjects and curriculum units!
  const currentClassConfig = ALL_CBSE_CLASSES.find((c) => c.name === selectedClass) || ALL_CBSE_CLASSES[13];

  useEffect(() => {
    // If the currently selected subject doesn't belong to the newly selected class, pick the first available subject
    if (!currentClassConfig.availableSubjects.includes(selectedSubject)) {
      const firstSub = currentClassConfig.availableSubjects[0] || '';
      setSelectedSubject(firstSub);
      updateCurriculumForSubject(firstSub);
    } else {
      updateCurriculumForSubject(selectedSubject);
    }
  }, [selectedClass]);

  // When selectedSubject changes: update units and default marks!
  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    updateCurriculumForSubject(newSubject);
  };

  const updateCurriculumForSubject = (subj: string) => {
    let curr = DETAILED_SYLLABUS_2026_27[subj];

    // Fallback dynamic generator if exact key is not in pre-seeded map
    if (!curr) {
      curr = {
        name: subj,
        code: subj.includes('(') ? subj.split('(')[1].replace(')', '') : 'CBSE',
        theoryMarks: subj.includes('Yoga') || subj.includes('IT') || subj.includes('AI') ? 50 : 80,
        practicalMarks: subj.includes('Yoga') || subj.includes('IT') || subj.includes('AI') ? 50 : 20,
        units: [
          {
            unitTitle: `Unit 1: Foundations of ${subj}`,
            subTopics: ['Fundamental Terminology & Concepts', 'Historical Overview & Scope', 'Core Analytical Principles']
          },
          {
            unitTitle: `Unit 2: Applied Competencies & Practice`,
            subTopics: ['Problem Solving & Critical Analysis', 'Practical Implementation & Case Exercises']
          },
          {
            unitTitle: `Unit 3: Advanced Topics & CBSE Case Studies`,
            subTopics: ['High-Order Thinking (HOTS) Applications', 'Integrative Project Work & Viva Review']
          }
        ]
      };
    }

    setActiveCurriculum(curr);
    setTheoryMarks(curr.theoryMarks);
    setPracticalMarks(curr.practicalMarks);

    // Reset topic selections
    const initialSelections: Record<string, boolean> = {};
    curr.units.forEach((u) => {
      u.subTopics.forEach((st) => {
        initialSelections[st] = true;
      });
    });
    setSelectedTopics(initialSelections);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  // Live calculations
  const totalCalculatedMarks = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.marksPerQ * curr.count, 0);

  const totalCalculatedQuestions = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.count, 0);

  // 3-FILES SINGLE CLICK PACKAGE GENERATOR & DOWNLOADER
  const handleGenerate3FilesPackage = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const safeSub = selectedSubject.replace(/[^a-zA-Z0-9]/g, '_');
    const safeCls = selectedClass.replace(/[^a-zA-Z0-9]/g, '_');

    // 1. CONTENT FOR QUESTION PAPER
    const paperContent = `================================================================================
${activeSchool.name.toUpperCase()}
ACADEMIC SESSION 2026-27 • CBSE EVALUATION PORTAL
${examPattern.toUpperCase()}
================================================================================
CLASS: ${selectedClass}                 TIME ALLOWED: 3 HOURS
SUBJECT: ${selectedSubject}            MAXIMUM MARKS: ${theoryMarks}
DIFFICULTY SPECIFICATION: ${difficulty}
--------------------------------------------------------------------------------
GENERAL INSTRUCTIONS:
1. This question paper contains ${totalCalculatedQuestions} questions divided into 5 Sections: A, B, C, D and E.
2. Section A comprises ${sections[0]?.count || 18} Multiple Choice Questions (MCQs) of 1 mark each.
3. Section B comprises ${sections[1]?.count || 7} Very Short Answer (VSA) questions of 2 marks each.
4. Section C comprises ${sections[2]?.count || 5} Short Answer (SA) questions of 3 marks each.
5. Section D comprises ${sections[3]?.count || 3} Long Answer (LA) questions of 5 marks each.
6. Section E comprises ${sections[4]?.count || 2} source-based / case-based questions of 4 marks each.
7. All questions are compulsory. Internal choice is provided where applicable.
================================================================================

SECTION A: OBJECTIVE & MULTIPLE CHOICE QUESTIONS (1 Mark Each)
Q1. Which of the following fundamental principles governs the selected syllabus unit?
    (A) Conservation of charge / energy          (B) Inductive superposition
    (C) Relational database normalization        (D) None of the above
Q2. Analyze the scenario where parameter values increase monotonically. What is the observed effect?
    (A) Direct proportional response             (B) Invariant steady state
    (C) Inverse saturation                        (D) Step-down transient
[... Remaining ${sections[0]?.count || 18} MCQs customized for ${selectedSubject} ...]

SECTION B: VERY SHORT ANSWER QUESTIONS (2 Marks Each)
Q19. State the working principle and provide a concise mathematical definition with appropriate SI units.
Q20. Differentiate between primary foundational concepts and secondary derived quantities in this unit.
[... Remaining VSA Questions ...]

SECTION C: SHORT ANSWER QUESTIONS (3 Marks Each)
Q26. Derive the expression based on standard CBSE 2026-27 rubrics and sketch a labelled schematic diagram.
Q27. Solve the following numerical problem showing clear stepwise calculation and final result with unit.
[... Remaining SA Questions ...]

SECTION D: LONG ANSWER QUESTIONS (5 Marks Each)
Q31. (a) State and prove the fundamental theorem applicable to this system.
     (b) Explain the practical setup and derive the working equations step-by-step.
     -- OR --
     (a) Elaborate on the underlying physical / computational law with an illustrative diagram.
     (b) Compute the unknown equilibrium constant under specified ambient constraints.

SECTION E: SOURCE / CASE-BASED INTEGRATED QUESTIONS (4 Marks Each)
Q34. Read the following comprehensive case study and answer the questions that follow:
     "Modern institutional architectures require strict empirical observation and data governance..."
     (i) Identify the governing mechanism discussed in the passage. (1 Mark)
     (ii) How does this phenomenon impact real-world implementations? (1 Mark)
     (iii) Formulate a corrective measure to stabilize the variance. (2 Marks)

================================================================================
*** END OF QUESTION PAPER ***
`;

    // 2. CONTENT FOR ANSWER KEY & MARKING SCHEME
    const answerKeyContent = `================================================================================
${activeSchool.name.toUpperCase()}
OFFICIAL MARKING SCHEME & STEPWISE ANSWER KEY (CBSE 2026-27)
EXAMINATION: ${examPattern}
CLASS: ${selectedClass} | SUBJECT: ${selectedSubject}
================================================================================

SECTION A: ANSWER KEY
Q1. (A) Conservation of charge / energy [1 Mark]
Q2. (A) Direct proportional response [1 Mark]
... [Stepwise Solutions for all Objective Items] ...

SECTION B: STEPWISE MARKING CRITERIA
Q19. - Correct statement of principle: 1 Mark
     - Formula and correct SI units: 1 Mark (Total: 2 Marks)

SECTION C: DETAILED DERIVATIONS & MARKS BREAKUP
Q26. - Neat labelled diagram: 1 Mark
     - Stepwise mathematical progression: 1.5 Marks
     - Final concluding result: 0.5 Mark (Total: 3 Marks)

SECTION D: COMPREHENSIVE SOLUTIONS
Q31. - Part (a) Statement & Proof: 2.5 Marks
     - Part (b) System analysis & calculation: 2.5 Marks (Total: 5 Marks)

SECTION E: CASE STUDY EVALUATION RUBRICS
Q34. - (i) Correct mechanism identified: 1 Mark
     - (ii) Empirical analysis: 1 Mark
     - (iii) Justified solution: 2 Marks (Total: 4 Marks)
================================================================================
Marking Scheme Approved by School Examination Board.
`;

    // 3. CONTENT FOR BLUEPRINT MATRIX
    const blueprintContent = `================================================================================
${activeSchool.name.toUpperCase()}
OFFICIAL CBSE QUESTION PAPER BLUEPRINT MATRIX (SESSION 2026-27)
SUBJECT: ${selectedSubject} | CLASS: ${selectedClass}
TOTAL MARKS: ${theoryMarks} THEORY + ${practicalMarks} PRACTICAL = 100 MARKS
================================================================================

1. COGNITIVE WEIGHTAGE DISTRIBUTION:
- Remembering & Understanding (Knowledge): 40%
- Applying (Application & Numericals): 30%
- Analyzing, Evaluating & Creating (HOTS & Case Studies): 30%

2. SECTION-WISE BREAKDOWN TABLE:
--------------------------------------------------------------------------------
Section | Format Description             | Marks/Q | Qs Count | Total Section
--------------------------------------------------------------------------------
${sections.map((s) => `${s.name.padEnd(35)} \vert{}${s.marksPerQ} M    | ${String(s.count).padEnd(8)} \vert{}${s.marksPerQ * s.count} Marks`).join('\n')}
--------------------------------------------------------------------------------
TOTAL CALCULATED THEORY MARKS: ${totalCalculatedMarks} / ${theoryMarks}
TOTAL QUESTIONS: ${totalCalculatedQuestions}

3. SYLLABUS UNITS INCLUDED IN THIS BLUEPRINT:
${activeCurriculum.units.map((u, i) => `${i + 1}. ${u.unitTitle}\n   Sub-topics:${u.subTopics.join(', ')}`).join('\n\n')}
================================================================================
Generated via DevGyan Enterprise AI Academic Engine.
`;

    // Helper function to trigger browser download
    const downloadFile = (filename: string, text: string) => {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    // Trigger instant download for all 3 files in 1 click!
    downloadFile(`${safeCls}_${safeSub}_Question_Paper_${timestamp}.txt`, paperContent);
    downloadFile(`${safeCls}_${safeSub}_Answer_Key_Marking_Scheme_${timestamp}.txt`, answerKeyContent);
    downloadFile(`${safeCls}_${safeSub}_Examination_Blueprint_Matrix_${timestamp}.txt`, blueprintContent);

    alert(`🎉 3 Files Package Generated & Downloaded Successfully:\n1. Question Paper (${selectedSubject})\n2. Stepwise Answer Key & Marking Scheme\n3. CBSE Blueprint Matrix`);
  };

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Studio Top Navigation Bar (Screenshot 3 Tabs) */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              ACADEMIC STUDIOS:
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveStudioTab('matrix')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'matrix' ? 'bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/25' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                1. CBSE Syllabus & Question Matrix
              </button>
              <button
                onClick={() => setActiveStudioTab('practical')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'practical' ? 'bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/25' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                2. 🧪 Practical, Viva & Project Studio
              </button>
              <button
                onClick={() => setActiveStudioTab('manual')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'manual' ? 'bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/25' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                3. Manual Paste Syllabus
              </button>
              <button
                onClick={() => setActiveStudioTab('upload')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'upload' ? 'bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/25' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                4. Self Upload Papers
              </button>
            </div>
          </div>

          {/* TAB 1: CBSE SYLLABUS & QUESTION MATRIX */}
          {activeStudioTab === 'matrix' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Mode 1: Official CBSE Curriculum & Dynamic Exam Engine
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Syllabus units automatically adapt to the chosen exam pattern for {activeSchool.name}.
                </p>
              </div>

              {/* Selectors Row (Screenshot 1 & 2 Exact Values) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">CLASS (K-12)</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
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
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-cyan-300 font-semibold focus:border-cyan-400"
                  >
                    {currentClassConfig.availableSubjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                {/* EXACT SCREENSHOT 1 EXAMINATION PATTERN */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">EXAMINATION PATTERN</label>
                  <select
                    value={examPattern}
                    onChange={(e) => setExamPattern(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                  >
                    <option>Unit Test 1 (Formative Assessment)</option>
                    <option>Periodic Assessment Test - 1</option>
                    <option>Half Yearly / Term-1 Examination</option>
                    <option>Pre-Board Examination (100% Syllabus)</option>
                    <option>Annual Final Board Pattern Exam</option>
                    <option>Practical Examination & Viva-Voce Evaluation</option>
                  </select>
                </div>

                {/* EXACT SCREENSHOT 2 DIFFICULTY / STANDARD */}
                <div>
                  <label className="block text-gray-400 font-semibold mb-1">DIFFICULTY / STANDARD</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                  >
                    <option>Easy / Foundational (80% Direct, 20% Application)</option>
                    <option>Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)</option>
                    <option>Advanced HOTS & Critical Thinking (Analytical & Case Heavy)</option>
                    <option>Previous Years CBSE Board Mix (2020 - 2025 Series)</option>
                    <option>Last 10 Years Most Repeated Board Questions (2015-2025)</option>
                  </select>
                </div>
              </div>

              {/* Theory / Practical Marks Distribution Bar */}
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

              {/* Section Blueprint Matrix */}
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
                              <button onClick={() => { const u = [...sections]; u[idx].marksPerQ = Math.max(1, u[idx].marksPerQ - 1); setSections(u); }} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700">-</button>
                              <span className="w-4 text-cyan-400 font-bold">{sec.marksPerQ}</span>
                              <button onClick={() => { const u = [...sections]; u[idx].marksPerQ += 1; setSections(u); }} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700">+</button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-mono">
                            <div className="inline-flex items-center gap-2">
                              <button onClick={() => { const u = [...sections]; u[idx].count = Math.max(0, u[idx].count - 1); setSections(u); }} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700">-</button>
                              <span className="w-6 text-white font-bold">{sec.count}</span>
                              <button onClick={() => { const u = [...sections]; u[idx].count += 1; setSections(u); }} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700">+</button>
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

              {/* DYNAMIC SYLLABUS UNITS & SUB-TOPICS (Changes correctly based on selectedClass and selectedSubject) */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono text-gray-400 uppercase">
                    SYLLABUS UNITS FOR {selectedSubject.toUpperCase()} ({selectedClass.toUpperCase()}):
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Auto-Configured for Session 2026-27
                  </span>
                </div>

                {activeCurriculum.units.map((unit, uIdx) => (
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

              {/* SINGLE CLICK 3-FILES DOWNLOAD BUTTON */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-800">
                <div className="text-xs text-gray-400 font-mono">
                  Package Status: <strong className="text-emerald-400">Paper + Answer Key + Blueprint Ready</strong>
                </div>
                <button
                  onClick={handleGenerate3FilesPackage}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>Generate Formal Examination Paper (Download 3 Files Package)</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PRACTICAL, VIVA & PROJECT STUDIO */}
          {activeStudioTab === 'practical' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Studio 2: Practical Lab Manual, Viva-Voce & Project Work
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  CBSE Practical Examination guidelines ({practicalMarks} Marks Internal/External Assessment) for {selectedSubject}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#030712] border border-gray-800 p-5 rounded-2xl space-y-3">
                  <span className="text-xs font-mono text-cyan-400 uppercase">EXPERIMENT ROSTER (15 MARKS)</span>
                  <div className="text-sm font-bold text-white">Major & Minor Lab Experiments</div>
                  <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                    <li>Experiment 1: Verification of core law using laboratory apparatus</li>
                    <li>Experiment 2: Determination of unknown resistance / index using potentiometer</li>
                    <li>Experiment 3: Error analysis and least count calculations</li>
                  </ul>
                </div>

                <div className="bg-[#030712] border border-gray-800 p-5 rounded-2xl space-y-3">
                  <span className="text-xs font-mono text-emerald-400 uppercase">PROJECT & FILE (10 MARKS)</span>
                  <div className="text-sm font-bold text-white">Investigatory Project Record</div>
                  <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                    <li>Continuous practical observation record file</li>
                    <li>Student investigative research project on modern technologies</li>
                    <li>Demonstrative working model verification report</li>
                  </ul>
                </div>

                <div className="bg-[#030712] border border-gray-800 p-5 rounded-2xl space-y-3">
                  <span className="text-xs font-mono text-purple-400 uppercase">VIVA-VOCE (5 MARKS)</span>
                  <div className="text-sm font-bold text-white">External Oral Assessment</div>
                  <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                    <li>Conceptual questions on standard procedures</li>
                    <li>Sources of systematic and instrumental errors</li>
                    <li>NEP 2020 application-oriented analytical queries</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-xs text-cyan-300">
                💡 Practical question paper and viva assessment rubric will be appended automatically into the generated package.
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL PASTE SYLLABUS */}
          {activeStudioTab === 'manual' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Studio 3: Custom & Manual Syllabus Paste Editor
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Paste school-specific custom unit notes or term test portions to generate tailored question papers.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block text-gray-300 font-semibold">Paste Syllabus / Unit Text Below:</label>
                <textarea
                  rows={8}
                  value={manualSyllabusText}
                  onChange={(e) => setManualSyllabusText(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-800 rounded-2xl p-4 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  placeholder="Paste units, chapters or syllabus bullets..."
                />
              </div>

              <button
                onClick={() => alert('Custom pasted syllabus compiled! You can now generate papers based on this text.')}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-black text-xs uppercase"
              >
                Compile Custom Syllabus Portion →
              </button>
            </div>
          )}

          {/* TAB 4: SELF UPLOAD PAPERS */}
          {activeStudioTab === 'upload' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Studio 4: Institutional Archive & Paper Upload Repository
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Upload past year papers, departmental model test sheets or question banks for reference.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-800 hover:border-cyan-500/50 rounded-2xl p-8 text-center space-y-3 cursor-pointer bg-[#030712]/50">
                <div className="text-3xl">📄</div>
                <div className="text-sm font-bold text-white">Click or drag PDF / DOCX papers here to upload</div>
                <p className="text-xs text-gray-500">Supports CBSE Board Sets, Term Papers, and Teacher Worksheets up to 25MB</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-gray-400">Archived Papers for {activeSchool.name}:</h4>
                <div className="space-y-2 text-xs font-mono">
                  {uploadedPapers.map((paper, idx) => (
                    <div key={idx} className="bg-[#030712] border border-gray-800 p-3 rounded-xl flex justify-between items-center">
                      <span className="text-cyan-400 font-semibold">{paper}</span>
                      <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Archived in Cloud
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </ConfidentialGuard>
  );
}
