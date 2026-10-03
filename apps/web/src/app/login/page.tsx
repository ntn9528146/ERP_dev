"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '../../context/TenantContext';

export default function LoginPage() {
  const router = useRouter();
  const { schools, loginUser, validateAndBurnToken } = useTenant();

  const [isSecretCodeMode, setIsSecretCodeMode] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(schools[0].id);
  const [email, setEmail] = useState('alok.cs@arden.edu');
  const [password, setPassword] = useState('Faculty@123');
  const [secretCode, setSecretCode] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'TEACHER' | 'PRINCIPAL' | 'VICE_PRINCIPAL'>('TEACHER');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (email.includes('developer') || email.includes('devgyan')) {
      loginUser({
        email,
        name: 'Nitin Tripathi (System Architect)',
        role: 'DEVELOPER',
        schoolId: selectedSchool,
        department: 'Core Architecture',
      });
      router.push('/admin/cockpit');
      return;
    }

    if (email.includes('principal')) {
      loginUser({
        email,
        name: 'Dr. R. K. Sharma (Principal)',
        role: 'PRINCIPAL',
        schoolId: selectedSchool,
        department: 'Administration',
      });
      router.push('/faculty/studio');
      return;
    }

    // Default Teacher Login
    loginUser({
      email,
      name: 'Alok Verma',
      role: 'TEACHER',
      schoolId: selectedSchool,
      department: 'Computer Science',
    });
    router.push('/faculty/studio');
  };

  const handleSecretCodeRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!secretCode) {
      setErrorMsg('Please enter valid single-use invitation token.');
      return;
    }

    const isValid = validateAndBurnToken(secretCode, selectedSchool);
    if (!isValid) {
      setErrorMsg('Invalid, expired or already used Secret Code. Contact Devgyan Innovation or Principal.');
      return;
    }

    loginUser({
      email,
      name: name || 'Authorized Faculty',
      role,
      schoolId: selectedSchool,
      department: 'Academic Faculty',
    });
    router.push('/faculty/studio');
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-[#070b19]">
        
        {/* Left Hero Card (PaperPilot Enterprise / DEVGYAN INNOVATION Architecture) */}
        <div className="p-10 flex flex-col justify-between bg-gradient-to-br from-blue-950/50 via-[#070b19] to-[#02050e] border-r border-gray-800/80">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/30">
                P
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PaperPilot Enterprise</span>
            </div>

            <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 uppercase font-semibold">
              RBAC Multi-Tenant Platform
            </span>

            <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white">
              Protected Academic Governance & Question Architecture.
            </h1>

            <p className="text-xs text-gray-400 leading-relaxed">
              Multi-tier access: Developers, Principals, Vice Principals, and Subject Faculty. 
              Isolated single-use tokens ensure non-repudiable question banking and syllabus compliance.
            </p>
          </div>

          {/* Demo Accounts Callout (From Screenshot 1) */}
          <div className="mt-8 p-5 rounded-2xl bg-gray-900/80 border border-gray-800/80 space-y-2 text-xs">
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase">
              Demo Accounts (For Testing):
            </div>
            <div className="space-y-1 text-gray-300 font-mono text-[11px]">
              <div>• Developer: <span className="text-white">developer@paperpilot.io</span> | <span className="text-gray-400">DevMaster@2026</span></div>
              <div>• Principal: <span className="text-white">principal@arden.edu</span> | <span className="text-gray-400">Principal@123</span></div>
              <div>• Teacher: <span className="text-white">alok.cs@arden.edu</span> | <span className="text-gray-400">Faculty@123</span></div>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-gray-500 font-mono">
            © 2026 DEVGYAN INNOVATION Academic Evaluation Framework. Single-use invitation tokens active.
          </div>
        </div>

        {/* Right Form Card */}
        <div className="p-10 flex flex-col justify-center space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isSecretCodeMode ? 'Register via Token' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {isSecretCodeMode ? 'Enter your single-use school invitation token' : 'Sign in to access your school dashboard.'}
              </p>
            </div>
            <button
              onClick={() => setIsSecretCodeMode(!isSecretCodeMode)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline"
            >
              {isSecretCodeMode ? 'Regular Sign In' : 'Enter Secret Code'}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* School Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">AFFILIATED SCHOOL TENANT *</label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              {schools.map((sch) => (
                <option key={sch.id} value={sch.id}>
                  {sch.name}
                </option>
              ))}
            </select>
          </div>

          {!isSecretCodeMode ? (
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 transition-all"
              >
                Log In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSecretCodeRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Single-Use Secret Token *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SEC-ARDEN-2026-A1"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="w-full bg-[#030712] border border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Faculty Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Sunita Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Designated Role *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-[#030712] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="TEACHER">Subject Faculty (Teacher)</option>
                  <option value="VICE_PRINCIPAL">Vice Principal</option>
                  <option value="PRINCIPAL">Principal / Director</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
              >
                Verify & Register Account
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
            <button
              onClick={() => alert('SSO Google Workspace integration configured for DEVGYAN INNOVATION.')}
              className="mt-3 w-full py-2.5 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>🌐</span> Continue with Google
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
