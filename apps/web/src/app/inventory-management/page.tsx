"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';
import ConfidentialGuard from '../../components/ConfidentialGuard';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  unitPrice: number;
  location: string;
  status: 'In Stock' | 'Low Stock Reorder' | 'Out of Stock';
  schoolId: string;
}

export default function InventoryManagementPage() {
  const { activeSchool, currentUser } = useTenant();
  const [searchTerm, setSearchTerm] = useState('');

  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', sku: 'INV-IT-01', name: 'Arduino Uno R3 Microcontroller Kits', category: 'IT Hardware', stock: 48, threshold: 10, unitPrice: 850, location: 'Robotics Lab Cupboard 2', status: 'In Stock', schoolId: 'arden-haldwani' },
    { id: '2', sku: 'INV-IT-02', name: 'HDMI to VGA Display Converters', category: 'IT Hardware', stock: 4, threshold: 8, unitPrice: 350, location: 'CS Store Room', status: 'Low Stock Reorder', schoolId: 'arden-haldwani' },
    { id: '3', sku: 'INV-SCI-01', name: 'Hydrochloric Acid HCl (Analytical Grade)', category: 'Science Lab Chemicals', stock: 12, threshold: 5, unitPrice: 420, location: 'Chemistry Hazard Locker', status: 'In Stock', schoolId: 'arden-haldwani' },
    { id: '4', sku: 'INV-SPT-01', name: 'Tournament Volleyballs (Nivia Spikester)', category: 'Sports Gear', stock: 18, threshold: 6, unitPrice: 780, location: 'Sports Room Bin A', status: 'In Stock', schoolId: 'arden-haldwani' },
    { id: '5', sku: 'INV-STN-01', name: 'A4 Examination Answer Sheet Bundles', category: 'Stationery', stock: 120, threshold: 30, unitPrice: 650, location: 'Examination Cell Vault', status: 'In Stock', schoolId: 'arden-haldwani' },
    { id: '6', sku: 'INV-DPS-01', name: 'Dell Core i5 All-in-One Terminals', category: 'IT Hardware', stock: 32, threshold: 5, unitPrice: 42000, location: 'DPS Senior Lab', status: 'In Stock', schoolId: 'dps-nainital' },
    { id: '7', sku: 'INV-JAIS-01', name: 'Smart Interactive Board Stylus Pack', category: 'IT Hardware', stock: 15, threshold: 3, unitPrice: 1200, location: 'Smart Class Store', status: 'In Stock', schoolId: 'jai-arihant' },
  ]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'IT Hardware',
    stock: 10,
    threshold: 5,
    unitPrice: 500,
    location: '',
  });

  const isSuperAdmin = currentUser?.role === 'DEVELOPER' || currentUser?.role === 'SUPER_ADMIN';
  const targetSchoolId = isSuperAdmin ? activeSchool.id : (currentUser?.schoolId || activeSchool.id);

  // Strict School Isolation
  const filteredItems = items.filter((item) => {
    const matchesSchool = item.schoolId === targetSchoolId;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSchool && matchesSearch;
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      sku: `INV-${activeSchool.code.slice(0, 3)}-${Math.floor(10 + Math.random() * 90)}`,
      name: '',
      category: 'IT Hardware',
      stock: 10,
      threshold: 5,
      unitPrice: 500,
      location: 'Store Room',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setIsEditing(true);
    setEditingId(item.id);
    setFormData({
      sku: item.sku,
      name: item.name,
      category: item.category,
      stock: item.stock,
      threshold: item.threshold,
      unitPrice: item.unitPrice,
      location: item.location,
    });
    setShowModal(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const status: InventoryItem['status'] = formData.stock <= 0 ? 'Out of Stock' : formData.stock <= formData.threshold ? 'Low Stock Reorder' : 'In Stock';

    if (isEditing && editingId) {
      setItems(items.map((it) => it.id === editingId ? { ...it, ...formData, status } : it));
    } else {
      const newItem: InventoryItem = {
        id: String(Date.now()),
        ...formData,
        status,
        schoolId: targetSchoolId,
      };
      setItems([newItem, ...items]);
    }
    setShowModal(false);
  };

  return (
    <ConfidentialGuard>
      <div className="min-h-screen bg-[#030712] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/50">
                INVENTORY REPOSITORY • {activeSchool.name.toUpperCase()}
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1.5">Fixed Asset & Inventory Control</h1>
              <p className="text-gray-400 text-xs mt-1">
                Hardware tracking, laboratory consumable reserves, purchase orders & re-order threshold alarms.
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-xs text-white shadow-lg shadow-cyan-500/20"
            >
              + Add Inventory Item
            </button>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between bg-gray-900/40 p-3 rounded-xl border border-gray-800">
            <input
              type="text"
              placeholder="Search item name, SKU, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 w-80"
            />
            <span className="text-xs text-gray-400 font-mono">
              Active Stock Items: <strong className="text-cyan-400">{filteredItems.length}</strong>
            </span>
          </div>

          {/* Inventory Table with Edit Action */}
          <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0B1120]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#030712] text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">SKU / Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">In Stock / Threshold</th>
                  <th className="py-3 px-4">Unit Price</th>
                  <th className="py-3 px-4">Storage Location</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500 font-mono">
                      No inventory items recorded for this school campus.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((it) => (
                    <tr key={it.id} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{it.name}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">{it.sku}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{it.category}</td>
                      <td className="py-3 px-4 font-mono">
                        <span className="font-bold text-white">{it.stock} Units</span>
                        <span className="text-gray-500 text-[10px] block">(Alert at &lt; {it.threshold})</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-emerald-400 font-bold">₹{it.unitPrice}</td>
                      <td className="py-3 px-4 text-gray-300">{it.location}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          it.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {it.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleOpenEdit(it)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold border border-gray-700"
                        >
                          ✏️ Edit Item
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <h3 className="text-base font-bold text-white">{isEditing ? 'Edit Item' : 'Add Inventory Item'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Item Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Storage Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Threshold</label>
                      <input
                        type="number"
                        value={formData.threshold}
                        onChange={(e) => setFormData({ ...formData, threshold: Number(e.target.value) })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Unit Price (₹)</label>
                      <input
                        type="number"
                        value={formData.unitPrice}
                        onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                        className="w-full bg-[#030712] border border-gray-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-800">Cancel</button>
                    <button type="submit" className="px-4 py-2 rounded-lg bg-cyan-600 font-bold text-white">Save Item</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </ConfidentialGuard>
  );
}
