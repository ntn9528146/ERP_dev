"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface StudentFeeRecord {
  challanNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  guardianPhone: string;
  tuitionFee: number;
  labFee: number;
  transportFee: number;
  discountWaiver: number;
  fineLate: number;
  totalPayable: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  paymentMode?: 'UPI / QR' | 'Net Banking' | 'Debit Card' | 'Cash Counter';
  transactionRef?: string;
  paidOn?: string;
}

const initialFeeRecords: StudentFeeRecord[] = [
  {
    challanNo: 'DG-CHN-2026-101',
    studentId: 'DG-2026-001',
    studentName: 'Aarav Sharma',
    grade: 'Grade 10',
    section: 'A',
    guardianPhone: '+91 98765 43210',
    tuitionFee: 24000,
    labFee: 3500,
    transportFee: 4500,
    discountWaiver: 0,
    fineLate: 0,
    totalPayable: 32000,
    paidAmount: 32000,
    dueDate: '2026-10-10',
    status: 'Paid',
    paymentMode: 'UPI / QR',
    transactionRef: 'UPI-20261001-9874',
    paidOn: '2026-10-01',
  },
  {
    challanNo: 'DG-CHN-2026-102',
    studentId: 'DG-2026-002',
    studentName: 'Ananya Verma',
    grade: 'Grade 12',
    section: 'Science',
    guardianPhone: '+91 98765 43211',
    tuitionFee: 30000,
    labFee: 5000,
    transportFee: 0,
    discountWaiver: 3000,
    fineLate: 0,
    totalPayable: 32000,
    paidAmount: 32000,
    dueDate: '2026-10-10',
    status: 'Paid',
    paymentMode: 'Net Banking',
    transactionRef: 'HDFC-TXN-77312',
    paidOn: '2026-10-02',
  },
  {
    challanNo: 'DG-CHN-2026-103',
    studentId: 'DG-2026-003',
    studentName: 'Rohan Mehra',
    grade: 'Grade 9',
    section: 'B',
    guardianPhone: '+91 98765 43212',
    tuitionFee: 22000,
    labFee: 2500,
    transportFee: 4000,
    discountWaiver: 0,
    fineLate: 450,
    totalPayable: 28950,
    paidAmount: 15000,
    dueDate: '2026-09-25',
    status: 'Partial',
    paymentMode: 'Cash Counter',
    transactionRef: 'RCPT-CASH-441',
    paidOn: '2026-09-28',
  },
  {
    challanNo: 'DG-CHN-2026-104',
    studentId: 'DG-2026-004',
    studentName: 'Ishita Joshi',
    grade: 'Grade 11',
    section: 'Commerce',
    guardianPhone: '+91 98765 43213',
    tuitionFee: 26000,
    labFee: 2000,
    transportFee: 4500,
    discountWaiver: 0,
    fineLate: 600,
    totalPayable: 33100,
    paidAmount: 0,
    dueDate: '2026-09-20',
    status: 'Overdue',
  },
  {
    challanNo: 'DG-CHN-2026-105',
    studentId: 'DG-2026-005',
    studentName: 'Kabir Rawat',
    grade: 'Grade 8',
    section: 'A',
    guardianPhone: '+91 98765 43214',
    tuitionFee: 20000,
    labFee: 2000,
    transportFee: 3500,
    discountWaiver: 2000,
    fineLate: 0,
    totalPayable: 23500,
    paidAmount: 23500,
    dueDate: '2026-10-10',
    status: 'Paid',
    paymentMode: 'Debit Card',
    transactionRef: 'POS-SWIPE-9902',
    paidOn: '2026-10-03',
  },
];

