"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

interface StaffMember {
  id: string;
  name: string;
  designation: string;
  dept: string;
  email: string;
  phone: string;
  workload: string;
  exp: string;
  status: 'On Duty' | 'On Leave' | 'Relieved';
  schoolId: string;
}

export default function StaffManagementPage() {
  const { activeSchool, currentUser } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Permission Check: Leadership (Principal, VP, Director) and Developer (Nitin) have full Add/Edit power
  const canManageStaff =
    currentUser?.role === 'DEVELOPER' ||
    currentUser?.role === 'SUPER_ADMIN' ||
    currentUser?.role === 'PRINCIPAL' ||
    currentUser?.role === 'DIRECTOR' ||
    currentUser?.role === 'COORDINATOR';

  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: 'DG-FAC-101', name: 'Dr. Rajesh Sharma', designation: 'Head of Department', dept: 'Computer Science & AI', email: 'rajesh.sharma@example.com', phone: '+91 98765 11001', workload: '18 Hrs/Wk', exp: '12 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-102', name: 'Pooja Bhatt', designation: 'Senior Faculty', dept: 'Mathematics & Computing', email: 'pooja.bhatt@example.com', phone: '+91 98765 11002', workload: '22 Hrs/Wk', exp: '8 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-103', name: 'Manoj Joshi', designation: 'Technical Coordinator', dept: 'Robotics & Embedded Systems', email: 'manoj.j@example.com', phone: '+91 98765 11003', workload: '20 Hrs/Wk', exp: '6 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-104', name: 'Ramesh Singh', designation: 'Campus Maintenance & Sanitation Staff', dept: 'Support & Sanitation', email: 'ramesh.support@arden.edu', phone: '+91 98765 11004', workload: 'Full Time', exp: '5 Yrs', status: 'On Duty', schoolId: 'arden-haldwani' },
    { id: 'DG-FAC-201', name: 'Virendra Joshi', designation: 'Principal & Academic Head', dept: 'Administration', email: 'principal@dpsnainital.edu', phone: '+91 98765 22001', workload: 'Administrative', exp: '16 Yrs', status: 'On Duty', schoolId: 'dps-nainital' },
    { id: 'DG-FAC-301', name: 'Pooja Pandey', designation: 'Managing Director', dept: 'Executive Management', email: 'director@jaiarihant.edu', phone: '+91 98765 33001', workload: 'Executive', exp: '15 Yrs', status: 'On Duty', schoolId: 'jai-arihant' },
  ]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: 'Teacher / Faculty',
    dept: 'Computer Science & AI',
    email: '',
    phone: '',
    workload: '20 Hrs/Wk',
    exp: '3 Yrs',
    status: 'On Duty' as StaffMember['status'],
  });

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';
  const targetSchoolId = isSuperAdmin ? activeSchool.id : (currentUser?.schoolId || activeSchool.id);

  // Strict School Isolation
  const filteredStaff = staffList.filter((s) => {
    const matchesSchool = s.schoolId === targetSchoolId;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.dept.includes(selectedDept);
    return matchesSchool && matchesSearch && matchesDept;
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: '',
      designation: 'Teacher / Faculty',
      dept: 'Computer Science & AI',
      email: '',
      phone: '',
      workload: '20 Hrs/Wk',
      exp: '2 Yrs',
      status: 'On Duty',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (st: StaffMember) => {
    setIsEditing(true);
    setEditingId(st.id);
    setFormData({
      name: st.name,
      designation: st.designation,
      dept: st.dept,
      email: st.email,
      phone: st.phone,
      workload: st.workload,
      exp: st.exp,
      status: st.status,
    });
    setShowModal(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Staff Name and Contact Phone are required!');
      return;
    }

    if (isEditing && editingId) {
      setStaffList(staffList.map((s) => s.id === editingId ? { ...s, ...formData } : s));
    } else {
      const newStaff: StaffMember = {
        id: `DG-STF-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        schoolId: targetSchoolId,
      };
      setStaffList([newStaff, ...staffList]);
    }
    setShowModal(false);
  };

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                STAFF DIRECTORY • {activeSchool.name.toUpperCase()}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Faculty & Staff Management</h1>
              <p className="text-gray-400 text-xs mt-1">
                Institutional employee ledger: Academic teachers, administrative personnel & support staff.
              </p>
            </div>

            {canManageStaff && (
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-500/20"
              >
                + Onboard New Staff / Employee
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
            <div className="flex gap-3 w-full sm:w-auto flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search staff by name, ID or email..."
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
                <option value="Administration">Administration</option>
                <option value="Support">Support & Sanitation</option>
              </select>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Staff Count: <strong className="text-cyan-400">{filteredStaff.length}</strong> members
            </div>
          </div>

          {/* Staff Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Faculty ID</th>
                  <th className="py-3 px-4">Name & Designation</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Contact Details</th>
                  <th className="py-3 px-4">Workload</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Status</th>
                  {canManageStaff && <th className="py-3 px-4 text-center">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500 font-mono">
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
                        <div className="text-cyan-400">{f.email || 'N/A'}</div>
                        <div className="text-gray-500 text-[10px]">{f.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 font-mono">{f.workload}</td>
                      <td className="py-3 px-4 text-gray-300">{f.exp}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ● {f.status}
                        </span>
                      </td>
                      {canManageStaff && (
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleOpenEdit(f)}
                            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold border border-gray-700"
                          >
                            ✏️ Edit Staff
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal for Add / Edit Staff */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <h3 className="text-base font-bold text-white">
                    {isEditing ? `Edit Staff: ${formData.name}` : `Onboard Staff into ${activeSchool.name}`}
                  </h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleSaveStaff} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PGT CS, Accountant, Sweeper"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Department</label>
                      <select
                        value={formData.dept}
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      >
                        <option>Computer Science & AI</option>
                        <option>Mathematics & Computing</option>
                        <option>Science Department</option>
                        <option>Administration</option>
                        <option>Accounts & Finance</option>
                        <option>Support & Sanitation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Email ID</label>
                      <input
                        type="email"
                        placeholder="staff@school.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Workload</label>
                      <input
                        type="text"
                        value={formData.workload}
                        onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Experience</label>
                      <input
                        type="text"
                        value={formData.exp}
                        onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      >
                        <option value="On Duty">On Duty</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Relieved">Relieved</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-800">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-bold text-white">
                      {isEditing ? 'Update Employee' : 'Add Employee'}
                    </button>
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
