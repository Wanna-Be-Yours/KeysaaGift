"use client";

import { useState, useEffect, useRef } from "react";
import { showModal } from "@/components/Modal";

const WIN_PATTERNS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { winner: "draw", line: [] };
  return null;
}

function botMove(board) {
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = "O";
      if (checkWinner(test)?.winner === "O") return i;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      const test = [...board];
      test[i] = "X";
      if (checkWinner(test)?.winner === "X") return i;
    }
  }
  if (!board[4]) return 4;
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
  const empty = board.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 });
  const [winLine, setWinLine] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const processedRef = useRef(false);

  const result = checkWinner(board);

  // Detect win/draw — only fire once per game
  useEffect(() => {
    if (result && !processedRef.current) {
      processedRef.current = true;
      setGameOver(true);
      setWinLine(result.line);
      if (result.winner === "draw") {
        setScores((s) => ({ ...s, draw: s.draw + 1 }));
      } else {
        setScores((s) => ({ ...s, [result.winner]: s[result.winner] + 1 }));
      }
    }
  }, [board]); // depend on board, not result object

  // Bot turn
  useEffect(() => {
    if (turn === "O" && !gameOver) {
      const timer = setTimeout(() => {
        const idx = botMove(board);
        const next = [...board];
        next[idx] = "O";
        setBoard(next);
        setTurn("X");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [turn, board, gameOver]);

  const handleClick = (i) => {
    if (board[i] || turn !== "X" || gameOver) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setWinLine([]);
    setGameOver(false);
    processedRef.current = false;
  };

  const handleBack = async () => {
    if (board.some(Boolean) && !gameOver) {
      const confirm = await showModal({
        title: "Yakin Keluar? 🤔",
        message: "Permainan belum selesai loh, yakin mau keluar?",
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
        .game-header { text-align: center; margin-bottom: 1.5rem; }
        .game-title { font-size: 1.5rem; font-weight: 800; color: #590d22; margin-bottom: 0.3rem; }
        .game-subtitle { font-size: 0.8rem; color: #b86b8a; font-weight: 600; }
        .scoreboard {
          display: flex; gap: 0.8rem; margin-bottom: 1.2rem;
        }
        .score-pill {
          background: white; border-radius: 999px; padding: 0.4rem 1rem;
          font-size: 0.8rem; font-weight: 700; color: #590d22;
          box-shadow: 0 2px 8px rgba(89,13,34,0.08);
        }
        .score-pill.x { border: 2px solid #ff758f; }
        .score-pill.o { border: 2px solid #7c3aed; }
        .score-pill.draw { border: 2px solid #c4a0b0; }
        .ttt-board {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem; width: 280px; height: 280px;
          margin-bottom: 1.2rem;
        }
        .ttt-cell {
          background: white; border-radius: 1rem; border: 2px solid rgba(255,117,143,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem; font-weight: 800; cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(89,13,34,0.06);
        }
        .ttt-cell:hover:not(.filled) { border-color: #ff758f; transform: scale(1.05); }
        .ttt-cell.filled { cursor: default; }
        .ttt-cell.win { background: #fff0f3; border-color: #ff758f; animation: cellPulse 0.5s ease; }
        @keyframes cellPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .mark-x { color: #ff4d6d; }
        .mark-o { color: #7c3aed; }
        .turn-indicator {
          font-size: 0.85rem; font-weight: 700; color: #b86b8a;
          margin-bottom: 1rem; min-height: 1.2rem;
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
      ` }} />

      <div className="game-header">
        <div className="game-title">🎮 Tic Tac Toe</div>
        <div className="game-subtitle">Main lawan bot, siapa menang? 💪</div>
      </div>

      <div className="scoreboard">
        <div className="score-pill x">❌ Kamu: {scores.X}</div>
        <div className="score-pill draw">🤝 Seri: {scores.draw}</div>
        <div className="score-pill o">🤖 Bot: {scores.O}</div>
      </div>

      <div className="turn-indicator">
        {gameOver
          ? result?.winner === "draw" ? "🤝 Seri!" : result?.winner === "X" ? "🎉 Kamu Menang!" : "🤖 Bot Menang!"
          : turn === "X" ? "Giliran kamu ❌" : "Bot mikir... 🤔"}
      </div>

      <div className="ttt-board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={`ttt-cell ${cell ? "filled" : ""} ${winLine.includes(i) ? "win" : ""}`}
            onClick={() => handleClick(i)}
          >
            {cell === "X" && <span className="mark-x">✕</span>}
            {cell === "O" && <span className="mark-o">○</span>}
          </div>
        ))}
      </div>

      <div className="game-btns">
        <button className="game-btn primary" onClick={reset}>Main Lagi 🔄</button>
        <button className="game-btn secondary" onClick={handleBack}>Kembali ←</button>
      </div>
    </div>
  );
}
