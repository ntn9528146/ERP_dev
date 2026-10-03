"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface RoomRecord {
  roomNo: string;
  blockWing: string;
  floor: string;
  roomType: 'Single Ac' | 'Double Sharing' | 'Triple Sharing' | 'Dormitory (4-Bed)';
  totalBeds: number;
  occupiedBeds: number;
  monthlyFee: number;
  wardenIncharge: string;
}

interface ResidentStudent {
  residentId: string;
  studentId: string;
  name: string;
  grade: string;
  blockWing: string;
  roomNo: string;
  bedNo: string;
  checkInDate: string;
  guardianPhone: string;
  messDietPlan: 'Standard Veg' | 'Special Protein' | 'Jain Diet';
  gatePassStatus: 'In Campus' | 'On Out-Pass' | 'Overdue Curfew';
}

interface GatePassRecord {
  passId: string;
  studentName: string;
  roomNo: string;
  outTime: string;
  expectedReturn: string;
  destination: string;
  parentConsent: 'OTP Verified' | 'Pending Call' | 'Warden Approved';
  status: 'Active Out' | 'Returned' | 'Curfew Breach';
}

const initialRooms: RoomRecord[] = [
  { roomNo: 'SB-101', blockWing: 'Shivalik Boys Wing', floor: '1st Floor', roomType: 'Double Sharing', totalBeds: 2, occupiedBeds: 2, monthlyFee: 8500, wardenIncharge: 'Mr. Arvind Rawat' },
  { roomNo: 'SB-102', blockWing: 'Shivalik Boys Wing', floor: '1st Floor', roomType: 'Double Sharing', totalBeds: 2, occupiedBeds: 1, monthlyFee: 8500, wardenIncharge: 'Mr. Arvind Rawat' },
  { roomNo: 'SB-201', blockWing: 'Shivalik Boys Wing', floor: '2nd Floor', roomType: 'Triple Sharing', totalBeds: 3, occupiedBeds: 2, monthlyFee: 7000, wardenIncharge: 'Mr. Arvind Rawat' },
  { roomNo: 'NG-101', blockWing: 'Nanda Devi Girls Wing', floor: '1st Floor', roomType: 'Double Sharing', totalBeds: 2, occupiedBeds: 2, monthlyFee: 8500, wardenIncharge: 'Mrs. Meenakshi Joshi' },
  { roomNo: 'NG-102', blockWing: 'Nanda Devi Girls Wing', floor: '1st Floor', roomType: 'Single Ac', totalBeds: 1, occupiedBeds: 0, monthlyFee: 12000, wardenIncharge: 'Mrs. Meenakshi Joshi' },
  { roomNo: 'NG-201', blockWing: 'Nanda Devi Girls Wing', floor: '2nd Floor', roomType: 'Triple Sharing', totalBeds: 3, occupiedBeds: 3, monthlyFee: 7000, wardenIncharge: 'Mrs. Meenakshi Joshi' },
];

const initialResidents: ResidentStudent[] = [
  {
    residentId: 'RES-2026-081',
    studentId: 'DG-2026-001',
    name: 'Aarav Sharma',
    grade: 'Grade 10 - A',
    blockWing: 'Shivalik Boys Wing',
    roomNo: 'SB-101',
    bedNo: 'Bed 1',
    checkInDate: '2026-07-01',
    guardianPhone: '+91 98765 43210',
    messDietPlan: 'Standard Veg',
    gatePassStatus: 'In Campus',
  },
  {
    residentId: 'RES-2026-082',
    studentId: 'DG-2026-003',
    name: 'Rohan Mehra',
    grade: 'Grade 9 - B',
    blockWing: 'Shivalik Boys Wing',
    roomNo: 'SB-101',
    bedNo: 'Bed 2',
    checkInDate: '2026-07-01',
    guardianPhone: '+91 98765 43212',
    messDietPlan: 'Special Protein',
    gatePassStatus: 'On Out-Pass',
  },
  {
    residentId: 'RES-2026-083',
    studentId: 'DG-2026-002',
    name: 'Ananya Verma',
    grade: 'Grade 12 - Science',
    blockWing: 'Nanda Devi Girls Wing',
    roomNo: 'NG-101',
    bedNo: 'Bed 1',
    checkInDate: '2026-06-25',
    guardianPhone: '+91 98765 43211',
    messDietPlan: 'Standard Veg',
    gatePassStatus: 'In Campus',
  },
  {
    residentId: 'RES-2026-084',
    studentId: 'DG-2026-004',
    name: 'Ishita Joshi',
    grade: 'Grade 11 - Commerce',
    blockWing: 'Nanda Devi Girls Wing',
    roomNo: 'NG-101',
    bedNo: 'Bed 2',
    checkInDate: '2026-07-05',
    guardianPhone: '+91 98765 43213',
    messDietPlan: 'Jain Diet',
    gatePassStatus: 'In Campus',
  },
];

