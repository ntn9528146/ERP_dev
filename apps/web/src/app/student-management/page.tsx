"use client";

import React, { useState, useEffect } from 'react';
import { useTenant } from '../../context/TenantContext';

interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  grade: string;
  section: string;
  rollNo: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  gender: string;
  bloodGroup?: string;
  feeStatus: string;
}

export default function StudentManagementPage() {
  const { activeSchool } = useTenant();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    grade: 'Grade 10',
    section: 'A',
    rollNo: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    gender: 'Male',
    bloodGroup: 'B+',
  });

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

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianPhone) return;

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
        setFormData({
          fullName: '',
          grade: 'Grade 10',
          section: 'A',
          rollNo: '',
          guardianName: '',
          guardianPhone: '',
          guardianEmail: '',
          gender: 'Male',
          bloodGroup: 'B+',
        });
        alert(`Success: ${result.data.fullName} registered into system!`);
      } else {
        alert(result.error || 'Failed to save student.');
      }
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Error connecting to database endpoint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.guardianPhone.includes(searchTerm);
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 01 • ACADEMIC CORE • POSTGRESQL CONNECTED
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Student Information System</h1>
            <p className="text-gray-400 text-sm mt-1">
              Live database queries, student profile lifecycle & academic registers.
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20"
          >
            + Register New Student (DB)
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search student by name, student code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
            />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Grades</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 12">Grade 12</option>
            </select>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Records: <span className="text-cyan-400 font-bold">{filteredStudents.length}</span> students
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Student Code</th>
                <th className="py-3.5 px-4">Full Name & Roll</th>
                <th className="py-3.5 px-4">Class & Sec</th>
                <th className="py-3.5 px-4">Guardian Phone</th>
                <th className="py-3.5 px-4">Gender & Blood</th>
                <th className="py-3.5 px-4">Fee Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 font-mono">Loading students...</td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-800/30">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{s.studentCode}</td>
                    <td className="py-3 px-4 text-white font-semibold">{s.fullName}</td>
                    <td className="py-3 px-4 text-gray-300">{s.grade} - {s.section}</td>
                    <td className="py-3 px-4 font-mono text-gray-300">{s.guardianPhone}</td>
                    <td className="py-3 px-4 text-gray-300">{s.gender} • {s.bloodGroup || 'B+'}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {s.feeStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Save Student to Database</h3>
              <form onSubmit={handleSaveStudent} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 mb-1">Class</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    >
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold">
                    {isSubmitting ? 'Saving...' : 'Save Student'}
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
