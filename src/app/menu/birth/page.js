"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

export default function BirthdayPage() {
  const [countdown, setCountdown] = useState(3);
  const [showCake, setShowCake] = useState(false);
  const [flameOut, setFlameOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [timeSinceText, setTimeSinceText] = useState("");
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCake(true);
    }
  }, [countdown]);

  const handleCandleClick = () => {
    setFlameOut(true);
    setTimeout(() => {
      setShowCake(false);
      setShowMessage(true);
      setCardsVisible(true);
    }, 1000);
  };

  useEffect(() => {
    if (showMessage) {
      const updateTimeSince = () => {
        const start = new Date("2009-06-21T00:00:00");
        const now = new Date();
        let diff = Math.floor((now - start) / 1000);
        const years = Math.floor(diff / (60 * 60 * 24 * 365));
        diff %= 60 * 60 * 24 * 365;
        const days = Math.floor(diff / (60 * 60 * 24));
        diff %= 60 * 60 * 24;
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        setTimeSinceText(
          `Sudah ${years} tahun ${days} hari ${hours} jam ${minutes} menit ${seconds} detik sejak kelahiran wanita tercantik dan termanis kedua setelah ibuku.`
        );
      };

      updateTimeSince();
      const interval = setInterval(updateTimeSince, 1000);
      return () => clearInterval(interval);
    }
  }, [showMessage]);

  return (
    <AuthGuard>
      <div className="birthday-page-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .birthday-page-container {
            --pink:#f8cce3;
            --blue:#d0f0f8;
            --pink-dark:#f49ac2;
            --text:#5a5a5a;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(180deg, var(--pink), var(--blue));
            color: var(--text);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            width: 100%;
            padding: 20px;
          }

          .hidden { display: none; }

          .big-text {
            font-size: 5rem;
            font-weight: 700;
            margin: 0;
            color: var(--pink-dark);
            text-shadow: 0 3px 6px rgba(0,0,0,.1);
          }

          .cake-wrap {
            margin-top: 40px;
          }

          .cake {
            position: relative;
            width: 180px;
            height: 110px;
            margin: auto;
            background: var(--pink-dark);
            border-radius: 12px 12px 0 0;
            box-shadow: 0 6px #e58bb1;
          }

          .cake::after {
            content: '';
            position: absolute;
            width: 180px;
            height: 25px;
            top: -25px;
            left: 0;
            background: #fbc6dc;
            border-radius: 12px 12px 0 0;
          }

          .candle {
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 22px;
            height: 50px;
            background: #fff8dc;
            border-radius: 6px;
            box-shadow: 0 0 0 1px rgba(0,0,0,.05);
            cursor: pointer;
          }

          .flame {
            position: absolute;
            top: -18px;
            left: 50%;
            transform: translateX(-50%);
            width: 18px;
            height: 18px;
            background: radial-gradient(circle, #ff0 30%, #ff8c00 70%);
            border-radius: 50%;
            animation: flicker .3s infinite alternate;
            box-shadow: 0 0 15px 5px rgba(255,200,0,.4);
          }

          @keyframes flicker {
            from { transform: translateX(-50%) scale(1); opacity: 1; }
            to { transform: translateX(-50%) scale(1.2); opacity: .8; }
          }

          #birthday-msg {
            font-size: 2.4rem;
            font-weight: 600;
            margin-top: 20px;
            color: var(--pink-dark);
            text-shadow: 0 2px 4px rgba(0,0,0,.08);
          }

          #time-since {
            margin-top: 15px;
            font-size: 1.2rem;
            color: #666;
            padding: 0 15px;
          }

          #greeting {
            font-size: 1.1rem;
            color: #444;
            line-height: 1.6;
          }

          p.hint {
            font-size: 1rem;
            margin-top: 20px;
            color: #555;
          }

          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
            max-width: 1200px;
            width: 100%;
          }

          .card {
            flex: 1 1 300px;
            background: rgba(255, 255, 255, 0.85);
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            backdrop-filter: blur(8px);
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            text-align: left;
          }

          .card.show {
            opacity: 1;
            transform: translateY(0);
          }

          .back-to-menu {
            position: fixed;
            top: 20px;
            left: 20px;
            background: white;
            border: none;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            cursor: pointer;
            color: #7c3aed;
          }

          .back-to-menu:hover {
            transform: scale(1.1) rotate(-10deg);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }

          .back-btn {
            margin-top: 25px;
            padding: 10px 20px;
            font-size: 1rem;
            background: var(--pink-dark);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            transition: background 0.3s, transform 0.2s;
          }

          .back-btn:hover {
            background: #e68ab3;
            transform: translateY(-2px);
          }
        ` }} />

        <Link href="/menu" className="back-to-menu">🏠</Link>

        {countdown > 0 && <h1 className="big-text">{countdown}</h1>}

        {showCake && (
          <div id="cake-section">
            <div className="cake-wrap">
              <div className="cake">
                <div className="candle" onClick={handleCandleClick}>
                  {!flameOut && <div className="flame"></div>}
                </div>
              </div>
            </div>
            <p className="hint">Klik lilin buat matiin apinya 🎂</p>
          </div>
        )}

        {showMessage && (
          <div id="message-section">
            <div id="birthday-msg">Happy BirthDay To You!</div>
            <div id="time-since">{timeSinceText}</div>
            <div className="container">
              <div className={`card ${cardsVisible ? "show" : ""}`}>
                <div id="greeting">
                  Happy BirthDay <strong><i>Keysaa</i></strong>..
                  <br /><br />
                  Semoga panjang umur, sehat selalu, dilimpahkan rezeki, dan bahagia selalu di hari ulang tahunmu ini! ✨
                </div>
              </div>
              <div className={`card ${cardsVisible ? "show" : ""}`} style={{ transitionDelay: "0.6s" }}>
                <div id="greeting">
                  Dari Seseorang Pada Tahun 2026:
                  <br /><br />
                  Semoga semua impianmu terkabul, tetap jadi Keysaa yang manis dan baik hati yaa.
                </div>
              </div>
            </div>

            <Link href="/menu">
              <button className="back-btn">⬅ Kembali ke Menu</button>
            </Link>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