const initialGatePasses: GatePassRecord[] = [
  {
    passId: 'GP-2026-301',
    studentName: 'Rohan Mehra',
    roomNo: 'SB-101',
    outTime: '04:30 PM',
    expectedReturn: '07:30 PM',
    destination: 'Market / Dental Clinic Visit',
    parentConsent: 'OTP Verified',
    status: 'Active Out',
  },
  {
    passId: 'GP-2026-302',
    studentName: 'Aarav Sharma',
    roomNo: 'SB-101',
    outTime: '02:00 PM (Yesterday)',
    expectedReturn: '06:00 PM (Yesterday)',
    destination: 'Haldwani Main Book Depot',
    parentConsent: 'Warden Approved',
    status: 'Returned',
  },
];

export default function HostelManagementPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'rooms' | 'residents' | 'gatepass' | 'mess' | 'maintenance'>('rooms');
  const [rooms, setRooms] = useState<RoomRecord[]>(initialRooms);
  const [residents, setResidents] = useState<ResidentStudent[]>(initialResidents);
  const [gatePasses, setGatePasses] = useState<GatePassRecord[]>(initialGatePasses);
  
  const [selectedWing, setSelectedWing] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [showGatePassModal, setShowGatePassModal] = useState(false);

  // New Allotment State
  const [newResident, setNewResident] = useState({
    name: '',
    studentId: '',
    grade: 'Grade 11',
    blockWing: 'Shivalik Boys Wing',
    roomNo: 'SB-102',
    bedNo: 'Bed 2',
    guardianPhone: '',
    messDietPlan: 'Standard Veg' as 'Standard Veg' | 'Special Protein' | 'Jain Diet',
  });

  // New Gate Pass State
  const [newGatePass, setNewGatePass] = useState({
    studentName: 'Aarav Sharma',
    roomNo: 'SB-101',
    outTime: '05:00 PM',
    expectedReturn: '07:30 PM',
    destination: 'City Library / Medical Store',
  });

  // KPI Calculations
  const totalBeds = rooms.reduce((acc, r) => acc + r.totalBeds, 0);
  const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupiedBeds, 0);
  const vacantBeds = totalBeds - occupiedBeds;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const filteredRooms = rooms.filter((r) => {
    const matchesWing = selectedWing === 'All' || r.blockWing === selectedWing;
    const matchesSearch = r.roomNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.wardenIncharge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesWing && matchesSearch;
  });

  const handleAllocateBed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResident.name || !newResident.studentId) return;

    const record: ResidentStudent = {
      residentId: `RES-2026-${String(residents.length + 1).padStart(3, '0')}`,
      ...newResident,
      checkInDate: '2026-10-03',
      gatePassStatus: 'In Campus',
    };

    setResidents([record, ...residents]);

    // Increment occupied bed in selected room
    setRooms(
      rooms.map((r) =>
        r.roomNo === newResident.roomNo
          ? { ...r, occupiedBeds: Math.min(r.totalBeds, r.occupiedBeds + 1) }
          : r
      )
    );

    setShowAllocateModal(false);
    alert(`Bed successfully allocated to ${record.name} in Room ${record.roomNo}!`);
  };

  const handleIssueGatePass = (e: React.FormEvent) => {
    e.preventDefault();
    const passRecord: GatePassRecord = {
      passId: `GP-2026-${300 + gatePasses.length + 1}`,
      ...newGatePass,
      parentConsent: 'OTP Verified',
      status: 'Active Out',
    };

    setGatePasses([passRecord, ...gatePasses]);
    setShowGatePassModal(false);
    alert(`Gate pass ${passRecord.passId} issued. Biometric security notified at main gate.`);
  };

  const handleMarkReturned = (passId: string) => {
    setGatePasses(
      gatePasses.map((gp) => (gp.passId === passId ? { ...gp, status: 'Returned' } : gp))
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
                MODULE 10 • RESIDENTIAL CAMPUS LIVING & DISCIPLINE
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Hostel & Living Management</h1>
            <p className="text-gray-400 text-sm mt-1">
              Live room & bed allocations, warden night curfew registers, digital gate pass approvals & dining mess plans.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGatePassModal(true)}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-md shadow-indigo-600/20"
            >
              🎫 Issue Out-Pass (Warden)
            </button>
            <button
              onClick={() => setShowAllocateModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Allocate Hostel Bed
            </button>
          </div>
        </div>

        {/* Operational Hostel KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Hostel Bed Occupancy</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">{occupancyRate}% Filled</div>
            <span className="text-xs text-emerald-400 font-mono mt-2 block">{occupiedBeds} / {totalBeds} Beds Occupied</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Available Vacant Beds</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{vacantBeds} Vacant</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Ready For Instant Allotment</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Active Out-Passes (Outside)</span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {gatePasses.filter((g) => g.status === 'Active Out').length} Students
            </div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">Curfew Cutoff: 08:00 PM</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Mess Meal Footfall</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">98.6% Punch</div>
            <span className="text-xs text-indigo-400 font-mono mt-2 block">Biometric Dining Terminal</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rooms' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🏢 Room & Wing Matrix ({rooms.length})
          </button>
          <button
            onClick={() => setActiveTab('residents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'residents' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🛌 Enrolled Residents ({residents.length})
          </button>
          <button
            onClick={() => setActiveTab('gatepass')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gatepass' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🚪 Warden Gate Pass & Curfew Log
          </button>
          <button
            onClick={() => setActiveTab('mess')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'mess' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🍽️ Dining Mess Billing & Diet
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'maintenance' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🔧 Room Maintenance Grievances
          </button>
        </div>

        {/* TAB 1: ROOMS MATRIX */}
        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search room number or warden name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <select
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Wings</option>
                  <option value="Shivalik Boys Wing">Shivalik Boys Wing</option>
                  <option value="Nanda Devi Girls Wing">Nanda Devi Girls Wing</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Showing <span className="text-cyan-400 font-bold">{filteredRooms.length}</span> residential rooms
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRooms.map((rm) => {
                const isFull = rm.occupiedBeds >= rm.totalBeds;
                return (
                  <div
                    key={rm.roomNo}
                    className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/40 transition-all space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black text-white">{rm.roomNo}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isFull ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {isFull ? 'Full' : `${rm.totalBeds - rm.occupiedBeds} Bed Available`}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 font-mono">
                      <div>{rm.blockWing} • {rm.floor}</div>
                      <div className="text-gray-300 mt-0.5">{rm.roomType}</div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-mono text-gray-400">
                        <span>Bed Capacity</span>
                        <span className="text-cyan-400 font-bold">{rm.occupiedBeds} / {rm.totalBeds} Beds</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          style={{ width: `${(rm.occupiedBeds / rm.totalBeds) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-xs">
                      <span className="font-mono text-white font-bold">₹{rm.monthlyFee.toLocaleString('en-IN')}/mo</span>
                      <span className="text-[11px] text-gray-400">Warden: {rm.wardenIncharge.split(' ')[1]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: RESIDENTS DOSSIER */}
        {activeTab === 'residents' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Resident ID & Student</th>
                    <th className="py-3.5 px-4">Class</th>
                    <th className="py-3.5 px-4">Wing / Room / Bed</th>
                    <th className="py-3.5 px-4">Guardian Contact</th>
                    <th className="py-3.5 px-4">Diet Preference</th>
                    <th className="py-3.5 px-4">Campus Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {residents.map((res) => (
                    <tr key={res.residentId} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{res.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{res.residentId} • {res.studentId}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{res.grade}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <div className="text-white font-bold">{res.roomNo} ({res.bedNo})</div>
                        <div className="text-gray-400 text-[10px]">{res.blockWing}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300 text-xs">{res.guardianPhone}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-[11px]">
                          {res.messDietPlan}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          res.gatePassStatus === 'In Campus' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          res.gatePassStatus === 'On Out-Pass' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {res.gatePassStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => alert(`Room reallocation request raised for ${res.name}.`)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                        >
                          Shift Room
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GATE PASS & CURFEW LOG */}
        {activeTab === 'gatepass' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-300">
                Warden Digital Gate Pass Register • Security terminals verify barcode at campus boundary.
              </span>
              <button
                onClick={() => setShowGatePassModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
              >
                + Issue Out-Pass
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Pass ID</th>
                    <th className="py-3.5 px-4">Student & Room</th>
                    <th className="py-3.5 px-4">Out Time</th>
                    <th className="py-3.5 px-4">Expected Return</th>
                    <th className="py-3.5 px-4">Purpose / Destination</th>
                    <th className="py-3.5 px-4">Parent Consent</th>
                    <th className="py-3.5 px-4">Curfew Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {gatePasses.map((gp) => (
                    <tr key={gp.passId} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400">{gp.passId}</td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{gp.studentName}</div>
                        <div className="text-[10px] text-gray-400 font-mono">Room {gp.roomNo}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300">{gp.outTime}</td>
                      <td className="py-3 px-4 font-mono text-amber-400 font-bold">{gp.expectedReturn}</td>
                      <td className="py-3 px-4 text-gray-400 text-xs">{gp.destination}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                          {gp.parentConsent}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          gp.status === 'Active Out' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          gp.status === 'Returned' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {gp.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {gp.status === 'Active Out' && (
                          <button
                            onClick={() => handleMarkReturned(gp.passId)}
                            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-emerald-300 text-[11px] font-semibold"
                          >
                            Mark Returned 🏠
                          </button>
                        )}
                        {gp.status === 'Returned' && (
                          <span className="text-gray-500 text-[10px] font-mono">Closed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MESS BILLING & DIET */}
        {activeTab === 'mess' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <h3 className="text-base font-bold text-white">Central Dining Mess & Nutrition Matrix</h3>
            <p className="text-xs text-gray-400">Nutritional meal balance, dietary allergies & monthly meal accounts.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">PLAN 01 • STANDARD VEGETARIAN</span>
                <div className="text-xl font-bold text-white">₹3,800 / Month</div>
                <p className="text-gray-400">4 Balanced Meals (Breakfast, Lunch, Evening Snacks, Dinner with Dairy).</p>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">PLAN 02 • SPECIAL HIGH PROTEIN</span>
                <div className="text-xl font-bold text-white">₹4,600 / Month</div>
                <p className="text-gray-400">Includes Sprouts, Dry Fruits, Paneer & Greek Yogurt supplements for sports athletes.</p>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2 text-xs">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">PLAN 03 • JAIN SATVIK DIET</span>
                <div className="text-xl font-bold text-white">₹3,800 / Month</div>
                <p className="text-gray-400">Prepared in segregated kitchen without onion, garlic, or root vegetables.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MAINTENANCE DESK */}
        {activeTab === 'maintenance' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Hostel Infrastructure Grievance Tickets</h3>
            <p className="text-xs text-gray-400">Direct escalation to campus estate & facilities engineering team.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-white font-bold">Room SB-101 • Air Conditioning Filter Service</span>
                  <span className="text-emerald-400 font-bold">RESOLVED</span>
                </div>
                <div className="text-gray-400 text-[11px]">Logged by Warden Arvind Rawat • Completed in 4 hours</div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-white font-bold">Room NG-201 • Bathroom Tap Valve Replacement</span>
                  <span className="text-amber-400 font-bold">IN PROGRESS</span>
                </div>
                <div className="text-gray-400 text-[11px]">Assigned to Plumber Team • SLA: 2 Hours</div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: ALLOCATE BED */}
        {showAllocateModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Hostel Room Allotment Form</h3>
                <button onClick={() => setShowAllocateModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleAllocateBed} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Rawat"
                      value={newResident.name}
                      onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Student ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DG-2026-005"
                      value={newResident.studentId}
                      onChange={(e) => setNewResident({ ...newResident, studentId: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Hostel Block / Wing</label>
                    <select
                      value={newResident.blockWing}
                      onChange={(e) => setNewResident({ ...newResident, blockWing: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option>Shivalik Boys Wing</option>
                      <option>Nanda Devi Girls Wing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Available Room</label>
                    <select
                      value={newResident.roomNo}
                      onChange={(e) => setNewResident({ ...newResident, roomNo: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      {rooms.filter((r) => r.occupiedBeds < r.totalBeds).map((r) => (
                        <option key={r.roomNo} value={r.roomNo}>
                          {r.roomNo} ({r.totalBeds - r.occupiedBeds} beds vacant)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Bed Number</label>
                    <input
                      type="text"
                      value={newResident.bedNo}
                      onChange={(e) => setNewResident({ ...newResident, bedNo: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={newResident.guardianPhone}
                      onChange={(e) => setNewResident({ ...newResident, guardianPhone: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Dining Diet Plan</label>
                  <select
                    value={newResident.messDietPlan}
                    onChange={(e) => setNewResident({ ...newResident, messDietPlan: e.target.value as any })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Standard Veg">Standard Vegetarian (₹3,800/mo)</option>
                    <option value="Special Protein">Special High Protein (₹4,600/mo)</option>
                    <option value="Jain Diet">Jain Satvik Diet (₹3,800/mo)</option>
                  </select>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowAllocateModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
                    Confirm Bed Allocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ISSUE OUT-PASS */}
        {showGatePassModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Issue Warden Out-Pass</h3>
                <button onClick={() => setShowGatePassModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleIssueGatePass} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Resident Student *</label>
                  <select
                    value={newGatePass.studentName}
                    onChange={(e) => setNewGatePass({ ...newGatePass, studentName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  >
                    {residents.map((r) => (
                      <option key={r.residentId} value={r.name}>
                        {r.name} (Room {r.roomNo})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Departure Out-Time</label>
                    <input
                      type="text"
                      value={newGatePass.outTime}
                      onChange={(e) => setNewGatePass({ ...newGatePass, outTime: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Curfew Return Time</label>
                    <input
                      type="text"
                      value={newGatePass.expectedReturn}
                      onChange={(e) => setNewGatePass({ ...newGatePass, expectedReturn: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Destination & Reason *</label>
                  <input
                    type="text"
                    required
                    value={newGatePass.destination}
                    onChange={(e) => setNewGatePass({ ...newGatePass, destination: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowGatePassModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
                    Authorize & Send SMS Notice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
