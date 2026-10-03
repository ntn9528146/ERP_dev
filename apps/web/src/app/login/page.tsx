"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '../../context/TenantContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser } = useTenant();

  const [identifier, setIdentifier] = useState('ntn9528146');
  const [password, setPassword] = useState('Nitin@123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = loginUser(identifier, password);
    setLoading(false);

    if (result.success) {
      if (identifier.toLowerCase().includes('ntn9528146')) {
        router.push('/admin/cockpit');
      } else {
        router.push('/student-management');
      }
    } else {
      setErrorMessage(result.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0B1120] border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative">
        
        {/* Glow Accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black text-black shadow-lg shadow-cyan-500/20">
            DG
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Institutional Access Portal</h1>
          <p className="text-xs text-gray-400">
            Intelligent Multi-Tenant Single Sign-On (Auto School Resolution)
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Simplified Login Form: NO SCHOOL DROPDOWN */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Institutional User ID or Official Email
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. ntn9528146 or alok.cs@arden.edu"
              className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-medium focus:border-cyan-400 focus:outline-none"
            />
            <span className="text-[10px] text-gray-500 font-mono mt-1 block">
              School campus is detected automatically based on your credential domain.
            </span>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authenticate & Open Workspace →'}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-gray-800 text-[11px] text-gray-500">
          <span>DevGyan Cloud ERP • CBSE K-12 Compliance Engine</span>
        </div>

      </div>
    </div>
  );
}
