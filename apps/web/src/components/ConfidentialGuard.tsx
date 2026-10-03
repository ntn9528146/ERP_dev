"use client";

import React from 'react';
import Link from 'next/link';
import { useTenant } from '../context/TenantContext';

export default function ConfidentialGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { isAuthenticated, currentUser } = useTenant();

  // If NOT logged in: Show bloombyte-style promotional teaser view (dummy metrics, zero confidential leakage)
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Promotional Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              NEXT-GEN CBSE K-12 ENTERPRISE PLATFORM
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Transform Your Campus With Intelligent ERP Automation
            </h1>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Designed for premier schools. Unified CBSE curriculum workflows, real-time APAAR synchronization, biometric attendance, and strict tenant isolation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
              >
                Institutional Staff Login →
              </Link>
              <a
                href="#demo-metrics"
                className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-semibold text-xs transition-all"
              >
                Explore Product Capabilities
              </a>
            </div>
          </div>

          {/* Dummy Promotional Metrics Grid (BloomByte Style Preview - 100% Mock Safe Data) */}
          <div id="demo-metrics" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0B1120] border border-gray-800/80 rounded-2xl p-6 space-y-3 relative overflow-hidden">
              <div className="text-cyan-400 text-2xl">⚡</div>
              <div className="text-2xl font-black text-white">99.98% Uptime</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Serverless Neon PostgreSQL cloud architecture with real-time multi-tenant encryption and sub-second response times.
              </p>
              <div className="pt-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                • Zero Latency Infrastructure
              </div>
            </div>

            <div className="bg-[#0B1120] border border-gray-800/80 rounded-2xl p-6 space-y-3 relative overflow-hidden">
              <div className="text-emerald-400 text-2xl">📜</div>
              <div className="text-2xl font-black text-white">100% CBSE Compliant</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pre-built curriculum matrices covering Core, Skill subjects (IT 402, AI 417), Languages, and Senior Secondary Streams.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                • NEP 2020 Aligned
              </div>
            </div>

            <div className="bg-[#0B1120] border border-gray-800/80 rounded-2xl p-6 space-y-3 relative overflow-hidden">
              <div className="text-purple-400 text-2xl">🛡️</div>
              <div className="text-2xl font-black text-white">Zero-Trust Isolation</div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Role-based data shields ensuring faculty only view assigned classes while institution dossiers remain strictly confidential.
              </p>
              <div className="pt-2 text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                • Enterprise RBAC
              </div>
            </div>
          </div>

          {/* Interactive Feature Demo Showcase (Mock illustration) */}
          <div className="bg-[#0B1120] border border-gray-800 rounded-3xl p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Live Showcase Simulation
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Comprehensive Institutional Dossier Engine</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
                🔒 Public Preview (Authentication required to access live tenant)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="bg-[#030712] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px]">TOTAL ENROLLMENT</span>
                <span className="text-lg font-bold text-cyan-400">2,850+</span>
                <span className="text-[10px] text-gray-400 block mt-1">Sample Aggregation</span>
              </div>
              <div className="bg-[#030712] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px]">FACULTY ROSTER</span>
                <span className="text-lg font-bold text-emerald-400">142</span>
                <span className="text-[10px] text-gray-400 block mt-1">Verified Educators</span>
              </div>
              <div className="bg-[#030712] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px]">CURRICULUM MODULES</span>
                <span className="text-lg font-bold text-purple-400">48 Subjects</span>
                <span className="text-[10px] text-gray-400 block mt-1">K-12 Full Catalog</span>
              </div>
              <div className="bg-[#030712] p-4 rounded-xl border border-gray-800">
                <span className="text-gray-500 block text-[10px]">SECURITY LEVEL</span>
                <span className="text-lg font-bold text-blue-400">Tier-4 Cloud</span>
                <span className="text-[10px] text-gray-400 block mt-1">End-to-End Isolated</span>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/login"
                className="inline-block px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
              >
                Access Institutional Workspace →
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // If authenticated but unauthorized for this role
  if (allowedRoles && !allowedRoles.includes(currentUser.role) && currentUser.role !== 'DEVELOPER' && currentUser.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-white text-center">
        <div className="bg-[#0B1120] border border-red-500/30 p-8 rounded-2xl max-w-md space-y-3">
          <div className="text-4xl">🚫</div>
          <h3 className="text-lg font-bold">Unauthorized Institutional Scope</h3>
          <p className="text-xs text-gray-400">
            Your current account role ({currentUser.role}) does not have permission to view this section.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
