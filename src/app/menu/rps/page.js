"use client";

import { useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const CHOICES = [
  { id: "rock", emoji: "✊", label: "Batu" },
  { id: "paper", emoji: "🖐️", label: "Kertas" },
  { id: "scissors", emoji: "✌️", label: "Gunting" },
];

const RESULTS = {
  rock: { rock: "draw", paper: "lose", scissors: "win" },
  paper: { rock: "win", paper: "draw", scissors: "lose" },
  scissors: { rock: "lose", paper: "win", scissors: "draw" },
};

const RESULT_TEXT = {
  win: { text: "Kamu Menang! 🎉", color: "#16a34a" },
  lose: { text: "Kamu Kalah 😅", color: "#ef4444" },
  draw: { text: "Seri! 🤝", color: "#f59e0b" },
};

export default function RPSPage() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });
  const [animating, setAnimating] = useState(false);

  const play = (choice) => {
    if (animating) return;
    setAnimating(true);
    setPlayerChoice(null);
    setBotChoice(null);
    setResult(null);

    // Countdown animation
    let count = 0;
    const interval = setInterval(() => {
      setPlayerChoice(CHOICES[count % 3]);
      setBotChoice(CHOICES[(count + 1) % 3]);
      count++;
      if (count > 5) {
        clearInterval(interval);
        const bot = CHOICES[Math.floor(Math.random() * 3)];
        const res = RESULTS[choice][bot.id];
        setPlayerChoice(CHOICES.find((c) => c.id === choice));
        setBotChoice(bot);
        setResult(res);
        setScore((prev) => ({ ...prev, [res]: prev[res] + 1 }));
        setAnimating(false);
      }
    }, 100);
  };

  const resetScore = () => setScore({ win: 0, lose: 0, draw: 0 });

  return (
    <AuthGuard>
      <div className="rps-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .rps-container {
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
              radial-gradient(circle at 10% 20%, rgba(255,182,193,0.2) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(255,117,143,0.1) 0%, transparent 50%);
          }
          .rps-back {
            position: fixed; top: 20px; left: 20px;
            background: white; border: none; border-radius: 50%;
            width: 45px; height: 45px;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000; font-size: 1.2rem; cursor: pointer;
            transition: all 0.3s ease;
          }
          .rps-back:hover { transform: scale(1.1) rotate(-10deg); }
          .rps-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem; color: var(--pink-dark);
            margin: 3.5rem 0 0.3rem; text-align: center;
          }
          .rps-subtitle {
            font-size: 0.75rem; color: var(--pink-main);
            letter-spacing: 3px; text-transform: uppercase;
            margin-bottom: 1.5rem;
          }
          .score-board {
            display: flex; gap: 1rem; margin-bottom: 1.5rem;
          }
          .score-item {
            background: white; border-radius: 1rem; padding: 0.6rem 1.2rem;
            text-align: center; box-shadow: 0 3px 14px rgba(0,0,0,0.07);
            min-width: 70px;
          }
          .score-num { font-size: 1.4rem; font-weight: 800; color: var(--pink-dark); }
          .score-label { font-size: 0.65rem; color: var(--pink-main); font-weight: 600; text-transform: uppercase; }
          .battle-area {
            display: flex; align-items: center; gap: 1.5rem;
            margin-bottom: 1.5rem; min-height: 120px;
          }
          .fighter {
            text-align: center; min-width: 100px;
          }
          .fighter-emoji {
            font-size: 3.5rem; display: block;
            transition: all 0.15s ease;
          }
          .fighter-emoji.bounce { animation: bounce 0.3s ease; }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .fighter-label {
            font-size: 0.75rem; color: var(--pink-main);
            font-weight: 600; margin-top: 0.3rem;
          }
          .vs-text {
            font-size: 1.2rem; font-weight: 800; color: var(--pink-mid);
          }
          .result-text {
            font-size: 1.3rem; font-weight: 800;
            margin-bottom: 1.2rem; min-height: 1.5rem;
            transition: all 0.3s ease;
          }
          .choices {
            display: flex; gap: 1rem; margin-bottom: 1.5rem;
          }
          .choice-btn {
            background: white; border: 2px solid var(--pink-soft);
            border-radius: 1.2rem; padding: 1rem 1.4rem;
            font-size: 2.2rem; cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 3px 14px rgba(0,0,0,0.07);
            display: flex; flex-direction: column; align-items: center; gap: 0.3rem;
          }
          .choice-btn:hover {
            transform: translateY(-4px);
            border-color: var(--pink-main);
            box-shadow: 0 8px 25px rgba(255,117,143,0.2);
          }
          .choice-btn:active { transform: scale(0.95); }
          .choice-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
          .choice-label { font-size: 0.7rem; color: var(--pink-dark); font-weight: 700; }
          .reset-btn {
            background: var(--pink-main); color: white; border: none;
            border-radius: 999px; padding: 0.5rem 1.5rem;
            font-size: 0.8rem; font-weight: 700; cursor: pointer;
            transition: all 0.2s ease;
          }
          .reset-btn:hover { background: var(--pink-deep); transform: translateY(-2px); }
        ` }} />

        <Link href="/menu/games" className="rps-back" title="Kembali">🏠</Link>

        <h1 className="rps-title">Kertas Gunting Batu</h1>
        <p className="rps-subtitle">Pilih tanganmu! ✊🖐️✌️</p>

        <div className="score-board">
          <div className="score-item">
            <div className="score-num">{score.win}</div>
            <div className="score-label">Menang</div>
          </div>
          <div className="score-item">
            <div className="score-num">{score.draw}</div>
            <div className="score-label">Seri</div>
          </div>
          <div className="score-item">
            <div className="score-num">{score.lose}</div>
            <div className="score-label">Kalah</div>
          </div>
        </div>

        <div className="battle-area">
          <div className="fighter">
            <span className={`fighter-emoji ${animating ? "bounce" : ""}`}>
              {playerChoice ? playerChoice.emoji : "❓"}
            </span>
            <div className="fighter-label">Kamu</div>
          </div>
          <span className="vs-text">VS</span>
          <div className="fighter">
            <span className={`fighter-emoji ${animating ? "bounce" : ""}`}>
              {botChoice ? botChoice.emoji : "❓"}
            </span>
            <div className="fighter-label">Bot</div>
          </div>
        </div>

        <div className="result-text" style={{ color: result ? RESULT_TEXT[result].color : "transparent" }}>
          {result ? RESULT_TEXT[result].text : "Pilih tanganmu!"}
        </div>

        <div className="choices">
          {CHOICES.map((c) => (
            <button
              key={c.id}
              className="choice-btn"
              onClick={() => play(c.id)}
              disabled={animating}
            >
              {c.emoji}
              <span className="choice-label">{c.label}</span>
            </button>
          ))}
        </div>

        <button className="reset-btn" onClick={resetScore}>Reset Skor</button>
      </div>
    </AuthGuard>
  );
}
