"use client";
import React from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function CbseStudioPage() {
  const { activeSchool } = useTenant();
  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="border-b border-gray-800 pb-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
              CBSE STUDIO • {activeSchool.name.toUpperCase()}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">CBSE Curriculum & Rubrics Master</h1>
            <p className="text-gray-400 text-xs mt-1">Pre-configured CBSE matrix covering IT 402, AI 417, CS 083, Yoga 841 and Language electives.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0B1120] border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-cyan-400 font-mono">SECONDARY (9-10)</span>
              <div className="text-lg font-bold text-white mt-1">Skill & Languages Pool</div>
              <p className="text-xs text-gray-400 mt-2">IT (402), AI (417), Computer Applications (165), Hindi Course A/B, Sanskrit, PEWB.</p>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-emerald-400 font-mono">SR. SECONDARY (11-12)</span>
              <div className="text-lg font-bold text-white mt-1">Science / Commerce / Arts</div>
              <p className="text-xs text-gray-400 mt-2">Computer Science (083), Yoga (841), Hindi Core (302), IP (065), PE (048).</p>
            </div>
            <div className="bg-[#0B1120] border border-gray-800 p-5 rounded-2xl">
              <span className="text-xs text-purple-400 font-mono">ASSESSMENT SCHEME</span>
              <div className="text-lg font-bold text-white mt-1">NEP 2020 Rubrics</div>
              <p className="text-xs text-gray-400 mt-2">80 Marks Board Theory + 20 Marks Internal Practical Assessment mapping.</p>
            </div>
          </div>
        </div>
      </div>
    </ConfidentialGuard>
  );
}
