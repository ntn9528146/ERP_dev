"use client";
import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

export default function EnquiryCrmPage() {
  const { activeSchool } = useTenant();
  const [leads, setLeads] = useState([
    { id: 'LD-101', student: 'Kabir Rawat', grade: 'Class 9', parent: 'Mahesh Rawat', phone: '+91 98765 44001', status: 'Follow Up', counselor: 'Pooja Bhatt' },
    { id: 'LD-102', student: 'Ananya Mehra', grade: 'Class 11 - Science', parent: 'Dr. S. K. Mehra', phone: '+91 98765 44002', status: 'Admitted', counselor: 'Dr. Rajesh Sharma' },
  ]);

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                MODULE 15 • ADMISSIONS LEAD CONVERSION CRM [{activeSchool.name}]
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Enquiry Management CRM</h1>
              <p className="text-gray-400 text-xs mt-1">Multi-channel prospect funnels, automated counselor follow-up calls & conversion velocity.</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-500/20">
              + Add Prospective Lead
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Student Candidate</th>
                  <th className="py-3 px-4">Target Class</th>
                  <th className="py-3 px-4">Parent & Contact</th>
                  <th className="py-3 px-4">Appointed Counselor</th>
                  <th className="py-3 px-4">Funnel Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-800/30">
                    <td className="py-3 px-4 font-mono text-cyan-400 font-bold">{l.id}</td>
                    <td className="py-3 px-4 text-white font-semibold">{l.student}</td>
                    <td className="py-3 px-4 text-gray-300">{l.grade}</td>
                    <td className="py-3 px-4 font-mono">
                      <div>{l.parent}</div>
                      <div className="text-gray-500 text-[10px]">{l.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{l.counselor}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        ● {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ConfidentialGuard>
  );
}
