"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface ExamSchedule {
  id: string;
  examName: string;
  classLevel: string;
  subject: string;
  subjectCode: string;
  date: string;
  timeSlot: string;
  roomHall: string;
  invigilator: string;
  maxMarks: number;
}

interface StudentExamResult {
  rollNo: string;
  studentId: string;
  studentName: string;
  classLevel: string;
  section: string;
  marks: {
    subject: string;
    code: string;
    theory: number;
    practical: number;
    maxTheory: number;
    maxPractical: number;
  }[];
  attendance: string;
}

const initialSchedules: ExamSchedule[] = [
  { id: 'EX-2026-101', examName: 'Mid-Term Assessment 2026', classLevel: 'Class 12', subject: 'Physics', subjectCode: '042', date: '2026-10-12', timeSlot: '09:00 AM - 12:00 PM', roomHall: 'Exam Hall A', invigilator: 'Dr. Rajesh Sharma', maxMarks: 100 },
  { id: 'EX-2026-102', examName: 'Mid-Term Assessment 2026', classLevel: 'Class 12', subject: 'Chemistry', subjectCode: '043', date: '2026-10-14', timeSlot: '09:00 AM - 12:00 PM', roomHall: 'Exam Hall A', invigilator: 'Kavita Sundaram', maxMarks: 100 },
  { id: 'EX-2026-103', examName: 'Mid-Term Assessment 2026', classLevel: 'Class 12', subject: 'Mathematics', subjectCode: '041', date: '2026-10-16', timeSlot: '09:00 AM - 12:00 PM', roomHall: 'Exam Hall B', invigilator: 'Pooja Bhatt', maxMarks: 100 },
  { id: 'EX-2026-104', examName: 'Mid-Term Assessment 2026', classLevel: 'Class 12', subject: 'Computer Science', subjectCode: '083', date: '2026-10-19', timeSlot: '09:00 AM - 12:00 PM', roomHall: 'CS Lab 01', invigilator: 'Alok Verma', maxMarks: 100 },
  { id: 'EX-2026-105', examName: 'Mid-Term Assessment 2026', classLevel: 'Class 10', subject: 'Mathematics Standard', subjectCode: '041', date: '2026-10-13', timeSlot: '09:00 AM - 12:00 PM', roomHall: 'Hall C', invigilator: 'Manoj Joshi', maxMarks: 100 },
];

const initialResults: StudentExamResult[] = [
  {
    rollNo: '1201',
    studentId: 'DG-2026-002',
    studentName: 'Ananya Verma',
    classLevel: 'Class 12',
    section: 'Science',
    attendance: '98%',
    marks: [
      { subject: 'Physics', code: '042', theory: 62, practical: 28, maxTheory: 70, maxPractical: 30 },
      { subject: 'Chemistry', code: '043', theory: 58, practical: 29, maxTheory: 70, maxPractical: 30 },
      { subject: 'Mathematics', code: '041', theory: 74, practical: 19, maxTheory: 80, maxPractical: 20 },
      { subject: 'Computer Science', code: '083', theory: 66, practical: 30, maxTheory: 70, maxPractical: 30 },
      { subject: 'English Core', code: '301', theory: 72, practical: 18, maxTheory: 80, maxPractical: 20 },
    ],
  },
  {
    rollNo: '1001',
    studentId: 'DG-2026-001',
    studentName: 'Aarav Sharma',
    classLevel: 'Class 10',
    section: 'A',
    attendance: '95%',
    marks: [
      { subject: 'Mathematics Standard', code: '041', theory: 72, practical: 18, maxTheory: 80, maxPractical: 20 },
      { subject: 'Science', code: '086', theory: 68, practical: 19, maxTheory: 80, maxPractical: 20 },
      { subject: 'Social Science', code: '087', theory: 70, practical: 19, maxTheory: 80, maxPractical: 20 },
      { subject: 'English Lang & Lit', code: '184', theory: 74, practical: 18, maxTheory: 80, maxPractical: 20 },
      { subject: 'Artificial Intelligence', code: '417', theory: 46, practical: 48, maxTheory: 50, maxPractical: 50 },
    ],
  },
  {
    rollNo: '1104',
    studentId: 'DG-2026-004',
    studentName: 'Ishita Joshi',
    classLevel: 'Class 11',
    section: 'Commerce',
    attendance: '92%',
    marks: [
      { subject: 'Accountancy', code: '055', theory: 65, practical: 18, maxTheory: 80, maxPractical: 20 },
      { subject: 'Business Studies', code: '054', theory: 69, practical: 19, maxTheory: 80, maxPractical: 20 },
      { subject: 'Economics', code: '030', theory: 63, practical: 18, maxTheory: 80, maxPractical: 20 },
      { subject: 'Applied Mathematics', code: '241', theory: 55, practical: 17, maxTheory: 80, maxPractical: 20 },
      { subject: 'English Core', code: '301', theory: 71, practical: 18, maxTheory: 80, maxPractical: 20 },
    ],
  },
];

