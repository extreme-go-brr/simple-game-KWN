// src/components/ModalInfo.jsx
import React from 'react';

export default function ModalInfo({ category, onRestart, onHome }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-emerald-500 rounded-2xl max-w-lg w-full p-6 text-center shadow-2xl animate-fade-in">
        <div className="text-3xl font-extrabold text-emerald-400 mb-2">🎉 Selamat, Puzzle Selesai!</div>
        <p className="text-slate-300 text-sm mb-4">Kamu telah berhasil memperkuat pilar <span className="font-bold text-white">{category.title}</span>.</p>
        
        <img 
          src={category.image} 
          alt={category.title} 
          className="w-full h-52 object-cover rounded-xl mb-4 border border-slate-600"
        />

        <div className="bg-slate-900 p-4 rounded-xl text-left border border-slate-700 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Arsip & Fakta Negara:</h3>
          <p className="text-slate-200 text-sm leading-relaxed">{category.trivia}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Main Lagi
          </button>
          <button
            onClick={onHome}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
}