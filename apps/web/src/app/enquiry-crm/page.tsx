"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface EnquiryLead {
  leadId: string;
  parentName: string;
  studentName: string;
  targetGrade: string;
  phone: string;
  source: 'Google Search' | 'Walk-In Desk' | 'Facebook/Instagram' | 'Referral';
  assignedCounselor: string;
  pipelineStage: 'New Inquiry' | 'Campus Tour Booked' | 'Form Issued' | 'Enrolled' | 'Dropped';
  followUpDate: string;
}

const initialLeads: EnquiryLead[] = [
  { leadId: 'LD-2026-901', parentName: 'Deepak Bhatt', studentName: 'Priyanshu Bhatt', targetGrade: 'Grade 11 (PCM)', phone: '+91 98765 88001', source: 'Google Search', assignedCounselor: 'Megha Sharma', pipelineStage: 'Campus Tour Booked', followUpDate: '2026-10-04' },
  { leadId: 'LD-2026-902', parentName: 'Sanjay Pandey', studentName: 'Avni Pandey', targetGrade: 'Grade 6', phone: '+91 98765 88002', source: 'Walk-In Desk', assignedCounselor: 'Megha Sharma', pipelineStage: 'Form Issued', followUpDate: '2026-10-05' },
  { leadId: 'LD-2026-903', parentName: 'Sunil Joshi', studentName: 'Aarush Joshi', targetGrade: 'Grade 1', phone: '+91 98765 88003', source: 'Referral', assignedCounselor: 'Rahul Verma', pipelineStage: 'Enrolled', followUpDate: 'Completed' },
  { leadId: 'LD-2026-904', parentName: 'Rajendra Singh', studentName: 'Karan Singh', targetGrade: 'Grade 9', phone: '+91 98765 88004', source: 'Facebook/Instagram', assignedCounselor: 'Rahul Verma', pipelineStage: 'New Inquiry', followUpDate: '2026-10-04' },
];

export default function EnquiryCrmPage() {
  const { activeSchool } = useTenant();
  const [leads, setLeads] = useState<EnquiryLead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = leads.filter((l) =>
    l.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 15 • ADMISSIONS LEAD CONVERSION CRM
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Enquiry Management CRM</h1>
            <p className="text-gray-400 text-sm mt-1">
              Multi-channel prospect funnels, automated counselor follow-up calls, walk-in desks & conversion velocity.
            </p>
          </div>
          
          <button
            onClick={() => alert('New lead entry form opened.')}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-xs text-white shadow-md shadow-cyan-500/20"
          >
            + Add Prospective Lead
          </button>
        </div>

        {/* Lead Pipeline Table */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search parent name, student, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400"
          />

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Lead ID & Parent</th>
                  <th className="py-3.5 px-4">Student & Target Grade</th>
                  <th className="py-3.5 px-4">Channel Source</th>
                  <th className="py-3.5 px-4">Assigned Counselor</th>
                  <th className="py-3.5 px-4">Follow-up Date</th>
                  <th className="py-3.5 px-4">Pipeline Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredLeads.map((l) => (
                  <tr key={l.leadId} className="hover:bg-gray-800/30">
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{l.parentName}</div>
                      <div className="text-cyan-400 font-mono text-[11px]">{l.leadId} • {l.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-200">{l.studentName}</div>
                      <div className="text-gray-400 text-[11px]">{l.targetGrade}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300 font-mono text-[11px]">{l.source}</td>
                    <td className="py-3 px-4 text-gray-300">{l.assignedCounselor}</td>
                    <td className="py-3 px-4 font-mono text-amber-400 text-[11px]">{l.followUpDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        l.pipelineStage === 'Enrolled' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        l.pipelineStage === 'Form Issued' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                      }`}>
                        {l.pipelineStage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
