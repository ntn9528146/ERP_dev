"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface StudentAttendanceRecord {
  id: string;
  studentId: string;
  name: string;
  grade: string;
  section: string;
  guardianPhone: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  punchTime?: string;
  monthPercentage: number;
}

interface LeaveApplication {
  id: string;
  applicantType: 'Student' | 'Staff';
  applicantId: string;
  name: string;
  departmentOrClass: string;
  leaveType: 'Medical' | 'Casual (CL)' | 'Duty / Sports (OD)' | 'Emergency';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  appliedOn: string;
}

const initialStudentList: StudentAttendanceRecord[] = [
  { id: 'ATT-001', studentId: 'DG-2026-001', name: 'Aarav Sharma', grade: 'Grade 10', section: 'A', guardianPhone: '+91 98765 43210', status: 'Present', punchTime: '07:54 AM', monthPercentage: 94.5 },
  { id: 'ATT-002', studentId: 'DG-2026-002', name: 'Ananya Verma', grade: 'Grade 12', section: 'Science', guardianPhone: '+91 98765 43211', status: 'Present', punchTime: '07:48 AM', monthPercentage: 98.2 },
  { id: 'ATT-003', studentId: 'DG-2026-003', name: 'Rohan Mehra', grade: 'Grade 9', section: 'B', guardianPhone: '+91 98765 43212', status: 'Absent', punchTime: '—', monthPercentage: 68.0 },
  { id: 'ATT-004', studentId: 'DG-2026-004', name: 'Ishita Joshi', grade: 'Grade 11', section: 'Commerce', guardianPhone: '+91 98765 43213', status: 'Late', punchTime: '08:22 AM', monthPercentage: 86.4 },
  { id: 'ATT-005', studentId: 'DG-2026-005', name: 'Kabir Rawat', grade: 'Grade 8', section: 'A', guardianPhone: '+91 98765 43214', status: 'Leave', punchTime: 'Approved CL', monthPercentage: 91.0 },
];

const initialLeaves: LeaveApplication[] = [
  { id: 'LV-2026-441', applicantType: 'Student', applicantId: 'DG-2026-005', name: 'Kabir Rawat', departmentOrClass: 'Grade 8 - A', leaveType: 'Casual (CL)', fromDate: '2026-10-03', toDate: '2026-10-04', totalDays: 2, reason: 'Family medical visit to New Delhi', status: 'Approved', appliedOn: '2026-10-02' },
  { id: 'LV-2026-442', applicantType: 'Staff', applicantId: 'DG-FAC-104', name: 'Kavita Sundaram', departmentOrClass: 'Physics & Applied Science', leaveType: 'Duty / Sports (OD)', fromDate: '2026-10-04', toDate: '2026-10-06', totalDays: 3, reason: 'CBSE Regional Science Exhibition Evaluator', status: 'Pending', appliedOn: '2026-10-03' },
  { id: 'LV-2026-443', applicantType: 'Student', applicantId: 'DG-2026-003', name: 'Rohan Mehra', departmentOrClass: 'Grade 9 - B', leaveType: 'Medical', fromDate: '2026-10-01', toDate: '2026-10-03', totalDays: 3, reason: 'Viral fever rest advised by pediatrician', status: 'Pending', appliedOn: '2026-10-03' },
];

