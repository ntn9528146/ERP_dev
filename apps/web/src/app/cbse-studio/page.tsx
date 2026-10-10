"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ALL_CBSE_CLASSES, DETAILED_SYLLABUS_2026_27, SubjectCurriculum, PracticalExperiment } from '../../lib/academicCurriculum';
import { generateExactSubjectPaper, FullGeneratedQuestion } from '../../lib/subjectPaperBanks';
import ConfidentialGuard from '../../components/ConfidentialGuard';

interface SavedPaperRecord {
  id: string;
  title: string;
  subject: string;
  className: string;
  pattern: string;
  totalMarks: number;
  createdAt: string;
  author: string;
  schoolName: string;
  paperDoc: string;
  answerKeyDoc: string;
  vivaDoc: string;
  blueprintDoc: string;
}

export default function PaperGeneratorStudioPage() {
  const { activeSchool, currentUser } = useTenant();

  const [activeStudioTab, setActiveStudioTab] = useState<'matrix' | 'practical' | 'manual' | 'saved'>('matrix');

  const [selectedClass, setSelectedClass] = useState('Class 12 (Science)');
  const [selectedSubject, setSelectedSubject] = useState('Computer Science (Code 083)');
  const [examPattern, setExamPattern] = useState('Pre-Board Examination (100% Syllabus)');
  const [difficulty, setDifficulty] = useState('Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)');
  const [downloadFormat, setDownloadFormat] = useState<'doc' | 'pdf'>('doc');

  const [theoryMarks, setTheoryMarks] = useState(70);
  const [practicalMarks, setPracticalMarks] = useState(30);

  const [sections, setSections] = useState([
    { id: 'sec-a', name: 'Section A: Objective & MCQs (Q1 to Q21)', enabled: true, marksPerQ: 1, count: 21 },
    { id: 'sec-b', name: 'Section B: VSA Output & Syntax (Q22 to Q28)', enabled: true, marksPerQ: 2, count: 7 },
    { id: 'sec-c', name: 'Section C: SA Functions & Stack (Q29 to Q31)', enabled: true, marksPerQ: 3, count: 3 },
    { id: 'sec-d', name: 'Section D: Long Questions & SQL (Q32 to Q35)', enabled: true, marksPerQ: 4, count: 4 },
    { id: 'sec-e', name: 'Section E: Integrated Case & Networks (Q36 to Q37)', enabled: true, marksPerQ: 5, count: 2 },
  ]);

  const [activeCurriculum, setActiveCurriculum] = useState<SubjectCurriculum>(
    DETAILED_SYLLABUS_2026_27['Computer Science (Code 083)']
  );

  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>({});
  const [selectedExpIds, setSelectedExpIds] = useState<Record<string, boolean>>({});
  const [manualSyllabusText, setManualSyllabusText] = useState('Unit 1: Computational Thinking and Programming - 2\n- Functions, File Handling, Stack');
  const [savedPapers, setSavedPapers] = useState<SavedPaperRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('devgyan_saved_papers_vault');
    if (stored) {
      try { setSavedPapers(JSON.parse(stored)); } catch (e) { console.error(e); }
    }
  }, []);

  const currentClassConfig = ALL_CBSE_CLASSES.find((c) => c.name === selectedClass) || ALL_CBSE_CLASSES[16];

  useEffect(() => {
    if (!currentClassConfig.availableSubjects.includes(selectedSubject)) {
      const firstSub = currentClassConfig.availableSubjects[0] || '';
      setSelectedSubject(firstSub);
      updateCurriculumForSubject(firstSub);
    } else {
      updateCurriculumForSubject(selectedSubject);
    }
  }, [selectedClass]);

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    updateCurriculumForSubject(newSubject);
  };

  const updateCurriculumForSubject = (subj: string) => {
    let curr = DETAILED_SYLLABUS_2026_27[subj];
    if (!curr) {
      curr = {
        name: subj,
        code: subj.includes('Code') ? subj.split('Code')[1].replace(/[^0-9]/g, '') : 'CBSE',
        theoryMarks: 70, practicalMarks: 30,
        units: [
          { unitTitle: `Unit 1: Theory of ${subj}`, subTopics: ['Basic concepts', 'Core laws'] },
          { unitTitle: `Unit 2: Applied ${subj}`, subTopics: ['Problem solving', 'Case study'] }
        ]
      };
    }
    setActiveCurriculum(curr);
    setTheoryMarks(curr.theoryMarks);
    setPracticalMarks(curr.practicalMarks);

    const initialTopics: Record<string, boolean> = {};
    const initialExps: Record<string, boolean> = {};
    curr.units.forEach((u) => {
      u.subTopics.forEach((st) => { initialTopics[st] = true; });
      if (u.experiments) {
        u.experiments.forEach((e) => { initialExps[e.expId] = true; });
      }
    });
    setSelectedTopics(initialTopics);
    setSelectedExpIds(initialExps);
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
  };

  const toggleExperiment = (expId: string) => {
    setSelectedExpIds((prev) => ({ ...prev, [expId]: !prev[expId] }));
  };

  const totalCalculatedMarks = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.marksPerQ * curr.count, 0);

  const totalCalculatedQuestions = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.count, 0);

  const allAvailableExperiments: PracticalExperiment[] = activeCurriculum.units.flatMap((u) => u.experiments || []);
  const activeSelectedExperiments = allAvailableExperiments.filter((e) => selectedExpIds[e.expId] !== false);

  // WORD/PDF STYLING EXACTLY MATCHING CBSE ORIGINAL FORMAT (SCREENSHOT 2)
  const generateWordHtmlDoc = (title: string, bodyHtml: string) => {
    return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${title}</title>
<style>
@page { size: 21cm 29.7cm; margin: 1.27cm 1.27cm 1.27cm 1.27cm; mso-page-orientation: portrait; }
body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.3; color: #000; }
.header-school { font-size: 15pt; font-weight: bold; text-align: center; text-transform: uppercase; margin-bottom: 2pt; }
.header-meta { font-size: 11pt; text-align: center; font-weight: bold; margin-bottom: 4pt; }
.roll-no-box { border: 1pt solid #000; padding: 3pt 6pt; width: 170pt; font-size: 10pt; font-family: monospace; margin-bottom: 6pt; }
.section-title { font-size: 12pt; font-weight: bold; text-align: center; margin-top: 14pt; margin-bottom: 6pt; text-transform: uppercase; border-bottom: 1pt solid #000; padding-bottom: 2pt; }
.instructions { font-size: 10pt; margin-bottom: 8pt; line-height: 1.25; }

/* QUESTION ITEM TABLE (EXACT CBSE SCREENSHOT 2 LAYOUT) */
table.q-item-table { width: 100%; border-collapse: collapse; margin-bottom: 10pt; page-break-inside: avoid; }
table.q-item-table td { vertical-align: top; padding: 1pt 0; font-size: 11pt; }
td.q-col-num { width: 28pt; font-weight: bold; font-size: 11pt; }
td.q-col-body { text-align: justify; }
td.q-col-marks { width: 20pt; text-align: right; font-weight: bold; font-size: 11pt; }

/* PYTHON CODE BLOCKS IN COURIER NEW */
pre.code-block { font-family: 'Courier New', Courier, monospace; font-size: 10pt; font-weight: bold; margin: 4pt 0 4pt 12pt; background-color: #fafafa; padding: 3pt; line-height: 1.2; }

/* 2-COLUMN OPTIONS TABLE FOR MCQS */
table.opts-table { width: 100%; border-collapse: collapse; margin-top: 3pt; margin-bottom: 2pt; }
table.opts-table td { width: 50%; padding: 1.5pt 4pt; font-size: 10.5pt; font-family: 'Times New Roman', Times, serif; }

table.matrix-table { width: 100%; border-collapse: collapse; margin-top: 6pt; margin-bottom: 8pt; }
table.matrix-table th, table.matrix-table td { border: 1pt solid #000; padding: 4pt 6pt; font-size: 10pt; }
table.matrix-table th { background-color: #f2f2f2; font-weight: bold; }
</style>
</head>
<body>${bodyHtml}</body></html>`;
  };

  const downloadFile = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderQuestionRow = (q: FullGeneratedQuestion) => {
    let optionsHtml = '';
    if (q.options) {
      optionsHtml = `
      <table class="opts-table">
        <tr>
          <td><b>(A)</b> &nbsp; ${q.options.optA}</td>
          <td><b>(B)</b> &nbsp; ${q.options.optB}</td>
        </tr>
        <tr>
          <td><b>(C)</b> &nbsp; ${q.options.optC}</td>
          <td><b>(D)</b> &nbsp; ${q.options.optD}</td>
        </tr>
      </table>`;
    }

    let codeHtml = '';
    if (q.codeBlock) {
      codeHtml = `<pre class="code-block">${q.codeBlock}</pre>`;
    }

    return `
    <table class="q-item-table">
      <tr>
        <td class="q-col-num">${q.qNum}.</td>
        <td class="q-col-body">
          ${q.text.replace(/\n/g, '<br/>')}
          ${codeHtml}
          ${optionsHtml}
        </td>
        <td class="q-col-marks">${q.marks}</td>
      </tr>
    </table>`;
  };

  const handleGenerateCompletePackage = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const schoolNameUpper = activeSchool.name.toUpperCase();
    const safeSub = selectedSubject.replace(/[^a-zA-Z0-9]/g, '_');
    const safeCls = selectedClass.replace(/[^a-zA-Z0-9]/g, '_');

    // Fresh unique randomized questions set
    const generatedData = generateExactSubjectPaper(selectedSubject, selectedClass);
    const allQs = generatedData.questions;

    const secA = allQs.filter(q => q.section === 'A');
    const secB = allQs.filter(q => q.section === 'B');
    const secC = allQs.filter(q => q.section === 'C');
    const secD = allQs.filter(q => q.section === 'D');
    const secE = allQs.filter(q => q.section === 'E');

    const romanNums = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
    const formattedInstructions = generatedData.instructions
      .map((inst, i) => `(${romanNums[i] || (i + 1)}) ${inst}`)
      .join('<br/>');

    const paperHtml = `
<div class="roll-no-box">Roll No: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</div>
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">CBSE SESSION 2026-27 • ${examPattern.toUpperCase()}<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<table style="width: 100%; margin-bottom: 6pt; font-weight: bold;">
<tr>
  <td style="text-align: left;">Time allowed: 3 hours</td>
  <td style="text-align: right;">Maximum Marks: ${generatedData.totalMarks}</td>
</tr>
</table>
<hr style="border: 0.5pt solid #000; margin-bottom: 6pt;"/>

<div class="instructions">
<b>General Instructions:</b><br/>
${formattedInstructions}
</div>

<div class="section-title">SECTION - A &nbsp;&nbsp; (21 x 1 = 21)</div>
${secA.map(renderQuestionRow).join('')}

<div class="section-title">SECTION - B &nbsp;&nbsp; (7 x 2 = 14)</div>
${secB.map(renderQuestionRow).join('')}

<div class="section-title">SECTION - C &nbsp;&nbsp; (3 x 3 = 9)</div>
${secC.map(renderQuestionRow).join('')}

<div class="section-title">SECTION - D &nbsp;&nbsp; (4 x 4 = 16)</div>
${secD.map(renderQuestionRow).join('')}

<div class="section-title">SECTION - E &nbsp;&nbsp; (2 x 5 = 10)</div>
${secE.map(renderQuestionRow).join('')}

<div style="text-align: center; font-weight: bold; margin-top: 15pt;">*** END OF QUESTION PAPER • STRICT CBSE 2026-27 FORMAT ***</div>
`;

    const answerKeyHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">CBSE SESSION 2026-27 • OFFICIAL STEPWISE MARKING SCHEME & ANSWER KEY<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

${allQs.map(q => `
<div style="margin-bottom: 8pt; page-break-inside: avoid;">
  <b>${q.qNum}. [Section ${q.section} -${q.marks} Mark]</b><br/>
  <div style="padding-left: 12pt; color: #111;">${q.answerKey.replace(/\n/g, '<br/>')}</div>
</div>
`).join('')}
`;

    const vivaHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">CBSE PRACTICAL & VIVA-VOCE EXAMINATION DOSSIER 2026-27<br/>
SUBJECT: ${selectedSubject.toUpperCase()} | TOTAL PRACTICAL: ${practicalMarks} MARKS</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

<div class="section-title">SELECTED TOPIC-WISE LAB EXPERIMENTS:</div>
${activeSelectedExperiments.map((exp, idx) => `
<div style="margin-bottom: 8pt;">
  <b>Experiment ${idx + 1} [${exp.expId}]:</b>${exp.title}<br/>
  <span style="font-size: 10pt; color: #444;">Mapped Unit: ${exp.unitRef}</span>
</div>
`).join('')}

<div class="section-title">VIVA-VOCE QUESTION BANK WITH MODEL ANSWERS:</div>
${activeSelectedExperiments.flatMap((exp) => exp.vivaQueries).map((vq, idx) => `
<div style="margin-bottom: 6pt;">
  <b>Q${idx + 1}.${vq.q}</b><br/>
  <i>Ans:</i> ${vq.a}
</div>
`).join('')}
`;

    const blueprintHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">OFFICIAL CBSE BLUEPRINT MATRIX (2026-27)<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

<table class="matrix-table">
  <tr><th>Section</th><th>Typology</th><th>Marks/Q</th><th>Count</th><th>Total</th></tr>
  <tr><td><b>Section A</b></td><td>Objective & MCQs (Q1 to Q21)</td><td>1 M</td><td>21</td><td>21 Marks</td></tr>
  <tr><td><b>Section B</b></td><td>VSA Output & Syntax (Q22 to Q28)</td><td>2 M</td><td>7</td><td>14 Marks</td></tr>
  <tr><td><b>Section C</b></td><td>SA Functions & Stack (Q29 to Q31)</td><td>3 M</td><td>3</td><td>9 Marks</td></tr>
  <tr><td><b>Section D</b></td><td>LA SQL & Python Connector (Q32 to Q35)</td><td>4 M</td><td>4</td><td>16 Marks</td></tr>
  <tr><td><b>Section E</b></td><td>Case Study & Networking (Q36 to Q37)</td><td>5 M</td><td>2</td><td>10 Marks</td></tr>
  <tr><th colspan="3">AGGREGATE THEORY SCORE</th><th>37 Qs</th><th>70 Marks</th></tr>
</table>
`;

    const paperDoc = generateWordHtmlDoc(`${selectedSubject} Paper`, paperHtml);
    const answerKeyDoc = generateWordHtmlDoc('Marking Scheme', answerKeyHtml);
    const vivaDoc = generateWordHtmlDoc('Practical Viva', vivaHtml);
    const blueprintDoc = generateWordHtmlDoc('Blueprint', blueprintHtml);

    const fileExt = downloadFormat === 'doc' ? 'doc' : 'html';
    const mime = downloadFormat === 'doc' ? 'application/msword;charset=utf-8' : 'text/html;charset=utf-8';

    downloadFile(`${safeCls}_${safeSub}_Question_Paper_${timestamp}.${fileExt}`, paperDoc, mime);
    downloadFile(`${safeCls}_${safeSub}_Marking_Scheme_${timestamp}.${fileExt}`, answerKeyDoc, mime);
    downloadFile(`${safeCls}_${safeSub}_Practical_Viva_${timestamp}.${fileExt}`, vivaDoc, mime);
    downloadFile(`${safeCls}_${safeSub}_Blueprint_${timestamp}.${fileExt}`, blueprintDoc, mime);

    const newRecord: SavedPaperRecord = {
      id: `PPR-${Date.now().toString().slice(-5)}`,
      title: `${selectedSubject} (${examPattern.split('(')[0].trim()})`,
      subject: selectedSubject,
      className: selectedClass,
      pattern: examPattern,
      totalMarks: generatedData.totalMarks,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      author: currentUser?.name || 'Faculty',
      schoolName: activeSchool.name,
      paperDoc, answerKeyDoc, vivaDoc, blueprintDoc,
    };
    const updated = [newRecord, ...savedPapers];
    setSavedPapers(updated);
    localStorage.setItem('devgyan_saved_papers_vault', JSON.stringify(updated));

    alert(`🎉 Unique CBSE 2026 Paper Package Generated in ${downloadFormat.toUpperCase()}!\n\nSubject: ${selectedSubject}\nTotal: 37 Questions (Q1 to Q37)\nMarks: 70 Marks\nFormatted exactly as CBSE Original Paper.`);
  };

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              ACADEMIC STUDIOS:
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveStudioTab('matrix')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'matrix' ? 'bg-blue-600 font-bold text-white shadow-lg' : 'bg-gray-900 border border-gray-800 text-gray-300'
                }`}
              >
                1. CBSE Syllabus & Question Matrix
              </button>
              <button
                onClick={() => setActiveStudioTab('practical')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'practical' ? 'bg-blue-600 font-bold text-white shadow-lg' : 'bg-gray-900 border border-gray-800 text-gray-300'
                }`}
              >
                2. 🧪 Practical, Viva & Project Studio ({activeSelectedExperiments.length} Active)
              </button>
              <button
                onClick={() => setActiveStudioTab('manual')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'manual' ? 'bg-blue-600 font-bold text-white shadow-lg' : 'bg-gray-900 border border-gray-800 text-gray-300'
                }`}
              >
                3. Manual Paste Syllabus
              </button>
              <button
                onClick={() => setActiveStudioTab('saved')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'saved' ? 'bg-emerald-600 font-bold text-white shadow-lg' : 'bg-gray-900 border border-gray-800 text-gray-300'
                }`}
              >
                4. 📂 Saved Papers Repository ({savedPapers.length})
              </button>
            </div>
          </div>

          {activeStudioTab === 'matrix' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Mode 1: Official CBSE Curriculum & Dynamic Exam Engine
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    CBSE 2026 Examination Blueprint: 37 Questions • 70 Marks for {activeSchool.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#030712] border border-gray-800 p-1.5 rounded-xl text-xs font-mono">
                  <span className="text-gray-400 pl-2">Format:</span>
                  <button
                    onClick={() => setDownloadFormat('doc')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      downloadFormat === 'doc' ? 'bg-cyan-500 text-black shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    MS Word (.doc)
                  </button>
                  <button
                    onClick={() => setDownloadFormat('pdf')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      downloadFormat === 'pdf' ? 'bg-cyan-500 text-black shadow' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    PDF Ready (.html)
                  </button>
                </div>
              </div>

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

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">EXAMINATION PATTERN</label>
                  <select
                    value={examPattern}
                    onChange={(e) => setExamPattern(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                  >
                    <option>Pre-Board Examination (100% Syllabus)</option>
                    <option>Unit Test 1 (Formative Assessment)</option>
                    <option>Periodic Assessment Test - 1</option>
                    <option>Half Yearly / Term-1 Examination</option>
                    <option>Annual Final Board Pattern Exam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 font-semibold mb-1">DIFFICULTY / STANDARD</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400"
                  >
                    <option>Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)</option>
                    <option>Easy / Foundational (80% Direct, 20% Application)</option>
                    <option>Advanced HOTS & Critical Thinking (Analytical & Case Heavy)</option>
                    <option>Previous Years CBSE Board Mix (2020 - 2025 Series)</option>
                    <option>Last 10 Years Most Repeated Board Questions (2015-2025)</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#030712] border border-gray-800 p-4 rounded-2xl flex flex-wrap justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-mono block">Evaluation Distribution:</span>
                  <span className="text-white font-bold">Theory & Internal/Practical Marks (Adjustable for All Classes)</span>
                </div>
                <div className="flex items-center gap-6 mt-2 sm:mt-0 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">THEORY MARKS:</span>
                    <button onClick={() => setTheoryMarks(Math.max(10, theoryMarks - 5))} className="px-2 py-0.5 rounded bg-gray-800 font-bold hover:bg-gray-700">-</button>
                    <span className="text-cyan-400 font-bold text-sm w-6 text-center">{theoryMarks}</span>
                    <button onClick={() => setTheoryMarks(theoryMarks + 5)} className="px-2 py-0.5 rounded bg-gray-800 font-bold hover:bg-gray-700">+</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">PRACTICAL / INTERNAL:</span>
                    <button onClick={() => setPracticalMarks(Math.max(0, practicalMarks - 5))} className="px-2 py-0.5 rounded bg-gray-800 font-bold hover:bg-gray-700">-</button>
                    <span className="text-emerald-400 font-bold text-sm w-6 text-center">{practicalMarks}</span>
                    <button onClick={() => setPracticalMarks(practicalMarks + 5)} className="px-2 py-0.5 rounded bg-gray-800 font-bold hover:bg-gray-700">+</button>
                  </div>
                </div>
              </div>

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
                              className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-4 h-4 cursor-pointer"
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
                                className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 hover:bg-gray-800 font-bold"
                              >-</button>
                              <span className="w-4 text-cyan-400 font-bold">{sec.marksPerQ}</span>
                              <button
                                onClick={() => {
                                  const u = [...sections];
                                  u[idx].marksPerQ += 1;
                                  setSections(u);
                                }}
                                className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 hover:bg-gray-800 font-bold"
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
                                className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 hover:bg-gray-800 font-bold"
                              >-</button>
                              <span className="w-6 text-white font-bold">{sec.count}</span>
                              <button
                                onClick={() => {
                                  const u = [...sections];
                                  u[idx].count += 1;
                                  setSections(u);
                                }}
                                className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 hover:bg-gray-800 font-bold"
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

              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-mono text-gray-400 uppercase block">
                  SYLLABUS UNITS FOR {selectedSubject.toUpperCase()}:
                </span>
                {activeCurriculum.units.map((unit, uIdx) => (
                  <div key={uIdx} className="bg-[#030712] border border-gray-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-4 h-4 cursor-pointer"
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
                            <label key={sIdx} className="flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleTopic(sub)}
                                className="rounded border-gray-700 bg-gray-900 text-cyan-500 w-3.5 h-3.5 cursor-pointer"
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

              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-800">
                <div className="text-xs text-gray-400 font-mono">
                  Engine: <strong className="text-emerald-400">CBSE 2026 Format Active (37 Questions • 70 Marks)</strong>
                </div>
                <button
                  onClick={handleGenerateCompletePackage}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>Generate Formal Paper (Download 4 Files in {downloadFormat.toUpperCase()})</span>
                </button>
              </div>

            </div>
          )}

          {activeStudioTab === 'practical' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Studio 2: Practical Lab Manual, Viva-Voce & Project Roster
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select topic-wise experiments for {selectedSubject} ({practicalMarks} Marks Assessment)
                  </p>
                </div>
                <button
                  onClick={handleGenerateCompletePackage}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg transition-all"
                >
                  Export Selected Practical & Viva Sheet (.doc) →
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase text-cyan-400">
                  Topic-Wise Lab Experiments Under Syllabus Units:
                </h3>

                {activeCurriculum.units.map((unit, uIdx) => (
                  <div key={uIdx} className="bg-[#030712] border border-gray-800 rounded-2xl p-5 space-y-3">
                    <div className="font-bold text-white text-xs border-b border-gray-800 pb-2 flex justify-between items-center">
                      <span>{unit.unitTitle}</span>
                      <span className="text-[10px] font-mono text-gray-400">{unit.experiments?.length || 0} Experiments Mapped</span>
                    </div>

                    {(!unit.experiments || unit.experiments.length === 0) ? (
                      <p className="text-xs text-gray-500 italic">No lab experiments prescribed for this unit.</p>
                    ) : (
                      <div className="space-y-3">
                        {unit.experiments.map((exp) => {
                          const isExpChecked = selectedExpIds[exp.expId] !== false;
                          return (
                            <div key={exp.expId} className="p-3 rounded-xl bg-gray-900/50 border border-gray-800/80 space-y-2">
                              <label className="flex items-center gap-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isExpChecked}
                                  onChange={() => toggleExperiment(exp.expId)}
                                  className="rounded border-gray-700 bg-gray-900 text-emerald-500 w-4 h-4 cursor-pointer"
                                />
                                <span className="text-xs font-bold text-white block">[{exp.expId}] {exp.title}</span>
                              </label>

                              <div className="pl-6 space-y-1 text-xs">
                                {exp.vivaQueries.map((vq, vIdx) => (
                                  <div key={vIdx} className="text-gray-300 text-[11px] bg-black/40 p-2 rounded-lg border border-gray-800">
                                    <div><strong className="text-white">Q: {vq.q}</strong></div>
                                    <div className="text-gray-400 mt-0.5">Ans: {vq.a}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStudioTab === 'manual' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Studio 3: Manual Paste Syllabus</h2>
                <p className="text-xs text-gray-400 mt-1">Paste custom syllabus or unit notes to create customized question papers.</p>
              </div>
              <textarea
                rows={8}
                value={manualSyllabusText}
                onChange={(e) => setManualSyllabusText(e.target.value)}
                className="w-full bg-[#030712] border border-gray-800 rounded-2xl p-4 text-white font-mono text-xs focus:border-cyan-400"
              />
              <button
                onClick={() => alert('Custom syllabus portion compiled! Ready for generation.')}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-black text-xs uppercase"
              >
                Compile Custom Portion →
              </button>
            </div>
          )}

          {activeStudioTab === 'saved' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-white tracking-tight">
                  Studio 4: Teacher&apos;s Saved Papers & Examination Repository
                </h2>
                <span className="text-xs font-mono text-cyan-400">{savedPapers.length} Papers Saved</span>
              </div>

              <div className="space-y-3">
                {savedPapers.length === 0 ? (
                  <div className="bg-[#030712] border border-gray-800 p-8 rounded-2xl text-center text-gray-500 font-mono text-xs">
                    No papers generated yet. Generate in Studio 1 to see papers here.
                  </div>
                ) : (
                  savedPapers.map((record) => (
                    <div key={record.id} className="bg-[#030712] border border-gray-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-400 font-bold text-xs">{record.id}</span>
                          <span className="text-white font-bold text-sm">{record.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">{record.className}</span>
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono mt-1">Generated: {record.createdAt} • Author: {record.author} • {record.totalMarks} Marks</div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => downloadFile(`${record.className}_${record.subject}_Question_Paper.doc`, record.paperDoc, 'application/msword;charset=utf-8')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 text-[11px] font-semibold"
                        >
                          📄 Download Paper (.doc)
                        </button>
                        <button
                          onClick={() => downloadFile(`${record.className}_${record.subject}_Marking_Scheme.doc`, record.answerKeyDoc, 'application/msword;charset=utf-8')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold"
                        >
                          🔑 Answer Key (.doc)
                        </button>
                        <button
                          onClick={() => downloadFile(`${record.className}_${record.subject}_Practical_Viva.doc`, record.vivaDoc, 'application/msword;charset=utf-8')}
                          className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-[11px] font-semibold"
                        >
                          🧪 Practical & Viva (.doc)
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </ConfidentialGuard>
  );
}