export default function FeeManagementPage() {
  const { activeSchool } = useTenant();

  const [records, setRecords] = useState<StudentFeeRecord[]>(initialFeeRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [activeTab, setActiveTab] = useState<'collection' | 'defaulters' | 'structure' | 'concessions'>('collection');
  
  const [viewingReceipt, setViewingReceipt] = useState<StudentFeeRecord | null>(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [targetStudent, setTargetStudent] = useState<StudentFeeRecord | null>(null);

  // New Collection Form State
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectMode, setCollectMode] = useState<'UPI / QR' | 'Net Banking' | 'Debit Card' | 'Cash Counter'>('UPI / QR');

  // KPI Calculations
  const totalExpected = records.reduce((acc, c) => acc + c.totalPayable, 0);
  const totalCollected = records.reduce((acc, c) => acc + c.paidAmount, 0);
  const totalOutstanding = totalExpected - totalCollected;
  const overdueCount = records.filter((r) => r.status === 'Overdue' || r.status === 'Partial').length;

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.challanNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    const matchesGrade = selectedGrade === 'All' || r.grade === selectedGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const handleOpenCollectModal = (record: StudentFeeRecord) => {
    setTargetStudent(record);
    setCollectAmount(record.totalPayable - record.paidAmount);
    setShowCollectModal(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent) return;

    const newPaidAmount = targetStudent.paidAmount + Number(collectAmount);
    const newStatus = newPaidAmount >= targetStudent.totalPayable ? 'Paid' : 'Partial';

    setRecords(
      records.map((r) =>
        r.challanNo === targetStudent.challanNo
          ? {
              ...r,
              paidAmount: newPaidAmount,
              status: newStatus,
              paymentMode: collectMode,
              transactionRef: `DG-PAY-${Date.now().toString().slice(-6)}`,
              paidOn: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );

    setShowCollectModal(false);
    alert(`Fee payment of ₹${collectAmount.toLocaleString('en-IN')} processed successfully for ${targetStudent.studentName}!`);
  };

  const handleSendReminderSMS = (student: StudentFeeRecord) => {
    alert(`Automated WhatsApp & SMS Fee Notice dispatched to ${student.guardianPhone} for ${student.studentName} (Pending ₹${(student.totalPayable - student.paidAmount).toLocaleString('en-IN')})`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 05 • FINANCIAL AUTOMATION
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Fee Management & Billing Desk</h1>
            <p className="text-gray-400 text-sm mt-1">
              Automated multi-head invoicing, real-time UPI collection gateways, fine auditor & paperless tax receipts.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Exporting Term-2 Institutional Fee Ledger to CSV / Tally format.')}
              className="px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-xs font-semibold text-gray-300"
            >
              📥 Export Ledger (Tally)
            </button>
            <button
              onClick={() => {
                const defaulters = records.filter((r) => r.status !== 'Paid');
                alert(`Broadcast Fee Reminder dispatched to all ${defaulters.length} pending parents via WhatsApp.`);
              }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>📲</span> Broadcast Defaulter Alerts
            </button>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Fee Realized This Quarter</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹{totalCollected.toLocaleString('en-IN')}</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">
              {Math.round((totalCollected / totalExpected) * 100)}% Realization Rate
            </span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Total Term Receivables</span>
            <div className="text-2xl font-black text-white mt-1">₹{totalExpected.toLocaleString('en-IN')}</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">Gross Billed Challans</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Pending Uncollected Dues</span>
            <div className="text-2xl font-black text-rose-400 mt-1">₹{totalOutstanding.toLocaleString('en-IN')}</div>
            <span className="text-xs text-rose-500 font-mono mt-2 block">{overdueCount} Students Pending</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Late Fines Accumulated</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              ₹{records.reduce((acc, c) => acc + c.fineLate, 0).toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Auto-Computed @ ₹25/Day</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('collection')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'collection' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            💳 Student Challans & Collections ({records.length})
          </button>
          <button
            onClick={() => setActiveTab('defaulters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'defaulters' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚠️ Pending Defaulter Desk ({overdueCount})
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'structure' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🏛 Multi-Head Fee Structures
          </button>
          <button
            onClick={() => setActiveTab('concessions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'concessions' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🎁 Sibling & Merit Concessions
          </button>
        </div>

        {/* TAB 1: CHALLANS & COLLECTIONS */}
        {activeTab === 'collection' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search student name, ID, or Challan No..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Overdue">Overdue</option>
                </select>
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
                Showing <span className="text-cyan-400 font-bold">{filteredRecords.length}</span> challans
              </div>
            </div>

            {/* Invoicing Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Challan No.</th>
                    <th className="py-3.5 px-4">Student & Class</th>
                    <th className="py-3.5 px-4">Breakdown (Tuition+Lab+Bus)</th>
                    <th className="py-3.5 px-4">Fine / Waiver</th>
                    <th className="py-3.5 px-4">Total Billed</th>
                    <th className="py-3.5 px-4">Paid / Due</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredRecords.map((r) => {
                    const balance = r.totalPayable - r.paidAmount;
                    return (
                      <tr key={r.challanNo} className="hover:bg-gray-800/30 transition-colors">
                        <td className="py-3 px-4 font-mono text-cyan-400">
                          <div>{r.challanNo}</div>
                          <div className="text-[10px] text-gray-500 font-mono">Due: {r.dueDate}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white font-semibold">{r.studentName}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{r.studentId} • {r.grade} ({r.section})</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-300 text-[11px]">
                          <div>Tuition: ₹{r.tuitionFee.toLocaleString('en-IN')}</div>
                          <div>Lab/Bus: ₹{(r.labFee + r.transportFee).toLocaleString('en-IN')}</div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {r.discountWaiver > 0 && (
                            <span className="text-emerald-400 block">-₹{r.discountWaiver.toLocaleString('en-IN')} Waiver</span>
                          )}
                          {r.fineLate > 0 && (
                            <span className="text-rose-400 block">+₹{r.fineLate} Late Fine</span>
                          )}
                          {r.discountWaiver === 0 && r.fineLate === 0 && (
                            <span className="text-gray-500">₹0</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-white font-bold text-xs">
                          ₹{r.totalPayable.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs">
                          <div className="text-emerald-400 font-semibold">₹{r.paidAmount.toLocaleString('en-IN')} Paid</div>
                          {balance > 0 ? (
                            <div className="text-rose-400 font-bold">₹{balance.toLocaleString('en-IN')} Due</div>
                          ) : (
                            <div className="text-gray-500 text-[10px]">Zero Balance</div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            r.status === 'Partial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                            'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {r.status !== 'Paid' && (
                              <button
                                onClick={() => handleOpenCollectModal(r)}
                                className="px-2.5 py-1 rounded bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-[11px] shadow-sm hover:opacity-90"
                              >
                                Collect Fee
                              </button>
                            )}
                            {r.paidAmount > 0 && (
                              <button
                                onClick={() => setViewingReceipt(r)}
                                className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                              >
                                Receipt
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DEFAULTER AUDIT DESK */}
        {activeTab === 'defaulters' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-rose-300">Automated Parent Fee Escalation Engine</h3>
                <p className="text-xs text-gray-400">Direct integration with DEVGYAN INNOVATION SMS & WhatsApp Telephony Gateways.</p>
              </div>
              <div className="text-xs font-mono text-gray-300">
                Grace Period: <span className="text-white font-bold">5 Days</span> | Late Penalty: <span className="text-amber-400 font-bold">₹25 / Day</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Student Name</th>
                    <th className="py-3.5 px-4">Class</th>
                    <th className="py-3.5 px-4">Guardian Contact</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Outstanding Due</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {records.filter((r) => r.status !== 'Paid').map((d) => (
                    <tr key={d.challanNo} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-semibold text-white">{d.studentName}</td>
                      <td className="py-3 px-4 text-gray-300">{d.grade} - {d.section}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400">{d.guardianPhone}</td>
                      <td className="py-3 px-4 font-mono text-rose-400">{d.dueDate}</td>
                      <td className="py-3 px-4 font-mono text-rose-300 font-bold">
                        ₹{(d.totalPayable - d.paidAmount).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleSendReminderSMS(d)}
                          className="px-3 py-1 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-semibold"
                        >
                          Send WhatsApp Reminder 💬
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MULTI-HEAD FEE STRUCTURES */}
        {activeTab === 'structure' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Configured Institutional Fee Heads (2026-27 Session)</h3>
                <p className="text-xs text-gray-400">Head-wise allocation mapped to academic programs & laboratory tiers.</p>
              </div>
              <button onClick={() => alert('New Fee Head modal ready.')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-xs font-bold">
                + Add Custom Fee Head
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">HEAD 01 • ACADEMIC TUITION</span>
                <div className="text-xl font-bold text-white">₹20,000 - ₹30,000 / Term</div>
                <p className="text-xs text-gray-400">Standard faculty, classroom infrastructure and study material allotment.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">HEAD 02 • COMPUTER & AI LAB</span>
                <div className="text-xl font-bold text-white">₹2,500 - ₹5,000 / Term</div>
                <p className="text-xs text-gray-400">High-speed internet, workstation access, robotics kit licensing & consumables.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 font-bold">HEAD 03 • TRANSPORT FLEET</span>
                <div className="text-xl font-bold text-white">₹3,500 - ₹5,500 / Term</div>
                <p className="text-xs text-gray-400">Distance-based route calculation with live GPS parent app tracking.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONCESSIONS */}
        {activeTab === 'concessions' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Institutional Concession & Scholarship Matrix</h3>
            <p className="text-xs text-gray-400">Automated policy checks applied during Challan generation.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <div className="font-bold text-emerald-400 text-sm">Sibling Concession Rule (25% on Younger Child)</div>
                <p className="text-xs text-gray-400">Automatically verifies parent contact & Aadhaar records across enrolled siblings.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <div className="font-bold text-cyan-400 text-sm">Merit & Sports Excellence Waiver (10% - 100%)</div>
                <p className="text-xs text-gray-400">Requires digital sign-off from Principal / Vice Principal desk.</p>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: FEE COLLECTION COUNTER DESK */}
        {showCollectModal && targetStudent && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Collect Fee Payment</h3>
                  <p className="text-xs text-gray-400">{targetStudent.studentName} • {targetStudent.challanNo}</p>
                </div>
                <button onClick={() => setShowCollectModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleProcessPayment} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#030712] border border-gray-800 flex justify-between items-center font-mono">
                  <span className="text-gray-400">Total Outstanding Balance:</span>
                  <span className="text-rose-400 font-bold text-sm">
                    ₹{(targetStudent.totalPayable - targetStudent.paidAmount).toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Payment Collection Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={targetStudent.totalPayable - targetStudent.paidAmount}
                    value={collectAmount}
                    onChange={(e) => setCollectAmount(Number(e.target.value))}
                    className="w-full bg-[#030712] border border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-cyan-300 font-mono text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Payment Mode Gateway *</label>
                  <select
                    value={collectMode}
                    onChange={(e) => setCollectMode(e.target.value as any)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="UPI / QR">UPI Dynamic QR Code (PhonePe, GPay, Paytm)</option>
                    <option value="Net Banking">Net Banking / NEFT / RTGS</option>
                    <option value="Debit Card">POS Debit / Credit Card Terminal</option>
                    <option value="Cash Counter">Cash Desk Deposit</option>
                  </select>
                </div>

                {collectMode === 'UPI / QR' && (
                  <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center space-y-2">
                    <div className="w-28 h-28 mx-auto bg-white rounded-lg p-2 flex items-center justify-center">
                      {/* Stylized QR simulation */}
                      <div className="w-full h-full border-4 border-black flex flex-col justify-between p-1">
                        <div className="flex justify-between">
                          <span className="w-4 h-4 bg-black"></span>
                          <span className="w-4 h-4 bg-black"></span>
                        </div>
                        <div className="text-[8px] font-black font-mono text-black">DEVGYAN PAY</div>
                        <div className="flex justify-between">
                          <span className="w-4 h-4 bg-black"></span>
                          <span className="w-4 h-4 bg-black"></span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono block">
                      Scan to Pay ₹{collectAmount.toLocaleString('en-IN')} via any UPI App
                    </span>
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowCollectModal(false)}
                    className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    Confirm & Print Receipt
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: PRINTABLE OFFICIAL FEE RECEIPT */}
        {viewingReceipt && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl">
              
              {/* Receipt Header */}
              <div className="flex justify-between items-start border-b border-gray-800 pb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    DEVGYAN INNOVATION • FEE RECEIPT & TAX INVOICE
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{activeSchool.name}</h3>
                  <p className="text-xs text-gray-400">Academic Session 2026-27 • Halwani Campus</p>
                </div>
                <button
                  onClick={() => setViewingReceipt(null)}
                  className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Receipt Details Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#030712] border border-gray-800 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Receipt / Challan</span>
                  <span className="text-cyan-400 font-bold">{viewingReceipt.challanNo}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Student ID</span>
                  <span className="text-white font-bold">{viewingReceipt.studentId}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Class & Sec</span>
                  <span className="text-white">{viewingReceipt.grade} ({viewingReceipt.section})</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Payment Date</span>
                  <span className="text-emerald-400 font-bold">{viewingReceipt.paidOn || '2026-10-03'}</span>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="border border-gray-800 rounded-xl overflow-hidden text-xs">
                <div className="bg-gray-950 p-2.5 font-bold text-gray-400 flex justify-between">
                  <span>Particulars / Fee Head</span>
                  <span>Amount (INR)</span>
                </div>
                <div className="divide-y divide-gray-800 p-2 space-y-1 font-mono">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-300">Tuition Fee</span>
                    <span>₹{viewingReceipt.tuitionFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-300">Computer & AI Lab Fee</span>
                    <span>₹{viewingReceipt.labFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-300">Transport Fleet Facility</span>
                    <span>₹{viewingReceipt.transportFee.toLocaleString('en-IN')}</span>
                  </div>
                  {viewingReceipt.discountWaiver > 0 && (
                    <div className="flex justify-between py-1 text-emerald-400">
                      <span>Concession Waiver Applied</span>
                      <span>-₹{viewingReceipt.discountWaiver.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {viewingReceipt.fineLate > 0 && (
                    <div className="flex justify-between py-1 text-rose-400">
                      <span>Late Payment Fine</span>
                      <span>+₹{viewingReceipt.fineLate.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Success Total */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Total Amount Received</span>
                  <span className="text-xl font-black text-emerald-400">₹{viewingReceipt.paidAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right text-[11px] font-mono text-gray-300">
                  <div>Mode: <span className="text-cyan-400 font-bold">{viewingReceipt.paymentMode || 'UPI / QR'}</span></div>
                  <div>Ref: {viewingReceipt.transactionRef || 'DG-TXN-1002'}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200"
                >
                  🖨 Print Invoice
                </button>
                <button
                  onClick={() => setViewingReceipt(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