export default function AttendanceLeavePage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'daily' | 'leaves' | 'biometric' | 'defaulters'>('daily');
  const [selectedDate, setSelectedDate] = useState('2026-10-03');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(initialStudentList);
  const [leaves, setLeaves] = useState<LeaveApplication[]>(initialLeaves);
  const [showApplyLeaveModal, setShowApplyLeaveModal] = useState(false);

  // New Leave Form State
  const [newLeave, setNewLeave] = useState({
    name: '',
    applicantId: '',
    applicantType: 'Student' as 'Student' | 'Staff',
    departmentOrClass: 'Grade 10 - A',
    leaveType: 'Medical' as 'Medical' | 'Casual (CL)' | 'Duty / Sports (OD)' | 'Emergency',
    fromDate: '2026-10-05',
    toDate: '2026-10-06',
    totalDays: 2,
    reason: '',
  });

  // Dynamic KPI Stats
  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;
  const lateCount = students.filter((s) => s.status === 'Late').length;
  const dailyAttendanceRate = Math.round(((presentCount + lateCount) / totalStudents) * 100);

  const toggleStudentStatus = (id: string, newStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setStudents(
      students.map((s) =>
        s.id === id
          ? {
              ...s,
              status: newStatus,
              punchTime: newStatus === 'Present' ? '08:00 AM' : newStatus === 'Late' ? '08:25 AM' : '—',
            }
          : s
      )
    );
  };

  const handleApproveLeave = (leaveId: string) => {
    setLeaves(
      leaves.map((l) => (l.id === leaveId ? { ...l, status: 'Approved' } : l))
    );
    alert(`Leave application ${leaveId} verified & approved!`);
  };

  const handleRejectLeave = (leaveId: string) => {
    setLeaves(
      leaves.map((l) => (l.id === leaveId ? { ...l, status: 'Rejected' } : l))
    );
  };

  const handleCreateLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.name || !newLeave.reason) return;

    const application: LeaveApplication = {
      id: `LV-2026-${440 + leaves.length + 1}`,
      ...newLeave,
      totalDays: Number(newLeave.totalDays) || 1,
      status: 'Pending',
      appliedOn: '2026-10-03',
    };

    setLeaves([application, ...leaves]);
    setShowApplyLeaveModal(false);
    alert('Leave application submitted to Principal Desk for approval.');
  };

  const handleSendAbsentWhatsApp = (student: StudentAttendanceRecord) => {
    alert(`Instant parent alert dispatched: "Dear Parent, ${student.name} is marked ABSENT today (${selectedDate}) at ${activeSchool.name}. Reply to verify." -> Sent to ${student.guardianPhone}`);
  };

  const filteredStudents = students.filter((s) => {
    if (selectedGrade === 'All') return true;
    return s.grade === selectedGrade;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 07 • CAMPUS ATTENDANCE & LEAVE WORKFLOW
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Attendance & Leave Management</h1>
            <p className="text-gray-400 text-sm mt-1">
              Biometric machine synchronization, roll-call attendance registers, automated parent alert triggers & multi-tier leave desks.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => setShowApplyLeaveModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Apply Leave Request
            </button>
          </div>
        </div>

        {/* Operational Attendance KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Daily Attendance Rate</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{dailyAttendanceRate}% Present</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">{presentCount} On Time • {lateCount} Late</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Unexcused Absentees</span>
            <div className="text-2xl font-black text-rose-400 mt-1">{absentCount} Students</div>
            <span className="text-xs text-rose-500 font-mono mt-2 block">Instant WhatsApp Broadcast Ready</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Pending Leave Requests</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {leaves.filter((l) => l.status === 'Pending').length} Pending
            </div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Requires HOD / Principal Sign</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Biometric IoT Engine</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">4 Nodes Sync</div>
            <span className="text-xs text-cyan-500 font-mono mt-2 block">0.4s Real-Time Latency</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'daily' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📋 Daily Roll-Call Register ({filteredStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('leaves')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'leaves' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ✉️ Leave Applications Desk ({leaves.length})
          </button>
          <button
            onClick={() => setActiveTab('defaulters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'defaulters' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚠️ Below 75% CBSE Defaulters
          </button>
          <button
            onClick={() => setActiveTab('biometric')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'biometric' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚡ Biometric Machine IoT Telemetry
          </button>
        </div>

        {/* TAB 1: DAILY ROLL-CALL REGISTER */}
        {activeTab === 'daily' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Filter Grade:</span>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
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
                Date: <span className="text-cyan-400 font-bold">{selectedDate}</span> • Status switches apply instantly
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Student ID & Name</th>
                    <th className="py-3.5 px-4">Class & Section</th>
                    <th className="py-3.5 px-4">Biometric Punch Time</th>
                    <th className="py-3.5 px-4">Month Aggregate</th>
                    <th className="py-3.5 px-4">Status Selector</th>
                    <th className="py-3.5 px-4">Parent Alert Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{st.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{st.studentId}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{st.grade} - {st.section}</td>
                      <td className="py-3 px-4 font-mono text-gray-400">{st.punchTime}</td>
                      <td className="py-3 px-4 font-mono">
                        <span className={`font-bold ${st.monthPercentage < 75 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {st.monthPercentage}%
                        </span>
                        {st.monthPercentage < 75 && <span className="text-[10px] text-rose-500 block">Critical</span>}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          {(['Present', 'Absent', 'Late', 'Leave'] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => toggleStudentStatus(st.id, mode)}
                              className={`px-2 py-0.5 rounded border transition-all ${
                                st.status === mode
                                  ? mode === 'Present'
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                                    : mode === 'Absent'
                                    ? 'bg-rose-500/20 text-rose-400 border-rose-500'
                                    : mode === 'Late'
                                    ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                                    : 'bg-blue-500/20 text-cyan-400 border-cyan-500'
                                  : 'bg-gray-900/60 text-gray-500 border-gray-800 hover:text-gray-300'
                              }`}
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {st.status === 'Absent' && (
                          <button
                            onClick={() => handleSendAbsentWhatsApp(st)}
                            className="px-2.5 py-1 rounded bg-rose-950/70 border border-rose-800 hover:bg-rose-900 text-rose-200 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>📲</span> WhatsApp Notice
                          </button>
                        )}
                        {st.status !== 'Absent' && (
                          <span className="text-[11px] text-gray-500 font-mono">Automated Logged</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LEAVE APPLICATIONS WORKFLOW */}
        {activeTab === 'leaves' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-300">
                Institutional Leave Approval Vault • Verified by Vice Principal & Principal Secret Keys.
              </span>
              <button
                onClick={() => setShowApplyLeaveModal(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
              >
                + New Leave Request
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Application ID</th>
                    <th className="py-3.5 px-4">Applicant & Dept/Class</th>
                    <th className="py-3.5 px-4">Leave Category</th>
                    <th className="py-3.5 px-4">Duration & Days</th>
                    <th className="py-3.5 px-4">Reason Statement</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Approval Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {leaves.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400">
                        <div>{l.id}</div>
                        <div className="text-[10px] text-gray-500">Applied: {l.appliedOn}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{l.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{l.applicantId} • {l.departmentOrClass}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-xs">
                          {l.leaveType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300">
                        <div>{l.fromDate} to {l.toDate}</div>
                        <div className="text-cyan-400 text-[10px] font-bold">{l.totalDays} Day(s)</div>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs max-w-xs">{l.reason}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          l.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          l.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {l.status === 'Pending' ? (
                          <div className="flex items-center gap-2 font-mono">
                            <button
                              onClick={() => handleApproveLeave(l.id)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectLeave(l.id)}
                              className="px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-[11px] font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-[11px] text-gray-500 font-mono">Locked & Audited</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CBSE 75% DEFAULTER AUDIT */}
        {activeTab === 'defaulters' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">CBSE Mandatory 75% Minimum Attendance Audit</h3>
                <p className="text-xs text-gray-400">Students ineligible for upcoming board/mock examinations without medical condonation.</p>
              </div>
              <button
                onClick={() => alert('Official condonation notices exported.')}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-xs font-bold"
              >
                📥 Export Condonation Dossier
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {students.filter((s) => s.monthPercentage < 75).map((d) => (
                <div key={d.id} className="p-5 rounded-xl bg-[#030712] border border-rose-900/60 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{d.name}</span>
                    <span className="text-xs font-mono font-bold text-rose-400">{d.monthPercentage}%</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-mono">{d.studentId} • {d.grade} ({d.section})</div>
                  <div className="text-[11px] text-cyan-400 font-mono">Parent: {d.guardianPhone}</div>
                  <button
                    onClick={() => handleSendAbsentWhatsApp(d)}
                    className="w-full mt-2 py-1.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/80 text-[11px] font-semibold"
                  >
                    Issue Formal Warning Notice 📲
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BIOMETRIC IoT TELEMETRY */}
        {activeTab === 'biometric' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">Biometric Machine & RFID Scanner Gateways</h3>
              <p className="text-xs text-gray-400">Hardware telemetry processed in micro-bursts by Devgyan Go-Lang microservice.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">TERMINAL 01 (MAIN GATE)</span>
                <div className="text-emerald-400 font-bold">ONLINE (192.168.1.101)</div>
                <div className="text-[10px] text-gray-500">Last Ping: 2s ago • 1,140 Scans</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">TERMINAL 02 (FACULTY BLOCK)</span>
                <div className="text-emerald-400 font-bold">ONLINE (192.168.1.102)</div>
                <div className="text-[10px] text-gray-500">Last Ping: 1s ago • 146 Scans</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">TERMINAL 03 (JUNIOR WING)</span>
                <div className="text-emerald-400 font-bold">ONLINE (192.168.1.103)</div>
                <div className="text-[10px] text-gray-500">Last Ping: 4s ago • 680 Scans</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">TERMINAL 04 (LIBRARY GATE)</span>
                <div className="text-cyan-400 font-bold">SYNCING (192.168.1.104)</div>
                <div className="text-[10px] text-gray-500">Buffering local punches • 342 Scans</div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: APPLY LEAVE APPLICATION */}
        {showApplyLeaveModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Submit Official Leave Application</h3>
                <button onClick={() => setShowApplyLeaveModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateLeave} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Applicant Type</label>
                    <select
                      value={newLeave.applicantType}
                      onChange={(e) => setNewLeave({ ...newLeave, applicantType: e.target.value as any })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="Student">Student (Classroom)</option>
                      <option value="Staff">Faculty / Staff Member</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Category of Leave</label>
                    <select
                      value={newLeave.leaveType}
                      onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value as any })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="Medical">Medical Leave (Doctor Cert)</option>
                      <option value="Casual (CL)">Casual Leave (CL)</option>
                      <option value="Duty / Sports (OD)">On-Duty (OD) / Sports Event</option>
                      <option value="Emergency">Family Emergency</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Mehra"
                      value={newLeave.name}
                      onChange={(e) => setNewLeave({ ...newLeave, name: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. DG-2026-003"
                      value={newLeave.applicantId}
                      onChange={(e) => setNewLeave({ ...newLeave, applicantId: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">From Date</label>
                    <input
                      type="date"
                      value={newLeave.fromDate}
                      onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-2 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">To Date</label>
                    <input
                      type="date"
                      value={newLeave.toDate}
                      onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-2 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Total Days</label>
                    <input
                      type="number"
                      min="1"
                      value={newLeave.totalDays}
                      onChange={(e) => setNewLeave({ ...newLeave, totalDays: Number(e.target.value) })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-2 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Reason / Supporting Note *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Provide specific medical or personal reason..."
                    value={newLeave.reason}
                    onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowApplyLeaveModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20">
                    Submit Application
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
