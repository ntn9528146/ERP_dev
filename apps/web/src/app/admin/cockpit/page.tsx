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
  const { activeSchool, availableSchools, addNewSchool, currentUser, isAuthenticated } = useTenant();

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // New School Modal State
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolCode, setNewSchoolCode] = useState('');
  const [newSchoolCity, setNewSchoolCity] = useState('Haldwani');
  const [newSchoolDomain, setNewSchoolDomain] = useState('');

  const [tokens, setTokens] = useState<AuditToken[]>([
    { id: '1', code: 'SEC-D6HI5I-7125', role: 'TEACHER', tenant: 'dps-nainital', status: 'ACTIVE' },
    { id: '2', code: 'SEC-ARDEN-2026-A1', role: 'TEACHER', tenant: 'arden-haldwani', status: 'ACTIVE' },
    { id: '3', code: 'SEC-ARDEN-2026-P1', role: 'PRINCIPAL', tenant: 'arden-haldwani', status: 'ACTIVE' },
    { id: '4', code: 'SEC-JAIS-2026-D1', role: 'DIRECTOR', tenant: 'jai-arihant', status: 'ACTIVE' },
  ]);

  const allAccounts: FacultyAccount[] = [
    { name: 'Dr. R. K. Sharma', email: 'principal@arden.edu', pass: 'Principal@123', dept: 'Administration', role: 'PRINCIPAL', status: 'Active', schoolId: 'arden-haldwani' },
    { name: 'Alok Verma', email: 'alok.cs@arden.edu', pass: 'Faculty@123', dept: 'Computer Science', role: 'TEACHER', status: 'Active', schoolId: 'arden-haldwani' },
    { name: 'Virendra Joshi', email: 'principal@dpsnainital.edu', pass: 'DPS@Ntl2026', dept: 'Administration', role: 'PRINCIPAL', status: 'Active', schoolId: 'dps-nainital' },
    { name: 'Meenakshi Bisht', email: 'meenakshi@dpsnainital.edu', pass: 'Faculty@DPS', dept: 'Science', role: 'TEACHER', status: 'Active', schoolId: 'dps-nainital' },
    { name: 'Pooja Pandey', email: 'director@jaiarihant.edu', pass: 'Arihant@2026', dept: 'Management', role: 'DIRECTOR', status: 'Active', schoolId: 'jai-arihant' },
  ];

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0B1120] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-4">
          <div className="text-3xl">🔒</div>
          <h2 className="text-lg font-bold text-white">Confidential Vault Restricted</h2>
          <p className="text-xs text-gray-400">Please authenticate to access institutional root cockpit.</p>
          <a href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs">
            Login Now →
          </a>
        </div>
      </div>
    );
  }

  // School isolation
  const currentSchoolId = activeSchool.id;
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
      code: `SEC-${activeSchool.code}-${randomSuffix}`,
      role: 'TEACHER',
      tenant: currentSchoolId,
      status: 'ACTIVE',
    };
    setTokens([newToken, ...tokens]);
  };

  const handleCreateSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newSchoolCode) {
      alert('School name and code are required!');
      return;
    }
    const created = addNewSchool({
      name: newSchoolName,
      code: newSchoolCode.toUpperCase(),
      city: newSchoolCity,
      domain: newSchoolDomain || `${newSchoolCode.toLowerCase()}.edu`,
    });
    alert(`School "${created.name}" onboarded successfully into DevGyan Cloud!`);
    setShowAddSchoolModal(false);
    setNewSchoolName('');
    setNewSchoolCode('');
    setNewSchoolDomain('');
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
                Operator: <strong className="text-cyan-300">{currentUser.name}</strong>
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Institutional Cloud Vault</h1>
          </div>

          {/* Action: Onboard New School Button (Super Admin Only) */}
          {isSuperAdmin && (
            <button
              onClick={() => setShowAddSchoolModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Onboard New School / Campus
            </button>
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
              + Issue Token for {activeSchool.code}
            </button>
          </div>

          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-5 space-y-1">
            <div className="text-2xl font-black text-emerald-400">Enterprise 2026-27</div>
            <div className="text-xs text-gray-400">Institutional Cloud Vault Active ({availableSchools.length} Campuses)</div>
          </div>

          <div className="bg-[#0B1120] border border-gray-800 rounded-2xl p-5 space-y-1">
            <div className="text-2xl font-black text-cyan-400">{displayedAccounts.length} Total IDs</div>
            <div className="text-xs text-gray-400">Isolated credentials for {activeSchool.code}</div>
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
                      No accounts registered under this campus yet. Issue a token to onboard faculty!
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
            Single-Use Token Audit Vault ({displayedTokens.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {displayedTokens.map((tok) => (
              <div
                key={tok.id}
                className="bg-[#0B1120] border border-gray-800 rounded-xl p-3 flex items-center justify-between gap-2 shadow"
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
                  >
                    {copiedToken === tok.code ? <span className="text-emerald-400 font-bold">✓ Copied</span> : <span>📋 Copy</span>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL: ONBOARD NEW SCHOOL / CAMPUS */}
        {showAddSchoolModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">🏢 Onboard New School Campus</h3>
                <button onClick={() => setShowAddSchoolModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateSchool} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Full School Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. St. Joseph College (Nainital)"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">School Code (Acronym) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SJC"
                      value={newSchoolCode}
                      onChange={(e) => setNewSchoolCode(e.target.value)}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white uppercase font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">City / Location</label>
                    <input
                      type="text"
                      value={newSchoolCity}
                      onChange={(e) => setNewSchoolCity(e.target.value)}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Domain Prefix (for Auto-Login)</label>
                  <input
                    type="text"
                    placeholder="e.g. sjcnainital.edu"
                    value={newSchoolDomain}
                    onChange={(e) => setNewSchoolDomain(e.target.value)}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white font-mono"
                  />
                  <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                    Staff entering emails with this domain will automatically route to this campus.
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowAddSchoolModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg"
                  >
                    Add Campus to ERP
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
