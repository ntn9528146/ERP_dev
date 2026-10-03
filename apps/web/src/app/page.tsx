"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'admin' | 'teachers' | 'students'>('admin');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Campuses Automated', val: '250+', sub: 'Across 12 States (Dummy Spec)' },
    { label: 'Active Daily Users', val: '1.2M', sub: 'Staff, Parents & Students' },
    { label: 'Uptime SLA Guaranteed', val: '99.98%', sub: 'Cloud Fault-Tolerant Engine' },
    { label: 'Fee Transactions Processed', val: '₹480 Cr+', sub: 'Zero Payment Latency' },
  ];

  const erpModulesList = [
    { title: 'Student Lifecycle & KYC', link: '/student-management', tag: 'Core Academic', desc: 'Holistic digital dossier from application to graduation transcripts.' },
    { title: 'Staff & Faculty Management', link: '/staff-management', tag: 'HR & Workload', desc: 'Dynamic class allocation, subject mapping and performance matrix.' },
    { title: 'Smart Library Automation', link: '/library-management', tag: 'Circulation', desc: 'RFID/Barcode scanning, digital catalogue and auto penalty system.' },
    { title: 'Staff Payroll & Deductions', link: '/staff-payroll', tag: 'Finance HR', desc: 'Statutory compliance, direct bank slip generation and TDS masters.' },
    { title: 'Online Fee & Multi-Gateway', link: '/fee-management', tag: 'Accounts', desc: 'Automated challan, instant payment receipts and concession rules.' },
    { title: 'Examination & Marksheet', link: '/exam-management', tag: 'Academics', desc: 'Autonomous report card designer, grade calculations and GPA engine.' },
    { title: 'Biometric Attendance & Leave', link: '/attendance-leave', tag: 'Operations', desc: 'Instant WhatsApp notifications to parents upon gate entry or absence.' },
    { title: 'Admission Funnel & CRM', link: '/admission-enquiry', tag: 'Enrollment', desc: 'Omni-channel leads management with automated counselor call logs.' },
    { title: 'Integrated LMS & E-Learn', link: '/lms', tag: 'Hybrid Learning', desc: 'Interactive video lectures, timed quizzes, and homework upload portals.' },
    { title: 'Hostel & Meal Allocation', link: '/hostel-management', tag: 'Campus Life', desc: 'Floor mapping, bed occupancy rosters, warden gate passes & mess billing.' },
    { title: 'Fleet Transport & Live GPS', link: '/transport-management', tag: 'Logistics', desc: 'Real-time parent bus tracking, geofenced halts, and driver KYC records.' },
    { title: 'Emergency SMS & WhatsApp', link: '/alerts-notification', tag: 'Broadcast', desc: 'High-speed delivery gateway for holidays, weather alerts and notices.' },
    { title: 'Fixed Asset & Inventory', link: '/inventory-management', tag: 'Procurement', desc: 'Purchase requisition approvals, lab equipment logs & supplier tracking.' },
    { title: 'Controller of Examination', link: '/exam-controller', tag: 'Confidential', desc: 'Encrypted question paper repository, audit logs and tamper alerts.' },
    { title: 'Enquiry CRM & Helpdesk', link: '/enquiry-crm', tag: 'Admissions', desc: 'Conversion funnel analytics, prospect scoring and telephony hookup.' },
  ];

  const pricingTiers = [
    {
      name: 'Campus Starter',
      price: '₹12',
      period: 'per student / month',
      desc: 'Ideal for single-campus schools initiating paperless administration.',
      badge: 'POPULAR FOR K-12',
      features: ['Student Information System', 'Daily Attendance & SMS Logs', 'Standard Fee Invoicing', 'Parent Notification Portal', 'Standard Email Support'],
    },
    {
      name: 'Enterprise Campus',
      price: '₹22',
      period: 'per student / month',
      desc: 'Comprehensive multi-department automation for schools and colleges.',
      badge: 'RECOMMENDED',
      highlighted: true,
      features: ['All Starter Features Included', 'Biometric & RFID Sync', 'Integrated Exam Marksheet Engine', 'Automated Staff Payroll & Tax', 'Hostel & GPS Bus Fleet Portal', 'Dedicated Priority SLA Support'],
    },
    {
      name: 'Autonomous University',
      price: '₹34',
      period: 'per student / month',
      desc: 'Custom enterprise governance for multi-campus university groups.',
      badge: 'ENTERPRISE',
      features: ['Controller of Examination Vault', 'LMS with Video Streaming Engine', 'Purchase Order & Inventory Audits', 'Custom Go-Lang Microservice Cluster', 'On-Premise / Private Cloud Setup', 'Dedicated Solution Architect'],
    },
  ];

  const faqs = [
    {
      q: 'How does DEVGYAN INNOVATION ensure data privacy and security?',
      a: 'Our platform utilizes end-to-end encryption for student KYC and financial ledgers, role-based granular access control (RBAC), and daily automated backups on isolated cloud nodes.',
    },
    {
      q: 'Can the ERP handle custom state board or CBSE grading rules?',
      a: 'Yes. The examination engine is fully configurable, allowing custom formulas for internal assessments, theoretical weightage, GPA conversion, and automated report card printing.',
    },
    {
      q: 'Is there a mobile application for parents and teachers?',
      a: 'Yes, Devgyan Innovation provides native-optimized progressive mobile experiences for Android and iOS covering attendance, live homework alerts, and fee payments.',
    },
    {
      q: 'Can we migrate our existing student data from spreadsheets?',
      a: 'Yes, our bulk Excel/CSV onboarding system validates and imports existing student records, pending fee balances, and staff rosters in minutes.',
    },
  ];

  return (
    <div className="bg-[#030712] text-white selection:bg-cyan-500 selection:text-black">
      
      {/* 1. HERO SECTION WITH ATTRACTIVE VECTOR DASHBOARD MOCKUP */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/20 to-teal-400/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Cloud-Native Enterprise Education ERP
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12]">
            The Scalable OS For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200">
              Modern Educational Campuses
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-base sm:text-xl font-normal leading-relaxed">
            Eliminate operational friction with <span className="text-white font-semibold">DEVGYAN INNOVATION</span>. 
            From student registration and biometric attendance to automated tuition collection and examinations—all within one unified, lightning-fast platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="#demo-form"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Request Institutional Walkthrough →
            </a>
            <a
              href="#modules-grid"
              className="px-8 py-4 rounded-xl bg-gray-900/90 border border-gray-700 hover:border-gray-500 text-gray-200 font-semibold text-sm transition-all"
            >
              Explore 15 ERP Modules
            </a>
          </div>

          {/* Unique Vector Dashboard Mockup (100% Custom SVG/CSS, No Copyright Image) */}
          <div className="mt-14 max-w-5xl mx-auto p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-gray-800/60 to-gray-950/90 border border-gray-700/60 shadow-2xl backdrop-blur-xl">
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-3 text-xs font-mono text-gray-400">devgyan://campus-controller.live</span>
              </div>
              <div className="text-xs font-mono text-cyan-400 font-medium">SESSION ENCRYPTED (AES-256)</div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800">
                <div className="text-xs text-gray-400">Today Attendance</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">96.4%</div>
                <div className="text-[11px] text-emerald-400 mt-1">↑ +2.1% than avg</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800">
                <div className="text-xs text-gray-400">Fee Realized This Term</div>
                <div className="text-2xl font-bold text-white mt-1">₹4.82 Cr</div>
                <div className="text-[11px] text-cyan-400 mt-1">87% Targets Met</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800">
                <div className="text-xs text-gray-400">Faculty On Duty</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">142 / 146</div>
                <div className="text-[11px] text-gray-400 mt-1">4 Approved Leaves</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800">
                <div className="text-xs text-gray-400">Fleet Active GPS</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">28 Buses</div>
                <div className="text-[11px] text-emerald-400 mt-1">All Routes Clear</div>
              </div>
            </div>

            {/* Simulated Live Activity Graph */}
            <div className="mt-4 p-5 rounded-xl bg-gray-900/50 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-1/2 space-y-2">
                <div className="text-xs font-semibold text-gray-300">Biometric Gate Sync Telemetry (Live Stream)</div>
                <div className="h-2.5 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-4/5 rounded-full animate-pulse"></div>
                </div>
                <div className="text-[11px] text-gray-400 flex justify-between">
                  <span>Processed: 2,410 / 2,500</span>
                  <span className="text-cyan-400">Go Lang Worker Engine Active</span>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-around gap-2 text-center">
                <div className="px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/60 text-xs">
                  <span className="block text-gray-400 text-[10px]">LMS Active Tests</span>
                  <span className="font-bold text-white">18 Quizzes</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/60 text-xs">
                  <span className="block text-gray-400 text-[10px]">Hostel Check-in</span>
                  <span className="font-bold text-white">100% Marked</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-gray-800/60 border border-gray-700/60 text-xs">
                  <span className="block text-gray-400 text-[10px]">Alert SMS Queue</span>
                  <span className="font-bold text-emerald-400">0 Delayed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="border-y border-gray-800/80 bg-gray-950/70 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {st.val}
              </div>
              <div className="text-sm font-bold text-white">{st.label}</div>
              <div className="text-xs text-gray-400">{st.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE ROLE-BASED DASHBOARD SHOWCASE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Multi-Stakeholder Experience</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Built For Every Role In Your Institution</h2>
          <p className="text-gray-400 text-sm">Dedicated responsive interfaces tailored for school boards, educators, and families.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-xl bg-gray-900 border border-gray-800 inline-flex">
            {(['admin', 'teachers', 'students'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'admin' ? 'Management & Admin' : tab === 'teachers' ? 'Faculty & Teachers' : 'Students & Parents'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Display Card */}
        <div className="p-8 rounded-3xl bg-gray-900/60 border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase">
              {activeTab === 'admin' ? 'EXECUTIVE CONTROL' : activeTab === 'teachers' ? 'ACADEMIC COPILOT' : 'STUDENT EMPOWERMENT'}
            </span>
            <h3 className="text-2xl font-bold text-white">
              {activeTab === 'admin'
                ? 'Centralized Governance & Revenue Analytics'
                : activeTab === 'teachers'
                ? 'Effortless Attendance, Marks Entry & Syllabi Tracking'
                : 'Digital Classrooms, Fee Clearance & Transcripts'}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {activeTab === 'admin'
                ? 'Consolidated visual oversight across fees collections, teacher leaves, fleet logistics and student admissions pipeline in real time.'
                : activeTab === 'teachers'
                ? 'Spend less time writing diaries and spreadsheets. Mark roll call in seconds, compute examination rubrics, and upload homework with zero paperwork.'
                : 'Empower parents with direct homework alerts, exam datesheets, instant digital fee challan receipts and direct bus GPS maps on their phone.'}
            </p>
            <ul className="space-y-2 text-xs text-gray-300 pt-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span> Role-based security permissions & audit logs
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span> Instant push alerts via SMS and WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">✓</span> Cloud-synced real-time offline fallback tolerance
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#030712] border border-gray-800 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-gray-400 border-b border-gray-800 pb-3">
              <span>ACTIVE USER LEVEL</span>
              <span className="text-emerald-400">AUTH: VERIFIED</span>
            </div>
            <div className="space-y-2 text-gray-300">
              <div className="p-3 bg-gray-900/80 rounded border border-gray-800">
                <span className="text-cyan-400">Action:</span> {activeTab === 'admin' ? 'Approve Monthly Staff Payroll Voucher' : activeTab === 'teachers' ? 'Publish Class 10th Midterm Biology Results' : 'Download Term-1 Official Fee Receipt'}
              </div>
              <div className="p-3 bg-gray-900/80 rounded border border-gray-800">
                <span className="text-cyan-400">Status:</span> Executed with 0 errors via Go-Lang Worker Microservice
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE 15 ERP MODULES DIRECTORY GRID */}
      <section id="modules-grid" className="py-24 px-6 bg-[#02050e] border-t border-gray-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Modular Enterprise Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">15 Purpose-Built Campus Modules</h2>
            <p className="text-gray-400 text-sm">Every department automated with standard uniform data schemas and intuitive UX.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {erpModulesList.map((mod, i) => (
              <Link
                key={i}
                href={mod.link}
                className="group p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 hover:border-cyan-400/50 hover:bg-gray-900/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {mod.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-500">#{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="mt-5 text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Module Specification →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING PLANS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Transparent Licensing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Straightforward Value Pricing</h2>
          <p className="text-gray-400 text-sm">Predictable monthly subscriptions tailored to institutional scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all ${
                p.highlighted
                  ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-2 border-cyan-400/80 shadow-2xl shadow-cyan-500/10'
                  : 'bg-gray-900/40 border border-gray-800'
              }`}
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{p.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{p.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-gray-400 font-mono">{p.period}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                <div className="border-t border-gray-800 pt-5 space-y-2.5">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <span className="text-cyan-400 font-bold">✓</span> {feat}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <a
                  href="#demo-form"
                  className={`w-full block text-center py-3 rounded-xl font-bold text-xs transition-all ${
                    p.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 hover:opacity-90'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  }`}
                >
                  Choose {p.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-20 px-6 max-w-4xl mx-auto border-t border-gray-900">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-xs">Everything you need to know about DEVGYAN INNOVATION Campus OS.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, fIdx) => (
            <div key={fIdx} className="rounded-xl border border-gray-800 bg-gray-900/40 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                className="w-full p-4 text-left font-semibold text-sm flex justify-between items-center text-gray-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <span className="text-cyan-400 font-bold ml-4">{openFaq === fIdx ? '−' : '+'}</span>
              </button>
              {openFaq === fIdx && (
                <div className="p-4 pt-0 text-xs text-gray-400 border-t border-gray-800/50 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. TECHNICAL INQUIRY & DEMO CAPTURE FORM */}
      <section id="demo-form" className="py-20 px-6 bg-gradient-to-b from-[#030712] to-[#02050e] border-t border-gray-900">
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gray-900/60 border border-gray-800 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Direct Solutions Desk</span>
            <h3 className="text-2xl sm:text-3xl font-bold">Schedule Institutional Consultation</h3>
            <p className="text-gray-400 text-xs max-w-lg mx-auto">
              Connect directly with our software architects in Haldwani to evaluate your institution’s requirements.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry recorded in dummy simulation mode!'); }} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hillview Public School"
                  className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="principal@institution.edu.in"
                  className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXXXXXXX"
                  className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Approx. Student Count</label>
                <select className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400">
                  <option>Under 500 Students</option>
                  <option>500 - 1,500 Students</option>
                  <option>1,500 - 3,500 Students</option>
                  <option>3,500+ Multi-Campus Group</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Special Requirements / Notes</label>
              <textarea
                rows={3}
                placeholder="Mention specific needs (e.g. Biometric device integration, CBSE grading)..."
                className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all"
            >
              Submit Technical Inquiry
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
