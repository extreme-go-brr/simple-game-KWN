// src/App.jsx
import React, { useState } from 'react';
import Home from './pages/Home';
import GameRoom from './pages/GameRoom';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {!selectedCategory ? (
        <Home onSelectCategory={(category) => setSelectedCategory(category)} />
      ) : (
        <GameRoom 
          category={selectedCategory} 
          onBackToHome={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  );
}