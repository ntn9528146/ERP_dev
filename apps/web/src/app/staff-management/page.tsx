"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function StaffManagementPage() {
  const { activeSchool, currentUser } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const staffMembers = [
    { id: 'DG-FAC-101', name: 'Dr. Rajesh Sharma', designation: 'Head of Department', dept: 'Computer Science & AI', email: 'rajesh.sharma@example.com', phone: '+91 98765 11001', workload: '18 Hrs/Wk', exp: '12 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-102', name: 'Pooja Bhatt', designation: 'Senior Faculty', dept: 'Mathematics & Computing', email: 'pooja.bhatt@example.com', phone: '+91 98765 11002', workload: '22 Hrs/Wk', exp: '8 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-103', name: 'Manoj Joshi', designation: 'Technical Coordinator', dept: 'Robotics & Embedded Systems', email: 'manoj.j@example.com', phone: '+91 98765 11003', workload: '20 Hrs/Wk', exp: '6 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-201', name: 'Alok Kothari', designation: 'PGT Physics', dept: 'Science Department', email: 'alok@dpsnainital.edu', phone: '+91 98765 22001', workload: '20 Hrs/Wk', exp: '10 Yrs', status: 'On Duty', schoolId: 'dps-nainital' },
    { id: 'DG-FAC-301', name: 'Sunita Rawat', designation: 'Vice Principal', dept: 'Administration', email: 'sunita@jaiarihant.edu', phone: '+91 98765 33001', workload: '15 Hrs/Wk', exp: '14 Yrs', status: 'On Duty', schoolId: 'jai-arihant' },
  ];

  // Strict School Isolation
  const filteredStaff = staffMembers.filter((s) => {
    const matchesSchool = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN'
      ? s.schoolId === activeSchool.id
      : s.schoolId === currentUser?.schoolId;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.dept.includes(selectedDept);
    return matchesSchool && matchesSearch && matchesDept;
  });

  return (
    <ConfidentialGuard allowedRoles={['DEVELOPER', 'SUPER_ADMIN', 'PRINCIPAL', 'DIRECTOR', 'COORDINATOR']}>
      <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                  STAFF REPOSITORY • {activeSchool.name.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Faculty & Staff Management</h1>
              <p className="text-gray-400 text-xs mt-1">
                Institutional employee ledger strictly restricted to School Leadership & Management.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
            <div className="flex gap-3 w-full sm:w-auto flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search faculty by name, ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
              />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science & AI</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Robotics">Robotics</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Staff Count: <span className="text-cyan-400 font-bold">{filteredStaff.length}</span> faculty members
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Faculty ID</th>
                  <th className="py-3 px-4">Name & Designation</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Contact Details</th>
                  <th className="py-3 px-4">Workload</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 font-mono">
                      No staff records found for this campus.
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{f.id}</td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{f.name}</div>
                        <div className="text-[10px] text-gray-400">{f.designation}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{f.dept}</td>
                      <td className="py-3 px-4 font-mono">
                        <div className="text-cyan-400">{f.email}</div>
                        <div className="text-gray-500 text-[10px]">{f.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 font-mono">{f.workload}</td>
                      <td className="py-3 px-4 text-gray-300">{f.exp}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ● {f.status}
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
