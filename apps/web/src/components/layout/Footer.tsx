import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050e] border-t border-gray-900 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-black text-lg text-white">
              DG
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              DEVGYAN <span className="text-cyan-400">INNOVATION</span>
            </span>
          </div>
          <p className="text-xs uppercase font-semibold text-gray-300 tracking-wider">
            WE ENGINEER YOUR TECHNOLOGY IDEAS INTO ROBUST, SCALABLE ENTERPRISE SYSTEMS.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Enterprise campus automation, AI-ready student analytics, secure examination controller engines and real-time administrative intelligence.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 border-l-2 border-cyan-400 pl-2">Academic Core</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/student-management" className="hover:text-cyan-400">Student Management</Link></li>
            <li><Link href="/staff-management" className="hover:text-cyan-400">Staff Management</Link></li>
            <li><Link href="/library-management" className="hover:text-cyan-400">Library Management</Link></li>
            <li><Link href="/staff-payroll" className="hover:text-cyan-400">Staff & Payroll</Link></li>
            <li><Link href="/fee-management" className="hover:text-cyan-400">Fee Management</Link></li>
            <li><Link href="/exam-management" className="hover:text-cyan-400">Exam Management</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 border-l-2 border-blue-500 pl-2">Operations & Living</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/attendance-leave" className="hover:text-cyan-400">Attendance & Leave</Link></li>
            <li><Link href="/admission-enquiry" className="hover:text-cyan-400">Admission & Fee</Link></li>
            <li><Link href="/lms" className="hover:text-cyan-400">Learning Management (LMS)</Link></li>
            <li><Link href="/hostel-management" className="hover:text-cyan-400">Hostel Management</Link></li>
            <li><Link href="/transport-management" className="hover:text-cyan-400">Transport Fleet</Link></li>
            <li><Link href="/enquiry-crm" className="hover:text-cyan-400">Enquiry CRM</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 border-l-2 border-amber-500 pl-2">Contact Details</h4>
          <div className="space-y-3 text-xs">
            <div>
              <p className="font-semibold text-gray-200">INDIA ADDRESS</p>
              <p className="text-gray-400">Lohariya Sal Malla, Near Block Office, Haldwani, Nainital, Uttarakhand - 263139</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200">CLIENT SUPPORT</p>
              <p className="text-cyan-400 font-mono">+91 73513 24716</p>
              <p className="text-gray-400">contact@example.com</p>
              <p className="text-gray-500">Mon – Sat: 9:00 AM – 7:00 PM (IST)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-600">
        © 2026 DEVGYAN INNOVATION. All rights reserved.
      </div>
    </footer>
  );
};
