"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface BroadcastLog {
  campaignId: string;
  title: string;
  channel: 'SMS + WhatsApp' | 'WhatsApp Only' | 'Official Email' | 'Multi-Channel Push';
  audienceSegment: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  dispatchedAt: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  author: string;
}

interface DltTemplate {
  templateId: string;
  name: string;
  category: 'Fee Alert' | 'Attendance' | 'Transport' | 'Examinations' | 'General Circular';
  channel: 'SMS' | 'WhatsApp';
  contentPreview: string;
  status: 'Approved (TRAI/DLT)' | 'Pending Verification';
}

const initialBroadcastLogs: BroadcastLog[] = [
  {
    campaignId: 'BC-2026-1001',
    title: 'Autumn Weather Advisory & School Timing Shift',
    channel: 'SMS + WhatsApp',
    audienceSegment: 'All Enrolled Parents (Grades 1 to 12)',
    sentCount: 2480,
    deliveredCount: 2445,
    readCount: 2190,
    dispatchedAt: '2026-10-03 08:30 AM',
    status: 'Completed',
    author: 'Principal Desk',
  },
  {
    campaignId: 'BC-2026-1002',
    title: 'Mid-Term Board Mock Admit Cards Released',
    channel: 'Official Email',
    audienceSegment: 'Class 10 & Class 12 Candidates',
    sentCount: 310,
    deliveredCount: 308,
    readCount: 284,
    dispatchedAt: '2026-10-02 04:15 PM',
    status: 'Completed',
    author: 'Exam Controller',
  },
  {
    campaignId: 'BC-2026-1003',
    title: 'Quarter-2 Pending Tuition Fee Reminder',
    channel: 'WhatsApp Only',
    audienceSegment: 'Unpaid Fee Defaulters (18 Candidates)',
    sentCount: 18,
    deliveredCount: 18,
    readCount: 16,
    dispatchedAt: '2026-10-02 11:00 AM',
    status: 'Completed',
    author: 'Accounts Bureau',
  },
  {
    campaignId: 'BC-2026-1004',
    title: 'Daily Unexcused Absenteeism Gate Trigger',
    channel: 'Multi-Channel Push',
    audienceSegment: 'Today Absent Students (14 Candidates)',
    sentCount: 14,
    deliveredCount: 14,
    readCount: 12,
    dispatchedAt: '2026-10-03 08:45 AM',
    status: 'Completed',
    author: 'Biometric Gateway',
  },
];

const initialTemplates: DltTemplate[] = [
  {
    templateId: 'DLT-TMP-991',
    name: 'Student Unexcused Absent Alert',
    category: 'Attendance',
    channel: 'WhatsApp',
    contentPreview: 'Dear Parent, {#var#} was marked ABSENT on {#var#} at Arden Progressive School. Please verify status via parent portal.',
    status: 'Approved (TRAI/DLT)',
  },
  {
    templateId: 'DLT-TMP-992',
    name: 'Fee Due Escalation Notice',
    category: 'Fee Alert',
    channel: 'SMS',
    contentPreview: 'Arden Progressive: Term Fee of Rs.{#var#} for {#var#} is due on {#var#}. Avoid late fine by paying online at devgyan.io/pay',
    status: 'Approved (TRAI/DLT)',
  },
  {
    templateId: 'DLT-TMP-993',
    name: 'School Bus Proximity Ping',
    category: 'Transport',
    channel: 'WhatsApp',
    contentPreview: 'Arden Fleet Alert: Bus {#var#} is arriving at stop {#var#} in approx 8 mins. Please be ready at halt point.',
    status: 'Approved (TRAI/DLT)',
  },
  {
    templateId: 'DLT-TMP-994',
    name: 'Result & Marksheet Publication',
    category: 'Examinations',
    channel: 'WhatsApp',
    contentPreview: 'Dear Parent, the examination report card for {#var#} ({#var#}) is published. Download digital marksheet from portal.',
    status: 'Approved (TRAI/DLT)',
  },
];

