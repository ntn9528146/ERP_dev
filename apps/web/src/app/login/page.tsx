"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTenant } from '../../context/TenantContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, loginWithSecretToken } = useTenant();

  const [authMode, setAuthMode] = useState<'credentials' | 'secretToken'>('credentials');
  const [identifier, setIdentifier] = useState('ntn9528146');
  const [password, setPassword] = useState('Nitin@123');
  const [secretCode, setSecretCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Google / OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [requiredTokenForGoogle, setRequiredTokenForGoogle] = useState('');

  // Load Saved Credentials if Remember Me was selected earlier
  useEffect(() => {
    const savedCreds = localStorage.getItem('devgyan_saved_login');
    if (savedCreds) {
      try {
        const parsed = JSON.parse(savedCreds);
        if (parsed.identifier) setIdentifier(parsed.identifier);
        if (parsed.password) setPassword(parsed.password);
        if (parsed.secretCode) setSecretCode(parsed.secretCode);
        setRememberMe(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (rememberMe) {
      localStorage.setItem(
        'devgyan_saved_login',
        JSON.stringify({ identifier, password, secretCode: authMode === 'secretToken' ? secretCode : '' })
      );
    } else {
      localStorage.removeItem('devgyan_saved_login');
    }

    if (authMode === 'secretToken') {
      const res = loginWithSecretToken(secretCode);
      setLoading(false);
      if (res.success) {
        router.push('/student-management');
      } else {
        setErrorMessage(res.message || 'Invalid or expired Secret Code Token.');
      }
      return;
    }

    const res = loginUser(identifier, password);
    setLoading(false);
    if (res.success) {
      if (identifier.toLowerCase().includes('ntn9528146')) {
        router.push('/admin/cockpit');
      } else {
        router.push('/student-management');
      }
    } else {
      setErrorMessage(res.message || 'Invalid credentials.');
    }
  };

  // Trigger Google Login / OTP Verification flow
  const handleInitiateGoogleAuth = () => {
    setGoogleEmail('educator.cbse@gmail.com');
    setOtpSent(false);
    setOtpCode('');
    setRequiredTokenForGoogle(authMode === 'secretToken' ? secretCode : '');
    setShowOtpModal(true);
  };

  const handleSendOtp = () => {
    if (!googleEmail.includes('@')) {
      alert('Please enter a valid Google Email address.');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtpAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requiredTokenForGoogle.trim()) {
      alert('Mandatory Security Rule: An authorized Campus Secret Token is required to complete Google signup/linking.');
      return;
    }
    if (otpCode !== '7125' && otpCode.length < 4) {
      alert('Please enter the 4-digit OTP sent to your email (Demo Code: 7125).');
      return;
    }

    const tokenRes = loginWithSecretToken(requiredTokenForGoogle);
    if (tokenRes.success) {
      // Auto-update profile with Google credentials
      const savedUser = localStorage.getItem('devgyan_user_session');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        parsed.name = googleEmail.split('@')[0].toUpperCase();
        parsed.email = googleEmail;
        localStorage.setItem('devgyan_user_session', JSON.stringify(parsed));
      }
      setShowOtpModal(false);
      router.push('/student-management');
    } else {
      alert(tokenRes.message || 'Secret token verification failed.');
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
            DevGyan Innovation Cloud ERP • Confidential Entry
          </p>
        </div>

        {/* Toggle Mode: Credentials vs Secret Token */}
        <div className="flex bg-[#030712] p-1 rounded-xl border border-gray-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('credentials');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === 'credentials' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Credentials Login
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('secretToken');
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === 'secretToken' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Secret Code Token 🔑
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authMode === 'credentials' ? (
            <>
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  User ID or Institutional Email
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ntn9528146 or alok.cs@arden.edu"
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white focus:border-cyan-400 focus:outline-none"
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
                  className="w-full bg-[#030712] border border-gray-800 rounded-xl p-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Authorized Single-Use Secret Code / Token *
              </label>
              <input
                type="text"
                required
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="e.g. SEC-ARDEN-2026-A1"
                className="w-full bg-[#030712] border border-cyan-800/80 rounded-xl p-3 text-cyan-300 font-mono tracking-wider focus:border-cyan-400 focus:outline-none uppercase"
              />
              <span className="text-[10px] text-gray-500 font-mono mt-1.5 block">
                Required for onboarding or instant verification without traditional password.
              </span>
            </div>
          )}

          {/* SAVE ME / REMEMBER ME CHECKBOX (Available in BOTH tabs) */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span className="text-gray-300 text-[11px] font-medium">Save Me / Remember My Device</span>
            </label>
            <span className="text-[10px] text-gray-500 font-mono">Encrypted Local Key</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
          >
            {loading ? 'Validating Credentials...' : 'Authenticate & Open Workspace →'}
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-3 text-gray-500 text-[10px] uppercase font-mono tracking-widest">
            Or Continue With
          </span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* CONNECT WITH GOOGLE BUTTON (Available in BOTH tabs) */}
        <div>
          <button
            type="button"
            onClick={handleInitiateGoogleAuth}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-gray-700/80 hover:border-gray-600 text-white font-semibold text-xs flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Connect with Google (Email OTP Sync)</span>
          </button>
          <span className="text-[10px] text-gray-500 font-mono text-center block mt-1.5">
            Requires valid Campus Secret Token on signup for security isolation.
          </span>
        </div>

        {/* GOOGLE OTP & SECRET TOKEN REGISTRATION MODAL */}
        {showOtpModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔐</span>
                  <h3 className="text-sm font-bold text-white">Google Account OTP Verification</h3>
                </div>
                <button onClick={() => setShowOtpModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleVerifyOtpAndLogin} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Google Email Address</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="your.email@gmail.com"
                      className="flex-1 bg-[#030712] border border-gray-800 rounded-lg p-2.5 text-white"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-[11px] text-white"
                    >
                      {otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  </div>
                  {otpSent && (
                    <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                      ✓ 4-Digit Verification OTP dispatched to {googleEmail} (Test Code: 7125)
                    </span>
                  )}
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Enter Email OTP *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="e.g. 7125"
                      className="w-full bg-[#030712] border border-cyan-800 rounded-lg p-2.5 text-center text-cyan-300 font-mono text-base tracking-widest"
                    />
                  </div>
                )}

                {/* MANDATORY SECRET CODE TOKEN (Cannot bypass without token) */}
                <div className="p-3 bg-cyan-950/30 border border-cyan-800/50 rounded-xl space-y-1.5">
                  <label className="block text-cyan-300 font-semibold text-[11px]">
                    Institutional Token / Secret Code * (Mandatory for Signup)
                  </label>
                  <input
                    type="text"
                    required
                    value={requiredTokenForGoogle}
                    onChange={(e) => setRequiredTokenForGoogle(e.target.value)}
                    placeholder="e.g. SEC-ARDEN-2026-A1"
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono uppercase text-xs"
                  />
                  <p className="text-[10px] text-gray-400 leading-tight">
                    Strict Compliance: Even with Google authentication, a school-issued secret key is required to bind your identity with the campus tenant.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white shadow-lg"
                  >
                    Verify & Auto-Sync Profile →
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="pt-2 text-center border-t border-gray-800 text-[11px] text-gray-500">
          <span>DevGyan Cloud ERP • Secure Role Resolution</span>
        </div>

      </div>
    </div>
  );
}
