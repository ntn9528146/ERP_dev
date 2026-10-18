import React from 'react';
import { getSyllabusUnitsForSubject } from '@/lib/cbseSyllabusUnits';

interface Props {
  subjectName: string;
}

export default function CbseSyllabusPanel({ subjectName }: Props) {
  const units = getSyllabusUnitsForSubject(subjectName);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
        <span>SYLLABUS UNITS & SUB-TOPICS FOR {subjectName.toUpperCase()}:</span>
        <span className="cursor-pointer hover:text-white">Master Checkbox Toggles Entire Unit Sub-topics</span>
      </div>
      {units.map((unit) => (
        <div key={unit.id} className="bg-[#121824] border border-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center space-x-3 text-sm font-semibold text-white cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-gray-900 border-gray-700 text-blue-600 focus:ring-0" />
              <span>{unit.title}</span>
            </label>
            <span className="text-xs text-blue-400 font-medium">{unit.subTopics.length}/{unit.subTopics.length} Active</span>
          </div>
          <div className="pl-6 text-xs text-gray-400 mb-1">SUB-TOPICS IN THIS UNIT:</div>
          <div className="grid grid-cols-2 gap-3 pl-6 pt-1">
            {unit.subTopics.map((sub, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-gray-900 border-gray-700 text-blue-600 focus:ring-0" />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
