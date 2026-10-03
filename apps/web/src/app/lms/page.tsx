"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface CourseModule {
  id: string;
  courseTitle: string;
  classLevel: string;
  subjectCode: string;
  facultyName: string;
  totalLectures: number;
  completedLectures: number;
  resourcesCount: number;
  quizCount: number;
  nextLiveSession: string;
  thumbnailBadge: string;
}

interface AssignmentTask {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  deadline: string;
  maxMarks: number;
  submittedCount: number;
  totalStudents: number;
  status: 'Open' | 'Grading' | 'Closed';
}

const initialCourses: CourseModule[] = [
  {
    id: 'LMS-CRS-101',
    courseTitle: 'Python Data Structures & Computational Thinking',
    classLevel: 'Class 12',
    subjectCode: 'CS-083',
    facultyName: 'Alok Verma',
    totalLectures: 36,
    completedLectures: 24,
    resourcesCount: 18,
    quizCount: 8,
    nextLiveSession: 'Today, 04:30 PM (Lab Stream)',
    thumbnailBadge: 'PYTHON & SQL',
  },
  {
    id: 'LMS-CRS-102',
    courseTitle: 'Electromagnetic Induction & Modern Physics',
    classLevel: 'Class 12',
    subjectCode: 'PHY-042',
    facultyName: 'Dr. Rajesh Sharma',
    totalLectures: 42,
    completedLectures: 31,
    resourcesCount: 25,
    quizCount: 10,
    nextLiveSession: 'Tomorrow, 10:00 AM',
    thumbnailBadge: 'PHYSICS CORE',
  },
  {
    id: 'LMS-CRS-103',
    courseTitle: 'Differential Calculus & Vector Geometry',
    classLevel: 'Class 12',
    subjectCode: 'MAT-041',
    facultyName: 'Pooja Bhatt',
    totalLectures: 40,
    completedLectures: 29,
    resourcesCount: 22,
    quizCount: 7,
    nextLiveSession: 'Thursday, 11:30 AM',
    thumbnailBadge: 'CALCULUS',
  },
  {
    id: 'LMS-CRS-104',
    courseTitle: 'Organic Chemistry: Aldehydes, Ketones & Biomolecules',
    classLevel: 'Class 12',
    subjectCode: 'CHM-043',
    facultyName: 'Kavita Sundaram',
    totalLectures: 38,
    completedLectures: 20,
    resourcesCount: 15,
    quizCount: 6,
    nextLiveSession: 'Friday, 02:00 PM',
    thumbnailBadge: 'CHEMISTRY',
  },
];

const initialAssignments: AssignmentTask[] = [
  {
    id: 'ASN-2026-881',
    title: 'Stack & Queue Implementation in Python using Lists',
    subject: 'Computer Science (083)',
    classLevel: 'Class 12',
    deadline: '2026-10-06 11:59 PM',
    maxMarks: 25,
    submittedCount: 38,
    totalStudents: 42,
    status: 'Open',
  },
  {
    id: 'ASN-2026-882',
    title: 'Numerical Analysis on Faraday’s & Lenz’s Laws',
    subject: 'Physics (042)',
    classLevel: 'Class 12',
    deadline: '2026-10-04 05:00 PM',
    maxMarks: 20,
    submittedCount: 41,
    totalStudents: 42,
    status: 'Grading',
  },
  {
    id: 'ASN-2026-883',
    title: 'Evaluation of Definite Integrals by Limit of a Sum',
    subject: 'Mathematics (041)',
    classLevel: 'Class 12',
    deadline: '2026-09-30 11:59 PM',
    maxMarks: 30,
    submittedCount: 42,
    totalStudents: 42,
    status: 'Closed',
  },
];

