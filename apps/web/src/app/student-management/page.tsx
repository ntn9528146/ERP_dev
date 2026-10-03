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

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    grade: 'Class 10',
    section: 'A',
    rollNo: '1001',
    guardianPhone: '',
    enrolledSubjects: ['Mathematics Standard (Code 041)', 'Science (Code 086)', 'Social Science (Code 087)', 'English Language and Literature (Code 184)', 'Information Technology (Code 402)'],
    feeStatus: 'Due',
  });

  const isTeacher = currentUser?.role === 'TEACHER';
  const teacherClasses = currentUser?.assignedClasses || ['Class 10', 'Class 11 (Science)'];

  const availableClassOptions = isTeacher
    ? ACADEMIC_CLASSES.filter((c) => teacherClasses.includes(c.name))
    : ACADEMIC_CLASSES;

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';
  const currentSchoolName = isSuperAdmin ? activeSchool.name : (currentUser?.schoolName || activeSchool.name);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students?tenant=${encodeURIComponent(currentSchoolName)}`);
      const json = await res.json();
      if (json.success && json.data) {
        setStudents(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [activeSchool.name, currentUser]);

  const handleOpenEdit = (s: FullStudent) => {
    setIsEditing(true);
    setEditingId(s.id);
    setFormData({
      fullName: s.fullName,
      admissionNo: s.admissionNo || s.studentCode,
      grade: s.grade,
      section: s.section,
      rollNo: s.rollNo,
      guardianPhone: s.guardianPhone,
      enrolledSubjects: s.enrolledSubjects || [],
      feeStatus: s.feeStatus,
    });
    setShowModal(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = '/api/students';
    const method = isEditing ? 'PUT' : 'POST';
    const payload = isEditing ? { id: editingId, ...formData } : { ...formData, tenantSchool: currentSchoolName };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.data) {
        if (isEditing) {
          setStudents(students.map((st) => st.id === editingId ? data.data : st));
        } else {
          setStudents([data.data, ...students]);
        }
        setShowModal(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter((s) => {
    if (isTeacher && !teacherClasses.includes(s.grade)) return false;
    const matchesSearch = (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (s.admissionNo || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGradeFilter === 'All' || s.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                STUDENT REPOSITORY • {activeSchool.name.toUpperCase()}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Student Information System</h1>
            </div>
            
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  fullName: '',
                  admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  grade: 'Class 10',
                  section: 'A',
                  rollNo: '1001',
                  guardianPhone: '',
                  enrolledSubjects: ['Mathematics Standard (Code 041)', 'Science (Code 086)', 'Social Science (Code 087)', 'English Language and Literature (Code 184)', 'Information Technology (Code 402)'],
                  feeStatus: 'Due',
                });
                setShowModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-500/20"
            >
              + Register New Student
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between bg-gray-900/40 p-3 rounded-xl border border-gray-800">
            <input
              type="text"
              placeholder="Search by student name, admission no, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 w-80"
            />
            <span className="text-xs text-gray-400 font-mono">
              Enrolled Students: <strong className="text-cyan-400">{filteredStudents.length}</strong> candidates
            </span>
          </div>

          {/* Students Table with ✏️ Edit Action */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">SR / Admission No</th>
                  <th className="py-3 px-4">Student Profile</th>
                  <th className="py-3 px-4">Class & Sec</th>
                  <th className="py-3 px-4">Roll</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4">Enrolled Subjects</th>
                  <th className="py-3 px-4">Fee Clearance</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500 font-mono">
                      No student records found under this campus.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{s.admissionNo || s.studentCode}</td>
                      <td className="py-3 px-4 font-semibold text-white">{s.fullName}</td>
                      <td className="py-3 px-4 text-gray-300">{s.grade} - {s.section}</td>
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
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold border border-gray-700"
                        >
                          ✏️ Edit Dossier
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <h3 className="text-base font-bold text-white">{isEditing ? 'Edit Dossier' : 'Register Student'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={handleSaveStudent} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Class</label>
                      <select
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      >
                        {availableClassOptions.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.guardianPhone}
                        onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-800">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-cyan-600 font-bold text-white">Save Dossier</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </ConfidentialGuard>
  );
}
