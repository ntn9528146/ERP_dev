"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ACADEMIC_CLASSES } from '../../lib/academicCurriculum';

interface Student {
  id: string;
  studentCode: string;
  admissionNo: string;
  fullName: string;
  grade: string;
  section: string;
  rollNo: string;
  guardianPhone: string;
  enrolledSubjects: string[];
  feeStatus: string;
}

export default function StudentManagementPage() {
  const { activeSchool } = useTenant();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    admissionNo: '',
    grade: 'Class 10',
    section: 'A',
    rollNo: '1001',
    guardianPhone: '',
    enrolledSubjects: [] as string[],
    feeStatus: 'Due',
  });

  const currentClassConfig = ACADEMIC_CLASSES.find((c) => c.name === formData.grade) || ACADEMIC_CLASSES[0];

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students?tenant=${encodeURIComponent(activeSchool.name)}`);
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
  }, [activeSchool.name]);

  // Open Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      fullName: '',
      admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      grade: 'Class 10',
      section: 'A',
      rollNo: '1001',
      guardianPhone: '',
      enrolledSubjects: ['English Language and Literature (Code 184)', 'Mathematics Standard (Code 041)', 'Science (Code 086)', 'Social Science (Code 087)', 'Information Technology (Code 402)'],
      feeStatus: 'Due',
    });
    setShowModal(true);
  };

  // Open Edit
  const handleOpenEdit = (s: Student) => {
    setIsEditing(true);
    setEditingId(s.id);
    setFormData({
      fullName: s.fullName || '',
      admissionNo: s.admissionNo || s.studentCode || '',
      grade: s.grade || 'Class 10',
      section: s.section || 'A',
      rollNo: s.rollNo || '1001',
      guardianPhone: s.guardianPhone || '',
      enrolledSubjects: s.enrolledSubjects || [],
      feeStatus: s.feeStatus || 'Due',
    });
    setShowModal(true);
  };

  const handleToggleSubject = (sub: string) => {
    setFormData((prev) => {
      const exists = prev.enrolledSubjects.includes(sub);
      return {
        ...prev,
        enrolledSubjects: exists
          ? prev.enrolledSubjects.filter((x) => x !== sub)
          : [...prev.enrolledSubjects, sub],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianPhone) {
      alert('Student Full Name and Guardian Phone are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      const url = '/api/students';
      const method = isEditing ? 'PUT' : 'POST';
      const payload = isEditing ? { id: editingId, ...formData } : { ...formData, tenantSchool: activeSchool.name };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success && result.data) {
        if (isEditing) {
          setStudents(students.map((st) => (st.id === editingId ? result.data : st)));
          alert(`Student ${result.data.fullName} details updated!`);
        } else {
          setStudents([result.data, ...students]);
          alert(`New student ${result.data.fullName} registered!`);
        }
        setShowModal(false);
      } else {
        alert(result.error || 'Failed to save student.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.admissionNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.guardianPhone || '').includes(searchTerm);
    const matchesGrade = selectedGradeFilter === 'All' || s.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                MODULE 01 • STUDENT INFORMATION & SUBJECT MAPPING
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Student Information System</h1>
            <p className="text-gray-400 text-xs mt-1">
              CBSE K-12 dynamic class & curriculum subjects mapping with live database sync.
            </p>
          </div>
          
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20"
          >
            + Register New Student
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
          <div className="flex gap-3 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search by student name, admission no, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
            />
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Classes (Nursery - 12th)</option>
              {ACADEMIC_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Count: <span className="text-cyan-400 font-bold">{filteredStudents.length}</span> students
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
              <tr>
                <th className="py-3 px-4">SR / Admission No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Guardian Phone</th>
                <th className="py-3 px-4">Enrolled Subjects</th>
                <th className="py-3 px-4">Fee Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400 font-mono">Loading students...</td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400 font-mono">No students registered yet.</td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-800/30">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{s.admissionNo || s.studentCode}</td>
                    <td className="py-3 px-4 text-white font-semibold">{s.fullName}</td>
                    <td className="py-3 px-4 text-gray-300">{s.grade} - {s.section}</td>
                    <td className="py-3 px-4 font-mono text-gray-400">{s.rollNo}</td>
                    <td className="py-3 px-4 font-mono text-cyan-400">{s.guardianPhone}</td>
                    <td className="py-3 px-4 text-[11px] text-gray-300 max-w-xs">
                      {s.enrolledSubjects && s.enrolledSubjects.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {s.enrolledSubjects.slice(0, 2).map((sub, idx) => (
                            <span key={idx} className="bg-gray-800 px-1.5 py-0.5 rounded text-[10px] border border-gray-700">
                              {sub}
                            </span>
                          ))}
                          {s.enrolledSubjects.length > 2 && (
                            <span className="text-cyan-400 text-[10px] font-mono">+{s.enrolledSubjects.length - 2} more</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">Not assigned</span>
                      )}
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
                        ✏️ Edit Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL: REGISTER / EDIT STUDENT WITH PRECISE SUBJECT SELECTION */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {isEditing ? `Edit Details: ${formData.fullName}` : 'Register New Student'}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* 1. Student Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rishi Tripathi"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* 2. Class, Section, Roll & Admission No */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-300 font-semibold mb-1">Class *</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => {
                        const newClass = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          grade: newClass,
                          enrolledSubjects: [], // Clear auto-check so teacher chooses freely
                        }));
                      }}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-medium focus:border-cyan-400"
                    >
                      {ACADEMIC_CLASSES.map((cls) => (
                        <option key={cls.id} value={cls.name}>{cls.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Section</label>
                    <input
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Roll No</label>
                    <input
                      type="text"
                      value={formData.rollNo}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Admission / SR No</label>
                    <input
                      type="text"
                      value={formData.admissionNo}
                      onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Fee Status</label>
                    <select
                      value={formData.feeStatus}
                      onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Due">Due</option>
                      <option value="Partial">Partial</option>
                    </select>
                  </div>
                </div>

                {/* 3. SELECTABLE CBSE SUBJECTS POOL (IT, AI, Comp Apps, Languages, etc.) */}
                <div className="p-3.5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-mono font-bold uppercase text-[11px]">
                      Select Subjects for {formData.grade}:
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {formData.enrolledSubjects.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {currentClassConfig.availableSubjects.map((subjectTitle) => {
                      const isChecked = formData.enrolledSubjects.includes(subjectTitle);
                      return (
                        <label
                          key={subjectTitle}
                          onClick={() => handleToggleSubject(subjectTitle)}
                          className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer select-none text-[11px] transition-colors ${
                            isChecked
                              ? 'bg-cyan-950/40 border-cyan-700 text-white font-semibold'
                              : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-cyan-500 focus:ring-0"
                          />
                          <span className="truncate">{subjectTitle}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex justify-end gap-2 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Details' : 'Save Student'}
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
