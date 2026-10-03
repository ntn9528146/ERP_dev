"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface ApplicantRecord {
  appNo: string;
  applicantName: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  appliedGrade: string;
  academicYear: string;
  registrationFeePaid: boolean;
  registrationAmount: number;
  docStatus: 'Verified' | 'Pending' | 'Re-upload Needed';
  admissionStatus: 'Applied' | 'Screening Passed' | 'Admitted & Paid' | 'Waitlisted';
  appliedDate: string;
  entranceScore?: number;
}

const initialApplicants: ApplicantRecord[] = [
  {
    appNo: 'DG-ADM-2026-001',
    applicantName: 'Tanya Negi',
    guardianName: 'Virendra Negi',
    guardianPhone: '+91 98765 66001',
    guardianEmail: 'virendra.negi@example.com',
    appliedGrade: 'Grade 11 - Science',
    academicYear: '2026-27',
    registrationFeePaid: true,
    registrationAmount: 1500,
    docStatus: 'Verified',
    admissionStatus: 'Admitted & Paid',
    appliedDate: '2026-09-24',
    entranceScore: 92,
  },
  {
    appNo: 'DG-ADM-2026-002',
    applicantName: 'Devansh Pandey',
    guardianName: 'Gaurav Pandey',
    guardianPhone: '+91 98765 66002',
    guardianEmail: 'gaurav.p@example.com',
    appliedGrade: 'Grade 9',
    academicYear: '2026-27',
    registrationFeePaid: true,
    registrationAmount: 1200,
    docStatus: 'Verified',
    admissionStatus: 'Screening Passed',
    appliedDate: '2026-09-28',
    entranceScore: 84,
  },
  {
    appNo: 'DG-ADM-2026-003',
    applicantName: 'Aanya Bhatt',
    guardianName: 'Harish Bhatt',
    guardianPhone: '+91 98765 66003',
    guardianEmail: 'harish.bhatt@example.com',
    appliedGrade: 'Grade 1',
    academicYear: '2026-27',
    registrationFeePaid: true,
    registrationAmount: 1000,
    docStatus: 'Pending',
    admissionStatus: 'Applied',
    appliedDate: '2026-10-01',
  },
  {
    appNo: 'DG-ADM-2026-004',
    applicantName: 'Suryansh Rawat',
    guardianName: 'Mohan Rawat',
    guardianPhone: '+91 98765 66004',
    guardianEmail: 'mohan.rawat@example.com',
    appliedGrade: 'Grade 11 - Commerce',
    academicYear: '2026-27',
    registrationFeePaid: true,
    registrationAmount: 1500,
    docStatus: 'Re-upload Needed',
    admissionStatus: 'Applied',
    appliedDate: '2026-10-02',
  },
  {
    appNo: 'DG-ADM-2026-005',
    applicantName: 'Ridhima Saxena',
    guardianName: 'Dr. Vivek Saxena',
    guardianPhone: '+91 98765 66005',
    guardianEmail: 'vivek.saxena@example.com',
    appliedGrade: 'Grade 6',
    academicYear: '2026-27',
    registrationFeePaid: true,
    registrationAmount: 1200,
    docStatus: 'Verified',
    admissionStatus: 'Waitlisted',
    appliedDate: '2026-10-02',
    entranceScore: 71,
  },
];

