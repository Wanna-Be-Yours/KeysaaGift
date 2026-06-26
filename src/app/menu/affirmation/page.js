"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const affirmations = [
  "Bestie, you’re literally the sunshine. Fr. ☀️",
  "Ur smile? Instant serotonin boost. 💖",
  "Main character energy only. No side roles here. 💅",
  "You’re not just doing great, you’re SLAYING it 🔥",
  "If no one said it today: I’m proud of you 🫶",
  "You’re the kind of person people feel safe with 💌",
  "Keep shining, even if it’s cloudy today ☁️",
  "You’re THAT person. The comfort one. 🌷",
  "Lowkey? You’re everyone’s favorite vibe ✨",
  "You’re doing better than u think, trust me 💫"
];

const reasons = [
  "You make literally everything 10x funnier 😂",
  "You’ve got that ‘safe place’ energy 🌙",
  "The way you care?? unmatched. 💕",
  "You’re proof that good people still exist 🦋",
  "You got that soft aura I can’t get over 💭",
  "You make ‘ordinary moments’ hit different 🫶",
  "You’re the chaos I’d choose again 💋",
  "You listen even when words fail me 🎧",
  "You just *get it*, no overexplaining needed 😌",
  "You make comfort feel like a person 🩵"
];

const surpriseMessages = [
  "Plot twist: you’re the main character all along 🌟",
  "You? My 13th reason to keep smiling 😚",
  "You’re like a playlist I never skip 🎧",
  "Be honest, ur just effortlessly loveable 💘"
];

export default function AffirmationPage() {
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState({ text: "Loading ur daily dose of serotonin...", icon: "✨" });
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
    showMessage("affirmation");
  }, []);

  const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const showMessage = (type) => {
    setFade(true);

    setTimeout(() => {
      let text = "";
      let icon = "💬";

      if (type === "affirmation") {
        text = getRandom(affirmations);
        icon = "✨";
      } else if (type === "reason") {
        text = getRandom(reasons);
        icon = "❤️";
      } else {
        text = getRandom([...affirmations, ...reasons]);
        icon = "💭";
      }

      setMessage({ text, icon });
      setFade(false);
    }, 250);
  };

  const handleDoubleClick = () => {
    setFade(true);
    setTimeout(() => {
      const msg = getRandom(surpriseMessages);
      setMessage({ text: msg, icon: "🎉" });
      setFade(false);
    }, 250);
  };

  return (
    <AuthGuard>
      <div className="affirmation-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .affirmation-container {
            font-family: 'Poppins', 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #fff0f5 0%, #f5e0ff 50%, #e0e7ff 100%);
            min-height: 100vh;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .container {
            position: relative;
            max-width: 420px;
            width: 100%;
            text-align: center;
            background: white;
            border-radius: 30px;
            padding: 40px 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid #fce7f3;
          }

          .header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
            position: relative;
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

          h1 {
            font-size: 22px;
            color: #333;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            font-weight: 700;
          }

          .date {
            font-size: 14px;
            color: #888;
            margin-bottom: 30px;
          }

          .message {
            min-height: 160px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s ease;
            cursor: double-click;
            user-select: none;
          }

          .message.fade {
            opacity: 0;
            transform: scale(0.96);
          }

          .icon {
            font-size: 34px;
          }

          .text {
            font-size: 18px;
            color: #444;
            font-weight: 500;
            line-height: 1.5;
          }

          .buttons {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 25px;
          }

          .btn {
            border: none;
            border-radius: 16px;
            padding: 15px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            color: white;
            transition: all 0.2s ease;
          }

          .btn:hover {
            transform: translateY(-2px);
          }

          .btn-affirmation {
            background: linear-gradient(135deg, #f472b6, #ec4899);
          }

          .btn-reason {
            background: linear-gradient(135deg, #f87171, #f472b6);
          }

          .btn-random {
            background: linear-gradient(135deg, #a78bfa, #6366f1);
          }

          .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #999;
          }

          .footer span {
            color: #ec4899;
          }
        ` }} />

        <div className="container">
          <Link href="/menu" className="back-to-menu">🏠</Link>
          <header>
            <h1>💌 For You 💌</h1>
          </header>
          <div className="date">{currentDate}</div>

          <div
            className={`message ${fade ? "fade" : ""}`}
            onDoubleClick={handleDoubleClick}
          >
            <div className="icon">{message.icon}</div>
            <p className="text">{message.text}</p>
          </div>

          <div className="buttons">
            <button className="btn btn-affirmation" onClick={() => showMessage("affirmation")}>
              ✨ Daily Boost
            </button>
            <button className="btn btn-reason" onClick={() => showMessage("reason")}>
              ❤️ Why U’re Special
            </button>
            <button className="btn btn-random" onClick={() => showMessage("random")}>
              💭 Random Vibe
            </button>
          </div>

          <div className="footer">
            <p>Made with <span>♥</span> — stay delulu, it’s free 😌</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
