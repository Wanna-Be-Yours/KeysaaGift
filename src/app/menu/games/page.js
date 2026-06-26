"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const GAMES = [
  {
    id: "rps",
    emoji: "✊",
    title: "Kertas Gunting Batu",
    desc: "Main lawan bot, siapa yang menang?",
    color: "#ff758f",
  },
  {
    id: "guess",
    emoji: "🔢",
    title: "Tebak Angka",
    desc: "Aku pikirin angka 1-100, coba tebak!",
    color: "#a78bfa",
  },
  {
    id: "tictactoe",
    emoji: "🎯",
    title: "Tic Tac Toe",
    desc: "Main tic-tac-toe lawan bot pintar!",
    color: "#ff9a56",
  },
  {
    id: "memory",
    emoji: "🧠",
    title: "Memory Card",
    desc: "Temukan pasangan emoji yang sama!",
    color: "#60a5fa",
  },
];

export default function GamesPage() {
  return (
    <AuthGuard>
      <div className="games-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .games-container {
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
          .games-back {
            position: fixed; top: 20px; left: 20px;
            background: white; border: none; border-radius: 50%;
            width: 45px; height: 45px;
            display: flex; align-items: center; justify-content: center;
            text-decoration: none; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000; font-size: 1.2rem; cursor: pointer;
            transition: all 0.3s ease;
          }
          .games-back:hover { transform: scale(1.1) rotate(-10deg); }
          .games-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem; color: var(--pink-dark);
            margin: 3.5rem 0 0.3rem; text-align: center;
          }
          .games-subtitle {
            font-size: 0.75rem; color: var(--pink-main);
            letter-spacing: 3px; text-transform: uppercase;
            margin-bottom: 2rem;
          }
          .games-grid {
            display: flex; flex-direction: column; gap: 1rem;
            width: 100%; max-width: 400px;
          }
          .game-card {
            background: white; border-radius: 1.4rem;
            padding: 1.4rem; display: flex; align-items: center; gap: 1rem;
            cursor: pointer; transition: all 0.25s ease;
            box-shadow: 0 4px 18px rgba(0,0,0,0.07);
            border: 2px solid transparent;
            text-decoration: none;
          }
          .game-card:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 35px rgba(0,0,0,0.12);
            border-color: var(--pink-mid);
          }
          .game-card:active { transform: scale(0.97); }
          .game-emoji { font-size: 2.8rem; }
          .game-info { flex: 1; }
          .game-title {
            font-size: 1.05rem; font-weight: 800;
            color: var(--pink-dark); margin-bottom: 0.2rem;
          }
          .game-desc {
            font-size: 0.78rem; color: #7a6b8a; font-weight: 500;
          }
          .games-footer {
            margin-top: 2rem; text-align: center;
            font-size: 0.75rem; color: var(--pink-main);
            letter-spacing: 2px;
          }
        ` }} />

        <Link href="/menu" className="games-back" title="Kembali ke Menu">🏠</Link>

        <h1 className="games-title">Mini Games</h1>
        <p className="games-subtitle">Pilih gamenya! 🎮</p>

        <div className="games-grid">
          {GAMES.map((game) => (
            <Link
              key={game.id}
              href={`/menu/${game.id}`}
              className="game-card"
            >
              <span className="game-emoji">{game.emoji}</span>
              <div className="game-info">
                <div className="game-title">{game.title}</div>
                <div className="game-desc">{game.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="games-footer">⭐ Have Fun! ⭐</div>
      </div>
    </AuthGuard>
  );
}
