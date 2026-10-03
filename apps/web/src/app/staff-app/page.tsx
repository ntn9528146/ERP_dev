"use client";
import React from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function StaffAppPage() {
  const { activeSchool } = useTenant();
  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="border-b border-gray-800 pb-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
              FACULTY DESK • {activeSchool.name.toUpperCase()}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Faculty & Staff Companion App</h1>
            <p className="text-gray-400 text-xs mt-1">One-touch classroom attendance, quick marks grading, substitution roster & salary slip downloads.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B1120] border border-gray-800 p-6 rounded-2xl space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase">CLASSROOM ROLL-CALL</span>
              <div className="text-2xl font-bold text-white">Period 4: Class 10th-A</div>
              <p className="text-xs text-gray-400">42 Enrolled Students • Tap to open rapid roll-call screen.</p>
              <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs">
                Start Roll Call Now →
              </button>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-6 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-emerald-400 uppercase">TODAY&apos;S LECTURE ROSTER</span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-gray-900/60 border border-gray-800 flex justify-between">
                  <span>09:15 AM • Class 12-Science</span>
                  <span className="text-cyan-400 font-mono">CS Lab 01</span>
                </div>
                <div className="p-2.5 rounded-lg bg-gray-900/60 border border-gray-800 flex justify-between">
                  <span>11:30 AM • Class 11-Commerce</span>
                  <span className="text-cyan-400 font-mono">Room 204</span>
                </div>
              </div>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-6 rounded-2xl space-y-3">
              <span className="text-xs font-mono text-purple-400 uppercase">PAYROLL & LEAVES</span>
              <div className="text-xs space-y-1.5 text-gray-300">
                <div className="flex justify-between"><span>Casual Leave Balance:</span><strong className="text-white">08 Days Left</strong></div>
                <div className="flex justify-between"><span>Medical Leave Balance:</span><strong className="text-white">10 Days Left</strong></div>
                <div className="flex justify-between"><span>Last Payslip:</span><strong className="text-emerald-400">₹42,000 Disbursed</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfidentialGuard>
  );
}
