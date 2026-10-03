"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function ExamManagementPage() {
  const { activeSchool, currentUser } = useTenant();
  const [activeTab, setActiveTab] = useState<'datesheet' | 'marks' | 'rubrics' | 'admitCard'>('datesheet');
  const [searchTerm, setSearchTerm] = useState('');

  const isTeacher = currentUser?.role === 'TEACHER';
  const teacherClasses = currentUser?.assignedClasses || ['Class 10', 'Class 11 (Science)'];

  const allExams = [
    { id: 'EX-2026-101', subject: 'Physics', code: 'Code 042', grade: 'Class 12', date: '2026-10-12', time: '09:00 AM - 12:00 PM', hall: 'Exam Hall A', invigilator: 'Dr. Rajesh Sharma', marks: '100 Marks', status: 'Scheduled', schoolId: 'jai-arihant' },
    { id: 'EX-2026-102', subject: 'Chemistry', code: 'Code 043', grade: 'Class 12', date: '2026-10-14', time: '09:00 AM - 12:00 PM', hall: 'Exam Hall A', invigilator: 'Kavita Sundaram', marks: '100 Marks', status: 'Scheduled', schoolId: 'jai-arihant' },
    { id: 'EX-2026-103', subject: 'Mathematics', code: 'Code 041', grade: 'Class 12', date: '2026-10-16', time: '09:00 AM - 12:00 PM', hall: 'Exam Hall B', invigilator: 'Pooja Bhatt', marks: '100 Marks', status: 'Scheduled', schoolId: 'jai-arihant' },
    { id: 'EX-2026-104', subject: 'Computer Science', code: 'Code 083', grade: 'Class 12', date: '2026-10-19', time: '09:00 AM - 12:00 PM', hall: 'CS Lab 01', invigilator: 'Alok Verma', marks: '100 Marks', status: 'Scheduled', schoolId: 'jai-arihant' },
    { id: 'EX-2026-105', subject: 'Mathematics Standard', code: 'Code 041', grade: 'Class 10', date: '2026-10-13', time: '09:00 AM - 12:00 PM', hall: 'Hall C', invigilator: 'Manoj Joshi', marks: '100 Marks', status: 'Scheduled', schoolId: 'jai-arihant' },
  ];

  const marksRegisters = [
    { roll: '1201', code: 'DG-2026-002', name: 'Ananya Verma', grade: 'Class 12 - Science', evaluated: 5, total: '456 / 500', pct: '91%', gradeCbse: 'A1 (GP: 10.0)', schoolId: 'jai-arihant' },
    { roll: '1001', code: 'DG-2026-001', name: 'Aarav Sharma', grade: 'Class 10 - A', evaluated: 5, total: '452 / 500', pct: '90%', gradeCbse: 'A2 (GP: 9.0)', schoolId: 'jai-arihant' },
    { roll: '1104', code: 'DG-2026-004', name: 'Ishita Joshi', grade: 'Class 11 - Commerce', evaluated: 5, total: '413 / 500', pct: '83%', gradeCbse: 'A2 (GP: 9.0)', schoolId: 'jai-arihant' },
  ];

  const currentSchoolId = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN'
    ? activeSchool.id
    : (currentUser?.schoolId || activeSchool.id);

  const filteredExams = allExams.filter((ex) => {
    if (ex.schoolId !== currentSchoolId) return false;
    if (isTeacher) {
      const matchClass = teacherClasses.some((tc) => ex.grade.includes(tc) || tc.includes(ex.grade));
      if (!matchClass) return false;
    }
    return ex.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredMarks = marksRegisters.filter((m) => {
    if (m.schoolId !== currentSchoolId) return false;
    if (isTeacher) {
      const matchClass = teacherClasses.some((tc) => m.grade.includes(tc) || tc.includes(m.grade));
      if (!matchClass) return false;
    }
    return m.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                EXAMINATION CONTROLLER • {activeSchool.name.toUpperCase()}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Official CBSE Examination Portal</h1>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0B1120] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-400 block font-mono">Papers Scheduled</span>
              <span className="text-2xl font-black text-cyan-400">{filteredExams.length} Papers</span>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-400 block font-mono">Dossiers Evaluated</span>
              <span className="text-2xl font-black text-emerald-400">{filteredMarks.length} Candidates</span>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-400 block font-mono">Bell Curve Compliance</span>
              <span className="text-2xl font-black text-purple-400">94.6%</span>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-4 rounded-xl">
              <span className="text-xs text-gray-400 block font-mono">Room Overlaps</span>
              <span className="text-2xl font-black text-amber-400">Zero Overlaps</span>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 border-b border-gray-800 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('datesheet')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'datesheet' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              📅 Date Sheet & Seating Timetable ({filteredExams.length})
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'marks' ? 'bg-cyan-500 text-black' : 'bg-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              📊 Marks Registers & Report Cards ({filteredMarks.length})
            </button>
          </div>

          {/* Tab 1: Date Sheet */}
          {activeTab === 'datesheet' && (
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Exam ID / Subject</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Date & Time Slot</th>
                    <th className="py-3 px-4">Seating Room / Hall</th>
                    <th className="py-3 px-4">Appointed Invigilator</th>
                    <th className="py-3 px-4">Max Weightage</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredExams.map((ex) => (
                    <tr key={ex.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{ex.subject}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">{ex.id} • {ex.code}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 font-mono">{ex.grade}</td>
                      <td className="py-3 px-4 font-mono">
                        <div className="text-white">{ex.date}</div>
                        <div className="text-[10px] text-gray-400">{ex.time}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{ex.hall}</td>
                      <td className="py-3 px-4 text-white font-medium">{ex.invigilator}</td>
                      <td className="py-3 px-4 text-cyan-400 font-mono font-bold">{ex.marks}</td>
                      <td className="py-3 px-4 text-cyan-400">● {ex.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: Marks Register */}
          {activeTab === 'marks' && (
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Roll No / Student</th>
                    <th className="py-3 px-4">Class & Section</th>
                    <th className="py-3 px-4">Subjects Evaluated</th>
                    <th className="py-3 px-4">Total Aggregate</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">CBSE Grade</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredMarks.map((m) => (
                    <tr key={m.roll} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{m.name}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">Roll: {m.roll} • {m.code}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{m.grade}</td>
                      <td className="py-3 px-4 text-gray-300">{m.evaluated} Subjects</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{m.total}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">{m.pct}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400">{m.gradeCbse}</td>
                      <td className="py-3 px-4 text-center">
                        <button className="px-3 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 border border-blue-500/40 text-[11px] font-semibold">
                          📄 Progress Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </ConfidentialGuard>
  );
}
