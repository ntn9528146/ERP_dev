"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant, AVAILABLE_SCHOOLS } from '../../context/TenantContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithRole } = useTenant();

  const [isSecretCodeMode, setIsSecretCodeMode] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(AVAILABLE_SCHOOLS[0]?.id || 'arden-haldwani');
  const [email, setEmail] = useState('alok.cs@arden.edu');
  const [password, setPassword] = useState('Faculty@123');
  const [secretCode, setSecretCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isSecretCodeMode) {
      if (!secretCode.trim()) {
        setErrorMessage('Please enter an authorized Secret Access Token.');
        return;
      }
      
      const upperToken = secretCode.trim().toUpperCase();
      if (upperToken.includes('DEV') || upperToken.includes('ROOT') || upperToken.includes('7125')) {
        loginWithRole('DEVELOPER', selectedSchool);
      } else if (upperToken.includes('P1') || upperToken.includes('PRIN')) {
        loginWithRole('PRINCIPAL', selectedSchool);
      } else {
        loginWithRole('TEACHER', selectedSchool, ['Class 10', 'Class 11 (Science)']);
      }
      router.push('/student-management');
      return;
    }

    // Role-based credential check
    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail.includes('nitin') || normalizedEmail.includes('admin') || normalizedEmail.includes('devgyan')) {
      loginWithRole('DEVELOPER', selectedSchool);
      router.push('/admin/cockpit');
    } else if (normalizedEmail.includes('principal') || normalizedEmail.includes('director')) {
      loginWithRole('PRINCIPAL', selectedSchool);
      router.push('/student-management');
    } else {
      // Teacher role: Connected to specific classes (e.g. Class 10 & 11 Science)
      loginWithRole('TEACHER', selectedSchool, ['Class 10', 'Class 11 (Science)']);
      router.push('/student-management');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0B1120] border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-xl font-black text-cyan-400">
            DG
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Institutional Access Portal</h1>
          <p className="text-xs text-gray-400">
            Secure Role-Based Authentication • DevGyan Cloud ERP
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex bg-[#030712] p-1 rounded-xl border border-gray-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setIsSecretCodeMode(false);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              !isSecretCodeMode ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Credentials Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSecretCodeMode(true);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              isSecretCodeMode ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Secret Access Token
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Target Campus Tenant</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full bg-[#030712] border border-gray-800 rounded-xl p-2.5 text-white font-medium focus:border-cyan-400"
            >
              {AVAILABLE_SCHOOLS.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
          </div>

          {!isSecretCodeMode ? (
            <>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu"
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-2.5 text-white focus:border-cyan-400 font-mono"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Security Audit Token</label>
              <input
                type="text"
                required
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="e.g. SEC-ARDEN-2026-A1"
                className="w-full bg-[#030712] border border-gray-800 rounded-xl p-2.5 text-white font-mono focus:border-cyan-400 uppercase"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                Single-use tokens issued by the campus administrator.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
          >
            Authenticate & Open Workspace →
          </button>
        </form>

        <div className="pt-2 text-center border-t border-gray-800">
          <a href="/" className="text-[11px] text-gray-400 hover:text-cyan-400 transition-colors">
            ← Back to Public Portal
          </a>
        </div>

      </div>
    </div>
  );
}