export default function ExamManagementPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'datesheet' | 'results' | 'grading' | 'hallticket'>('datesheet');
  const [schedules, setSchedules] = useState<ExamSchedule[]>(initialSchedules);
  const [results, setResults] = useState<StudentExamResult[]>(initialResults);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewingReportCard, setViewingReportCard] = useState<StudentExamResult | null>(null);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);

  // New Schedule State
  const [newSchedule, setNewSchedule] = useState({
    examName: 'Mid-Term Assessment 2026',
    classLevel: 'Class 12',
    subject: 'Biology',
    subjectCode: '044',
    date: '2026-10-21',
    timeSlot: '09:00 AM - 12:00 PM',
    roomHall: 'Hall A',
    invigilator: 'Dr. Rajesh Sharma',
  });

  // Helper grading formula
  const getGrade = (percentage: number) => {
    if (percentage >= 91) return { grade: 'A1', point: '10.0' };
    if (percentage >= 81) return { grade: 'A2', point: '9.0' };
    if (percentage >= 71) return { grade: 'B1', point: '8.0' };
    if (percentage >= 61) return { grade: 'B2', point: '7.0' };
    if (percentage >= 51) return { grade: 'C1', point: '6.0' };
    if (percentage >= 41) return { grade: 'C2', point: '5.0' };
    if (percentage >= 33) return { grade: 'D', point: '4.0' };
    return { grade: 'E (Needs Imp.)', point: '0.0' };
  };

  const calculateStudentOverall = (student: StudentExamResult) => {
    let obtained = 0;
    let max = 0;
    student.marks.forEach((m) => {
      obtained += m.theory + m.practical;
      max += m.maxTheory + m.maxPractical;
    });
    const percentage = Math.round((obtained / max) * 100);
    return { obtained, max, percentage, ...getGrade(percentage) };
  };

  const filteredSchedules = schedules.filter((s) => {
    const matchesClass = selectedClass === 'All' || s.classLevel === selectedClass;
    const matchesSearch = s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subjectCode.includes(searchTerm) ||
      s.invigilator.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ExamSchedule = {
      id: `EX-2026-${100 + schedules.length + 1}`,
      ...newSchedule,
      maxMarks: 100,
    };
    setSchedules([...schedules, created]);
    setShowAddScheduleModal(false);
    alert('Exam paper scheduled and notification sent to students & parents!');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Tenant Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 06 • ACADEMIC EVALUATION & CONTROLLER
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Examination & Marksheet Engine</h1>
            <p className="text-gray-400 text-sm mt-1">
              Autonomous datesheet creator, CBSE grading rubrics, marks registers & tamper-proof printable report cards.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddScheduleModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Schedule New Exam Paper
            </button>
          </div>
        </div>

        {/* Analytic Examination KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Scheduled Exam Papers</span>
            <div className="text-2xl font-black text-white mt-1">{schedules.length} Papers</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">Mid-Term Cycle 2026</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Evaluated Report Cards</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">2,410 Generated</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">100% CBSE Rubrics Mapped</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Class Average Pass Rate</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">94.6%</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Standard Normal Bell Curve</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Invigilator Duty Allocated</span>
            <div className="text-2xl font-black text-amber-400 mt-1">42 Faculty</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Zero Room Overlaps</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('datesheet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'datesheet' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📅 Date Sheet & Seating Timetable ({schedules.length})
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'results' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📊 Marks Registers & Report Cards ({results.length})
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'grading' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚖️ CBSE Grading Rubrics Scale
          </button>
          <button
            onClick={() => setActiveTab('hallticket')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'hallticket' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🎟️ Digital Hall Ticket Desk
          </button>
        </div>

        {/* TAB 1: DATESHEET & TIMETABLE */}
        {activeTab === 'datesheet' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search subject, paper code, or invigilator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Classes</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Showing <span className="text-cyan-400 font-bold">{filteredSchedules.length}</span> scheduled sessions
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Exam ID / Subject</th>
                    <th className="py-3.5 px-4">Class</th>
                    <th className="py-3.5 px-4">Date & Time Slot</th>
                    <th className="py-3.5 px-4">Seating Room / Hall</th>
                    <th className="py-3.5 px-4">Appointed Invigilator</th>
                    <th className="py-3.5 px-4">Max Weightage</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredSchedules.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{s.subject}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{s.id} • Code {s.subjectCode}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300">{s.classLevel}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <div className="text-white">{s.date}</div>
                        <div className="text-gray-400 text-[10px]">{s.timeSlot}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300">{s.roomHall}</td>
                      <td className="py-3 px-4 text-gray-300">{s.invigilator}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400 font-semibold">{s.maxMarks} Marks</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                          Scheduled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: MARKS REGISTERS & REPORT CARDS */}
        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-300">
                Official Marks Evaluation Register • Click "Generate Progress Report" for printable student marksheet.
              </span>
              <button onClick={() => alert('All Marksheets batch exported to PDF.')} className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-cyan-300">
                📥 Batch Download All
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Roll No / Student</th>
                    <th className="py-3.5 px-4">Class & Section</th>
                    <th className="py-3.5 px-4">Subjects Evaluated</th>
                    <th className="py-3.5 px-4">Total Aggregate</th>
                    <th className="py-3.5 px-4">Percentage</th>
                    <th className="py-3.5 px-4">CBSE Grade</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {results.map((res) => {
                    const stats = calculateStudentOverall(res);
                    return (
                      <tr key={res.studentId} className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="text-white font-semibold">{res.studentName}</div>
                          <div className="text-[11px] font-mono text-cyan-400">Roll: {res.rollNo} • {res.studentId}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{res.classLevel} - {res.section}</td>
                        <td className="py-3 px-4 font-mono text-gray-400 text-xs">{res.marks.length} Subjects</td>
                        <td className="py-3 px-4 font-mono text-white font-bold">
                          {stats.obtained} / {stats.max}
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-400 font-bold text-sm">
                          {stats.percentage}%
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            {stats.grade} (GP: {stats.point})
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setViewingReportCard(res)}
                            className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20"
                          >
                            📄 Progress Report
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GRADING RUBRICS SCALE */}
        {activeTab === 'grading' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">CBSE 9-Point Grading Scale Matrix</h3>
              <p className="text-xs text-gray-400">Harmonized evaluation scheme used for automatic report card generation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-emerald-400 font-bold text-sm">A1 & A2 (Top Band)</div>
                <div className="text-gray-300">91% - 100% : Grade A1 (Grade Point 10.0)</div>
                <div className="text-gray-400">81% - 90% : Grade A2 (Grade Point 9.0)</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-cyan-400 font-bold text-sm">B1 & B2 (Proficient)</div>
                <div className="text-gray-300">71% - 80% : Grade B1 (Grade Point 8.0)</div>
                <div className="text-gray-400">61% - 70% : Grade B2 (Grade Point 7.0)</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-amber-400 font-bold text-sm">C1 to D (Passing Band)</div>
                <div className="text-gray-300">51% - 60% : Grade C1 (Grade Point 6.0)</div>
                <div className="text-gray-400">33% - 50% : Grade C2 / D (Passing Threshold)</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DIGITAL HALL TICKET DESK */}
        {activeTab === 'hallticket' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Digital Admit Card / Hall Ticket Generator</h3>
            <p className="text-xs text-gray-400">
              Students and parents can download cryptographically verified examination passes directly via mobile app.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">Class 12 Board Mock Admit Passes</div>
                  <div className="text-xs text-gray-400">Center: Arden Campus • Hall A & B</div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-2">Status: 148 Generated & Dispatched</div>
                </div>
                <button onClick={() => alert('Sample Admit Card downloaded.')} className="px-3 py-1.5 rounded-lg bg-gray-800 text-cyan-300 font-semibold text-xs">
                  Print Sample
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white text-sm">Class 10 Board Mock Admit Passes</div>
                  <div className="text-xs text-gray-400">Center: Arden Campus • Hall C</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-2">Status: 162 Generated & Dispatched</div>
                </div>
                <button onClick={() => alert('Sample Admit Card downloaded.')} className="px-3 py-1.5 rounded-lg bg-gray-800 text-cyan-300 font-semibold text-xs">
                  Print Sample
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: SCHEDULE NEW EXAM PAPER */}
        {showAddScheduleModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Schedule Examination Paper</h3>
                <button onClick={() => setShowAddScheduleModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateSchedule} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Examination Term *</label>
                  <input
                    type="text"
                    required
                    value={newSchedule.examName}
                    onChange={(e) => setNewSchedule({ ...newSchedule, examName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Class</label>
                    <select
                      value={newSchedule.classLevel}
                      onChange={(e) => setNewSchedule({ ...newSchedule, classLevel: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11</option>
                      <option>Class 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Subject Code</label>
                    <input
                      type="text"
                      value={newSchedule.subjectCode}
                      onChange={(e) => setNewSchedule({ ...newSchedule, subjectCode: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Subject Name *</label>
                  <input
                    type="text"
                    required
                    value={newSchedule.subject}
                    onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      value={newSchedule.date}
                      onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Time Slot</label>
                    <input
                      type="text"
                      value={newSchedule.timeSlot}
                      onChange={(e) => setNewSchedule({ ...newSchedule, timeSlot: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Room / Hall</label>
                    <input
                      type="text"
                      value={newSchedule.roomHall}
                      onChange={(e) => setNewSchedule({ ...newSchedule, roomHall: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Invigilator</label>
                    <input
                      type="text"
                      value={newSchedule.invigilator}
                      onChange={(e) => setNewSchedule({ ...newSchedule, invigilator: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowAddScheduleModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
                    Confirm & Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: PRINTABLE PROGRESS REPORT / MARKSHEET */}
        {viewingReportCard && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl">
              
              {/* Report Header */}
              <div className="flex justify-between items-start border-b border-gray-800 pb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    DEVGYAN INNOVATION • CONTINUOUS EVALUATION SYSTEM
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{activeSchool.name}</h3>
                  <p className="text-xs text-gray-400">Mid-Term Assessment Report • Academic Year 2026-27</p>
                </div>
                <button
                  onClick={() => setViewingReportCard(null)}
                  className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Student Demographics Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#030712] border border-gray-800 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Candidate Name</span>
                  <span className="text-white font-bold">{viewingReportCard.studentName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Board Roll No</span>
                  <span className="text-cyan-400 font-bold">{viewingReportCard.rollNo}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Class & Stream</span>
                  <span className="text-white">{viewingReportCard.classLevel} ({viewingReportCard.section})</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Attendance</span>
                  <span className="text-emerald-400 font-bold">{viewingReportCard.attendance}</span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="border border-gray-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left font-mono">
                  <thead className="bg-gray-950 text-gray-400 uppercase text-[11px] border-b border-gray-800">
                    <tr>
                      <th className="py-2.5 px-3">Subject</th>
                      <th className="py-2.5 px-3">Theory</th>
                      <th className="py-2.5 px-3">Practical</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {viewingReportCard.marks.map((m, idx) => {
                      const total = m.theory + m.practical;
                      const maxTotal = m.maxTheory + m.maxPractical;
                      const pct = Math.round((total / maxTotal) * 100);
                      const { grade } = getGrade(pct);
                      return (
                        <tr key={idx} className="hover:bg-gray-800/40">
                          <td className="py-2 px-3 text-white font-sans font-semibold">
                            {m.subject} <span className="text-gray-500 text-[10px]">({m.code})</span>
                          </td>
                          <td className="py-2 px-3 text-gray-300">{m.theory} / {m.maxTheory}</td>
                          <td className="py-2 px-3 text-gray-300">{m.practical} / {m.maxPractical}</td>
                          <td className="py-2 px-3 text-cyan-400 font-bold">{total} / {maxTotal}</td>
                          <td className="py-2 px-3 font-bold text-emerald-400">{grade}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Aggregate Summary */}
              {(() => {
                const stats = calculateStudentOverall(viewingReportCard);
                return (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-800/60 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">Grand Total Aggregate</span>
                      <span className="text-xl font-black text-emerald-400">{stats.obtained} / {stats.max} ({stats.percentage}%)</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <div>Cumulative Grade: <span className="text-emerald-400 font-black text-sm">{stats.grade}</span></div>
                      <div className="text-gray-400 text-[10px]">Grade Point: {stats.point} / 10.0</div>
                    </div>
                  </div>
                );
              })()}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200"
                >
                  🖨 Print / Save Official Marksheet
                </button>
                <button
                  onClick={() => setViewingReportCard(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
