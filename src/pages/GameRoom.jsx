// src/pages/GameRoom.jsx
import { useState, useCallback } from 'react';
import ModalInfo from '../components/ModalInfo';

const COLS = 4;
const ROWS = 4;
const TOTAL_PIECES = COLS * ROWS;

const PIECE_WIDTH = 160;
const PIECE_HEIGHT = 120;
const TOTAL_WIDTH = COLS * PIECE_WIDTH;
const TOTAL_HEIGHT = ROWS * PIECE_HEIGHT;

const generateShuffledTiles = () => {
  const initialIndices = Array.from({ length: TOTAL_PIECES }, (_, i) => i);
  return [...initialIndices].sort(() => Math.random() - 0.5);
};

export default function GameRoom({ category, onBackToHome }) {
  const [tiles, setTiles] = useState(generateShuffledTiles);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRestart = useCallback(() => {
    setTiles(generateShuffledTiles());
    setSelectedTile(null);
    setIsCompleted(false);
  }, []);

  const checkIfWin = (currentTiles) =>
    currentTiles.every((val, idx) => val === idx);

  const handleTileClick = (index) => {
    if (isCompleted) return;

    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      const newTiles = [...tiles];
      const temp = newTiles[selectedTile];
      newTiles[selectedTile] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedTile(null);

      if (checkIfWin(newTiles)) setIsCompleted(true);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-hidden bg-slate-950 px-4 py-8 text-white selection:bg-emerald-500 selection:text-white">
      {/* Aksen cahaya latar */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 -right-32 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Header Game */}
      <div className="relative flex w-full max-w-[704px] items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 shadow-xl shadow-black/40 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-lg">
            🧩
          </div>
          <div>
            <h2 className="text-base font-bold text-emerald-400">
              {category.title}
            </h2>
            <p className="text-[11px] text-slate-400">
              Ketuk 2 keping untuk tukar posisi
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="group flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 shadow-md shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-600 hover:text-white hover:shadow-red-600/30 active:scale-95"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:-translate-x-1"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Keluar
        </button>
      </div>

      {/* Area Puzzle Grid - CENTER */}
      <div className="relative flex w-full max-w-[704px] items-center justify-center overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-[18px] shadow-xl shadow-black/40 backdrop-blur">
        <div
          className="shrink-0 rounded-xl bg-slate-700 p-1.5 shadow-2xl shadow-black/50"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${COLS}, ${PIECE_WIDTH}px)`,
            gridTemplateRows: `repeat(${ROWS}, ${PIECE_HEIGHT}px)`,
            gap: '4px',
          }}
        >
          {tiles.map((tileIndex, currentSlotIndex) => {
            const col = tileIndex % COLS;
            const row = Math.floor(tileIndex / COLS);

            const xPos = (col / (COLS - 1)) * 100;
            const yPos = (row / (ROWS - 1)) * 100;

            const isSelected = selectedTile === currentSlotIndex;

            return (
              <div
                key={currentSlotIndex}
                onClick={() => handleTileClick(currentSlotIndex)}
                className={[
                  'box-border rounded transition-all duration-150 ease-in-out',
                  isCompleted ? 'cursor-default' : 'cursor-pointer',
                  isSelected
                    ? 'z-10 scale-95 border-[3px] border-emerald-400 shadow-lg shadow-emerald-500/40'
                    : 'border border-white/10',
                  !isSelected && !isCompleted
                    ? 'hover:z-10 hover:scale-[1.03] hover:brightness-110 hover:border-emerald-300/60'
                    : '',
                ].join(' ')}
                style={{
                  width: `${PIECE_WIDTH}px`,
                  height: `${PIECE_HEIGHT}px`,
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: `${TOTAL_WIDTH}px ${TOTAL_HEIGHT}px`,
                  backgroundPosition: `${xPos}% ${yPos}%`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Target Gambar */}
      <div className="relative flex w-full max-w-[704px] flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/40 backdrop-blur sm:flex-row">
        <img
          src={category.image}
          alt="Target"
          className="h-36 w-full shrink-0 rounded-xl border border-slate-700 object-cover shadow-md shadow-black/40 sm:w-44"
        />
        <div className="text-left text-xs">
          <span className="mb-1 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Target Gambar Utuh
          </span>
          <p className="leading-relaxed text-slate-400">
            Susun 16 keping puzzle wide di atas hingga membentuk gambar lanskap
            yang utuh.
          </p>
        </div>
      </div>

      {/* Pop-up Modal Menang & Edukasi */}
      {isCompleted && (
        <ModalInfo
          category={category}
          onRestart={handleRestart}
          onHome={onBackToHome}
        />
      )}
    </div>
  );
}