"use client";

import React, { useState } from 'react';
import { useTenant } from '../../../context/TenantContext';

export default function DevgyanCockpitPage() {
  const { activeSchool, schools, switchSchool, generateSecretToken, secretTokens } = useTenant();

  const [selectedSchoolId, setSelectedSchoolId] = useState(activeSchool.id);
  const [issuedCodeNotice, setIssuedCodeNotice] = useState<string | null>(null);

  const registeredAccounts = [
    { name: 'Dr. R. K. Sharma', email: 'principal@arden.edu', pass: 'Principal@123', dept: 'Administration', role: 'PRINCIPAL', status: 'Active' },
    { name: 'Alok Verma', email: 'alok.cs@arden.edu', pass: 'Faculty@123', dept: 'Computer Science', role: 'TEACHER', status: 'Active' },
    { name: 'Sanjay Rawat', email: 'sanjay.math@arden.edu', pass: 'Math@2026', dept: 'Mathematics', role: 'TEACHER', status: 'Active' },
  ];

  const handleIssueToken = () => {
    const code = generateSecretToken(selectedSchoolId, 'TEACHER', 'Nitin Tripathi (System Architect)');
    setIssuedCodeNotice(`Token Issued for ${activeSchool.name}: ${code}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cockpit Top Bar (Exact Match with 2nd Screenshot) */}
        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center font-black text-2xl text-black">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">SaaS Multi-School Developer Cockpit</h1>
                <span className="text-xs font-mono font-bold bg-amber-950/80 border border-amber-800/80 text-amber-400 px-2 py-0.5 rounded">
                  ROOT ACCESS (100)
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Developer Identity: Nitin Tripathi (System Architect) • DEVGYAN INNOVATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('New School Tenant Vault provisioned.')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold"
            >
              + Add New School
            </button>
            <div className="px-4 py-2 bg-indigo-600 rounded-lg text-xs font-bold">
              School Vault
            </div>
            <div className="px-3 py-2 bg-gray-800 rounded-lg text-[11px] font-mono text-gray-300">
              SaaS Plans (From ₹7,999)
            </div>
          </div>
        </div>

        {/* Tenant Selection Control & Token Generator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-3">
            <label className="text-xs font-mono text-cyan-400 uppercase font-semibold">SELECTED SCHOOL:</label>
            <select
              value={selectedSchoolId}
              onChange={(e) => {
                setSelectedSchoolId(e.target.value);
                switchSchool(e.target.value);
              }}
              className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-semibold"
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <button
              onClick={handleIssueToken}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wide transition-all"
            >
              + Issue Token for {activeSchool.name}
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
            <span className="text-xs text-gray-400">ACTIVE SUBSCRIPTION TIER</span>
            <div className="text-2xl font-black text-emerald-400 mt-2">{activeSchool.activePlan}</div>
            <span className="text-xs text-gray-500 font-mono">Institutional Cloud Vault Active</span>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
            <span className="text-xs text-gray-400">REGISTERED ACCOUNTS</span>
            <div className="text-2xl font-black text-white mt-2">{activeSchool.totalIds} Total IDs</div>
            <span className="text-xs text-cyan-400 font-mono">Cleartext strictly isolated for Developer access</span>
          </div>
        </div>

        {issuedCodeNotice && (
          <div className="p-4 rounded-xl bg-cyan-950/70 border border-cyan-800 text-cyan-300 font-mono text-xs flex justify-between items-center">
            <span>{issuedCodeNotice}</span>
            <span className="text-white font-bold bg-cyan-800 px-2 py-1 rounded">Single-Use Valid</span>
          </div>
        )}

        {/* Registered Accounts Table (Exact Screenshot 2 layout) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">
              Accounts Registered Under {activeSchool.name} Only
            </h3>
            <span className="text-xs text-gray-400 font-mono">Cleartext passwords strictly isolated for Developer access.</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-gray-950/80 text-gray-400 uppercase border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Faculty Name</th>
                  <th className="py-3 px-4">Login Email</th>
                  <th className="py-3 px-4">Decrypted Password</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {registeredAccounts.map((acc, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/40">
                    <td className="py-3 px-4 text-white font-semibold">{acc.name}</td>
                    <td className="py-3 px-4 text-cyan-400">{acc.email}</td>
                    <td className="py-3 px-4 text-amber-400 font-bold">{acc.pass}</td>
                    <td className="py-3 px-4 text-gray-300">{acc.dept}</td>
                    <td className="py-3 px-4 text-indigo-400 font-bold">{acc.role}</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{acc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secret Tokens Log */}
        <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800 space-y-3">
          <h4 className="text-sm font-bold text-gray-300">Single-Use Token Audit Vault</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {secretTokens.map((t, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#030712] border border-gray-800 text-xs font-mono flex justify-between items-center">
                <div>
                  <div className="text-cyan-400 font-bold">{t.token}</div>
                  <div className="text-[10px] text-gray-500">{t.role} • {t.schoolId}</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.isUsed ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'}`}>
                  {t.isUsed ? 'BURNED' : 'ACTIVE'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
