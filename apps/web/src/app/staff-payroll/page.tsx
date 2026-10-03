"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface PayrollRecord {
  id: string;
  staffId: string;
  name: string;
  designation: string;
  department: string;
  bankAccount: string;
  ifsc: string;
  basicPay: number;
  hra: number;
  da: number;
  specialAllowance: number;
  pfDeduction: number;
  taxDeduction: number;
  unpaidLeaveDays: number;
  status: 'Disbursed' | 'Approved' | 'Draft';
  paymentDate: string;
}

const initialPayrollData: PayrollRecord[] = [
  {
    id: 'PAY-2026-10-01',
    staffId: 'DG-FAC-101',
    name: 'Dr. Rajesh Sharma',
    designation: 'Head of Department',
    department: 'Computer Science & AI',
    bankAccount: '•••• •••• 4819',
    ifsc: 'SBIN0001248',
    basicPay: 55000,
    hra: 16500,
    da: 11000,
    specialAllowance: 6500,
    pfDeduction: 6600,
    taxDeduction: 4500,
    unpaidLeaveDays: 0,
    status: 'Disbursed',
    paymentDate: '2026-10-01',
  },
  {
    id: 'PAY-2026-10-02',
    staffId: 'DG-FAC-102',
    name: 'Pooja Bhatt',
    designation: 'Senior Faculty',
    department: 'Mathematics & Computing',
    bankAccount: '•••• •••• 9924',
    ifsc: 'HDFC0000312',
    basicPay: 46000,
    hra: 13800,
    da: 9200,
    specialAllowance: 4000,
    pfDeduction: 5520,
    taxDeduction: 2800,
    unpaidLeaveDays: 1,
    status: 'Disbursed',
    paymentDate: '2026-10-01',
  },
  {
    id: 'PAY-2026-10-03',
    staffId: 'DG-FAC-103',
    name: 'Manoj Joshi',
    designation: 'Technical Coordinator',
    department: 'Robotics & Embedded Systems',
    bankAccount: '•••• •••• 1042',
    ifsc: 'PUNB0024900',
    basicPay: 42000,
    hra: 12600,
    da: 8400,
    specialAllowance: 3500,
    pfDeduction: 5040,
    taxDeduction: 2100,
    unpaidLeaveDays: 0,
    status: 'Approved',
    paymentDate: '2026-10-04',
  },
  {
    id: 'PAY-2026-10-04',
    staffId: 'DG-FAC-104',
    name: 'Kavita Sundaram',
    designation: 'Assistant Professor',
    department: 'Physics & Applied Science',
    bankAccount: '•••• •••• 7731',
    ifsc: 'ICIC0000941',
    basicPay: 38000,
    hra: 11400,
    da: 7600,
    specialAllowance: 3000,
    pfDeduction: 4560,
    taxDeduction: 1500,
    unpaidLeaveDays: 2,
    status: 'Approved',
    paymentDate: '2026-10-04',
  },
  {
    id: 'PAY-2026-10-05',
    staffId: 'DG-FAC-105',
    name: 'Vikram Singh Negi',
    designation: 'Sports Director',
    department: 'Physical Education & Sports',
    bankAccount: '•••• •••• 3318',
    ifsc: 'BARB0HALDWA',
    basicPay: 36000,
    hra: 10800,
    da: 7200,
    specialAllowance: 2500,
    pfDeduction: 4320,
    taxDeduction: 1200,
    unpaidLeaveDays: 0,
    status: 'Draft',
    paymentDate: 'Pending Run',
  },
];

