// src/components/ModalInfo.jsx
export default function ModalInfo({ category, onRestart, onHome }) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 md:p-8 text-center shadow-2xl shadow-emerald-950/50 relative overflow-hidden">
        
        {/* Aksen cahaya latar belakang modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xl mb-3">
          🏆
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-1">Puzzle Sempurna!</h2>
        <p className="text-slate-400 text-xs md:text-sm mb-6">
          Berhasil memperkuat pilar <span className="font-semibold text-emerald-400">{category.title}</span>.
        </p>
        
        <div className="relative rounded-2xl overflow-hidden mb-5 border border-slate-700 shadow-inner max-h-48">
          <img 
            src={category.image} 
            alt={category.title} 
            className="w-full h-40 object-cover"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl text-left border border-slate-800/80 mb-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
            Arsip Pengetahuan Negara
          </div>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            {category.trivia}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-98"
          >
            Main Lagi
          </button>
          <button
            onClick={onHome}
            className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm py-3 rounded-xl transition-colors cursor-pointer active:scale-98"
          >
            Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
}