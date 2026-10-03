"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

export default function StudentAppPage() {
  const { activeSchool } = useTenant();

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                PORTAL 01 • STUDENT & PARENT MOBILE INTERFACE
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Student & Parent Portal (App)</h1>
            <p className="text-gray-400 text-sm mt-1">
              Personalized mobile workspace for attendance streaks, homework submissions, fee dues & live tracking.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs font-mono text-cyan-400">
              Active Student: Aarav Sharma (Grade 10-A)
            </div>
          </div>
        </div>

        {/* Mobile Viewport Simulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Today Attendance & Academic Schedule */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">DAILY ATTENDANCE</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PUNCHED 07:54 AM
              </span>
            </div>
            <div className="text-2xl font-black text-white">96.4% Aggregate</div>
            <p className="text-xs text-gray-400">You are eligible for upcoming pre-board examinations without condonation.</p>
            <div className="space-y-2 pt-2 border-t border-gray-800 text-xs font-mono">
              <div className="flex justify-between text-gray-300">
                <span>Period 1 (08:30 AM)</span>
                <span className="text-cyan-400">Math (Algebra)</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Period 2 (09:15 AM)</span>
                <span className="text-cyan-400">Physics Lab</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Period 3 (10:00 AM)</span>
                <span className="text-cyan-400">Computer Science</span>
              </div>
            </div>
          </div>

          {/* Card 2: Homework & Digital Diary */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">PENDING HOMEWORK</span>
              <span className="text-xs font-mono text-gray-400">2 Due This Week</span>
            </div>
            <div className="p-3 rounded-xl bg-[#030712] border border-gray-800 space-y-1 text-xs">
              <div className="font-bold text-white">CS-083: Python Recursion Assignment</div>
              <div className="text-amber-400 text-[11px] font-mono">Due: Tomorrow 11:59 PM</div>
              <button onClick={() => alert('Opening homework submission window...')} className="mt-2 text-[11px] text-cyan-400 font-bold underline">
                Upload Solution File →
              </button>
            </div>
            <div className="p-3 rounded-xl bg-[#030712] border border-gray-800 space-y-1 text-xs">
              <div className="font-bold text-white">Math-041: Problem Set 4.2 Exercise</div>
              <div className="text-emerald-400 text-[11px] font-mono">Graded: 24/25 Marks</div>
            </div>
          </div>

          {/* Card 3: Fee Status & Live Bus Radar */}
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">FEES & TRANSPORT</span>
              <span className="text-xs text-gray-400">Challan Paid</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-1 text-xs">
              <div className="text-emerald-400 font-bold">Quarter 2 Tuition: ₹32,000 Paid</div>
              <div className="text-gray-400 text-[11px]">Invoice DG-CHN-2026-101 Verified</div>
            </div>
            <div className="p-3 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Bus 01 (Kathgodam Route)</span>
                <span className="text-emerald-400 font-mono text-[10px] animate-pulse">● LIVE GPS</span>
              </div>
              <p className="text-gray-400 text-[11px]">Next Stop: Tikonia Crossing (ETA: 8 mins)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
