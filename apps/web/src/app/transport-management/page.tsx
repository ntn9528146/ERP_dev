"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface BusVehicle {
  busId: string;
  registrationNo: string;
  routeName: string;
  driverName: string;
  driverPhone: string;
  totalSeats: number;
  allocatedStudents: number;
  currentSpeed: number;
  gpsStatus: 'Live En Route' | 'At Campus Terminal' | 'Maintenance Depot';
  lastPingLocation: string;
  insuranceValidTill: string;
}

interface TransportRoute {
  routeId: string;
  routeName: string;
  startPoint: string;
  endPoint: string;
  stopsCount: number;
  morningPickupTime: string;
  eveningDropTime: string;
  assignedBusId: string;
  stops: { name: string; eta: string; students: number }[];
}

interface StudentBusPass {
  passNo: string;
  studentName: string;
  studentId: string;
  grade: string;
  routeId: string;
  assignedStop: string;
  busNo: string;
  guardianPhone: string;
  monthlyFee: number;
  status: 'Boarded' | 'De-boarded' | 'Absent Today';
}

const initialFleet: BusVehicle[] = [
  {
    busId: 'BUS-01',
    registrationNo: 'UK-04-TA-1842',
    routeName: 'Route 1: Kathgodam - Tikonia - Campus',
    driverName: 'Suraj Rawat',
    driverPhone: '+91 98765 22001',
    totalSeats: 42,
    allocatedStudents: 38,
    currentSpeed: 34,
    gpsStatus: 'Live En Route',
    lastPingLocation: 'Tikonia Chauraha (Haldwani)',
    insuranceValidTill: '2027-04-15',
  },
  {
    busId: 'BUS-02',
    registrationNo: 'UK-04-TA-2104',
    routeName: 'Route 2: Kaladhungi Road - Kusumkhera',
    driverName: 'Mahesh Negi',
    driverPhone: '+91 98765 22002',
    totalSeats: 36,
    allocatedStudents: 34,
    currentSpeed: 28,
    gpsStatus: 'Live En Route',
    lastPingLocation: 'Near Mukhani Chauraha',
    insuranceValidTill: '2027-02-20',
  },
  {
    busId: 'BUS-03',
    registrationNo: 'UK-04-TA-3390',
    routeName: 'Route 3: Rampur Road - Talli Bamori',
    driverName: 'Dharmendra Singh',
    driverPhone: '+91 98765 22003',
    totalSeats: 42,
    allocatedStudents: 40,
    currentSpeed: 0,
    gpsStatus: 'At Campus Terminal',
    lastPingLocation: 'Main Campus Bus Bay 3',
    insuranceValidTill: '2026-12-10',
  },
  {
    busId: 'BUS-04',
    registrationNo: 'UK-04-TA-4412',
    routeName: 'Route 4: Bareilly Road - Motahaldu',
    driverName: 'Harish Chandra',
    driverPhone: '+91 98765 22004',
    totalSeats: 32,
    allocatedStudents: 28,
    currentSpeed: 0,
    gpsStatus: 'Maintenance Depot',
    lastPingLocation: 'Transport Workshop Bay',
    insuranceValidTill: '2026-11-30',
  },
];

const initialRoutes: TransportRoute[] = [
  {
    routeId: 'RT-01',
    routeName: 'Kathgodam - Tikonia - Campus',
    startPoint: 'Kathgodam Railway Station',
    endPoint: 'Arden Main Campus',
    stopsCount: 5,
    morningPickupTime: '06:45 AM',
    eveningDropTime: '02:45 PM',
    assignedBusId: 'BUS-01',
    stops: [
      { name: 'Kathgodam Outpost', eta: '06:45 AM', students: 8 },
      { name: 'Polytechnic Gate', eta: '07:00 AM', students: 10 },
      { name: 'Tikonia Crossing', eta: '07:15 AM', students: 12 },
      { name: 'Judge Farm', eta: '07:25 AM', students: 5 },
      { name: 'Campus Main Gate', eta: '07:40 AM', students: 3 },
    ],
  },
  {
    routeId: 'RT-02',
    routeName: 'Kaladhungi Road - Kusumkhera',
    startPoint: 'Kamaluaganja Crossing',
    endPoint: 'Arden Main Campus',
    stopsCount: 4,
    morningPickupTime: '07:00 AM',
    eveningDropTime: '03:00 PM',
    assignedBusId: 'BUS-02',
    stops: [
      { name: 'Kamaluaganja Point', eta: '07:00 AM', students: 9 },
      { name: 'Kusumkhera Market', eta: '07:15 AM', students: 14 },
      { name: 'Heera Nagar', eta: '07:28 AM', students: 7 },
      { name: 'Campus Main Gate', eta: '07:45 AM', students: 4 },
    ],
  },
];