export default function StaffPayrollPage() {
  const { activeSchool } = useTenant();

  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(initialPayrollData);
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewingSlip, setViewingSlip] = useState<PayrollRecord | null>(null);
  const [showRunPayrollModal, setShowRunPayrollModal] = useState(false);

  // Quick computation helpers
  const calculateGross = (p: PayrollRecord) => p.basicPay + p.hra + p.da + p.specialAllowance;
  const calculateLOP = (p: PayrollRecord) => Math.round((p.basicPay / 30) * p.unpaidLeaveDays);
  const calculateTotalDeductions = (p: PayrollRecord) => p.pfDeduction + p.taxDeduction + calculateLOP(p);
  const calculateNetPay = (p: PayrollRecord) => calculateGross(p) - calculateTotalDeductions(p);

  const totalGrossDisbursement = payrolls.reduce((acc, curr) => acc + calculateGross(curr), 0);
  const totalNetDisbursement = payrolls.reduce((acc, curr) => acc + calculateNetPay(curr), 0);
  const totalPFAccumulated = payrolls.reduce((acc, curr) => acc + curr.pfDeduction, 0);
  const totalTDS = payrolls.reduce((acc, curr) => acc + curr.taxDeduction, 0);

  const filteredPayrolls = payrolls.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRunPayroll = () => {
    setPayrolls(
      payrolls.map((p) => ({
        ...p,
        status: 'Disbursed',
        paymentDate: '2026-10-03',
      }))
    );
    setShowRunPayrollModal(false);
    alert(`Monthly Payroll for ${selectedMonth} computed and disbursed to bank gateway!`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 04 • FINANCIAL OPERATIONS
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Staff & Payroll Engine</h1>
            <p className="text-gray-400 text-sm mt-1">
              Automated salary computation, statutory compliance (PF, ESI, TDS), LOP sync & direct electronic bank slips.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option>October 2026</option>
              <option>September 2026</option>
              <option>August 2026</option>
            </select>
            <button
              onClick={() => setShowRunPayrollModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>⚡</span> Run Monthly Payroll
            </button>
          </div>
        </div>

        {/* Financial KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Net Payout This Cycle</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹{totalNetDisbursement.toLocaleString('en-IN')}</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">100% Direct Bank Transfer</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Gross Institutional Cost</span>
            <div className="text-2xl font-black text-white mt-1">₹{totalGrossDisbursement.toLocaleString('en-IN')}</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Basic + HRA + DA + Allowances</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">EPF Statutory Remittance</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">₹{totalPFAccumulated.toLocaleString('en-IN')}</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">12% Employee Contribution</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Income Tax (TDS) Holding</span>
            <div className="text-2xl font-black text-amber-400 mt-1">₹{totalTDS.toLocaleString('en-IN')}</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Form 16 Real-Time Ledger</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search faculty name, staff ID, or department..."
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
              <option value="Disbursed">Disbursed</option>
              <option value="Approved">Approved</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Roster: <span className="text-cyan-400 font-bold">{filteredPayrolls.length}</span> staff entries
          </div>
        </div>

        {/* Payroll Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Staff ID & Name</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Gross Salary</th>
                <th className="py-3.5 px-4">Deductions (PF+Tax+LOP)</th>
                <th className="py-3.5 px-4">Net Payable</th>
                <th className="py-3.5 px-4">Bank Account</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {filteredPayrolls.map((row) => {
                const gross = calculateGross(row);
                const deductions = calculateTotalDeductions(row);
                const net = calculateNetPay(row);
                return (
                  <tr key={row.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{row.name}</div>
                      <div className="text-[11px] font-mono text-cyan-400">{row.staffId} • {row.designation}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-xs">{row.department}</td>
                    <td className="py-3 px-4 font-mono text-white font-semibold">
                      ₹{gross.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-rose-400 text-xs">
                      -₹{deductions.toLocaleString('en-IN')}
                      {row.unpaidLeaveDays > 0 && (
                        <span className="block text-[10px] text-gray-500">LOP: {row.unpaidLeaveDays} day(s)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-bold text-sm">
                      ₹{net.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">
                      <div>{row.bankAccount}</div>
                      <div className="text-[10px] text-gray-500">{row.ifsc}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === 'Disbursed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        row.status === 'Approved' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setViewingSlip(row)}
                        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-xs font-semibold"
                      >
                        📄 View Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MODAL: DIGITAL PAYSLIP VIEW */}
        {viewingSlip && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl">
              
              {/* Slip Top Header */}
              <div className="flex justify-between items-start border-b border-gray-800 pb-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    DEVGYAN INNOVATION • SALARY ADVICE
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{activeSchool.name}</h3>
                  <p className="text-xs text-gray-400">Official Payslip for the month of {selectedMonth}</p>
                </div>
                <button
                  onClick={() => setViewingSlip(null)}
                  className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Employee Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#030712] border border-gray-800 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Employee Name</span>
                  <span className="font-bold text-white">{viewingSlip.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Faculty ID</span>
                  <span className="font-mono text-cyan-400">{viewingSlip.staffId}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Department</span>
                  <span className="text-gray-200">{viewingSlip.department}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Bank Account</span>
                  <span className="font-mono text-gray-300">{viewingSlip.bankAccount}</span>
                </div>
              </div>

              {/* Earnings vs Deductions Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                
                {/* Earnings Column */}
                <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <div className="font-bold text-emerald-400 uppercase text-[11px] pb-1 border-b border-gray-800">
                    Earnings (Credits)
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Basic Pay</span>
                    <span className="font-mono text-white">₹{viewingSlip.basicPay.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">House Rent Allowance (HRA)</span>
                    <span className="font-mono text-white">₹{viewingSlip.hra.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Dearness Allowance (DA)</span>
                    <span className="font-mono text-white">₹{viewingSlip.da.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Special Allowance</span>
                    <span className="font-mono text-white">₹{viewingSlip.specialAllowance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800 font-bold text-white">
                    <span>Total Gross Earnings</span>
                    <span className="font-mono text-emerald-400">₹{calculateGross(viewingSlip).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Deductions Column */}
                <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <div className="font-bold text-rose-400 uppercase text-[11px] pb-1 border-b border-gray-800">
                    Deductions (Debits)
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Provident Fund (EPF 12%)</span>
                    <span className="font-mono text-rose-300">₹{viewingSlip.pfDeduction.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Income Tax (TDS)</span>
                    <span className="font-mono text-rose-300">₹{viewingSlip.taxDeduction.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Loss of Pay ({viewingSlip.unpaidLeaveDays} Days)</span>
                    <span className="font-mono text-rose-300">₹{calculateLOP(viewingSlip).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">Professional Tax (PT)</span>
                    <span className="font-mono text-rose-300">₹200</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-800 font-bold text-white">
                    <span>Total Deductions</span>
                    <span className="font-mono text-rose-400">₹{(calculateTotalDeductions(viewingSlip) + 200).toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

              {/* Net Payable Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/50 border border-emerald-800/60 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Net Salary Credited To Bank</span>
                  <span className="text-2xl font-black text-emerald-400">
                    ₹{(calculateNetPay(viewingSlip) - 200).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right text-[11px] font-mono text-gray-400">
                  <div>Status: <span className="text-emerald-400 font-bold">{viewingSlip.status}</span></div>
                  <div>Disbursed On: {viewingSlip.paymentDate}</div>
                </div>
              </div>

              {/* Slip Footer Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200"
                >
                  🖨 Print / Save PDF
                </button>
                <button
                  onClick={() => setViewingSlip(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Close Advice
                </button>
              </div>

            </div>
          </div>
        )}

        {/* MODAL: RUN MONTHLY PAYROLL CONFIRMATION */}
        {showRunPayrollModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Execute Payroll Run</h3>
                <button onClick={() => setShowRunPayrollModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <p>
                  You are about to calculate and authorize disbursement for <span className="text-cyan-400 font-bold">{selectedMonth}</span> under <span className="text-white font-semibold">{activeSchool.name}</span>.
                </p>
                <div className="p-3 bg-[#030712] rounded-xl border border-gray-800 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Total Employees:</span>
                    <span className="text-white">{payrolls.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Net Outflow:</span>
                    <span className="text-emerald-400 font-bold">₹{totalNetDisbursement.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statutory EPF Holding:</span>
                    <span className="text-cyan-400">₹{totalPFAccumulated.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowRunPayrollModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRunPayroll}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  Confirm & Disburse
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
