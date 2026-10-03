"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ACADEMIC_CLASSES } from '../../lib/academicCurriculum';
import ConfidentialGuard from '../../components/ConfidentialGuard';

interface FullStudent {
  id: string;
  studentCode: string;
  admissionNo: string;
  apaarId?: string;
  aadhaarNo?: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  category: string;
  grade: string;
  stream?: string;
  section: string;
  rollNo: string;
  enrolledSubjects: string[];
  fatherName: string;
  guardianPhone: string;
  residentialAddress: string;
  city: string;
  transportMode: string;
  feeStatus: string;
}

export default function StudentManagementPage() {
  const { activeSchool, currentUser } = useTenant();
  const [students, setStudents] = useState<FullStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');

  // Determine allowed classes for the active user:
  // - Teacher: Only their assigned classes (e.g. ['Class 10', 'Class 11 (Science)'])
  // - Principal / Super Admin / Coordinator: All classes
  const isTeacher = currentUser?.role === 'TEACHER';
  const teacherClasses = currentUser?.assignedClasses || ['Class 10'];

  const availableClassOptions = isTeacher
    ? ACADEMIC_CLASSES.filter((c) => teacherClasses.includes(c.name))
    : ACADEMIC_CLASSES;

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const schoolName = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN'
        ? activeSchool.name
        : (currentUser?.schoolName || activeSchool.name);

      const res = await fetch(`/api/students?tenant=${encodeURIComponent(schoolName)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setStudents(json.data);
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [activeSchool.name, currentUser]);

  // Strict Filtration:
  // 1. If Teacher: MUST strictly match one of the teacher's assigned classes
  // 2. Dropdown Filter + Search Bar
  const filteredStudents = students.filter((s) => {
    if (isTeacher && !teacherClasses.includes(s.grade)) {
      return false; // Hide other classes from teacher
    }

    const matchesSearch =
      (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.admissionNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.guardianPhone || '').includes(searchTerm);

    const matchesGrade = selectedGradeFilter === 'All' || s.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                  STUDENT REPOSITORY • {activeSchool.name.toUpperCase()}
                </span>
                {isTeacher && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    FACULTY SCOPE: {teacherClasses.join(', ')}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Student Information System</h1>
              <p className="text-gray-400 text-xs mt-1">
                {isTeacher
                  ? `Viewing students enrolled exclusively in your assigned teaching sections (${teacherClasses.join(', ')}).`
                  : 'Full institutional candidate ledger and academic dossier repository.'}
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
            <div className="flex gap-3 w-full sm:w-auto flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search students by name, admission no, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
              />
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="All">
                  {isTeacher ? 'My Assigned Classes' : 'All Classes (Nursery - 12th)'}
                </option>
                {availableClassOptions.map((cls) => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Enrolled Students: <span className="text-cyan-400 font-bold">{filteredStudents.length}</span> candidates
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">SR / Admission No</th>
                  <th className="py-3 px-4">Student Profile</th>
                  <th className="py-3 px-4">Class & Sec</th>
                  <th className="py-3 px-4">Roll</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4">Enrolled Subjects</th>
                  <th className="py-3 px-4">Fee Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 font-mono">Loading records...</td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 font-mono">
                      No student records found under this class scope.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{s.admissionNo || s.studentCode}</td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{s.fullName}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{s.gender} • Blood {s.bloodGroup || 'B+'}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-200 font-semibold">{s.grade} - {s.section}</td>
                      <td className="py-3 px-4 font-mono text-gray-400">{s.rollNo}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400">{s.guardianPhone}</td>
                      <td className="py-3 px-4 text-[11px] text-gray-300 max-w-xs truncate">
                        {s.enrolledSubjects?.join(', ') || 'Core CBSE Subjects'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.feeStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {s.feeStatus || 'Due'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </ConfidentialGuard>
  );
}