const initialStudentPasses: StudentBusPass[] = [
  {
    passNo: 'BP-2026-101',
    studentName: 'Aarav Sharma',
    studentId: 'DG-2026-001',
    grade: 'Grade 10 - A',
    routeId: 'RT-01',
    assignedStop: 'Tikonia Crossing',
    busNo: 'BUS-01',
    guardianPhone: '+91 98765 43210',
    monthlyFee: 2400,
    status: 'Boarded',
  },
  {
    passNo: 'BP-2026-102',
    studentName: 'Rohan Mehra',
    studentId: 'DG-2026-003',
    grade: 'Grade 9 - B',
    routeId: 'RT-02',
    assignedStop: 'Kusumkhera Market',
    busNo: 'BUS-02',
    guardianPhone: '+91 98765 43212',
    monthlyFee: 2200,
    status: 'Boarded',
  },
  {
    passNo: 'BP-2026-103',
    studentName: 'Kabir Rawat',
    studentId: 'DG-2026-005',
    grade: 'Grade 8 - A',
    routeId: 'RT-01',
    assignedStop: 'Polytechnic Gate',
    busNo: 'BUS-01',
    guardianPhone: '+91 98765 43214',
    monthlyFee: 2400,
    status: 'Absent Today',
  },
];

export default function TransportManagementPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'fleet' | 'routes' | 'passes' | 'compliance'>('fleet');
  const [fleet, setFleet] = useState<BusVehicle[]>(initialFleet);
  const [routes, setRoutes] = useState<TransportRoute[]>(initialRoutes);
  const [passes, setPasses] = useState<StudentBusPass[]>(initialStudentPasses);
  const [searchTerm, setSearchTerm] = useState('');

  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [newBus, setNewBus] = useState({
    busId: 'BUS-05',
    registrationNo: '',
    routeName: 'Route 5: Lalkuan Highway',
    driverName: '',
    driverPhone: '',
    totalSeats: 38,
    allocatedStudents: 0,
    currentSpeed: 0,
    lastPingLocation: 'Campus Garage',
    insuranceValidTill: '2027-09-30',
  });

  // KPI calculations
  const totalFleetSize = fleet.length;
  const activeEnRouteBuses = fleet.filter((b) => b.gpsStatus === 'Live En Route').length;
  const totalSeats = fleet.reduce((acc, b) => acc + b.totalSeats, 0);
  const totalAllocated = fleet.reduce((acc, b) => acc + b.allocatedStudents, 0);
  const fleetUtilizationRate = Math.round((totalAllocated / totalSeats) * 100);

  const filteredFleet = fleet.filter((b) =>
    b.busId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.registrationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBus.registrationNo || !newBus.driverName) return;

    const created: BusVehicle = {
      ...newBus,
      totalSeats: Number(newBus.totalSeats) || 35,
      gpsStatus: 'At Campus Terminal',
    };

    setFleet([...fleet, created]);
    setShowAddBusModal(false);
    alert(`Vehicle ${created.registrationNo} successfully onboarded into DEVGYAN INNOVATION Transport Cluster!`);
  };

  const handleSendPickupPing = (pass: StudentBusPass) => {
    alert(`Live GPS SMS triggered to parent of ${pass.studentName}: "Your school bus ${pass.busNo} is arriving at stop ${pass.assignedStop} in approx 8 mins." -> Sent to ${pass.guardianPhone}`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 11 • FLEET LOGISTICS & GPS TELEMETRY
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Transport Management & Live GPS</h1>
            <p className="text-gray-400 text-sm mt-1">
              Real-time vehicle satellite telemetry, speed governance, route stop schedules, and automated parent arrival SMS alerts.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddBusModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>+</span> Add Vehicle To Fleet
            </button>
          </div>
        </div>

        {/* Operational Fleet KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Buses Live En Route</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{activeEnRouteBuses} Buses Moving</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">100% GPS Signals Active</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Seat Capacity Utilization</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">{fleetUtilizationRate}% Full</div>
            <span className="text-xs text-cyan-500 font-mono mt-2 block">{totalAllocated} / {totalSeats} Seats Allotted</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Total Registered Routes</span>
            <div className="text-2xl font-black text-white mt-1">{routes.length} Active Routes</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">Covering 28 km Radius</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Speed Compliance Status</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">40 km/h Limit</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">Zero Overspeed Breaches</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'fleet' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🚌 Fleet GPS Telemetry ({fleet.length})
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'routes' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🗺️ Route Stops & ETA Schedules ({routes.length})
          </button>
          <button
            onClick={() => setActiveTab('passes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'passes' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🎫 Student Bus Passes & Boarding ({passes.length})
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'compliance' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🛡️ Insurance & Vehicle Compliance
          </button>
        </div>

        {/* TAB 1: FLEET GPS TELEMETRY */}
        {activeTab === 'fleet' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <input
                type="text"
                placeholder="Search bus ID, number plate, driver name or route..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 w-full sm:w-80"
              />
              <div className="text-xs text-gray-400 font-mono">
                Satellite Refresh: <span className="text-cyan-400 font-bold">Live Stream (Go Engine Active)</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Bus ID & Reg No</th>
                    <th className="py-3.5 px-4">Allocated Route</th>
                    <th className="py-3.5 px-4">Driver & Contact</th>
                    <th className="py-3.5 px-4">Current Speed</th>
                    <th className="py-3.5 px-4">Last GPS Halting Point</th>
                    <th className="py-3.5 px-4">GPS Live Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredFleet.map((b) => (
                    <tr key={b.busId} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono">
                        <div className="text-white font-bold">{b.busId}</div>
                        <div className="text-cyan-400 text-[11px]">{b.registrationNo}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-200">
                        <div>{b.routeName}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{b.allocatedStudents} / {b.totalSeats} seats booked</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white">{b.driverName}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{b.driverPhone}</div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className={`font-bold ${b.currentSpeed > 38 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {b.currentSpeed} km/h
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 font-mono text-[11px]">{b.lastPingLocation}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.gpsStatus === 'Live En Route' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          b.gpsStatus === 'At Campus Terminal' ? 'bg-blue-500/10 text-cyan-400 border border-cyan-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {b.gpsStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => alert(`Opening live radar map for ${b.busId} (${b.registrationNo}). GPS latitude/longitude locked.`)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold flex items-center gap-1"
                        >
                          <span>📡</span> Track Map
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ROUTE STOPS & ETA SCHEDULES */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routes.map((rt) => (
                <div key={rt.routeId} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50">
                        {rt.routeId} • ASSIGNED: {rt.assignedBusId}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">{rt.routeName}</h3>
                    </div>
                    <div className="text-right text-xs font-mono text-gray-400">
                      <div>Morning: <span className="text-emerald-400 font-bold">{rt.morningPickupTime}</span></div>
                      <div>Evening: <span className="text-cyan-400 font-bold">{rt.eveningDropTime}</span></div>
                    </div>
                  </div>

                  {/* Stops Timeline */}
                  <div className="space-y-2.5 pt-2 border-t border-gray-800 text-xs">
                    <span className="text-[11px] font-mono text-gray-400 block uppercase">Sequential Bus Stops & ETA:</span>
                    {rt.stops.map((stp, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-[#030712] border border-gray-800/80">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-gray-200 font-medium">{stp.name}</span>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="text-amber-400 font-bold">{stp.eta}</span>
                          <span className="text-gray-500 ml-2">({stp.students} Students)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT BUS PASSES */}
        {activeTab === 'passes' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Pass No & Student</th>
                    <th className="py-3.5 px-4">Grade & Section</th>
                    <th className="py-3.5 px-4">Designated Route & Bus</th>
                    <th className="py-3.5 px-4">Assigned Halting Stop</th>
                    <th className="py-3.5 px-4">Parent Phone</th>
                    <th className="py-3.5 px-4">Today Boarding Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {passes.map((p) => (
                    <tr key={p.passNo} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono">
                        <div className="text-white font-bold">{p.studentName}</div>
                        <div className="text-cyan-400 text-[11px]">{p.passNo} • {p.studentId}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{p.grade}</td>
                      <td className="py-3 px-4 font-mono text-gray-300">
                        <div>{p.busNo}</div>
                        <div className="text-[10px] text-gray-500">{p.routeId}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-200">{p.assignedStop}</td>
                      <td className="py-3 px-4 font-mono text-cyan-400 text-xs">{p.guardianPhone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'Boarded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          p.status === 'De-boarded' ? 'bg-blue-500/10 text-cyan-400 border border-cyan-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleSendPickupPing(p)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                        >
                          Send ETA Ping 📲
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: COMPLIANCE & INSURANCE */}
        {activeTab === 'compliance' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <h3 className="text-base font-bold text-white">Vehicle Statutory Safety & Regulatory Compliance</h3>
            <p className="text-xs text-gray-400">Automated alerts for fitness certificate, insurance renewals, speed governors & fire extinguishers.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">BUS-01 (UK-04-TA-1842)</span>
                  <span className="text-emerald-400 font-bold">COMPLIANT</span>
                </div>
                <div className="text-gray-400 text-[11px] space-y-1">
                  <div>• Commercial Comprehensive Insurance: Valid till 15-Apr-2027</div>
                  <div>• PUC Emission Certificate: Valid (Tested Aug 2026)</div>
                  <div>• Emergency Exit & CCTV Camera: Operational</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">BUS-04 (UK-04-TA-4412)</span>
                  <span className="text-amber-400 font-bold">RENEWAL DUE SOON</span>
                </div>
                <div className="text-gray-400 text-[11px] space-y-1">
                  <div>• Commercial Insurance: Expiring 30-Nov-2026 (58 Days Left)</div>
                  <div>• Annual Fitness Inspection: Scheduled at Haldwani RTO</div>
                  <div>• Fire Extinguisher Refill: Completed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW VEHICLE TO FLEET */}
        {showAddBusModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Onboard New Transport Vehicle</h3>
                <button onClick={() => setShowAddBusModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateBus} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Vehicle ID</label>
                    <input
                      type="text"
                      value={newBus.busId}
                      onChange={(e) => setNewBus({ ...newBus, busId: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">RTO Number Plate *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UK-04-TA-5599"
                      value={newBus.registrationNo}
                      onChange={(e) => setNewBus({ ...newBus, registrationNo: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Assigned Route Title</label>
                  <input
                    type="text"
                    required
                    value={newBus.routeName}
                    onChange={(e) => setNewBus({ ...newBus, routeName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Designated Driver Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohan Joshi"
                      value={newBus.driverName}
                      onChange={(e) => setNewBus({ ...newBus, driverName: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Driver Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={newBus.driverPhone}
                      onChange={(e) => setNewBus({ ...newBus, driverPhone: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Seat Capacity</label>
                    <input
                      type="number"
                      value={newBus.totalSeats}
                      onChange={(e) => setNewBus({ ...newBus, totalSeats: Number(e.target.value) })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Insurance Validity</label>
                    <input
                      type="date"
                      value={newBus.insuranceValidTill}
                      onChange={(e) => setNewBus({ ...newBus, insuranceValidTill: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowAddBusModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20">
                    Register Vehicle & Initialize GPS
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