export default function AdmissionEnquiryPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'applicants' | 'funnel' | 'vault' | 'seatMatrix'>('applicants');
  const [applicants, setApplicants] = useState<ApplicantRecord[]>(initialApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [viewingLetter, setViewingLetter] = useState<ApplicantRecord | null>(null);

  // New Applicant Form State
  const [newApplicant, setNewApplicant] = useState({
    applicantName: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    appliedGrade: 'Grade 11 - Science',
    academicYear: '2026-27',
    registrationAmount: 1500,
  });

  // KPI Metrics
  const totalApplications = applicants.length;
  const confirmedAdmissions = applicants.filter((a) => a.admissionStatus === 'Admitted & Paid').length;
  const verifiedDocsCount = applicants.filter((a) => a.docStatus === 'Verified').length;
  const totalRegistrationRevenue = applicants.reduce((acc, c) => acc + (c.registrationFeePaid ? c.registrationAmount : 0), 0);

  const filteredApplicants = applicants.filter((a) => {
    const matchesSearch =
      a.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.appNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.guardianPhone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'All' || a.admissionStatus === selectedStatus;
    const matchesGrade = selectedGrade === 'All' || a.appliedGrade.includes(selectedGrade);
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const handleRegisterApplicant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApplicant.applicantName || !newApplicant.guardianPhone) return;

    const record: ApplicantRecord = {
      appNo: `DG-ADM-2026-${String(applicants.length + 1).padStart(3, '0')}`,
      ...newApplicant,
      registrationFeePaid: true,
      docStatus: 'Pending',
      admissionStatus: 'Applied',
      appliedDate: '2026-10-03',
    };

    setApplicants([record, ...applicants]);
    setShowApplyModal(false);
    alert(`Application ${record.appNo} generated successfully for ${record.applicantName}! Registration payment of ₹${record.registrationAmount} credited.`);
  };

  const handleUpdateStatus = (appNo: string, newStatus: ApplicantRecord['admissionStatus']) => {
    setApplicants(
      applicants.map((a) => (a.appNo === appNo ? { ...a, admissionStatus: newStatus } : a))
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 08 • ADMISSION DESK & REGISTRATION REVENUE
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admission & Fees Desk</h1>
            <p className="text-gray-400 text-sm mt-1">
              Multi-stage student enrollment funnel, KYC document verification vault & digital provisional admission letters.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> New Walk-in / Online Admission
            </button>
          </div>
        </div>

        {/* Operational Enrollment KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Total Applications Received</span>
            <div className="text-2xl font-black text-white mt-1">{totalApplications} Candidates</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">2026-27 Enrollment Cycle</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Confirmed Seat Allocations</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{confirmedAdmissions} Enrolled</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">Admission Fee Cleared</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">KYC Document Verification</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">{verifiedDocsCount} Dossiers</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Registrar Vault Signed</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Prospectus & Form Revenue</span>
            <div className="text-2xl font-black text-amber-400 mt-1">₹{totalRegistrationRevenue.toLocaleString('en-IN')}</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Instant Online Realization</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'applicants' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📋 Application Directory & Registry ({applicants.length})
          </button>
          <button
            onClick={() => setActiveTab('funnel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'funnel' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📊 Multi-Stage Enrollment Funnel
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vault' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🗂️ KYC Document Verification Vault
          </button>
          <button
            onClick={() => setActiveTab('seatMatrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'seatMatrix' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            💺 Institutional Seat Matrix & Quotas
          </button>
        </div>

        {/* TAB 1: APPLICANT DIRECTORY */}
        {activeTab === 'applicants' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search candidate name, App No, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Admission Stages</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening Passed">Screening Passed</option>
                  <option value="Admitted & Paid">Admitted & Paid</option>
                  <option value="Waitlisted">Waitlisted</option>
                </select>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Grades</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 11">Grade 11</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Showing <span className="text-cyan-400 font-bold">{filteredApplicants.length}</span> candidates
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Application No.</th>
                    <th className="py-3.5 px-4">Candidate & Guardian</th>
                    <th className="py-3.5 px-4">Target Grade</th>
                    <th className="py-3.5 px-4">Registration Fee</th>
                    <th className="py-3.5 px-4">KYC Vault</th>
                    <th className="py-3.5 px-4">Admission Stage</th>
                    <th className="py-3.5 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredApplicants.map((a) => (
                    <tr key={a.appNo} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-cyan-400">
                        <div>{a.appNo}</div>
                        <div className="text-[10px] text-gray-500">Date: {a.appliedDate}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{a.applicantName}</div>
                        <div className="text-[11px] text-gray-400">Guardian: {a.guardianName} ({a.guardianPhone})</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-200">{a.appliedGrade}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">₹{a.registrationAmount} Paid</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.docStatus === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          a.docStatus === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {a.docStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          a.admissionStatus === 'Admitted & Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          a.admissionStatus === 'Screening Passed' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          a.admissionStatus === 'Waitlisted' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-blue-500/10 text-blue-300'
                        }`}>
                          {a.admissionStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {a.admissionStatus === 'Screening Passed' && (
                            <button
                              onClick={() => handleUpdateStatus(a.appNo, 'Admitted & Paid')}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                            >
                              Collect Fee & Enroll
                            </button>
                          )}
                          <button
                            onClick={() => setViewingLetter(a)}
                            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                          >
                            Admission Letter
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ENROLLMENT FUNNEL */}
        {activeTab === 'funnel' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Institutional Admission Conversion Funnel</h3>
              <p className="text-xs text-gray-400">Automated tracking from initial prospectus download to final classroom roll call allotment.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block">Stage 1: Inquiries</span>
                <div className="text-3xl font-black text-white">420 Leads</div>
                <span className="text-cyan-400 text-[10px] block">Digital & Campus Desk</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block">Stage 2: Forms Registered</span>
                <div className="text-3xl font-black text-cyan-400">184 Forms</div>
                <span className="text-gray-400 text-[10px] block">43.8% Form Conversion</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block">Stage 3: Entrance & Screening</span>
                <div className="text-3xl font-black text-amber-400">142 Screened</div>
                <span className="text-amber-500 text-[10px] block">82% Clear Cut-Off</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#030712] border border-emerald-900/60 bg-emerald-950/20 space-y-2">
                <span className="text-[10px] text-gray-400 uppercase block">Stage 4: Enrolled & Paid</span>
                <div className="text-3xl font-black text-emerald-400">118 Admitted</div>
                <span className="text-emerald-400 text-[10px] block">100% Seats Sealed</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KYC DOCUMENT VAULT */}
        {activeTab === 'vault' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Encrypted KYC Document Vault</h3>
            <p className="text-xs text-gray-400">Digital verification of birth records, previous school transfer certificates & address proofs.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Tanya Negi (Grade 11)</span>
                  <span className="text-emerald-400 font-mono text-[10px] font-bold">ALL 4 VERIFIED</span>
                </div>
                <div className="text-gray-400 font-mono text-[11px] space-y-1">
                  <div>✓ Birth Certificate (Verified)</div>
                  <div>✓ Transfer Certificate TC (Verified)</div>
                  <div>✓ Class 10 Board Marksheet (Verified)</div>
                  <div>✓ Aadhaar KYC (Verified)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Suryansh Rawat (Grade 11)</span>
                  <span className="text-rose-400 font-mono text-[10px] font-bold">ACTION NEEDED</span>
                </div>
                <div className="text-gray-400 font-mono text-[11px] space-y-1">
                  <div>✓ Birth Certificate (Verified)</div>
                  <div className="text-rose-400">✕ Transfer Certificate (TC Stamp Missing)</div>
                  <div>✓ Class 10 Board Marksheet (Verified)</div>
                  <div>✓ Aadhaar KYC (Verified)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Aanya Bhatt (Grade 1)</span>
                  <span className="text-amber-400 font-mono text-[10px] font-bold">UNDER REVIEW</span>
                </div>
                <div className="text-gray-400 font-mono text-[11px] space-y-1">
                  <div>✓ Municipal Birth Certificate (Pending Review)</div>
                  <div>✓ Immunization & Health Card (Attached)</div>
                  <div>✓ Parent Residence Proof (Attached)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SEAT MATRIX */}
        {activeTab === 'seatMatrix' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <h3 className="text-base font-bold text-white">Class-wise Institutional Capacity & Seat Matrix (2026-27)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-gray-400">GRADE 11 (SCIENCE)</span>
                <div className="text-lg font-bold text-white mt-1">78 / 80 Filled</div>
                <div className="text-rose-400 text-[11px] mt-1">2 Seats Available</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-gray-400">GRADE 11 (COMMERCE)</span>
                <div className="text-lg font-bold text-white mt-1">62 / 80 Filled</div>
                <div className="text-emerald-400 text-[11px] mt-1">18 Seats Available</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-gray-400">GRADE 9 (FOUNDATION)</span>
                <div className="text-lg font-bold text-white mt-1">114 / 120 Filled</div>
                <div className="text-emerald-400 text-[11px] mt-1">6 Seats Available</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-gray-400">PRIMARY (GRADE 1)</span>
                <div className="text-lg font-bold text-white mt-1">85 / 100 Filled</div>
                <div className="text-cyan-400 text-[11px] mt-1">15 Seats Available</div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: REGISTER NEW APPLICANT */}
        {showApplyModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Enroll New Student Applicant</h3>
                <button onClick={() => setShowApplyModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleRegisterApplicant} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Candidate Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Yash Vardhan"
                      value={newApplicant.applicantName}
                      onChange={(e) => setNewApplicant({ ...newApplicant, applicantName: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Target Grade *</label>
                    <select
                      value={newApplicant.appliedGrade}
                      onChange={(e) => setNewApplicant({ ...newApplicant, appliedGrade: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option>Grade 1</option>
                      <option>Grade 6</option>
                      <option>Grade 9</option>
                      <option>Grade 11 - Science</option>
                      <option>Grade 11 - Commerce</option>
                      <option>Grade 11 - Humanities</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Guardian / Parent Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Vardhan"
                      value={newApplicant.guardianName}
                      onChange={(e) => setNewApplicant({ ...newApplicant, guardianName: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={newApplicant.guardianPhone}
                      onChange={(e) => setNewApplicant({ ...newApplicant, guardianPhone: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Guardian Email</label>
                  <input
                    type="email"
                    placeholder="parent@example.com"
                    value={newApplicant.guardianEmail}
                    onChange={(e) => setNewApplicant({ ...newApplicant, guardianEmail: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="p-3 bg-[#030712] rounded-xl border border-gray-800 flex justify-between items-center font-mono">
                  <span className="text-gray-400">Prospectus & Registration Fee:</span>
                  <span className="text-emerald-400 font-bold">₹{newApplicant.registrationAmount} (Auto-Credited)</span>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowApplyModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
                    Generate Application Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: PRINTABLE PROVISIONAL ADMISSION LETTER */}
        {viewingLetter && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl">
              
              <div className="flex justify-between items-start border-b border-gray-800 pb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400">
                    DEVGYAN INNOVATION • ENROLLMENT SECRETARIAT
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{activeSchool.name}</h3>
                  <p className="text-xs text-gray-400">Provisional Offer of Admission • Session 2026-27</p>
                </div>
                <button
                  onClick={() => setViewingLetter(null)}
                  className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-3 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-gray-400">APPLICATION NO:</span>
                  <span className="text-cyan-400 font-bold">{viewingLetter.appNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CANDIDATE:</span>
                  <span className="font-bold text-white">{viewingLetter.applicantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ALLOTTED GRADE:</span>
                  <span className="text-gray-200">{viewingLetter.appliedGrade}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-gray-400">STATUS:</span>
                  <span className="text-emerald-400 font-bold">{viewingLetter.admissionStatus}</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Dear Parent, We are pleased to confirm that <strong>{viewingLetter.applicantName}</strong> has completed the entrance assessment and document evaluation for enrollment into <strong>{viewingLetter.appliedGrade}</strong>. Please present this letter at the registrar counter for final biometric card creation.
              </p>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200"
                >
                  🖨 Print Official Letter
                </button>
                <button
                  onClick={() => setViewingLetter(null)}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
