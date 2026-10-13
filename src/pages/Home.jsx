// src/pages/Home.jsx
import { puzzleCategories } from '../data/puzzleData';

export default function Home({ onSelectCategory }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-6 py-12 selection:bg-emerald-500 selection:text-white">
      {/* Aksen cahaya latar */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-32 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative w-full max-w-6xl text-center">
        {/* Badge */}
        <div className="mb-5 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Edukasi & Resiliensi Bangsa
        </div>

        {/* Judul gradasi */}
        <h1 className="mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
          Ketahanan Nasional
        </h1>
        <p className="mx-auto mb-14 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          Pilih pilar ketahanan nasional pilihanmu, selesaikan puzzle tantangannya,
          dan temukan arsip strategis kedaulatan negara.
        </p>

        {/* Grid kategori */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {puzzleCategories.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/60 hover:shadow-emerald-500/20"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>

                <div className="p-5 text-left">
                  <h2 className="mb-2 text-lg font-bold text-emerald-300 transition-colors group-hover:text-emerald-400">
                    {item.title}
                  </h2>
                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectCategory(item)}
                  className="group/btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-emerald-500/40 active:scale-95"
                >
                  Mulai Susun
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}