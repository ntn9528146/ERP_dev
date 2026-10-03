"use client";

import React, { useState } from 'react';

interface StaffMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  weeklyWorkload: number;
  status: 'On Duty' | 'On Leave' | 'Field Work';
  experience: string;
}

const initialStaffList: StaffMember[] = [
  { id: 'DG-FAC-101', name: 'Dr. Rajesh Sharma', department: 'Computer Science & AI', designation: 'Head of Department', email: 'rajesh.sharma@example.com', phone: '+91 98765 11001', weeklyWorkload: 18, status: 'On Duty', experience: '12 Yrs' },
  { id: 'DG-FAC-102', name: 'Pooja Bhatt', department: 'Mathematics & Computing', designation: 'Senior Faculty', email: 'pooja.bhatt@example.com', phone: '+91 98765 11002', weeklyWorkload: 22, status: 'On Duty', experience: '8 Yrs' },
  { id: 'DG-FAC-103', name: 'Manoj Joshi', department: 'Robotics & Embedded Systems', designation: 'Technical Coordinator', email: 'manoj.j@example.com', phone: '+91 98765 11003', weeklyWorkload: 20, status: 'On Duty', experience: '6 Yrs' },
  { id: 'DG-FAC-104', name: 'Kavita Sundaram', department: 'Physics & Applied Science', designation: 'Assistant Professor', email: 'kavita.s@example.com', phone: '+91 98765 11004', weeklyWorkload: 16, status: 'On Leave', experience: '5 Yrs' },
  { id: 'DG-FAC-105', name: 'Vikram Singh Negi', department: 'Physical Education & Sports', designation: 'Sports Director', email: 'vikram.negi@example.com', phone: '+91 98765 11005', weeklyWorkload: 14, status: 'Field Work', experience: '9 Yrs' },
];

export default function StaffManagementPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaffList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newStaff, setNewStaff] = useState({
    name: '',
    department: 'Computer Science & AI',
    designation: 'Faculty',
    email: '',
    phone: '',
    weeklyWorkload: 18,
    experience: '3 Yrs',
  });

  const filteredStaff = staffList.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || staff.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const record: StaffMember = {
      id: `DG-FAC-${100 + staffList.length + 1}`,
      name: newStaff.name,
      department: newStaff.department,
      designation: newStaff.designation,
      email: newStaff.email,
      phone: newStaff.phone || '+91 98000 00000',
      weeklyWorkload: Number(newStaff.weeklyWorkload) || 18,
      status: 'On Duty',
      experience: newStaff.experience,
    };

    setStaffList([record, ...staffList]);
    setNewStaff({ name: '', department: 'Computer Science & AI', designation: 'Faculty', email: '', phone: '', weeklyWorkload: 18, experience: '3 Yrs' });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 02 • HUMAN CAPITAL & FACULTY
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Staff & Faculty Management</h1>
            <p className="text-gray-400 text-sm mt-1">
              Institutional staff directory, department allocations, workload matrices & biometric logging.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-sm rounded-lg shadow-lg shadow-cyan-500/20 transition-all text-white flex items-center gap-1.5"
            >
              <span>+</span> Add Faculty Member
            </button>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Total Faculty & Staff</span>
            <div className="text-2xl font-black text-white mt-1">146 Members</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">100% KYC Verified</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Today's Attendance</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">142 Present</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">97.2% Punch Rate</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Approved Leaves</span>
            <div className="text-2xl font-black text-amber-400 mt-1">04 Staff</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Proxy Lecturers Assigned</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Avg Workload / Week</span>
            <div className="text-2xl font-black text-blue-400 mt-1">19.4 Hrs</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Balanced Allocation</span>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search faculty by name, ID or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
            />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-sm text-gray-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Departments</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
              <option value="Mathematics & Computing">Mathematics & Computing</option>
              <option value="Robotics & Embedded Systems">Robotics & Embedded Systems</option>
              <option value="Physics & Applied Science">Physics & Applied Science</option>
              <option value="Physical Education & Sports">Physical Education & Sports</option>
            </select>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Showing <span className="text-cyan-400 font-bold">{filteredStaff.length}</span> faculty members
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-950/80 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Faculty ID</th>
                <th className="py-3.5 px-4">Name & Designation</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Workload</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {filteredStaff.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-cyan-400">{item.id}</td>
                  <td className="py-3 px-4">
                    <div className="text-white font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.designation}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-300 text-xs">{item.department}</td>
                  <td className="py-3 px-4">
                    <div className="text-gray-300 text-xs font-mono">{item.email}</div>
                    <div className="text-gray-500 text-[11px] font-mono">{item.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-mono font-semibold text-white">{item.weeklyWorkload} Hrs/Wk</span>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-gray-300">{item.experience}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.status === 'On Duty' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      item.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Add Faculty Member */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-lg font-bold text-white">Onboard New Faculty Member</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateStaff} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="e.g. Dr. Sunita Rawat"
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
                    <select
                      value={newStaff.department}
                      onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    >
                      <option>Computer Science & AI</option>
                      <option>Mathematics & Computing</option>
                      <option>Robotics & Embedded Systems</option>
                      <option>Physics & Applied Science</option>
                      <option>Physical Education & Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Designation</label>
                    <input
                      type="text"
                      value={newStaff.designation}
                      onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      value={newStaff.email}
                      onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                      placeholder="faculty@devgyan.com"
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={newStaff.phone}
                      onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                      placeholder="+91 98XXXXXXXX"
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Workload (Hrs/Week)</label>
                    <input
                      type="number"
                      value={newStaff.weeklyWorkload}
                      onChange={(e) => setNewStaff({ ...newStaff, weeklyWorkload: Number(e.target.value) })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Experience</label>
                    <input
                      type="text"
                      value={newStaff.experience}
                      onChange={(e) => setNewStaff({ ...newStaff, experience: e.target.value })}
                      placeholder="e.g. 5 Yrs"
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-500/20"
                  >
                    Save & Allocate
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
