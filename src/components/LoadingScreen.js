"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [dot, setDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDot((d) => (d + 1) % 4), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        .loading-screen {
          position: fixed; inset: 0;
          background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #e8eaf6 100%);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 9998;
          font-family: 'Nunito', sans-serif;
          transition: opacity 0.4s ease;
        }
        .loading-heart {
          font-size: 3.5rem;
          animation: heartbeat 1s ease-in-out infinite;
          margin-bottom: 1.2rem;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
        }
        .loading-text {
          font-size: 1rem;
          color: #590d22;
          font-weight: 700;
          letter-spacing: 2px;
        }
        .loading-dots span {
          opacity: 0.2;
          animation: dotBlink 1.2s ease-in-out infinite;
        }
        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.3s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.6s; }
        @keyframes dotBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .loading-sub {
          font-size: 0.72rem;
          color: #b86b8a;
          margin-top: 0.6rem;
          font-weight: 600;
        }
      ` }} />
      <div className="loading-screen-inner">
        <div className="loading-heart">💝</div>
        <div className="loading-text">
          GitaGift
          <span className="loading-dots">
            <span>•</span><span>•</span><span>•</span>
          </span>
        </div>
        <div className="loading-sub">for someone spesial 💕</div>
      </div>
    </div>
  );
}
