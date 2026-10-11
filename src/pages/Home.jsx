// src/pages/Home.jsx
import React from 'react';
import { puzzleCategories } from '../data/puzzleData';

export default function Home({ onSelectCategory }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold mb-3 text-emerald-400 tracking-wide">
          Garda Nusantara: Puzzle Ketahanan Nasional
        </h1>
        <p className="text-slate-300 mb-10 text-lg">
          Pilih salah satu pilar ketahanan nasional di bawah ini, selesaikan puzzlenya, dan temukan arsip penting negara!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {puzzleCategories.map((item) => (
            <div 
              key={item.id}
              className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-left">
                  <h2 className="text-xl font-bold text-emerald-300 mb-2">{item.title}</h2>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectCategory(item)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Mulai Susun Puzzle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}