'use client';

import React, { useState } from 'react';
import CbseSyllabusPanel from '@/components/CbseSyllabusPanel';

export default function CBSEStudioPage() {
  const [selectedSubject, setSelectedSubject] = useState('Physics (Code 042)');

  const subjectsList = [
    'Physics (Code 042)',
    'Chemistry (Code 043)',
    'Biology (Code 044)',
    'Economics (Code 030)',
    'Business Studies (Code 054)',
    'Accountancy (Code 055)'
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-[#121824] border border-gray-800 rounded-xl p-6 shadow-xl">
          <h1 className="text-xl font-bold mb-1">Mode 1: Official CBSE Curriculum & Dynamic Exam Engine</h1>
          <p className="text-xs text-gray-400 mb-6">CBSE Session 2026-27 Compliant Paper Studio for Arden Progressive School (Haldwani)</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-400 mb-2">SELECT SUBJECT</label>
              <select 
                value={selectedSubject} 
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#1a2234] border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {subjectsList.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Syllabus Panel based on selected subject */}
        <div className="bg-[#121824] border border-gray-800 rounded-xl p-6 shadow-xl">
          <CbseSyllabusPanel subjectName={selectedSubject} />
        </div>
      </div>
    </div>
  );
}
