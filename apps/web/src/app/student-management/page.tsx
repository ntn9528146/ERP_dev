"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ALL_CBSE_CLASSES } from '../../lib/academicCurriculum';
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

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTab, setFormTab] = useState<'academic' | 'personal' | 'parents' | 'residence'>('academic');

  const [formData, setFormData] = useState({
    fullName: '',
    admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    apaarId: '',
    aadhaarNo: '',
    dateOfBirth: '2011-04-15',
    gender: 'Male',
    bloodGroup: 'B+',
    category: 'General',
    grade: 'Class 10',
    section: 'A',
    rollNo: '1001',
    enrolledSubjects: ['Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'English Language & Literature (184)', 'Information Technology (402)'],
    fatherName: '',
    guardianPhone: '',
    residentialAddress: 'Haldwani',
    city: 'Haldwani',
    transportMode: 'School Bus Fleet',
    feeStatus: 'Due',
  });

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

  const currentClassConfig = ALL_CBSE_CLASSES.find((c) => c.name === formData.grade) || ALL_CBSE_CLASSES[12];

  const handleClassChange = (newClassName: string) => {
    const config = ALL_CBSE_CLASSES.find((c) => c.name === newClassName);
    setFormData((prev) => ({
      ...prev,
      grade: newClassName,
      enrolledSubjects: config ? config.availableSubjects.slice(0, 5) : [],
    }));
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

  const handleOpenEdit = (s: FullStudent) => {
    setIsEditing(true);
    setEditingId(s.id);
    setFormData({
      fullName: s.fullName || '',
      admissionNo: s.admissionNo || s.studentCode || '',
      apaarId: s.apaarId || '',
      aadhaarNo: s.aadhaarNo || '',
      dateOfBirth: s.dateOfBirth || '2011-04-15',
      gender: s.gender || 'Male',
      bloodGroup: s.bloodGroup || 'B+',
      category: s.category || 'General',
      grade: s.grade || 'Class 10',
      section: s.section || 'A',
      rollNo: s.rollNo || '1001',
      enrolledSubjects: s.enrolledSubjects || [],
      fatherName: s.fatherName || '',
      guardianPhone: s.guardianPhone || '',
      residentialAddress: s.residentialAddress || 'Haldwani',
      city: s.city || 'Haldwani',
      transportMode: s.transportMode || 'School Bus Fleet',
      feeStatus: s.feeStatus || 'Due',
    });
    setFormTab('academic');
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
          setStudents(students.map((st) => (st.id === editingId ? data.data : st)));
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
    const matchesSearch =
      (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.admissionNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.guardianPhone || '').includes(searchTerm);
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
              <p className="text-gray-400 text-xs mt-1">Full institutional candidate ledger and comprehensive 4-tab academic dossier repository.</p>
            </div>
            
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingId(null);
                setFormData({
                  fullName: '',
                  admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  apaarId: '',
                  aadhaarNo: '',
                  dateOfBirth: '2011-04-15',
                  gender: 'Male',
                  bloodGroup: 'B+',
                  category: 'General',
                  grade: 'Class 10',
                  section: 'A',
                  rollNo: '1001',
                  enrolledSubjects: ['Mathematics Standard (041)', 'Science (086)', 'Social Science (087)', 'English Language & Literature (184)', 'Information Technology (402)'],
                  fatherName: '',
                  guardianPhone: '',
                  residentialAddress: 'Haldwani',
                  city: 'Haldwani',
                  transportMode: 'School Bus Fleet',
                  feeStatus: 'Due',
                });
                setFormTab('academic');
                setShowModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-500/20"
            >
              + Register New Student
            </button>
          </div>

          {/* Filter Bar with FULL CLASS HIERARCHY */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
            <div className="flex gap-3 w-full sm:w-auto flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search students by name, admission no, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
              />
              
              {/* EXACT FULL CLASS DROPDOWN LIST */}
              <select
                value={selectedGradeFilter}
                onChange={(e) => setSelectedGradeFilter(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-cyan-300 font-medium focus:outline-none focus:border-cyan-400 max-h-60"
              >
                <option value="All">All Classes (Nursery - 12th)</option>
                {ALL_CBSE_CLASSES.map((cls) => (
                  <option key={cls.id} value={cls.name} className="bg-gray-950 text-white">
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-xs text-gray-400 font-mono">
              Enrolled Students: <strong className="text-cyan-400">{filteredStudents.length}</strong> candidates
            </div>
          </div>

          {/* Table */}
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

          {/* 4-Tab Dossier Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{isEditing ? `Edit Dossier: ${formData.fullName}` : 'Register Student (Full Dossier)'}</h3>
                    <p className="text-xs text-gray-400">Official CBSE Student Profile • PostgreSQL Synchronized</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
                </div>

                <div className="flex gap-2 border-b border-gray-800 pb-2 text-xs font-semibold overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setFormTab('academic')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      formTab === 'academic' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    1. Academic & Subjects ({formData.enrolledSubjects.length} Selected)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTab('personal')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      formTab === 'personal' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    2. Personal & KYC
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTab('parents')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      formTab === 'parents' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    3. Parents & Family
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormTab('residence')}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                      formTab === 'residence' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    4. Address & Logistics
                  </button>
                </div>

                <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
                  {formTab === 'academic' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Target Class *</label>
                          <select
                            value={formData.grade}
                            onChange={(e) => handleClassChange(e.target.value)}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-medium focus:border-cyan-400"
                          >
                            {ALL_CBSE_CLASSES.map((cls) => (
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
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Roll Number</label>
                          <input
                            type="text"
                            value={formData.rollNo}
                            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2.5">
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400 font-mono font-bold uppercase text-[11px]">
                            SELECT SUBJECTS FOR {formData.grade.toUpperCase()}:
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">
                            {formData.enrolledSubjects.length} selected
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                          {currentClassConfig.availableSubjects.map((subTitle) => {
                            const isChecked = formData.enrolledSubjects.includes(subTitle);
                            return (
                              <label
                                key={subTitle}
                                onClick={() => handleToggleSubject(subTitle)}
                                className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none text-[11px] transition-colors ${
                                  isChecked ? 'bg-cyan-950/40 border-cyan-600 text-white font-semibold' : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                                }`}
                              >
                                <input type="checkbox" checked={isChecked} onChange={() => {}} className="rounded text-cyan-500 focus:ring-0" />
                                <span className="truncate">{subTitle}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {formTab === 'personal' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white text-sm font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Date of Birth</label>
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                          >
                            <option>Male</option><option>Female</option><option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Blood Group</label>
                          <select
                            value={formData.bloodGroup}
                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                          >
                            <option>O+</option><option>O-</option><option>A+</option><option>A-</option>
                            <option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {formTab === 'parents' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Father's Name</label>
                          <input
                            type="text"
                            value={formData.fatherName}
                            onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Guardian Phone *</label>
                          <input
                            type="tel"
                            required
                            value={formData.guardianPhone}
                            onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formTab === 'residence' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Address</label>
                        <input
                          type="text"
                          value={formData.residentialAddress}
                          onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">City</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 font-semibold mb-1">Fee Status</label>
                          <select
                            value={formData.feeStatus}
                            onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
                            className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-bold"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Due">Due</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-center border-t border-gray-800">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                      Cancel
                    </button>
                    {formTab !== 'residence' ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (formTab === 'academic') setFormTab('personal');
                          else if (formTab === 'personal') setFormTab('parents');
                          else if (formTab === 'parents') setFormTab('residence');
                        }}
                        className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                      >
                        Next Step →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold"
                      >
                        Save Dossier 🚀
                      </button>
                    )}
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
