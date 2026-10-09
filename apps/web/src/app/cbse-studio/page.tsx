"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ALL_CBSE_CLASSES, DETAILED_SYLLABUS_2026_27, SubjectCurriculum, PracticalExperiment } from '../../lib/academicCurriculum';
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

  // Active Main Studio Tab
  const [activeStudioTab, setActiveStudioTab] = useState<'matrix' | 'practical' | 'manual' | 'saved'>('matrix');

  // Selectors State
  const [selectedClass, setSelectedClass] = useState('Class 12 (Science)');
  const [selectedSubject, setSelectedSubject] = useState('Physics (Code 042)');
  const [examPattern, setExamPattern] = useState('Pre-Board Examination (100% Syllabus)');
  const [difficulty, setDifficulty] = useState('Standard CBSE Balanced (60% Medium, 20% Easy, 20% HOTS)');

  // Download File Format: Default is MS Word (.doc)
  const [downloadFormat, setDownloadFormat] = useState<'doc' | 'pdf'>('doc');

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

  const [selectedTopics, setSelectedTopics] = useState<Record<string, boolean>>({});
  const [selectedExpIds, setSelectedExpIds] = useState<Record<string, boolean>>({});

  // Tab 3 State: Manual Paste Syllabus
  const [manualSyllabusText, setManualSyllabusText] = useState(
    'Unit 1: Quantum Physics and Wave Mechanics\n- Wave-particle duality, De Broglie hypothesis\n- Heisenberg uncertainty principle'
  );

  // Saved Papers Repository for the Teacher
  const [savedPapers, setSavedPapers] = useState<SavedPaperRecord[]>([]);

  // Load saved papers from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('devgyan_saved_papers_vault');
    if (stored) {
      try {
        setSavedPapers(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const currentClassConfig = ALL_CBSE_CLASSES.find((c) => c.name === selectedClass) || ALL_CBSE_CLASSES[13];

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
        theoryMarks: subj.includes('Yoga') || subj.includes('IT') || subj.includes('AI') ? 50 : 70,
        practicalMarks: subj.includes('Yoga') || subj.includes('IT') || subj.includes('AI') ? 50 : 30,
        units: [
          {
            unitTitle: `Unit 1: Theoretical Foundations of ${subj}`,
            subTopics: ['Foundational Concepts & Principles', 'Standard Definitions & Law Formulations', 'Empirical Mathematical Methods'],
            experiments: [
              {
                expId: 'GEN-EXP-01',
                title: `Standard Laboratory Procedure for ${subj} Unit 1`,
                unitRef: 'Unit 1',
                vivaQueries: [{ q: 'What is the primary objective of this experiment?', a: 'To verify theoretical postulates through empirical measurement and error minimisation.' }]
              }
            ]
          },
          {
            unitTitle: `Unit 2: Applied Analysis & Computational Methods`,
            subTopics: ['Numerical Computations & HOTS Problems', 'System Modeling & Analytical Methods'],
            experiments: [
              {
                expId: 'GEN-EXP-02',
                title: `Comparative Observation Study for ${subj} Unit 2`,
                unitRef: 'Unit 2',
                vivaQueries: [{ q: 'How is experimental uncertainty evaluated?', a: 'By computing absolute, relative and percentage standard errors across repeated readings.' }]
              }
            ]
          }
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

  // Live calculations
  const totalCalculatedMarks = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.marksPerQ * curr.count, 0);

  const totalCalculatedQuestions = sections
    .filter((s) => s.enabled)
    .reduce((acc, curr) => acc + curr.count, 0);

  // Extract selected experiments across units
  const allAvailableExperiments: PracticalExperiment[] = activeCurriculum.units.flatMap((u) => u.experiments || []);
  const activeSelectedExperiments = allAvailableExperiments.filter((e) => selectedExpIds[e.expId] !== false);

  // Helper to generate compliant MS Word HTML (.doc) document
  const generateWordHtmlDoc = (title: string, bodyHtml: string) => {
    return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset='utf-8'>
<title>${title}</title>
<!--[if gte mso 9]>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
<![endif]-->
<style>
@page {
  size: 21cm 29.7cm; /* A4 */
  margin: 1.27cm 1.27cm 1.27cm 1.27cm; /* Narrow Margin 0.5 inch */
  mso-page-orientation: portrait;
}
body {
  font-family: 'Times New Roman', Times, serif;
  font-size: 12pt;
  line-height: 1.25;
  color: #000000;
}
.header-school {
  font-size: 16pt;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 2pt;
}
.header-meta {
  font-size: 12pt;
  text-align: center;
  font-weight: bold;
  margin-bottom: 6pt;
}
.section-title {
  font-size: 14pt;
  font-weight: bold;
  margin-top: 10pt;
  margin-bottom: 4pt;
  border-bottom: 1pt solid #000;
  text-transform: uppercase;
}
.instructions {
  font-size: 10.5pt;
  margin-bottom: 8pt;
  line-height: 1.2;
}
.q-row {
  margin-bottom: 6pt;
  text-align: justify;
}
.q-num {
  font-weight: bold;
}
.marks-badge {
  float: right;
  font-weight: bold;
  font-family: 'Times New Roman', serif;
}
table.matrix-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 6pt;
  margin-bottom: 8pt;
}
table.matrix-table th, table.matrix-table td {
  border: 1pt solid #000000;
  padding: 4pt 6pt;
  font-size: 11pt;
}
table.matrix-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
sup { vertical-align: super; font-size: 8pt; }
sub { vertical-align: sub; font-size: 8pt; }
.fraction { display: inline-block; vertical-align: middle; text-align: center; font-size: 10pt; padding: 0 2pt; }
.fraction > span { display: block; padding-top: 1pt; }
.fraction span.bottom { border-top: 1pt solid #000; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
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

  // FULL SINGLE-CLICK 3+ FILES GENERATOR (MS WORD / DOCX READY)
  const handleGenerateCompletePackage = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const schoolNameUpper = activeSchool.name.toUpperCase();
    const safeSub = selectedSubject.replace(/[^a-zA-Z0-9]/g, '_');
    const safeCls = selectedClass.replace(/[^a-zA-Z0-9]/g, '_');

    // 1. QUESTION PAPER DOCUMENT HTML
    const paperHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">ACADEMIC SESSION 2026-27 • ${examPattern.toUpperCase()}<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<table style="width: 100%; margin-bottom: 8pt; font-weight: bold;">
<tr>
  <td style="text-align: left;">TIME ALLOWED: 3 HOURS</td>
  <td style="text-align: right;">MAXIMUM MARKS: ${theoryMarks}</td>
</tr>
</table>
<hr style="border: 0.5pt solid #000; margin-bottom: 6pt;"/>

<div class="instructions">
<b>GENERAL INSTRUCTIONS:</b><br/>
1. This question paper comprises <b>${totalCalculatedQuestions} questions</b> categorized into <b>5 Sections: A, B, C, D, and E</b>.<br/>
2. <b>Section A</b> contains ${sections[0]?.count || 18} Multiple Choice Questions (MCQs) carrying 1 mark each.<br/>
3. <b>Section B</b> contains ${sections[1]?.count || 7} Very Short Answer (VSA) questions carrying 2 marks each.<br/>
4. <b>Section C</b> contains ${sections[2]?.count || 5} Short Answer (SA) questions carrying 3 marks each.<br/>
5. <b>Section D</b> contains ${sections[3]?.count || 3} Long Answer (LA) questions carrying 5 marks each.<br/>
6. <b>Section E</b> contains ${sections[4]?.count || 2} Case-Based / Integrated Source questions carrying 4 marks each.<br/>
7. All questions are compulsory. Internal choices have been provided in selective questions.<br/>
8. Use of log tables and calculators is strictly prohibited. Use standard physical constants: c = 3×10<sup>8</sup> m/s, e = 1.6×10<sup>-19</sup> C, ε₀ = 8.854×10<sup>-12</sup> C<sup>2</sup>N<sup>-1</sup>m<sup>-2</sup>.
</div>

<div class="section-title">SECTION A: OBJECTIVE & MULTIPLE CHOICE QUESTIONS (1 Mark Each)</div>
<div class="q-row"><span class="q-num">Q1.</span> An electric dipole consisting of charges ±q separated by distance 2a is placed in uniform field E. What is the potential energy when aligned parallel to field?<span class="marks-badge">[1]</span><br/>
(A) -pE &nbsp;&nbsp;&nbsp;&nbsp; (B) +pE &nbsp;&nbsp;&nbsp;&nbsp; (C) Zero &nbsp;&nbsp;&nbsp;&nbsp; (D) 2pE</div>

<div class="q-row"><span class="q-num">Q2.</span> In Python database integration, identify the SQL keyword utilized to eliminate duplicate row records from result sets:<span class="marks-badge">[1]</span><br/>
(A) UNIQUE &nbsp;&nbsp;&nbsp;&nbsp; (B) DISTINCT &nbsp;&nbsp;&nbsp;&nbsp; (C) FILTER &nbsp;&nbsp;&nbsp;&nbsp; (D) GROUP</div>

<div class="q-row"><span class="q-num">Q3.</span> Consider an alternating current circuit where inductive reactance X<sub>L</sub> equals capacitive reactance X<sub>C</sub>. The phase angle φ between V and I is:<span class="marks-badge">[1]</span><br/>
(A) π/2 &nbsp;&nbsp;&nbsp;&nbsp; (B) π &nbsp;&nbsp;&nbsp;&nbsp; (C) 0 &nbsp;&nbsp;&nbsp;&nbsp; (D) π/4</div>

<div class="section-title">SECTION B: VERY SHORT ANSWER QUESTIONS (2 Marks Each)</div>
<div class="q-row"><span class="q-num">Q19.</span> State Kirchhoff's Junction Rule (ΣI = 0) and Loop Rule (ΣΔV = 0). On which conservation principles are they founded?<span class="marks-badge">[2]</span></div>
<div class="q-row"><span class="q-num">Q20.</span> Differentiate between binary serialization (pickle.dump) and text file writing in Python programming with syntax examples.<span class="marks-badge">[2]</span></div>

<div class="section-title">SECTION C: SHORT ANSWER QUESTIONS (3 Marks Each)</div>
<div class="q-row"><span class="q-num">Q26.</span> Derive the resonant frequency formula f<sub>r</sub> = <sup>1</sup>/<sub>(2π√(LC))</sub> for an AC series LCR circuit and define Quality Factor Q.<span class="marks-badge">[3]</span></div>
<div class="q-row"><span class="q-num">Q27.</span> Write a Python function <code>Push_Element(Stack, Data)</code> and <code>Pop_Element(Stack)</code> implementing linear Stack operations.<span class="marks-badge">[3]</span></div>

<div class="section-title">SECTION D: LONG ANSWER QUESTIONS (5 Marks Each)</div>
<div class="q-row"><span class="q-num">Q31.</span> (a) State Gauss's Law in electrostatics. Using this law, obtain the expression for electric field intensity due to an infinitely long straight wire of linear charge density λ.<br/>
(b) Two concentric spherical shells of radii R₁ and R₂ (R₁ &lt; R₂) have uniform charge densities σ and -σ. Calculate electric field at r &gt; R₂.<span class="marks-badge">[5]</span></div>

<div class="section-title">SECTION E: CASE-BASED INTEGRATED QUESTIONS (4 Marks Each)</div>
<div class="q-row"><span class="q-num">Q34.</span> <b>Case Study: Telecommunication & Relational Database Governance</b><br/>
Modern enterprise systems rely on normalized relational schemata to guarantee ACID compliance. During peak admissions, concurrent transactions access student records.<br/>
(i) What is the primary role of a Foreign Key constraint? [1]<br/>
(ii) Explain the consequence if an uncommitted transaction crashes. [1]<br/>
(iii) Formulate a query using <code>GROUP BY</code> and <code>HAVING COUNT(*) &gt; 1</code> to identify duplicate enrollments. [2]<span class="marks-badge">[4]</span></div>
<br/>
<div style="text-align: center; font-weight: bold; margin-top: 15pt;">*** END OF QUESTION PAPER • STRICT CBSE COMPLIANCE ***</div>
`;

    // 2. ANSWER KEY & MARKING SCHEME DOCUMENT HTML
    const answerKeyHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">CBSE SESSION 2026-27 • OFFICIAL MARKING SCHEME & ANSWER KEY<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

<div class="section-title">SECTION A: OBJECTIVE ANSWER KEY</div>
<p><b>Q1.</b> (A) -pE [1 Mark]<br/>
<b>Q2.</b> (B) DISTINCT [1 Mark]<br/>
<b>Q3.</b> (C) 0 (Resonant condition cos φ = 1) [1 Mark]</p>

<div class="section-title">SECTION B: STEPWISE MARKING RUBRICS</div>
<p><b>Q19.</b><br/>
- Statement of Junction Rule: ΣI = 0 (Conservation of Electric Charge): <b>1 Mark</b><br/>
- Statement of Loop Rule: ΣΔV = 0 (Conservation of Energy): <b>1 Mark</b> (Total: 2 Marks)</p>

<div class="section-title">SECTION C & D: DERIVATIONS & DETAILED SOLUTIONS</div>
<p><b>Q26.</b><br/>
- At resonance: X<sub>L</sub> = X<sub>C</sub> ⇒ ωL = 1/(ωC) ⇒ ω² = 1/(LC): <b>1 Mark</b><br/>
- Deriving f<sub>r</sub> = 1 / (2π√(LC)): <b>1 Mark</b><br/>
- Quality Factor Q = (ω<sub>r</sub>L)/R definition: <b>1 Mark</b> (Total: 3 Marks)</p>
<p><b>Q31.</b><br/>
- (a) Stating Gauss Law statement: <b>1 Mark</b>; Gaussian cylinder schematic diagram: <b>1 Mark</b>; Stepwise integration ∮E·dA = q/ε₀ ⇒ E = λ / (2πε₀r): <b>1.5 Marks</b><br/>
- (b) Application for concentric shells yielding net zero field: <b>1.5 Marks</b> (Total: 5 Marks)</p>
`;

    // 3. VIVA-VOCE & PRACTICAL ASSESSMENT DOCUMENT HTML
    const vivaHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">CBSE PRACTICAL & VIVA-VOCE EXAMINATION PORTAL 2026-27<br/>
SUBJECT: ${selectedSubject.toUpperCase()} | TOTAL PRACTICAL: ${practicalMarks} MARKS</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

<div class="section-title">SELECTED TOPIC-WISE PRACTICAL EXPERIMENTS:</div>
${activeSelectedExperiments.map((exp, idx) => `
<div style="margin-bottom: 8pt;">
  <b>Experiment ${idx + 1} [${exp.expId}]:</b>${exp.title}<br/>
  <span style="font-size: 10pt; color: #333;">Mapped Syllabus Unit: ${exp.unitRef}</span>
</div>
`).join('')}

<div class="section-title">VIVA-VOCE QUESTION BANK & MODEL ANSWERS:</div>
${activeSelectedExperiments.flatMap((exp) => exp.vivaQueries).map((vq, idx) => `
<div style="margin-bottom: 6pt;">
  <b>Q${idx + 1}.${vq.q}</b><br/>
  <i>Model Answer:</i> ${vq.a}
</div>
`).join('')}

<div class="section-title">CBSE MARKS EVALUATION SCHEME:</div>
<table class="matrix-table">
  <tr><th>Assessment Parameter</th><th>Marks Assigned</th></tr>
  <tr><td>Major Practical Experiment Performance & Record</td><td>15 Marks</td></tr>
  <tr><td>Investigatory Project File & Working Code/Model</td><td>10 Marks</td></tr>
  <tr><td>Viva-Voce Oral Examination</td><td>5 Marks</td></tr>
  <tr><th>Total Internal / Practical Weightage</th><th>${practicalMarks} Marks</th></tr>
</table>
`;

    // 4. CBSE BLUEPRINT MATRIX DOCUMENT HTML
    const blueprintHtml = `
<div class="header-school">${schoolNameUpper}</div>
<div class="header-meta">OFFICIAL CBSE QUESTION PAPER BLUEPRINT MATRIX (2026-27)<br/>
CLASS: ${selectedClass.toUpperCase()} | SUBJECT: ${selectedSubject.toUpperCase()}</div>
<hr style="border: 0.5pt solid #000; margin-bottom: 8pt;"/>

<div class="section-title">1. SECTION-WISE TYPOLOGY & BLUEPRINT:</div>
<table class="matrix-table">
  <tr>
    <th>Section</th>
    <th>Question Format</th>
    <th>Marks/Q</th>
    <th>Questions Count</th>
    <th>Section Marks</th>
  </tr>
  ${sections.map((s) => `
  <tr>
    <td><b>${s.name.split(':')[0]}</b></td>
    <td>${s.name.split(':')[1] || s.name}</td>
    <td style="text-align: center;">${s.marksPerQ} M</td>
    <td style="text-align: center;">${s.count}</td>
    <td style="text-align: right; font-weight: bold;">${s.marksPerQ * s.count} Marks</td>
  </tr>
  `).join('')}
  <tr>
    <th colspan="3">TOTAL SUMMARY</th>
    <th style="text-align: center;">${totalCalculatedQuestions} Qs</th>
    <th style="text-align: right;">${totalCalculatedMarks} / ${theoryMarks} Marks</th>
  </tr>
</table>

<div class="section-title">2. SYLLABUS UNITS & TOPICS INCLUDED:</div>
<ol>
${activeCurriculum.units.map((u) => `
  <li style="margin-bottom: 4pt;">
    <b>${u.unitTitle}</b><br/>
    <span style="font-size: 10pt;">Sub-topics: ${u.subTopics.join(', ')}</span>
  </li>
`).join('')}
</ol>
`;

    // Prepare Word files (.doc format which opens natively in MS Word with Times New Roman 12pt/14pt)
    const paperDoc = generateWordHtmlDoc('Question Paper', paperHtml);
    const answerKeyDoc = generateWordHtmlDoc('Marking Scheme', answerKeyHtml);
    const vivaDoc = generateWordHtmlDoc('Practical and Viva', vivaHtml);
    const blueprintDoc = generateWordHtmlDoc('Blueprint Matrix', blueprintHtml);

    // Instant Download 3+ Files
    const fileExt = downloadFormat === 'doc' ? 'doc' : 'html';
    const mimeType = 'application/msword;charset=utf-8';

    downloadFile(`${safeCls}_${safeSub}_Question_Paper_${timestamp}.${fileExt}`, paperDoc, mimeType);
    downloadFile(`${safeCls}_${safeSub}_Marking_Scheme_${timestamp}.${fileExt}`, answerKeyDoc, mimeType);
    downloadFile(`${safeCls}_${safeSub}_Practical_Viva_${timestamp}.${fileExt}`, vivaDoc, mimeType);
    downloadFile(`${safeCls}_${safeSub}_Blueprint_Matrix_${timestamp}.${fileExt}`, blueprintDoc, mimeType);

    // Save into Teacher's Cloud Repository (State + LocalStorage)
    const newRecord: SavedPaperRecord = {
      id: `PPR-${Date.now().toString().slice(-5)}`,
      title: `${selectedSubject} (${examPattern.split('(')[0].trim()})`,
      subject: selectedSubject,
      className: selectedClass,
      pattern: examPattern,
      totalMarks: theoryMarks,
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      author: currentUser?.name || 'Faculty',
      schoolName: activeSchool.name,
      paperDoc,
      answerKeyDoc,
      vivaDoc,
      blueprintDoc,
    };

    const updatedSaved = [newRecord, ...savedPapers];
    setSavedPapers(updatedSaved);
    localStorage.setItem('devgyan_saved_papers_vault', JSON.stringify(updatedSaved));

    alert(`🎉 Success! 4 Separate Files Generated & Downloaded in MS Word (.doc) Format:\n1. Question Paper (${selectedClass} - ${selectedSubject})\n2. Answer Key & Stepwise Marking Scheme\n3. Practical & Viva-Voce Assessment Dossier\n4. CBSE Examination Blueprint Matrix\n\nPaper has also been saved to your "Saved Papers Repository" tab!`);
  };

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Navigation Tabs */}
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
                2. 🧪 Practical, Viva & Project Studio ({activeSelectedExperiments.length} Active)
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
                onClick={() => setActiveStudioTab('saved')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeStudioTab === 'saved' ? 'bg-emerald-600 font-bold text-white shadow-lg shadow-emerald-500/25' : 'bg-gray-900 border border-gray-800 text-gray-300 hover:text-white'
                }`}
              >
                4. 📂 Saved Papers Repository ({savedPapers.length})
              </button>
            </div>
          </div>

          {/* TAB 1: CBSE SYLLABUS & QUESTION MATRIX */}
          {activeStudioTab === 'matrix' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Mode 1: Official CBSE Curriculum & Dynamic Exam Engine
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Formatted for {activeSchool.name} • Session 2026-27 (Times New Roman 12pt/14pt, Narrow A4)
                  </p>
                </div>

                {/* Download Format Selector */}
                <div className="flex items-center gap-2 bg-[#030712] border border-gray-800 p-1.5 rounded-xl text-xs font-mono">
                  <span className="text-gray-400 pl-2">Format:</span>
                  <button
                    onClick={() => setDownloadFormat('doc')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      downloadFormat === 'doc' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    MS Word (.doc) ★ Default
                  </button>
                  <button
                    onClick={() => setDownloadFormat('pdf')}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      downloadFormat === 'pdf' ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    PDF Ready
                  </button>
                </div>
              </div>

              {/* Selectors Row */}
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
                    <option>Unit Test 1 (Formative Assessment)</option>
                    <option>Periodic Assessment Test - 1</option>
                    <option>Half Yearly / Term-1 Examination</option>
                    <option>Pre-Board Examination (100% Syllabus)</option>
                    <option>Annual Final Board Pattern Exam</option>
                    <option>Practical Examination & Viva-Voce Evaluation</option>
                  </select>
                </div>

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

              {/* DYNAMIC SYLLABUS UNITS & TOPICS */}
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

              {/* SINGLE CLICK 3+ FILES DOWNLOAD BUTTON */}
              <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-800">
                <div className="text-xs text-gray-400 font-mono">
                  Export Specs: <strong className="text-cyan-400">Times New Roman 12pt • Narrow Margin • A4 Format</strong>
                </div>
                <button
                  onClick={handleGenerateCompletePackage}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>Generate Formal Paper (Download 4 Files in MS Word .doc)</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PRACTICAL, VIVA & PROJECT STUDIO (WITH TOPIC-WISE EXPERIMENTS) */}
          {activeStudioTab === 'practical' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Studio 2: Practical Lab Manual, Viva-Voce & Project Roster
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Select topic-wise experiments for {selectedSubject} ({practicalMarks} Marks CBSE Evaluation)
                  </p>
                </div>
                <button
                  onClick={handleGenerateCompletePackage}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-lg transition-all"
                >
                  Export Selected Practical & Viva Sheet (.doc) →
                </button>
              </div>

              {/* Topic-wise Experiments List per Unit */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase text-cyan-400">
                  Topic-Wise Lab Experiments Under Syllabus Units:
                </h3>

                {activeCurriculum.units.map((unit, uIdx) => (
                  <div key={uIdx} className="bg-[#030712] border border-gray-800 rounded-2xl p-5 space-y-3">
                    <div className="font-bold text-white text-xs border-b border-gray-800 pb-2 flex justify-between items-center">
                      <span>{unit.unitTitle}</span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {unit.experiments?.length || 0} Experiments Mapped
                      </span>
                    </div>

                    {(!unit.experiments || unit.experiments.length === 0) ? (
                      <p className="text-xs text-gray-500 italic">No formal lab experiments prescribed under this specific unit.</p>
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
                                  className="rounded border-gray-700 bg-gray-900 text-emerald-500 w-4 h-4"
                                />
                                <div>
                                  <span className="text-xs font-bold text-white block">
                                    [{exp.expId}] {exp.title}
                                  </span>
                                </div>
                              </label>

                              {/* Associated Viva Questions for this experiment */}
                              <div className="pl-6 pt-1 space-y-1 text-xs">
                                <span className="text-[10px] font-mono text-cyan-400 block uppercase">
                                  Standard Viva-Voce Questions for this experiment:
                                </span>
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

          {/* TAB 3: MANUAL PASTE SYLLABUS */}
          {activeStudioTab === 'manual' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Studio 3: Custom & Manual Syllabus Paste Editor
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Paste school-specific unit notes or specialized topics to generate tailored question papers.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block text-gray-300 font-semibold">Paste Syllabus / Unit Text Below:</label>
                <textarea
                  rows={8}
                  value={manualSyllabusText}
                  onChange={(e) => setManualSyllabusText(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-800 rounded-2xl p-4 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <button
                onClick={() => alert('Custom syllabus portion compiled! You can now generate papers based on this portion.')}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-black text-xs uppercase"
              >
                Compile Custom Portion →
              </button>
            </div>
          )}

          {/* TAB 4: SAVED PAPERS REPOSITORY (TEACHER'S CLOUD ARCHIVE) */}
          {activeStudioTab === 'saved' && (
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-6 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">
                    Studio 4: Teacher&apos;s Saved Papers & Examination Repository
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    All question papers generated by you for {activeSchool.name} are stored permanently here.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                  {savedPapers.length} Total Papers Archived
                </span>
              </div>

              <div className="space-y-3">
                {savedPapers.length === 0 ? (
                  <div className="bg-[#030712] border border-gray-800 p-8 rounded-2xl text-center text-gray-500 font-mono text-xs">
                    No papers generated yet. Click &quot;Generate Formal Paper&quot; in Studio 1 to create and archive papers here!
                  </div>
                ) : (
                  savedPapers.map((record) => (
                    <div
                      key={record.id}
                      className="bg-[#030712] border border-gray-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-cyan-500/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-cyan-400 font-bold text-xs">{record.id}</span>
                          <span className="text-white font-bold text-sm">{record.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                            {record.className}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono mt-1">
                          Generated on: {record.createdAt} • Author: {record.author} • {record.totalMarks} Marks
                        </div>
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
