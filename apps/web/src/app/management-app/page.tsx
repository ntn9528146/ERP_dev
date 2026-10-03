"use client";

import React from 'react';
import { useTenant } from '../../context/TenantContext';

export default function ManagementAppPage() {
  const { activeSchool } = useTenant();

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                PORTAL 03 • EXECUTIVE BOARD & DIRECTOR COCKPIT
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Executive Management App</h1>
            <p className="text-gray-400 text-sm mt-1">
              High-level decision dashboard: campus financial health, staff attendance velocity, admissions ROI & compliance.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
              ● All 15 Systems Operational
            </span>
          </div>
        </div>

        {/* Executive Decision Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Monthly Campus Cashflow</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹4.82 Crore</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">↑ 14.8% vs last fiscal cycle</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Faculty Punch-in SLA</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">97.8% On-Time</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">142 Present / 4 Leaves</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Admissions Pipeline Velocity</span>
            <div className="text-2xl font-black text-amber-400 mt-1">94% Capacity</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">18 Seats Left Across Campuses</span>
          </div>
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Infrastructure Energy Index</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">Optimal</div>
            <span className="text-xs text-indigo-400 font-mono mt-2 block">Solar Sync Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
