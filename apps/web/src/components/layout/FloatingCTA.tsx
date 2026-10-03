import React from 'react';

export const FloatingCTA: React.FC = () => {
  return (
    <>
      <aside className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col shadow-2xl rounded-l-2xl overflow-hidden text-white font-medium text-xs">
        <a href="tel:+917351324716" className="bg-amber-500 hover:bg-amber-600 px-4 py-3 flex items-center gap-2 transition-all">
          <span>📞</span> Call Us Now
        </a>
        <a href="mailto:contact@example.com" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-3 flex items-center gap-2 transition-all">
          <span>✉️</span> Mail To Us
        </a>
        <a href="#inquiry" className="bg-amber-600 hover:bg-amber-700 px-4 py-3 flex items-center gap-2 transition-all">
          <span>❓</span> Inquiry
        </a>
      </aside>

      <a
        href="https://wa.me/917351324716"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center text-white text-2xl shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  );
};
