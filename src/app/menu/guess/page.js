"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const MIN = 1;
const MAX = 100;

function getHint(guess, target) {
  const diff = Math.abs(guess - target);
  if (guess < target) {
    if (diff > 30) return "Terlalu kecil! 🧊❄️";
    if (diff > 15) return "Masih kecil! 📉";
    if (diff > 5) return "Dikit lagi naik! 🔥";
    return "Hampir! Naik sedikit! 🔥🔥";
  } else {
    if (diff > 30) return "Terlalu besar! 🔥🔥";
    if (diff > 15) return "Masih besar! 📈";
    if (diff > 5) return "Dikit lagi turun! ❄️";
    return "Hampir! Turun sedikit! ❄️❄️";
  }
}

function getBounces(attempts) {
  if (attempts <= 5) return "Sempurna! 🌟";
  if (attempts <= 8) return "Hebat! 🎉";
  if (attempts <= 12) return "Bagus! 👍";
  return "Lumayan! 😅";
}

export default function GuessPage() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * MAX) + 1);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [won]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(input, 10);
    if (isNaN(num) || num < MIN || num > MAX) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    // Check if already guessed
    if (history.some((h) => h.guess === num)) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const hint = num === target ? "Tebakan benar! 🎊" : getHint(num, target);
    const entry = { guess: num, hint };
    const newHistory = [...history, entry];
    setHistory(newHistory);
    setInput("");

    if (num === target) {
      setWon(true);
    }
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * MAX) + 1);
    setInput("");
    setHistory([]);
    setWon(false);
  };

  return (
    <AuthGuard>
      <div className="guess-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .guess-container {
            --pink-light: #fff5f7;
            --pink-soft: #ffe3eb;
            --pink-mid:  #ffb3c6;
            --pink-main: #ff758f;
            --pink-deep: #ff4d6d;
            --pink-dark: #590d22;
            min-height: 100vh;
            background: var(--pink-light);
            font-family: 'Nunito', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            background-image:
              radial-gradient(circle at 15% 15%, rgba(255,182,193,0.2) 0%, transparent 40%),
              radial-gradient(circle at 85% 85%, rgba(255,117,143,0.1) 0%, transparent 50%);
          }
          .guess-back {
            position: fixed; top: 20px; left: 20px;
            background: white; border: none; border-radius: 50%;
            width: 45px; height: 45px;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000; font-size: 1.2rem; cursor: pointer;
            transition: all 0.3s ease;
          }
          .guess-back:hover { transform: scale(1.1) rotate(-10deg); }
          .guess-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem; color: var(--pink-dark);
            margin: 3.5rem 0 0.3rem; text-align: center;
          }
          .guess-subtitle {
            font-size: 0.75rem; color: var(--pink-main);
            letter-spacing: 3px; text-transform: uppercase;
            margin-bottom: 0.5rem;
          }
          .guess-range {
            background: white; border-radius: 999px; padding: 0.4rem 1.2rem;
            font-size: 0.8rem; color: var(--pink-dark); font-weight: 700;
            margin-bottom: 1rem; box-shadow: 0 3px 14px rgba(0,0,0,0.07);
          }
          .guess-input-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
          .guess-input {
            width: 120px; padding: 0.7rem 1rem;
            border: 2px solid var(--pink-soft); border-radius: 1rem;
            font-size: 1.2rem; font-weight: 800; text-align: center;
            color: var(--pink-dark); outline: none;
            transition: border-color 0.2s ease;
            font-family: 'Nunito', sans-serif;
          }
          .guess-input:focus { border-color: var(--pink-main); }
          .guess-input.shake { animation: shake 0.4s ease; }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-8px); }
            75% { transform: translateX(8px); }
          }
          .guess-submit {
            background: var(--pink-main); color: white; border: none;
            border-radius: 1rem; padding: 0.7rem 1.2rem;
            font-size: 0.9rem; font-weight: 700; cursor: pointer;
            transition: all 0.2s ease; font-family: 'Nunito', sans-serif;
          }
          .guess-submit:hover { background: var(--pink-deep); transform: translateY(-2px); }
          .guess-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
          .history-box {
            background: white; border-radius: 1.2rem;
            box-shadow: 0 3px 14px rgba(0,0,0,0.07);
            width: 100%; max-width: 360px;
            max-height: 300px; overflow-y: auto;
            margin-bottom: 1rem;
          }
          .history-box-inner { padding: 0.8rem; }
          .history-title {
            font-size: 0.75rem; color: var(--pink-main);
            font-weight: 700; text-transform: uppercase;
            letter-spacing: 2px; margin-bottom: 0.5rem;
            text-align: center;
          }
          .history-empty {
            text-align: center; color: var(--pink-mid);
            font-size: 0.85rem; padding: 1rem;
          }
          .history-item {
            display: flex; align-items: center; gap: 0.6rem;
            padding: 0.45rem 0.5rem; border-radius: 0.8rem;
            margin-bottom: 0.3rem;
            animation: slideIn 0.25s ease;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .history-item:nth-child(odd) { background: var(--pink-light); }
          .history-num {
            font-weight: 800; font-size: 1rem;
            color: var(--pink-dark); min-width: 36px; text-align: center;
          }
          .history-hint { font-size: 0.8rem; color: var(--pink-dark); flex: 1; }
          .attempts-badge {
            background: var(--pink-soft); border-radius: 999px;
            padding: 0.3rem 0.8rem; font-size: 0.75rem;
            color: var(--pink-dark); font-weight: 700;
            margin-bottom: 0.8rem;
          }
          .win-box {
            text-align: center; margin-bottom: 1rem;
            animation: popIn 0.4s ease;
          }
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          .win-text {
            font-size: 1.4rem; font-weight: 800;
            color: var(--pink-deep); margin-bottom: 0.2rem;
          }
          .win-bounces {
            font-size: 1rem; color: var(--pink-main); font-weight: 700;
          }
          .reset-btn {
            background: var(--pink-main); color: white; border: none;
            border-radius: 999px; padding: 0.6rem 1.8rem;
            font-size: 0.85rem; font-weight: 700; cursor: pointer;
            transition: all 0.2s ease; font-family: 'Nunito', sans-serif;
          }
          .reset-btn:hover { background: var(--pink-deep); transform: translateY(-2px); }
        ` }} />

        <Link href="/menu/games" className="guess-back" title="Kembali">🏠</Link>

        <h1 className="guess-title">Tebak Angka</h1>
        <p className="guess-subtitle">Aku pikirin angka 1-100...</p>
        <div className="guess-range">🎯 Range: {MIN} — {MAX}</div>

        {won ? (
          <div className="win-box">
            <div className="win-text">🎉 Angkanya {target}!</div>
            <div className="win-bounces">{getBounces(history.length)} — {history.length} tebakan</div>
          </div>
        ) : (
          <div className="attempts-badge">Tebakan ke-{history.length + 1}</div>
        )}

        <form className="guess-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="number"
            min={MIN}
            max={MAX}
            className={`guess-input ${shake ? "shake" : ""}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="?"
            disabled={won}
          />
          <button type="submit" className="guess-submit" disabled={won}>
            Tebak!
          </button>
        </form>

        <div className="history-box">
          <div className="history-box-inner">
            <div className="history-title">Riwayat Tebakan</div>
            {history.length === 0 ? (
              <div className="history-empty">Belum ada tebakan. Coba tebak angkanya! 🤔</div>
            ) : (
              history.map((h, i) => (
                <div key={i} className="history-item">
                  <span className="history-num">{h.guess}</span>
                  <span className="history-hint">{h.hint}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <button className="reset-btn" onClick={resetGame}>
          {won ? "Main Lagi 🔄" : "Reset Game"}
        </button>
      </div>
    </AuthGuard>
  );
}
