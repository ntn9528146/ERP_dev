"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface QuestionPaperBank {
  code: string;
  subject: string;
  classLevel: string;
  authorFaculty: string;
  moderator: string;
  encryptionStatus: 'AES-256 Encrypted (Locked)' | 'Decrypted for Print' | 'Under Moderation';
  scheduledPrintTime: string;
  checksumHash: string;
}

const initialPapers: QuestionPaperBank[] = [
  { code: 'QP-2026-PHY-12', subject: 'Physics (042) Mid-Term Series A', classLevel: 'Class 12', authorFaculty: 'Dr. Rajesh Sharma', moderator: 'Principal Desk', encryptionStatus: 'AES-256 Encrypted (Locked)', scheduledPrintTime: '12-Oct-2026 07:00 AM', checksumHash: 'SHA256: 8f4e2...a991' },
  { code: 'QP-2026-MAT-12', subject: 'Mathematics (041) Mock Board Set 1', classLevel: 'Class 12', authorFaculty: 'Pooja Bhatt', moderator: 'Principal Desk', encryptionStatus: 'AES-256 Encrypted (Locked)', scheduledPrintTime: '16-Oct-2026 07:00 AM', checksumHash: 'SHA256: 3c1d9...f44b' },
  { code: 'QP-2026-CS-12', subject: 'Computer Science (083) Theory Mock', classLevel: 'Class 12', authorFaculty: 'Alok Verma', moderator: 'Vice Principal', encryptionStatus: 'Under Moderation', scheduledPrintTime: '19-Oct-2026 07:00 AM', checksumHash: 'SHA256: 77a01...e201' },
];

export default function ExamControllerPage() {
  const { activeSchool } = useTenant();
  const [papers, setPapers] = useState<QuestionPaperBank[]>(initialPapers);

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 14 • CONFIDENTIAL EXAMINATION CONTROLLER
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Controller of Examination (Secret Vault)</h1>
            <p className="text-gray-400 text-sm mt-1">
              Encrypted question paper repositories, tamper detection audit logs, and confidential marks moderation.
            </p>
          </div>
          
          <div className="px-4 py-2 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 font-mono text-xs font-bold">
            🔒 AIR-GAPPED VAULT KEY ACTIVE
          </div>
        </div>

        {/* Papers Repository */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Paper Code & Subject</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Author & Moderator</th>
                <th className="py-3.5 px-4">Checksum Integrity</th>
                <th className="py-3.5 px-4">Scheduled Unlock</th>
                <th className="py-3.5 px-4">Encryption State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-medium">
              {papers.map((p) => (
                <tr key={p.code} className="hover:bg-gray-800/30">
                  <td className="py-3 px-4">
                    <div className="text-white font-semibold">{p.subject}</div>
                    <div className="text-cyan-400 font-mono text-[11px]">{p.code}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-300">{p.classLevel}</td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>{p.authorFaculty}</div>
                    <div className="text-gray-500 text-[10px]">Mod: {p.moderator}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-gray-400">{p.checksumHash}</td>
                  <td className="py-3 px-4 font-mono text-amber-400 text-[11px]">{p.scheduledPrintTime}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.encryptionStatus.includes('Locked') ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {p.encryptionStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
