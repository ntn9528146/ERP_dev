"use client";

import React from 'react';
import { useTenant } from '../../context/TenantContext';

export default function StaffAppPage() {
  const { activeSchool } = useTenant();

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                PORTAL 02 • FACULTY MOBILE COMPANION
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Faculty & Staff Companion App</h1>
            <p className="text-gray-400 text-sm mt-1">
              One-touch classroom attendance, quick marks grading, substitution roster & salary slip downloads.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-cyan-400">
              Logged as: Alok Verma (Computer Science)
            </div>
          </div>
        </div>

        {/* Staff Quick Action Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: Mark Attendance In 10 Seconds */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">CLASSROOM ROLL-CALL</span>
            <h3 className="text-lg font-bold text-white">Period 4: Class 10th-A</h3>
            <p className="text-xs text-gray-400">42 Enrolled Students • Tap to open rapid roll-call screen.</p>
            <button
              onClick={() => alert('Launching Fast Mobile Roll Call Desk...')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20"
            >
              Start Roll Call Now →
            </button>
          </div>

          {/* Action 2: Substitution Roster */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">TODAY’S LECTURE ROSTER</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#030712] border border-gray-800 flex justify-between">
                <span>09:15 AM • Class 12-Science</span>
                <span className="text-cyan-400">CS Lab 01</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#030712] border border-gray-800 flex justify-between">
                <span>11:30 AM • Class 11-Commerce</span>
                <span className="text-cyan-400">Room 204</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 flex justify-between text-amber-300">
                <span>01:15 PM • Proxy for Manoj Joshi</span>
                <span>Room 108</span>
              </div>
            </div>
          </div>

          {/* Action 3: HR Salary & Leave Balance */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase">PAYROLL & LEAVES</span>
            <div className="p-3 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Casual Leave (CL) Balance:</span>
                <span className="font-bold text-white font-mono">08 Days Left</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Medical Leave Balance:</span>
                <span className="font-bold text-white font-mono">10 Days Left</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Payslip:</span>
                <span className="text-emerald-400 font-mono font-bold">₹42,000 Disbursed</span>
              </div>
            </div>
            <button
              onClick={() => alert('Opening Leave Request modal...')}
              className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold"
            >
              Apply Leave Application
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
