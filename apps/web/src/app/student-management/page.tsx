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
  motherName: string;
  guardianPhone: string;
  guardianEmail?: string;
  residentialAddress: string;
  city: string;
  transportMode: string;
  feeStatus: string;
}

export default function StudentManagementPage() {
  const { activeSchool } = useTenant();
  const [students, setStudents] = useState<FullStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formTab, setFormTab] = useState<'academic' | 'personal' | 'parents' | 'residence'>('academic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    admissionNo: `SR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    apaarId: '',
    aadhaarNo: '',
    dateOfBirth: '2012-05-15',
    gender: 'Male',
    bloodGroup: 'B+',
    category: 'General',
    grade: 'Class 10 (Board)',
    stream: 'General',
    section: 'A',
    rollNo: '1001',
    enrolledSubjects: [] as string[],
    fatherName: '',
    fatherOccupation: 'Business / Professional',
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
    isHostelResident: false,
  });

  // Current selected class configuration
  const currentClassConfig = ACADEMIC_CLASSES.find((c) => c.name === formData.grade) || ACADEMIC_CLASSES[0];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      enrolledSubjects: currentClassConfig.defaultSubjects,
    }));
  }, [formData.grade]);

  // Real Database Fetch
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

  // Submit Handler
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianPhone || !formData.fatherName) {
      alert('Please fill student name, father name and guardian phone!');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tenantSchool: activeSchool.name,
        }),
      });

      const result = await res.json();
      if (result.success && result.data) {
        setStudents([result.data, ...students]);
        setShowAddModal(false);
        alert(`Success! Comprehensive Student Dossier for ${result.data.fullName} (${result.data.admissionNo}) saved in PostgreSQL!`);
      } else {
        alert(result.error || 'Failed to save student.');
      }
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Error connecting to database.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.admissionNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.studentCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.guardianPhone || '').includes(searchTerm);
    const matchesGrade = selectedGradeFilter === 'All' || s.grade === selectedGradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 01 • CBSE K-12 (NURSERY TO CLASS 12) • ENTERPRISE DOSSIER
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Student Information System & KYC Vault</h1>
            <p className="text-gray-400 text-sm mt-1">
              Complete student lifecycle: APAAR/PEN IDs, Aadhaar, parents dossier, transport and CBSE mapped subjects.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFormTab('academic');
                setShowAddModal(true);
              }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Register New Student (Full Dossier)
            </button>
          </div>
        </div>

        {/* Filter Bar with Nursery to 12th Selectors */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search by student name, SR/admission number, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
            />
            <select
              value={selectedGradeFilter}
              onChange={(e) => setSelectedGradeFilter(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400 max-w-xs"
            >
              <option value="All">All Classes (Nursery to 12th)</option>
              {ACADEMIC_CLASSES.map((cls) => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Active Candidates: <span className="text-cyan-400 font-bold">{filteredStudents.length}</span> students
          </div>
        </div>

        {/* Live Database Roster */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
              <tr>
                <th className="py-3.5 px-4">SR / Admission No</th>
                <th className="py-3.5 px-4">Student Profile & Roll</th>
                <th className="py-3.5 px-4">Class & Section</th>
                <th className="py-3.5 px-4">Parents & Contact</th>
                <th className="py-3.5 px-4">Mapped Subjects</th>
                <th className="py-3.5 px-4">Logistics / Transport</th>
                <th className="py-3.5 px-4">Fee Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-mono">
                    Loading records from PostgreSQL database...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-mono">
                    No student records found. Click "+ Register New Student" to add the first dossier!
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-800/30 transition-colors">
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
                    <td className="py-3 px-4 text-[11px] text-gray-300 max-w-xs truncate">
                      {s.enrolledSubjects && s.enrolledSubjects.length > 0 ? (
                        <span title={s.enrolledSubjects.join(', ')}>
                          {s.enrolledSubjects.slice(0, 2).join(', ')} +{s.enrolledSubjects.length - 2} more
                        </span>
                      ) : (
                        <span className="text-gray-500">Core CBSE Subjects</span>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL: FULL ENTERPRISE STUDENT DOSSIER FORM */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-3xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Full Student KYC & Admission Registration</h3>
                  <p className="text-xs text-gray-400">Official CBSE / State Board Institutional Dossier Profile</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white text-lg font-bold">✕</button>
              </div>

              {/* Form Navigation Tabs */}
              <div className="flex gap-2 border-b border-gray-800 pb-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setFormTab('academic')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    formTab === 'academic' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  1. Academic & Class
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
                  4. Address & Transport
                </button>
              </div>

              <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
                
                {/* TAB 1: ACADEMIC & CLASS */}
                {formTab === 'academic' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Target Class *</label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-medium focus:border-cyan-400"
                        >
                          {ACADEMIC_CLASSES.map((cls) => (
                            <option key={cls.id} value={cls.name}>{cls.name} ({cls.category})</option>
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
                        <label className="block text-gray-300 font-semibold mb-1">APAAR / PEN ID (Ministry of Edu)</label>
                        <input
                          type="text"
                          placeholder="e.g. PEN-2026-9988123"
                          value={formData.apaarId}
                          onChange={(e) => setFormData({ ...formData, apaarId: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                    </div>

                    {/* Dynamic CBSE Subjects Preview */}
                    <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono font-bold uppercase text-[11px]">
                          📚 AUTOMATICALLY MAPPED CBSE CURRICULUM SUBJECTS ({formData.grade}):
                        </span>
                        <span className="text-gray-500 font-mono text-[10px]">Auto-Synced</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentClassConfig.defaultSubjects.map((sub, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded bg-gray-900 border border-gray-700/80 text-gray-200 text-[11px] font-mono">
                            ✓ {sub}
                          </span>
                        ))}
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
                        placeholder="e.g. Aarav Rawat"
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
                          <option>Transgender / Other</option>
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
                          <option>OBC (Other Backward Classes)</option>
                          <option>SC (Scheduled Caste)</option>
                          <option>ST (Scheduled Tribe)</option>
                          <option>EWS (Economically Weaker Section)</option>
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
                          placeholder="e.g. Mukesh Rawat"
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
                        <label className="block text-gray-300 font-semibold mb-1">Mother's Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sunita Rawat"
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
                        <label className="block text-gray-300 font-semibold mb-1">Primary Guardian Phone (SMS / WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98XXXXXXXX"
                          value={formData.guardianPhone}
                          onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Parent Email</label>
                        <input
                          type="email"
                          placeholder="parent@example.com"
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
                      <label className="block text-gray-300 font-semibold mb-1">Residential Street Address *</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Mode of Transport</label>
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
                        <label className="block text-gray-300 font-semibold mb-1">Designated Bus Stoppage / Point</label>
                        <input
                          type="text"
                          value={formData.busStopName}
                          onChange={(e) => setFormData({ ...formData, busStopName: e.target.value })}
                          className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Footer Buttons */}
                <div className="pt-4 flex justify-between items-center border-t border-gray-800">
                  <div className="text-[11px] font-mono text-gray-400">
                    Step {formTab === 'academic' ? '1' : formTab === 'personal' ? '2' : formTab === 'parents' ? '3' : '4'} of 4
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
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
                        {isSubmitting ? 'Saving to Database...' : 'Save Full Dossier (PostgreSQL)'}
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
