"use client";

import { useState, useEffect, useCallback } from "react";
import { showModal } from "@/components/Modal";

const EMOJIS = ["🌸", "💕", "🌺", "💝", "🎀", "🍰", "🎵", "⭐"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [checking, setChecking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const init = useCallback(() => {
    const pairs = [...EMOJIS, ...EMOJIS];
    setCards(shuffle(pairs.map((emoji, i) => ({ id: i, emoji }))));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setChecking(false);
    setStartTime(null);
    setEndTime(null);
  }, []);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    if (matched.length === EMOJIS.length && EMOJIS.length > 0) {
      setEndTime(Date.now());
    }
  }, [matched]);

  const handleFlip = (idx) => {
    if (checking) return;
    if (flipped.includes(idx)) return;
    if (matched.includes(idx)) return;
    if (!startTime) setStartTime(Date.now());

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setChecking(true);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          setMatched((m) => [...m, first, second]);
          setFlipped([]);
          setChecking(false);
        }, 400);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setChecking(false);
        }, 800);
      }
    }
  };

  const isWon = matched.length === EMOJIS.length && EMOJIS.length > 0;
  const seconds = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0;

  const handleBack = async () => {
    if (!isWon && matched.length > 0) {
      const confirm = await showModal({
        title: "Yakin Keluar? 🤔",
        message: "Belum selesai nih, yakin mau keluar?",
        type: "question",
        confirmText: "Keluar",
        cancelText: "Lanjut Main",
      });
      if (!confirm) return;
    }
    window.history.back();
  };

  return (
    <div className="game-container">
      <style dangerouslySetInnerHTML={{ __html: `
        .game-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%);
          font-family: 'Nunito', sans-serif;
          display: flex; flex-direction: column; align-items: center;
          padding: 2rem 1rem 3rem;
        }
        .game-header { text-align: center; margin-bottom: 1rem; }
        .game-title { font-size: 1.5rem; font-weight: 800; color: #590d22; margin-bottom: 0.2rem; }
        .game-subtitle { font-size: 0.8rem; color: #b86b8a; font-weight: 600; }
        .stats-row {
          display: flex; gap: 0.8rem; margin-bottom: 1.2rem; flex-wrap: wrap; justify-content: center;
        }
        .stat-pill {
          background: white; border-radius: 999px; padding: 0.35rem 1rem;
          font-size: 0.78rem; font-weight: 700; color: #590d22;
          box-shadow: 0 2px 8px rgba(89,13,34,0.08);
        }
        .memory-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem; width: 300px;
          margin-bottom: 1.2rem;
          perspective: 800px;
        }
        .memory-card {
          width: 100%; aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.35s ease;
        }
        .memory-card.flipped { transform: rotateY(180deg); }
        .memory-card.matched { animation: matchPop 0.4s ease; }
        @keyframes matchPop {
          0% { transform: rotateY(180deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.15); }
          100% { transform: rotateY(180deg) scale(1); }
        }
        .card-face {
          position: absolute; inset: 0;
          border-radius: 0.8rem;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 0 3px 10px rgba(89,13,34,0.08);
        }
        .card-front {
          background: linear-gradient(135deg, #ff758f, #ff4d6d);
          color: white;
          font-size: 1.2rem;
        }
        .card-back {
          background: white;
          border: 2px solid rgba(255,117,143,0.2);
          transform: rotateY(180deg);
        }
        .win-banner {
          background: white; border-radius: 1.2rem; padding: 1.2rem 1.5rem;
          text-align: center; margin-bottom: 1rem;
          box-shadow: 0 8px 25px rgba(89,13,34,0.1);
          animation: cardFadeIn 0.5s ease;
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .win-banner h3 { font-size: 1.15rem; font-weight: 800; color: #590d22; margin-bottom: 0.3rem; }
        .win-banner p { font-size: 0.82rem; color: #b86b8a; font-weight: 600; }
        .star { display: inline-block; animation: starSpin 1s ease infinite; }
        .star:nth-child(2) { animation-delay: 0.2s; }
        .star:nth-child(3) { animation-delay: 0.4s; }
        @keyframes starSpin {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.3) rotate(15deg); }
        }
        .game-btns { display: flex; gap: 0.6rem; }
        .game-btn {
          padding: 0.6rem 1.5rem; border-radius: 999px; border: none;
          font-size: 0.85rem; font-weight: 700; cursor: pointer;
          font-family: 'Nunito', sans-serif; transition: all 0.2s ease;
        }
        .game-btn.primary { background: #ff758f; color: white; }
        .game-btn.primary:hover { background: #ff4d6d; transform: translateY(-2px); }
        .game-btn.secondary { background: white; color: #b86b8a; border: 2px solid #e8d0dc; }
        .game-btn.secondary:hover { border-color: #ff758f; color: #ff758f; }
        @media (max-width: 380px) {
          .memory-grid { width: 260px; gap: 0.4rem; }
        }
      ` }} />

      <div className="game-header">
        <div className="game-title">🧠 Memory Card</div>
        <div className="game-subtitle">Temukan pasangan emoji yang sama! 💕</div>
      </div>

      <div className="stats-row">
        <div className="stat-pill">🎯 Langkah: {moves}</div>
        <div className="stat-pill">✅ Cocok: {matched.length / 2}/{EMOJIS.length}</div>
        {endTime && <div className="stat-pill">⏱️ {seconds} detik</div>}
      </div>

      {isWon && (
        <div className="win-banner">
          <h3><span className="star">⭐</span> Greatt! <span className="star">⭐</span></h3>
          <p>Selesai dalam {moves} langkah & {seconds} detik! 🎉</p>
        </div>
      )}

      <div className="memory-grid">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || matched.includes(i);
          const isMatched = matched.includes(i);
          return (
            <div
              key={card.id}
              className={`memory-card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => handleFlip(i)}
            >
              <div className="card-face card-front">💝</div>
              <div className="card-face card-back">{card.emoji}</div>
            </div>
          );
        })}
      </div>

      <div className="game-btns">
        <button className="game-btn primary" onClick={init}>Main Lagi 🔄</button>
        <button className="game-btn secondary" onClick={handleBack}>Kembali ←</button>
      </div>
    </div>
  );
}
