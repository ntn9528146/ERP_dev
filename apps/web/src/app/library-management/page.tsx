"use client";

import React, { useState } from 'react';
import { useTenant } from '../../context/TenantContext';

interface BookRecord {
  accessionNo: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  rackLocation: string;
  totalCopies: number;
  availableCopies: number;
  status: 'In Stock' | 'Circulating' | 'Reserved';
}

interface CirculationRecord {
  issueId: string;
  accessionNo: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  memberRole: 'Student' | 'Faculty';
  issueDate: string;
  dueDate: string;
  fineAmount: number;
  status: 'Active' | 'Returned' | 'Overdue';
}

const initialBookCatalog: BookRecord[] = [
  { accessionNo: 'DG-ACC-10481', isbn: '978-0131103627', title: 'The C Programming Language (2nd Ed)', author: 'Brian W. Kernighan, Dennis M. Ritchie', category: 'Computer Science', publisher: 'Prentice Hall', rackLocation: 'Rack CS-02 / Shelf B', totalCopies: 8, availableCopies: 5, status: 'In Stock' },
  { accessionNo: 'DG-ACC-10482', isbn: '978-8121924986', title: 'Concepts of Physics (Vol 1 & 2)', author: 'Dr. H. C. Verma', category: 'Physics & Applied Sciences', publisher: 'Bharati Bhawan', rackLocation: 'Rack PHY-01 / Shelf A', totalCopies: 15, availableCopies: 3, status: 'Circulating' },
  { accessionNo: 'DG-ACC-10483', isbn: '978-9351761877', title: 'Higher Algebra & Coordinate Geometry', author: 'Hall and Knight', category: 'Mathematics', publisher: 'Arihant Classics', rackLocation: 'Rack MAT-04 / Shelf C', totalCopies: 6, availableCopies: 6, status: 'In Stock' },
  { accessionNo: 'DG-ACC-10484', isbn: '978-0134685991', title: 'Effective Java (3rd Edition)', author: 'Joshua Bloch', category: 'Software Engineering', publisher: 'Addison-Wesley', rackLocation: 'Rack CS-03 / Shelf A', totalCopies: 5, availableCopies: 1, status: 'Circulating' },
  { accessionNo: 'DG-ACC-10485', isbn: '978-8174508126', title: 'NCERT Exemplar Problems - Chemistry 12', author: 'NCERT Editorial Board', category: 'Chemistry', publisher: 'NCERT New Delhi', rackLocation: 'Rack CHM-02 / Shelf D', totalCopies: 20, availableCopies: 12, status: 'In Stock' },
];

const initialCirculations: CirculationRecord[] = [
  { issueId: 'ISS-2026-881', accessionNo: 'DG-ACC-10482', bookTitle: 'Concepts of Physics (Vol 1 & 2)', memberId: 'DG-2026-001', memberName: 'Aarav Sharma', memberRole: 'Student', issueDate: '2026-09-18', dueDate: '2026-10-02', fineAmount: 20, status: 'Overdue' },
  { issueId: 'ISS-2026-882', accessionNo: 'DG-ACC-10484', bookTitle: 'Effective Java (3rd Edition)', memberId: 'DG-FAC-101', memberName: 'Dr. Rajesh Sharma', memberRole: 'Faculty', issueDate: '2026-09-25', dueDate: '2026-10-25', fineAmount: 0, status: 'Active' },
  { issueId: 'ISS-2026-883', accessionNo: 'DG-ACC-10481', bookTitle: 'The C Programming Language', memberId: 'DG-2026-004', memberName: 'Ishita Joshi', memberRole: 'Student', issueDate: '2026-09-28', dueDate: '2026-10-12', fineAmount: 0, status: 'Active' },
];

