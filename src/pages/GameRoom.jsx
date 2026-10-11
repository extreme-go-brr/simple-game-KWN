// src/pages/GameRoom.jsx
import { useState, useCallback } from 'react';
import ModalInfo from '../components/ModalInfo';

// Grid 3x3 (total 9 potongan)
const GRID_SIZE = 3;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

// Fungsi helper untuk mengacak puzzle
const generateShuffledTiles = () => {
  const initialIndices = Array.from({ length: TOTAL_PIECES }, (_, i) => i);
  return [...initialIndices].sort(() => Math.random() - 0.5);
};

export default function GameRoom({ category, onBackToHome }) {
  // Inisialisasi state langsung menggunakan fungsi pengacak
  const [tiles, setTiles] = useState(generateShuffledTiles);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fungsi untuk mengulang permainan
  const handleRestart = useCallback(() => {
    setTiles(generateShuffledTiles());
    setSelectedTile(null);
    setIsCompleted(false);
  }, []);

  // Cek apakah susunan sudah benar (0, 1, 2, 3, 4, 5, 6, 7, 8)
  const checkIfWin = (currentTiles) => {
    return currentTiles.every((val, idx) => val === idx);
  };

  // Handle klik tukar posisi kepingan puzzle
  const handleTileClick = (index) => {
    if (isCompleted) return;

    if (selectedTile === null) {
      setSelectedTile(index);
    } else {
      let newTiles = [...tiles];
      let temp = newTiles[selectedTile];
      newTiles[selectedTile] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedTile(null);

      if (checkIfWin(newTiles)) {
        setIsCompleted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-between p-6">
      {/* Header Game */}
      <div className="w-full max-w-xl flex justify-between items-center bg-slate-800 px-6 py-4 rounded-xl border border-slate-700">
        <div>
          <h2 className="text-lg font-bold text-emerald-400">{category.title}</h2>
          <p className="text-xs text-slate-400">Klik dua kepingan untuk menukar posisinya</p>
        </div>
        <button
          onClick={onBackToHome}
          className="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Keluar
        </button>
      </div>

      {/* Area Puzzle Grid 3x3 */}
      <div className="my-6 flex justify-center">
        <div 
          className="grid gap-1 bg-slate-700 p-2 rounded-xl shadow-2xl border border-slate-600"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            width: '320px',
            minWidth: '320px',
            height: '320px',
            minHeight: '320px'
          }}
        >
          {tiles.map((tileIndex, currentSlotIndex) => {
            const xPos = (tileIndex % GRID_SIZE) * (100 / (GRID_SIZE - 1));
            const yPos = Math.floor(tileIndex / GRID_SIZE) * (100 / (GRID_SIZE - 1));

            const isSelected = selectedTile === currentSlotIndex;

            return (
              <div
                key={currentSlotIndex}
                onClick={() => handleTileClick(currentSlotIndex)}
                className={`w-full h-full bg-cover rounded cursor-pointer transition-all duration-150 ${
                  isSelected ? 'ring-4 ring-emerald-400 scale-95' : 'hover:opacity-90'
                }`}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${xPos}% ${yPos}%`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Referensi Gambar Asli Kecil */}
      <div className="text-center bg-slate-800 p-3 rounded-xl border border-slate-700 max-w-xs w-full flex items-center gap-4">
        <img src={category.image} alt="Target" className="w-16 h-16 object-cover rounded-lg border border-slate-600" />
        <div className="text-left text-xs">
          <span className="font-bold text-emerald-400 block mb-1">Target Gambar:</span>
          <span className="text-slate-300">Susun kepingan di atas hingga menyerupai gambar di samping.</span>
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