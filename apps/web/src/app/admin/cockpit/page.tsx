"use client";

import React, { useState } from 'react';
import { useTenant } from '../../../context/TenantContext';

interface FacultyAccount {
  name: string;
  email: string;
  pass: string;
  dept: string;
  role: string;
  status: string;
  schoolId: string;
}

interface AuditToken {
  id: string;
  code: string;
  role: string;
  tenant: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
}

export default function AdminCockpitPage() {
  const { activeSchool, availableSchools, setActiveSchool, currentUser, isAuthenticated } = useTenant();

  // Strict Developer / Super Admin check
  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN' || currentUser?.email?.includes('nitin');

  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const [tokens, setTokens] = useState<AuditToken[]>([
    { id: '1', code: 'SEC-D6HI5I-7125', role: 'TEACHER', tenant: 'dps-nainital', status: 'ACTIVE' },
    { id: '2', code: 'SEC-ARDEN-2026-A1', role: 'TEACHER', tenant: 'arden-haldwani', status: 'ACTIVE' },
    { id: '3', code: 'SEC-ARDEN-2026-P1', role: 'PRINCIPAL', tenant: 'arden-haldwani', status: 'ACTIVE' },
  ]);

  const allAccounts: FacultyAccount[] = [
    { name: 'Dr. R. K. Sharma', email: 'principal@arden.edu', pass: 'Principal@123', dept: 'Administration', role: 'PRINCIPAL', status: 'Active', schoolId: 'arden-haldwani' },
    { name: 'Alok Verma', email: 'alok.cs@arden.edu', pass: 'Faculty@123', dept: 'Computer Science', role: 'TEACHER', status: 'Active', schoolId: 'arden-haldwani' },
    { name: 'Sanjay Rawat', email: 'sanjay.math@arden.edu', pass: 'Math@2026', dept: 'Mathematics', role: 'TEACHER', status: 'Active', schoolId: 'arden-haldwani' },
    { name: 'Virendra Joshi', email: 'principal@dpsnainital.edu', pass: 'DPS@Ntl2026', dept: 'Administration', role: 'PRINCIPAL', status: 'Active', schoolId: 'dps-nainital' },
    { name: 'Meenakshi Bisht', email: 'meenakshi@dpsnainital.edu', pass: 'Faculty@DPS', dept: 'Science', role: 'TEACHER', status: 'Active', schoolId: 'dps-nainital' },
    { name: 'Pooja Pandey', email: 'director@jaiarihant.edu', pass: 'Arihant@2026', dept: 'Management', role: 'DIRECTOR', status: 'Active', schoolId: 'jai-arihant' },
  ];

  // 1. STRICT CONFIDENTIALITY GUARD: Chahe Localhost ho ya Production, bina login ke 100% LOCKED
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0B1120] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl shadow-cyan-950/50">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-3xl shadow-inner">
            🔐
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/60">
              CONFIDENTIAL VAULT ACCESS RESTRICTED
            </span>
            <h2 className="text-xl font-bold text-white mt-3">Authentication Required</h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Institutional credentials, single-use audit tokens, and faculty records are strictly confidential. Please login with your authorized institutional role to proceed.
            </p>
          </div>
          <div className="pt-2">
            <a
              href="/"
              className="inline-block w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
            >
              Sign In / Enter Secret Code →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. ISOLATION RULES (Jab user logged in ho)
  // - Agar Developer/SuperAdmin hai: activeSchool ka data dekhega aur switcher milega
  // - Agar Principal/VP/Teacher hai: Sirf aur sirf uske assign school ka data dikhega
  const currentSchoolId = isSuperAdmin ? activeSchool.id : (currentUser.schoolId || activeSchool.id);

  const displayedAccounts = allAccounts.filter((acc) => acc.schoolId === currentSchoolId);
  const displayedTokens = tokens.filter((tok) => tok.tenant === currentSchoolId);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedToken(code);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleIssueToken = () => {
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newToken: AuditToken = {
      id: String(Date.now()),
      code: `SEC-${activeSchool.id.substring(0, 5).toUpperCase()}-${randomSuffix}`,
      role: 'TEACHER',
      tenant: currentSchoolId,
      status: 'ACTIVE',
    };
    setTokens([newToken, ...tokens]);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                ROOT COCKPIT • {activeSchool.name.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Logged in as: <strong className="text-cyan-300">{currentUser.name || currentUser.role}</strong> ({currentUser.role})
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Institutional Cloud Vault</h1>
          </div>

          {/* School Selector: Only for Developer / Super Admin */}
          {isSuperAdmin ? (
            <div className="flex items-center gap-2 bg-[#0B1120] border border-gray-800 p-2 rounded-xl">
              <span className="text-xs font-mono text-cyan-400">Campus:</span>
              <select
                value={activeSchool.id}
                onChange={(e) => {
                  const s = availableSchools.find((item) => item.id === e.target.value);
                  if (s) setActiveSchool(s);
                }}
                className="bg-[#030712] border border-gray-700 text-xs text-white rounded-lg p-1.5 focus:border-cyan-400"
              >
                {availableSchools.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 text-xs font-mono">
              Campus: <strong>{activeSchool.name}</strong> (Isolated)
            </div>
          )}
        </div>

        {/* 3 Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-5 space-y-3">
            <div className="text-sm font-semibold text-white truncate">{activeSchool.name}</div>
            <button
              onClick={handleIssueToken}
              className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 font-bold text-xs text-black transition-all uppercase"
            >
              + Issue Token for {activeSchool.name}
            </button>
          </div>

          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-5 space-y-1">
            <div className="text-2xl font-black text-emerald-400">Enterprise 2026-27</div>
            <div className="text-xs text-gray-400">Institutional Cloud Vault Active</div>
          </div>

          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-5 space-y-1">
            <div className="text-2xl font-black text-cyan-400">{displayedAccounts.length} Total IDs</div>
            <div className="text-xs text-gray-400">Cleartext strictly isolated for authorized access</div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white font-mono uppercase">
            Accounts Registered Under {activeSchool.name} Only
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Faculty Name</th>
                  <th className="py-3 px-4">Login Email</th>
                  <th className="py-3 px-4">Decrypted Password</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-mono text-xs">
                {displayedAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      No accounts registered under this campus yet.
                    </td>
                  </tr>
                ) : (
                  displayedAccounts.map((acc, idx) => (
                    <tr key={idx} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 text-white font-bold">{acc.name}</td>
                      <td className="py-3 px-4 text-cyan-400">{acc.email}</td>
                      <td className="py-3 px-4 text-amber-400 font-semibold">{acc.pass}</td>
                      <td className="py-3 px-4 text-gray-300">{acc.dept}</td>
                      <td className="py-3 px-4 text-blue-400 font-bold">{acc.role}</td>
                      <td className="py-3 px-4 text-emerald-400">● {acc.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Single Use Token Audit Vault with Copy Buttons */}
        <div className="space-y-3 pt-4 border-t border-gray-800">
          <h2 className="text-sm font-bold text-white font-mono uppercase">
            Single-Use Token Audit Vault
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {displayedTokens.map((tok) => (
              <div
                key={tok.id}
                className="bg-[#0B1120] border border-gray-800 rounded-xl p-3 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="text-cyan-400 font-mono font-bold text-xs">{tok.code}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                    {tok.role} • {tok.tenant}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                    {tok.status}
                  </span>
                  
                  <button
                    onClick={() => handleCopy(tok.code)}
                    className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-[11px] font-mono transition-all"
                    title="Copy token"
                  >
                    {copiedToken === tok.code ? (
                      <span className="text-emerald-400 font-bold">✓ Copied</span>
                    ) : (
                      <span>📋 Copy</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