export default function LibraryManagementPage() {
  const { activeSchool } = useTenant();

  const [activeTab, setActiveTab] = useState<'catalog' | 'circulation' | 'procurement' | 'attendance'>('catalog');
  const [books, setBooks] = useState<BookRecord[]>(initialBookCatalog);
  const [circulations, setCirculations] = useState<CirculationRecord[]>(initialCirculations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New Book State
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    category: 'Computer Science',
    publisher: '',
    rackLocation: 'Rack CS-01',
    totalCopies: 5,
  });

  // New Issue State
  const [newIssue, setNewIssue] = useState({
    accessionNo: 'DG-ACC-10481',
    memberId: '',
    memberName: '',
    memberRole: 'Student' as 'Student' | 'Faculty',
    dueDate: '2026-10-17',
  });

  const filteredBooks = books.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.accessionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.isbn.includes(searchTerm);
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    const record: BookRecord = {
      accessionNo: `DG-ACC-${10480 + books.length + 1}`,
      isbn: newBook.isbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      title: newBook.title,
      author: newBook.author,
      category: newBook.category,
      publisher: newBook.publisher || 'Devgyan Academic Press',
      rackLocation: newBook.rackLocation,
      totalCopies: Number(newBook.totalCopies) || 1,
      availableCopies: Number(newBook.totalCopies) || 1,
      status: 'In Stock',
    };

    setBooks([record, ...books]);
    setNewBook({ isbn: '', title: '', author: '', category: 'Computer Science', publisher: '', rackLocation: 'Rack CS-01', totalCopies: 5 });
    setShowAddBookModal(false);
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssue.memberId || !newIssue.memberName) return;

    const targetBook = books.find((b) => b.accessionNo === newIssue.accessionNo);
    const bookTitle = targetBook ? targetBook.title : 'Selected Book';

    const issueRecord: CirculationRecord = {
      issueId: `ISS-2026-${900 + circulations.length + 1}`,
      accessionNo: newIssue.accessionNo,
      bookTitle,
      memberId: newIssue.memberId,
      memberName: newIssue.memberName,
      memberRole: newIssue.memberRole,
      issueDate: '2026-10-03',
      dueDate: newIssue.dueDate,
      fineAmount: 0,
      status: 'Active',
    };

    setCirculations([issueRecord, ...circulations]);
    
    // Decrement available copies
    setBooks(books.map((b) => b.accessionNo === newIssue.accessionNo ? { ...b, availableCopies: Math.max(0, b.availableCopies - 1) } : b));
    setShowIssueModal(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header with Tenant Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/50">
                MODULE 03 • RESOURCE & REPOSITORY
              </span>
              <span className="text-xs text-gray-500 font-mono">[{activeSchool.name}]</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Smart Library Management</h1>
            <p className="text-gray-400 text-sm mt-1">
              Autonomous ISBN accessioning, RFID circulation desk, rack telemetry & overdue fine auditor.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowIssueModal(true)}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
            >
              📖 Issue Book Desk
            </button>
            <button
              onClick={() => setShowAddBookModal(true)}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-bold text-white shadow-md shadow-cyan-500/20"
            >
              + Catalog New Title
            </button>
          </div>
        </div>

        {/* Operational KPI Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Total Titles Cataloged</span>
            <div className="text-2xl font-black text-white mt-1">18,420 Vols</div>
            <span className="text-xs text-cyan-400 font-mono mt-2 block">100% Barcode Indexed</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Currently Circulating</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">1,248 Books</div>
            <span className="text-xs text-gray-400 font-mono mt-2 block">89% Return On Schedule</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Overdue Returns</span>
            <div className="text-2xl font-black text-rose-400 mt-1">14 Volumes</div>
            <span className="text-xs text-rose-400 font-mono mt-2 block">Auto-SMS Notices Sent</span>
          </div>

          <div className="p-5 rounded-xl bg-gray-900/60 border border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Visitor Footfall Today</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">342 Visits</div>
            <span className="text-xs text-emerald-400 font-mono mt-2 block">Digital Gate Punch Active</span>
          </div>
        </div>

        {/* Functional Studio Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'catalog' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📚 Catalog & Rack Directory ({books.length})
          </button>
          <button
            onClick={() => setActiveTab('circulation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'circulation' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            🔄 Live Circulation & Returns ({circulations.length})
          </button>
          <button
            onClick={() => setActiveTab('procurement')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'procurement' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            📋 Book Purchase & Vendor List
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'attendance' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            ⚡ Member Reading Attendance
          </button>
        </div>

        {/* TAB 1: CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search book title, author, Accession No. or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3.5 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="All">All Categories</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Physics & Applied Sciences">Physics & Applied Sciences</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                Cataloged: <span className="text-cyan-400 font-bold">{filteredBooks.length}</span> titles
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Acc No / Barcode</th>
                    <th className="py-3.5 px-4">Title & Author</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Rack & Shelf</th>
                    <th className="py-3.5 px-4">Stock Availability</th>
                    <th className="py-3.5 px-4">Inventory Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {filteredBooks.map((item) => (
                    <tr key={item.accessionNo} className="hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono text-cyan-400">
                        <div>{item.accessionNo}</div>
                        <div className="text-[10px] text-gray-500 font-mono">ISBN: {item.isbn}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-semibold">{item.title}</div>
                        <div className="text-gray-400 text-[11px]">{item.author}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-300 text-xs">{item.category}</td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">{item.rackLocation}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        <span className="text-cyan-400 font-bold">{item.availableCopies}</span>
                        <span className="text-gray-500"> / {item.totalCopies} Available</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.availableCopies > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.availableCopies > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE CIRCULATION & RETURNS */}
        {activeTab === 'circulation' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-900/40 p-4 rounded-xl border border-gray-800">
              <span className="text-xs text-gray-300 font-medium">Active Lending Register & Automated Fine Calculation Engine (₹5 / Day post-due)</span>
              <button
                onClick={() => setShowIssueModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
              >
                + Quick Issue
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-gray-950/80 text-gray-400 uppercase font-mono border-b border-gray-800 text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Issue ID</th>
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Member Name & ID</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Fine Overdue</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-medium">
                  {circulations.map((circ) => (
                    <tr key={circ.issueId} className="hover:bg-gray-800/30">
                      <td className="py-3 px-4 font-mono text-cyan-400">{circ.issueId}</td>
                      <td className="py-3 px-4 text-white font-semibold">{circ.bookTitle}</td>
                      <td className="py-3 px-4">
                        <div className="text-white">{circ.memberName}</div>
                        <div className="text-gray-500 font-mono text-[10px]">{circ.memberId} ({circ.memberRole})</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-400">{circ.issueDate}</td>
                      <td className="py-3 px-4 font-mono text-gray-300">{circ.dueDate}</td>
                      <td className="py-3 px-4 font-mono text-xs">
                        {circ.fineAmount > 0 ? (
                          <span className="text-rose-400 font-bold">₹{circ.fineAmount} Due</span>
                        ) : (
                          <span className="text-emerald-400">₹0</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          circ.status === 'Active' ? 'bg-blue-500/10 text-cyan-400 border border-cyan-500/20' :
                          circ.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                          'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {circ.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => alert(`Marked ${circ.issueId} as Returned.`)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-cyan-300 text-[11px] font-semibold"
                        >
                          Check In / Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PROCUREMENT LIST */}
        {activeTab === 'procurement' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-white">Purchase Orders & Acquisitions Master</h3>
                <p className="text-xs text-gray-400">Track book requisitions, institutional vendor invoices & delivery receipts.</p>
              </div>
              <button onClick={() => alert('New PO requisition created in dummy test mode.')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-xs font-bold">
                + New Book Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-[11px] font-mono text-gray-400">PO-2026-092 • Oxford University Press</span>
                <div className="text-lg font-bold text-white mt-1">45 STEM Textbooks</div>
                <div className="text-xs text-emerald-400 font-mono mt-1">Status: Dispatched & Delivered</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-[11px] font-mono text-gray-400">PO-2026-093 • Pearson India Education</span>
                <div className="text-lg font-bold text-white mt-1">30 CS & AI References</div>
                <div className="text-xs text-cyan-400 font-mono mt-1">Status: Barcode Tagging In-Progress</div>
              </div>
              <div className="p-4 rounded-xl bg-[#030712] border border-gray-800">
                <span className="text-[11px] font-mono text-gray-400">PO-2026-094 • S. Chand Publishing</span>
                <div className="text-lg font-bold text-white mt-1">50 Hindi Vyakaran Reference</div>
                <div className="text-xs text-amber-400 font-mono mt-1">Status: Approval Pending (Principal Desk)</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MEMBER ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
            <h3 className="text-base font-bold text-white">Daily Reading Hall Biometric Footfall</h3>
            <p className="text-xs text-gray-400">Live stream of student & faculty cards scanned at library entry terminals.</p>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#030712] border border-gray-800 flex justify-between items-center">
                <span>06:10 PM • DG-2026-002 Ananya Verma (Grade 12 Science)</span>
                <span className="text-cyan-400">Punch: Entry (Terminal 01)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#030712] border border-gray-800 flex justify-between items-center">
                <span>05:54 PM • DG-FAC-102 Pooja Bhatt (Mathematics Dept)</span>
                <span className="text-emerald-400">Punch: Exit (Terminal 02)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#030712] border border-gray-800 flex justify-between items-center">
                <span>05:42 PM • DG-2026-001 Aarav Sharma (Grade 10-A)</span>
                <span className="text-cyan-400">Punch: Entry (Terminal 01)</span>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: CATALOG NEW TITLE */}
        {showAddBookModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-lg font-bold text-white">Accession New Book Record</h3>
                <button onClick={() => setShowAddBookModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateBook} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Book Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Operating Systems"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Author(s) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Andrew S. Tanenbaum"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">ISBN Code</label>
                    <input
                      type="text"
                      placeholder="978-0133591620"
                      value={newBook.isbn}
                      onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Subject Category</label>
                    <select
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option>Computer Science</option>
                      <option>Physics & Applied Sciences</option>
                      <option>Mathematics</option>
                      <option>Software Engineering</option>
                      <option>Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Rack / Shelf Location</label>
                    <input
                      type="text"
                      value={newBook.rackLocation}
                      onChange={(e) => setNewBook({ ...newBook, rackLocation: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Total Copies Received</label>
                  <input
                    type="number"
                    min="1"
                    value={newBook.totalCopies}
                    onChange={(e) => setNewBook({ ...newBook, totalCopies: Number(e.target.value) })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowAddBookModal(false)} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold">
                    Generate Accession Barcode
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: ISSUE BOOK DESK */}
        {showIssueModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0B1120] border border-gray-800 rounded-2xl max-w-lg w-full p-6 space-y-5">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <h3 className="text-lg font-bold text-white">Issue Book To Member</h3>
                <button onClick={() => setShowIssueModal(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleIssueBook} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Select Book Accession *</label>
                  <select
                    value={newIssue.accessionNo}
                    onChange={(e) => setNewIssue({ ...newIssue, accessionNo: e.target.value })}
                    className="w-full bg-[#030712] border border-cyan-500/50 rounded-lg px-3 py-2 text-cyan-300 font-mono focus:outline-none"
                  >
                    {books.map((b) => (
                      <option key={b.accessionNo} value={b.accessionNo}>
                        {b.accessionNo} - {b.title} (Available: {b.availableCopies})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Member ID (Student/Staff) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DG-2026-003"
                      value={newIssue.memberId}
                      onChange={(e) => setNewIssue({ ...newIssue, memberId: e.target.value })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Member Role</label>
                    <select
                      value={newIssue.memberRole}
                      onChange={(e) => setNewIssue({ ...newIssue, memberRole: e.target.value as any })}
                      className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="Student">Student (14 Days Lending)</option>
                      <option value="Faculty">Faculty (30 Days Lending)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Member Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Mehra"
                    value={newIssue.memberName}
                    onChange={(e) => setNewIssue({ ...newIssue, memberName: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Return Due Date</label>
                  <input
                    type="date"
                    value={newIssue.dueDate}
                    onChange={(e) => setNewIssue({ ...newIssue, dueDate: e.target.value })}
                    className="w-full bg-[#030712] border border-gray-800 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-gray-800">
                  <button type="button" onClick={() => setShowIssueModal(false)} className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold shadow-md">
                    Complete Book Issue
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
