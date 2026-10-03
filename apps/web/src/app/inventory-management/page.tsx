"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface InventoryItem {
  sku: string;
  itemName: string;
  category: 'IT Hardware' | 'Science Lab Chemicals' | 'Sports Gear' | 'Stationery';
  quantityInStock: number;
  reorderLevel: number;
  unitPrice: number;
  storageLocation: string;
  status: 'In Stock' | 'Low Stock Reorder' | 'Depleted';
}

const initialItems: InventoryItem[] = [
  { sku: 'INV-IT-01', itemName: 'Arduino Uno R3 Microcontroller Kits', category: 'IT Hardware', quantityInStock: 48, reorderLevel: 10, unitPrice: 850, storageLocation: 'Robotics Lab Cupboard 2', status: 'In Stock' },
  { sku: 'INV-IT-02', itemName: 'HDMI to VGA Display Converters', category: 'IT Hardware', quantityInStock: 4, reorderLevel: 8, unitPrice: 350, storageLocation: 'CS Store Room', status: 'Low Stock Reorder' },
  { sku: 'INV-SCI-01', itemName: 'Hydrochloric Acid HCl (Analytical Grade)', category: 'Science Lab Chemicals', quantityInStock: 12, reorderLevel: 5, unitPrice: 420, storageLocation: 'Chemistry Hazard Locker', status: 'In Stock' },
  { sku: 'INV-SPT-01', itemName: 'Tournament Volleyballs (Nivia Spikester)', category: 'Sports Gear', quantityInStock: 18, reorderLevel: 6, unitPrice: 780, storageLocation: 'Sports Room Bin A', status: 'In Stock' },
  { sku: 'INV-STN-01', itemName: 'A4 Examination Answer Sheet Bundles', category: 'Stationery', quantityInStock: 120, reorderLevel: 30, unitPrice: 650, storageLocation: 'Examination Cell Vault', status: 'In Stock' },
];

export default function InventoryManagementPage() {
  const { activeSchool } = useTenant();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter((i) =>
    i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 13 • PROCUREMENT & ASSET MANAGEMENT
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Fixed Asset & Inventory Control</h1>
            <p className="text-gray-400 text-sm mt-1">
              Hardware tracking, laboratory consumable reserves, purchase orders & re-order threshold alarms.
            </p>
          </div>
          
          <button
            onClick={() => alert('New Purchase Order requisition wizard opened.')}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-xs text-white shadow-md shadow-cyan-500/20"
          >
            + Create Purchase Requisition
          </button>
        </div>

        {/* Filter and Table */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search item name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400"
          />

          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">SKU / Item Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">In Stock / Reorder Threshold</th>
                  <th className="py-3.5 px-4">Unit Price</th>
                  <th className="py-3.5 px-4">Storage Location</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-gray-800/30">
                    <td className="py-3 px-4">
                      <div className="text-white font-semibold">{item.itemName}</div>
                      <div className="text-cyan-400 font-mono text-[11px]">{item.sku}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{item.category}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className="text-white font-bold">{item.quantityInStock} Units</span>
                      <span className="text-gray-500 text-[10px]"> (Alert at &lt; {item.reorderLevel})</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-bold">₹{item.unitPrice}</td>
                    <td className="py-3 px-4 text-gray-300">{item.storageLocation}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.status}
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