export default function LmsPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'courses' | 'assignments' | 'live' | 'quiz'>('courses');
  const [courses, setCourses] = useState<CourseModule[]>(initialCourses);
  const [assignments, setAssignments] = useState<AssignmentTask[]>(initialAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [newLecture, setNewLecture] = useState({
    courseTitle: '',
    classLevel: 'Class 12',
    subjectCode: 'CS-083',
    facultyName: 'Alok Verma',
    nextLiveSession: 'Tomorrow, 09:00 AM',
    thumbnailBadge: 'COMPUTER SCIENCE',
  });

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All' || c.classLevel === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleCreateLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLecture.courseTitle) return;

    const created: CourseModule = {
      id: `LMS-CRS-${100 + courses.length + 1}`,
      ...newLecture,
      totalLectures: 30,
      completedLectures: 1,
      resourcesCount: 5,
      quizCount: 2,
    };

    setCourses([created, ...courses]);
    setShowAddLectureModal(false);
    alert(`Course module "${created.courseTitle}" published successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 09 • DIGITAL CLASSROOM & E-LEARNING
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Learning Management System (LMS)</h1>
            <p className="text-gray-400 text-sm mt-1">
              Curriculum video lessons, live conference streams, timed quizzes & digital project evaluations.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddLectureModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Upload New Course Module
            </button>
          </div>
        </div>

        {/* LMS Operational KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Active Digital Courses</span>
            <div className="text-2xl font-black text-white mt-1">{courses.length} Modules</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">100% CBSE Aligned</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Recorded Video Lectures</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">156 Videos</div>
            <span className="text-xs text-indigo-400 font-mono mt-2 block">Zero Latency CDN Hosted</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Active Assignment Submissions</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">121 Files</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">92.4% Submission Rate</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Interactive Quizzes Taken</span>
            <div className="text-2xl font-black text-amber-400 mt-1">31 Quizzes</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Auto-Marks Grading Active</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'courses' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📚 Published Courses & Video Modules ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'assignments' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📝 Homework & Project Tasks ({assignments.length})
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'live' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🔴 Virtual Live Class Gateway
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⏱️ Timed Assessment & Quiz Engine
          </button>
        </div>

        {/* TAB 1: COURSES & LECTURES GRID */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search course title, faculty, or code..."
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
                Cataloged: <span className="text-cyan-400 font-bold">{filteredCourses.length}</span> course studios
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCourses.map((c) => {
                const progressPct = Math.round((c.completedLectures / c.totalLectures) * 100);
                return (
                  <div
                    key={c.id}
                    className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50">
                          {c.thumbnailBadge}
                        </span>
                        <span className="text-xs font-mono text-gray-400">{c.classLevel} • {c.subjectCode}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
                        {c.courseTitle}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">Instructor: {c.facultyName}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-mono text-gray-400">
                        <span>Syllabus Covered</span>
                        <span className="text-cyan-400 font-bold">{progressPct}% ({c.completedLectures}/{c.totalLectures} Lessons)</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Meta Footer */}
                    <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="text-gray-400 font-mono text-[11px]">
                        <div>📄 {c.resourcesCount} PDF Notes • ⏱️ {c.quizCount} Quizzes</div>
                        <div className="text-cyan-400 mt-0.5">Live: {c.nextLiveSession}</div>
                      </div>

                      <button
                        onClick={() => alert(`Launching Classroom Player for ${c.courseTitle}...`)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform whitespace-nowrap"
                      >
                        Enter Studio →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGNMENTS & HOMEWORK */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-300">
                Digital Assignment Desk • Submissions are scanned with anti-plagiarism & auto-time stamped.
              </span>
              <button
                onClick={() => alert('New assignment creation wizard launched.')}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
              >
                + Assign New Homework
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Assignment ID & Title</th>
                    <th className="py-3.5 px-4">Subject & Class</th>
                    <th className="py-3.5 px-4">Submission Deadline</th>
                    <th className="py-3.5 px-4">Max Marks</th>
                    <th className="py-3.5 px-4">Submissions Turned In</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {assignments.map((asn) => (
                    <tr key={asn.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{asn.title}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{asn.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-gray-200">{asn.subject}</div>
                        <div className="text-gray-400 text-[11px]">{asn.classLevel}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400 text-[11px]">{asn.deadline}</td>
                      <td className="py-3 px-4 font-mono text-white font-bold">{asn.maxMarks}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">{asn.submittedCount}</span>
                        <span className="text-gray-500"> / {asn.totalStudents}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          asn.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          asn.status === 'Grading' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {asn.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => alert(`Reviewing submissions for ${asn.id}...`)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                        >
                          Grade Papers 📝
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE CLASS GATEWAY */}
        {activeTab === 'live' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Interactive Virtual Live Classrooms</h3>
              <p className="text-xs text-gray-400">Low-latency live stream with attendance auto-logging during live video call.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#030712] border border-cyan-800/60 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    LIVE NOW
                  </span>
                  <span className="text-xs font-mono text-gray-400">Class 12 - Science</span>
                </div>
                <h4 className="text-lg font-bold text-white">CS-083: Python File Handling & Binary Files</h4>
                <div className="text-xs text-gray-400">Teacher: Alok Verma • 38 Students Connected</div>
                <button
                  onClick={() => alert('Connected to encrypted live stream room!')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25"
                >
                  Join Live Lecture Room 🎥
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#030712] border border-gray-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    SCHEDULED (06:00 PM)
                  </span>
                  <span className="text-xs font-mono text-gray-400">Class 10 - Mathematics</span>
                </div>
                <h4 className="text-lg font-bold text-white">MAT-041: Quadratic Equations & AP Series</h4>
                <div className="text-xs text-gray-400">Teacher: Manoj Joshi • Pre-test uploaded</div>
                <button
                  onClick={() => alert('Calendar reminder set.')}
                  className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs"
                >
                  Set Reminder 🔔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ ENGINE */}
        {activeTab === 'quiz' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <h3 className="text-base font-bold text-white">Timed Diagnostic Quizzes & MCQ Assessments</h3>
            <p className="text-xs text-gray-400">Automated evaluation with anti-cheat fullscreen lock and question shuffling.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="font-bold text-white text-sm">Python Recursion & Big-O Quiz</div>
                <div className="text-cyan-400 font-mono">15 MCQs • 20 Mins Timer</div>
                <div className="text-gray-400">Class 12 CS • Avg Score: 82%</div>
                <button onClick={() => alert('Previewing Quiz Engine...')} className="w-full mt-2 py-1.5 rounded bg-gray-800 text-cyan-300 font-semibold text-xs">
                  Attempt Test Simulation
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="font-bold text-white text-sm">Optics & Wave Motion Diagnostic</div>
                <div className="text-cyan-400 font-mono">20 MCQs • 30 Mins Timer</div>
                <div className="text-gray-400">Class 12 Physics • Avg Score: 76%</div>
                <button onClick={() => alert('Previewing Quiz Engine...')} className="w-full mt-2 py-1.5 rounded bg-gray-800 text-cyan-300 font-semibold text-xs">
                  Attempt Test Simulation
                </button>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="font-bold text-white text-sm">Linear Programming & Probability</div>
                <div className="text-cyan-400 font-mono">10 MCQs • 15 Mins Timer</div>
                <div className="text-gray-400">Class 12 Math • Avg Score: 88%</div>
                <button onClick={() => alert('Previewing Quiz Engine...')} className="w-full mt-2 py-1.5 rounded bg-gray-800 text-cyan-300 font-semibold text-xs">
                  Attempt Test Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: UPLOAD NEW COURSE MODULE */}
        {showAddLectureModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Publish New Curriculum Course</h3>
                <button onClick={() => setShowAddLectureModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateLecture} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Artificial Intelligence & Machine Learning Fundamentals"
                    value={newLecture.courseTitle}
                    onChange={(e) => setNewLecture({ ...newLecture, courseTitle: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Target Class</label>
                    <select
                      value={newLecture.classLevel}
                      onChange={(e) => setNewLecture({ ...newLecture, classLevel: e.target.value })}
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
                      value={newLecture.subjectCode}
                      onChange={(e) => setNewLecture({ ...newLecture, subjectCode: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Instructor Faculty Name</label>
                  <input
                    type="text"
                    required
                    value={newLecture.facultyName}
                    onChange={(e) => setNewLecture({ ...newLecture, facultyName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Live Session Timing</label>
                  <input
                    type="text"
                    value={newLecture.nextLiveSession}
                    onChange={(e) => setNewLecture({ ...newLecture, nextLiveSession: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowAddLectureModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20">
                    Publish Course Module
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
