"use client";

import React from 'react';
import { useTenant } from '../context/TenantContext';

export default function ConfidentialGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const { isAuthenticated, currentUser, loginWithRole } = useTenant();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-[80vh] bg-[#030712] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0B1120] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-3xl">
            🔒
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800/60">
              INSTITUTIONAL CONFIDENTIAL DATA RESTRICTED
            </span>
            <h2 className="text-xl font-bold text-white mt-3">Staff / Faculty Login Required</h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              This module contains confidential student and faculty records protected under school compliance. You must authenticate to view records.
            </p>
          </div>

          {/* Quick Demo Access Switcher for Development Testing */}
          <div className="pt-2 space-y-2 border-t border-gray-800 text-left">
            <span className="text-[10px] font-mono text-gray-400 uppercase block text-center">
              Quick Test Login (Demo Roles):
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => loginWithRole('DEVELOPER')}
                className="p-2 rounded-lg bg-blue-600/30 border border-blue-500/50 hover:bg-blue-600/50 text-[11px] font-bold text-cyan-300"
              >
                Super Admin (All Schools)
              </button>
              <button
                onClick={() => loginWithRole('PRINCIPAL', 'arden-haldwani')}
                className="p-2 rounded-lg bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 text-[11px] font-bold text-purple-300"
              >
                Principal (Whole School)
              </button>
              <button
                onClick={() => loginWithRole('TEACHER', 'arden-haldwani', ['Class 10', 'Class 11 (Science)'])}
                className="col-span-2 p-2 rounded-lg bg-emerald-600/30 border border-emerald-500/50 hover:bg-emerald-600/50 text-[11px] font-bold text-emerald-300 text-center"
              >
                Teacher (Assigned: Class 10 & 11 Science Only)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role) && currentUser.role !== 'DEVELOPER' && currentUser.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 text-white text-center">
        <div className="bg-[#0B1120] border border-red-500/30 p-8 rounded-2xl max-w-md">
          <div className="text-3xl mb-2">🚫</div>
          <h3 className="text-lg font-bold">Unauthorized Access</h3>
          <p className="text-xs text-gray-400 mt-2">
            Your role ({currentUser.role}) does not have permission to view this specific institutional module.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
