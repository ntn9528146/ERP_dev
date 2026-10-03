"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';
import { ACADEMIC_CLASSES } from '../../lib/academicCurriculum';

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
  fatherOccupation?: string;
  motherName: string;
  motherOccupation?: string;
  guardianPhone: string;
  guardianEmail?: string;
  familyAnnualIncome?: string;
  residentialAddress: string;
  city: string;
  district?: string;
  state?: string;
  pincode?: string;
  transportMode: string;
  busStopName?: string;
  feeStatus: string;
}

export default function StudentManagementPage() {
  const { activeSchool } = useTenant();
  const [students, setStudents] = useState<FullStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');

  // Modal & Edit State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTab, setFormTab] = useState<'academic' | 'personal' | 'parents' | 'residence'>('academic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comprehensive Student Form State
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
    stream: 'General',
    section: 'A',
    rollNo: '1001',
    enrolledSubjects: [
      'Mathematics Standard (Code 041)',
      'Science (Code 086)',
      'Social Science (Code 087)',
      'English Language and Literature (Code 184)',
      'Information Technology (Code 402)',
    ] as string[],
    fatherName: '',
    fatherOccupation: 'Private / Business',
    motherName: '',
    motherOccupation: 'Homemaker / Service',
    guardianPhone: '',
    guardianEmail: '',
    familyAnnualIncome: '₹6,00,000 - ₹10,00,000',
    residentialAddress: 'Lohariya Sal Malla, Haldwani',
    city: 'Haldwani',
    district: 'Nainital',
    state: 'Uttarakhand',
    pincode: '263139',
    transportMode: 'School Bus Fleet',
    busStopName: 'Tikonia Chauraha',
    feeStatus: 'Due',
  });

  const currentClassConfig = ACADEMIC_CLASSES.find((c) => c.name === formData.grade) || ACADEMIC_CLASSES[0];

  const handleClassChange = (newClassName: string) => {
    const config = ACADEMIC_CLASSES.find((c) => c.name === newClassName);
    const initialList = config ? config.availableSubjects.slice(0, 5) : [];
    setFormData((prev) => ({
      ...prev,
      grade: newClassName,
      enrolledSubjects: initialList,
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

  const handleOpenCreate = () => {
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
      stream: 'General',
      section: 'A',
      rollNo: '1001',
      enrolledSubjects: [
        'Mathematics Standard (Code 041)',
        'Science (Code 086)',
        'Social Science (Code 087)',
        'English Language and Literature (Code 184)',
        'Information Technology (Code 402)',
      ],
      fatherName: '',
      fatherOccupation: 'Private / Business',
      motherName: '',
      motherOccupation: 'Homemaker / Service',
      guardianPhone: '',
      guardianEmail: '',
      familyAnnualIncome: '₹6,00,000 - ₹10,00,000',
      residentialAddress: 'Lohariya Sal Malla, Haldwani',
      city: 'Haldwani',
      district: 'Nainital',
      state: 'Uttarakhand',
      pincode: '263139',
      transportMode: 'School Bus Fleet',
      busStopName: 'Tikonia Chauraha',
      feeStatus: 'Due',
    });
    setFormTab('academic');
    setShowModal(true);
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
      stream: s.stream || 'General',
      section: s.section || 'A',
      rollNo: s.rollNo || '1001',
      enrolledSubjects: s.enrolledSubjects || [],
      fatherName: s.fatherName || '',
      fatherOccupation: s.fatherOccupation || '',
      motherName: s.motherName || '',
      motherOccupation: s.motherOccupation || '',
      guardianPhone: s.guardianPhone || '',
      guardianEmail: s.guardianEmail || '',
      familyAnnualIncome: s.familyAnnualIncome || '₹6,00,000 - ₹10,00,000',
      residentialAddress: s.residentialAddress || 'Haldwani',
      city: s.city || 'Haldwani',
      district: s.district || 'Nainital',
      state: s.state || 'Uttarakhand',
      pincode: s.pincode || '263139',
      transportMode: s.transportMode || 'School Bus Fleet',
      busStopName: s.busStopName || '',
      feeStatus: s.feeStatus || 'Due',
    });
    setFormTab('academic');
    setShowModal(true);
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
          alert(`Dossier for ${result.data.fullName} updated!`);
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
                MODULE 01 • CBSE K-12 FULL DOSSIER & SUBJECT MAPPING
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Student Information System & KYC Vault</h1>
            <p className="text-gray-400 text-xs mt-1">
              Complete student lifecycle: APAAR/PEN IDs, Aadhaar, parents dossier, transport and CBSE mapped subjects.
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
                <th className="py-3 px-4">Student Profile & Roll</th>
                <th className="py-3 px-4">Class & Sec</th>
                <th className="py-3 px-4">Parents & Contact</th>
                <th className="py-3 px-4">Mapped Subjects</th>
                <th className="py-3 px-4">Logistics / Transport</th>
                <th className="py-3 px-4">Fee Clearance</th>
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
                    <td className="py-3 px-4 font-mono">
                      <div className="text-cyan-400 font-bold">{s.admissionNo || s.studentCode}</div>
                      <div className="text-[10px] text-gray-500">APAAR: {s.apaarId || 'PEN-PENDING'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{s.fullName}</div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {s.gender} • DOB: {s.dateOfBirth} • Blood: {s.bloodGroup || 'B+'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-200 font-semibold">{s.grade}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Sec {s.section} • Roll {s.rollNo}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{s.fatherName || 'Parent'}</div>
                      <div className="text-[10px] text-cyan-400 font-mono">{s.guardianPhone}</div>
                    </td>
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
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-300">
                      <div>{s.transportMode || 'Self'}</div>
                      <div className="text-[10px] text-gray-500">{s.city}</div>
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
                        ✏️️ Edit Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL: COMPREHENSIVE DOSSIER + SELECTABLE SUBJECTS */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isEditing ? `Edit Dossier: ${formData.fullName}` : 'Register New Student (Full Dossier)'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Official CBSE Student Profile • PostgreSQL Synchronized
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
              </div>

              {/* Dossier Tabs */}
              <div className="flex gap-2 border-b border-gray-800 pb-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFormTab('academic')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    formTab === 'academic' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  1. Academic & Subjects ({formData.enrolledSubjects.length} Selected)
                </button>
                <button
                  type="button"
                  onClick={() => setFormTab('personal')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    formTab === 'personal' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  2. Personal & KYC
                </button>
                <button
                  type="button"
                  onClick={() => setFormTab('parents')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    formTab === 'parents' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  3. Parents & Family
                </button>
                <button
                  type="button"
                  onClick={() => setFormTab('residence')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    formTab === 'residence' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  4. Address & Logistics
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* TAB 1: ACADEMIC & SUBJECTS */}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Admission / SR No *</label>
                        <input
                          type="text"
                          required
                          value={formData.admissionNo}
                          onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">APAAR / PEN ID</label>
                        <input
                          type="text"
                          placeholder="PEN-2026-XXXX"
                          value={formData.apaarId}
                          onChange={(e) => setFormData({ ...formData, apaarId: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                    </div>

                    {/* SELECTABLE SUBJECTS (EXACTLY AS SHOWN IN SCREENSHOT) */}
                    <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono font-bold uppercase text-[11px] tracking-wide">
                          SELECT SUBJECTS FOR {formData.grade.toUpperCase()}:
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-bold">
                          {formData.enrolledSubjects.length} selected
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                        {currentClassConfig.availableSubjects.map((subTitle) => {
                          const isChecked = formData.enrolledSubjects.includes(subTitle);
                          return (
                            <label
                              key={subTitle}
                              onClick={() => handleToggleSubject(subTitle)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer select-none text-[11px] transition-colors ${
                                isChecked
                                  ? 'bg-cyan-950/40 border-cyan-600 text-white font-semibold'
                                  : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="rounded text-cyan-500 focus:ring-0"
                              />
                              <span className="truncate">{subTitle}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: PERSONAL & KYC */}
                {formTab === 'personal' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rishi Tripathi"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white text-sm font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Date of Birth (DOB) *</label>
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
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Blood Group</label>
                        <select
                          value={formData.bloodGroup}
                          onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        >
                          <option>O+</option>
                          <option>O-</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Social Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        >
                          <option>General</option>
                          <option>OBC</option>
                          <option>SC</option>
                          <option>ST</option>
                          <option>EWS</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Student Aadhaar Number</label>
                        <input
                          type="text"
                          placeholder="XXXX - XXXX - XXXX"
                          value={formData.aadhaarNo}
                          onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: PARENTS & FAMILY */}
                {formTab === 'parents' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Father's Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nitin Tripathi"
                          value={formData.fatherName}
                          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Father's Occupation</label>
                        <input
                          type="text"
                          value={formData.fatherOccupation}
                          onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Mother's Full Name</label>
                        <input
                          type="text"
                          value={formData.motherName}
                          onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Mother's Occupation</label>
                        <input
                          type="text"
                          value={formData.motherOccupation}
                          onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Primary Guardian Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Parent Email</label>
                        <input
                          type="email"
                          value={formData.guardianEmail}
                          onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: ADDRESS & LOGISTICS */}
                {formTab === 'residence' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Residential Street Address</label>
                      <textarea
                        rows={2}
                        value={formData.residentialAddress}
                        onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                        <label className="block text-gray-300 font-semibold mb-1">District</label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Pincode</label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Transport Mode</label>
                        <select
                          value={formData.transportMode}
                          onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        >
                          <option>School Bus Fleet</option>
                          <option>Private Vehicle / Parent Drop</option>
                          <option>Walker / Local Bicycle</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Bus Stoppage Point</label>
                        <input
                          type="text"
                          value={formData.busStopName}
                          onChange={(e) => setFormData({ ...formData, busStopName: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Fee Status</label>
                        <select
                          value={formData.feeStatus}
                          onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-bold"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Due">Due</option>
                          <option value="Partial">Partial</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="pt-4 flex justify-between items-center border-t border-gray-800">
                  <div className="text-[11px] font-mono text-gray-400">
                    Step {formTab === 'academic' ? '1' : formTab === 'personal' ? '2' : formTab === 'parents' ? '3' : '4'} of 4
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold hover:bg-gray-700"
                    >
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
                        disabled={isSubmitting}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update Dossier in DB 💾' : 'Save Full Dossier 🚀'}
                      </button>
                    )}
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