export default function AlertsNotificationPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'telemetry' | 'credits'>('campaigns');
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>(initialBroadcastLogs);
  const [templates, setTemplates] = useState<DltTemplate[]>(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    channel: 'SMS + WhatsApp' as 'SMS + WhatsApp' | 'WhatsApp Only' | 'Official Email' | 'Multi-Channel Push',
    audienceSegment: 'All Enrolled Parents (Grades 1 to 12)',
    messageText: '',
  });

  // KPI Calculations
  const totalSentMessages = broadcasts.reduce((acc, b) => acc + b.sentCount, 0);
  const totalDelivered = broadcasts.reduce((acc, b) => acc + b.deliveredCount, 0);
  const overallDeliveryRate = Math.round((totalDelivered / totalSentMessages) * 100);
  const totalReadCount = broadcasts.reduce((acc, b) => acc + b.readCount, 0);

  const filteredBroadcasts = broadcasts.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.campaignId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDispatchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title || !newCampaign.messageText) return;

    const record: BroadcastLog = {
      campaignId: `BC-2026-${1000 + broadcasts.length + 1}`,
      title: newCampaign.title,
      channel: newCampaign.channel,
      audienceSegment: newCampaign.audienceSegment,
      sentCount: 2480,
      deliveredCount: 2470,
      readCount: 1820,
      dispatchedAt: 'Just Now (Live)',
      status: 'Completed',
      author: 'Principal / Registrar',
    };

    setBroadcasts([record, ...broadcasts]);
    setShowComposeModal(false);
    alert(`Broadcast campaign "${record.title}" pushed through DEVGYAN INNOVATION multi-channel messaging cluster!`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Active School Tenant */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 12 • HIGH-SPEED MULTI-CHANNEL TELEPHONY GATEWAY
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">SMS, WhatsApp & Email Alerts</h1>
            <p className="text-gray-400 text-sm mt-1">
              Encrypted institutional broadcasts, automated DLT template triggers, parent notifications & delivery telemetry.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComposeModal(true)}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-semibold text-xs text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <span>📢</span> Compose Institutional Broadcast
            </button>
          </div>
        </div>

        {/* Messaging KPI Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Delivery Success Rate</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{overallDeliveryRate}% Delivered</div>
            <span className="text-xs text-emerald-500 font-mono mt-2 block">{totalDelivered.toLocaleString()} / {totalSentMessages.toLocaleString()} Verified</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Read & Open Engagement</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">{Math.round((totalReadCount / totalDelivered) * 100)}% Read Rate</div>
            <span className="text-xs text-cyan-500 font-mono mt-2 block">{totalReadCount.toLocaleString()} Parent Confirmations</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Pre-Approved DLT Templates</span>
            <div className="text-2xl font-black text-white mt-1">{templates.length} Approved</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">TRAI Telemarketer Registered</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Remaining SMS Credits</span>
            <div className="text-2xl font-black text-amber-400 mt-1">48,250 Units</div>
            <span className="text-xs text-amber-500 font-mono mt-2 block">High-Priority Transactional Pipe</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'campaigns' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📋 Dispatched Circulars & Logs ({broadcasts.length})
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'templates' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📑 DLT & WhatsApp Template Vault ({templates.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'telemetry' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚡ Gateway Queues & Go Engine
          </button>
          <button
            onClick={() => setActiveTab('credits')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'credits' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            💳 Messaging Balance & Routing
          </button>
        </div>

        {/* TAB 1: CAMPAIGNS & LOGS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <input
                type="text"
                placeholder="Search circular title, ID, or dispatcher author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 w-full sm:w-80"
              />
              <div className="text-xs text-gray-400 font-mono">
                Log Status: <span className="text-cyan-400 font-bold">Encrypted Audit Trail Active</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Campaign ID & Title</th>
                    <th className="py-3.5 px-4">Channel Mode</th>
                    <th className="py-3.5 px-4">Audience Segment</th>
                    <th className="py-3.5 px-4">Sent / Delivered</th>
                    <th className="py-3.5 px-4">Read Ratio</th>
                    <th className="py-3.5 px-4">Dispatched At</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredBroadcasts.map((b) => (
                    <tr key={b.campaignId} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{b.title}</div>
                        <div className="text-cyan-400 font-mono text-[11px]">{b.campaignId} • {b.author}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-[11px]">
                          {b.channel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 text-xs">{b.audienceSegment}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">{b.deliveredCount}</span>
                        <span className="text-gray-500"> / {b.sentCount}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-cyan-400 font-bold">
                        {Math.round((b.readCount / b.deliveredCount) * 100)}% ({b.readCount})
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">{b.dispatchedAt}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DLT TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {templates.map((tpl) => (
                <div key={tpl.templateId} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                      {tpl.templateId} • {tpl.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                      {tpl.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{tpl.name}</h3>

                  <div className="p-3.5 rounded-xl bg-[#030712] border border-gray-800 font-mono text-xs text-gray-300 leading-relaxed">
                    {tpl.contentPreview}
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400 font-mono pt-1">
                    <span>Channel: {tpl.channel} Gateway</span>
                    <button
                      onClick={() => alert(`Pre-filled template ${tpl.name} into composer!`)}
                      className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
                    >
                      Use In New Broadcast →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TELEMETRY & QUEUES */}
        {activeTab === 'telemetry' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white">High-Speed Messaging Go Engine & Queue Status</h3>
              <p className="text-xs text-gray-400">Micro-burst queuing engine powered by Go Lang microservice and Redis Pub/Sub.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">WHATSAPP OFFICIAL API</span>
                <div className="text-emerald-400 font-bold">OPERATIONAL (200 TPS)</div>
                <div className="text-[10px] text-gray-500">Latency: 140ms • Webhook Active</div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">TRANSACTIONAL SMS DLT</span>
                <div className="text-emerald-400 font-bold">OPERATIONAL (150 TPS)</div>
                <div className="text-[10px] text-gray-500">TRAI Protocol • Route Tier 1</div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">SMTP EMAIL GATEWAY</span>
                <div className="text-emerald-400 font-bold">OPERATIONAL (DKIM/SPF)</div>
                <div className="text-[10px] text-gray-500">Bounce Rate: 0.12% • TLS 1.3</div>
              </div>

              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800 space-y-1">
                <span className="text-gray-400">REDIS QUEUE WORKER</span>
                <div className="text-cyan-400 font-bold">0 PENDING IN QUEUE</div>
                <div className="text-[10px] text-gray-500">Worker Instances: 4 Go Routines</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CREDITS & BILLING */}
        {activeTab === 'credits' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-5">
            <h3 className="text-base font-bold text-white">Institutional Messaging Quota Ledger</h3>
            <p className="text-xs text-gray-400">Monitored allocation under DEVGYAN INNOVATION enterprise communication bundle.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">SMS Transactional Wallet</div>
                <div className="text-3xl font-black text-white">48,250 SMS</div>
                <span className="text-xs text-emerald-400 font-mono">Cost: Included in SaaS Plan</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">WhatsApp Conversational Units</div>
                <div className="text-3xl font-black text-white">18,900 Chats</div>
                <span className="text-xs text-cyan-400 font-mono">Meta Verified Green Tick</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#030712] border border-gray-800 space-y-2">
                <div className="text-xs text-gray-400">Institutional Emails</div>
                <div className="text-3xl font-black text-white">Unlimited</div>
                <span className="text-xs text-indigo-400 font-mono">Institutional Domain Relay</span>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: COMPOSE INSTITUTIONAL BROADCAST */}
        {showComposeModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-base font-bold text-white">Dispatch Multi-Channel Broadcast</h3>
                <button onClick={() => setShowComposeModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleDispatchCampaign} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Circular / Notice Headline *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heavy Rain Alert - School Timings Delayed"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Broadcast Channel</label>
                    <select
                      value={newCampaign.channel}
                      onChange={(e) => setNewCampaign({ ...newCampaign, channel: e.target.value as any })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option value="SMS + WhatsApp">SMS + WhatsApp Dual</option>
                      <option value="WhatsApp Only">WhatsApp Desk Only</option>
                      <option value="Official Email">Official Email PDF Attachment</option>
                      <option value="Multi-Channel Push">Omni-Channel (All Channels)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Target Audience</label>
                    <select
                      value={newCampaign.audienceSegment}
                      onChange={(e) => setNewCampaign({ ...newCampaign, audienceSegment: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none"
                    >
                      <option>All Enrolled Parents (Grades 1 to 12)</option>
                      <option>Primary Wing Parents Only</option>
                      <option>Board Exam Classes (10 & 12)</option>
                      <option>All Faculty & Staff Only</option>
                      <option>Hostel Resident Families</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-gray-300 font-semibold">Message Body / Broadcast Statement *</label>
                    <span className="text-[10px] font-mono text-gray-500">{newCampaign.messageText.length} characters</span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type official communication notice..."
                    value={newCampaign.messageText}
                    onChange={(e) => setNewCampaign({ ...newCampaign, messageText: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-[#030712] rounded-xl border border-gray-800 text-[11px] font-mono text-gray-400">
                  ⚡ Auto-Appended Footer: <span className="text-cyan-400">"{activeSchool.name} • Powered by DEVGYAN INNOVATION"</span>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowComposeModal(false)} className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20">
                    Authorize & Dispatch Broadcast
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
