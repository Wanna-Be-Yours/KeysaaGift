"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { showModal } from "@/components/Modal";

const VALID_USERNAME = "Keysaa";
const VALID_PASSWORD = "special";

const MASSAGES = [
  "Aku punya something special for u 💕",
  "Semoga suka ya, ini dari aku ✨",
  "Setiap halaman ini khusus dibuat, buat Keysaa 🌸",
  "You are the best thing that ever happened to me 💝",
];

export default function LandingPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [messageIdx, setMessageIdx] = useState(0);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setMessageIdx(Math.floor(Math.random() * MASSAGES.length));
    const EMOJIS = ["💕", "🌸", "💗", "✨", "🌺", "💝"];
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 6 + 5}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 0.8 + 0.8}rem`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, []);

  useEffect(() => {
    // Cek kalau udah login, langsung ke menu
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push("/menu");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      await showModal({
        title: "Lengkapi ya 💕",
        message: "Isi username dan password-nya dulu, sayang~",
        type: "heart",
      });
      return;
    }

    setLoading(true);

    // Simulate loading biar dramatis
    setTimeout(async () => {
      if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");
        await showModal({
          title: "Selamat Datang, Keysaa! 🎉",
          message: "Semoga kamu suka hadiahnya ya~ 💕\n khusus buat Keysaa.",
          type: "success",
          confirmText: "Mulai Buka! 💝",
        });
        router.push("/menu");
      } else {
        setLoading(false);
        await showModal({
          title: "Hmm, Salah ya? 🤔",
          message: "Username atau password-nya belum bener nih.\nCoba lagi ya, atau tanya aku langsungg~",
          type: "warning",
          confirmText: "Coba Lagi",
        });
      }
    }, 1200);
  };

  const handlePasswordHelp = async () => {
    await showModal({
      title: "Lupa Password? 💕",
      message: "Chat aku ya buat dapetin password-nya~\nNanti aku kasih tau!",
      type: "heart",
      confirmText: "Chat Sekarang 💬",
      cancelText: "Nanti Saja",
      onConfirm: () => {
        window.open("https://wa.me/6282114073679?text=Hai, aku butuh password-nya ya~", "_blank");
      },
    });
  };

  return (
    <section className="landing-section">
      <style dangerouslySetInnerHTML={{ __html: `
        .landing-section {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 40%, #e8eaf6 100%);
          background-image: url('/Assets/PinkBackground1.png');
          background-position: center;
          background-size: cover;
          background-attachment: fixed;
          font-family: 'Nunito', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Floating hearts background */
        .floating-hearts {
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .floating-heart {
          position: absolute;
          font-size: 1.2rem;
          animation: floatUp linear infinite;
          opacity: 0;
        }
        @keyframes floatUp {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }

        /* Main card */
        .landing-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          border: 1.5px solid rgba(255,255,255,0.85);
          padding: 2.5rem 2rem;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(89, 13, 34, 0.12);
          position: relative;
          z-index: 10;
          animation: cardFadeIn 0.8s ease;
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .landing-heart {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 0.8rem;
          animation: heartPulse 1.5s ease-in-out infinite;
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .landing-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #590d22;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .landing-message {
          font-size: 0.95rem;
          color: #b86b8a;
          font-weight: 600;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .landing-btn {
          display: inline-block;
          background: linear-gradient(135deg, #ff758f, #ff4d6d);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 0.85rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 8px 25px rgba(255, 117, 143, 0.35);
          letter-spacing: 0.5px;
        }
        .landing-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255117, 143, 0.45);
        }
        .landing-btn:active { transform: scale(0.97); }

        /* Login form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: formSlideIn 0.4s ease;
        }
        @keyframes formSlideIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .input-group {
          position: relative;
        }
        .input-group input {
          width: 100%;
          padding: 0.9rem 1rem;
          border: 2px solid rgba(255, 117, 143, 0.25);
          border-radius: 1rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: 'Nunito', sans-serif;
          background: rgba(255,255,255,0.85);
          color: #590d22;
          font-weight: 600;
        }
        .input-group input::placeholder {
          color: #c4a0b0;
          font-weight: 500;
        }
        .input-group input:focus {
          border-color: #ff758f;
          box-shadow: 0 0 0 3px rgba(255, 117, 143, 0.15);
        }

        .password-help {
          font-size: 0.8rem;
          color: #b86b8a;
          text-align: right;
          margin-top: 0.3rem;
        }
        .password-help a {
          color: #ff758f;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
        }
        .password-help a:hover { text-decoration: underline; }

        .login-btn-submit {
          background: linear-gradient(135deg, #ff758f, #ff4d6d);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 0.85rem 2rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 8px 25px rgba(255, 117, 143, 0.35);
          width: 100%;
          margin-top: 0.3rem;
        }
        .login-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(255, 117, 143, 0.45);
        }
        .login-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .back-btn {
          background: none;
          border: none;
          color: #b86b8a;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          margin-top: 0.5rem;
        }
        .back-btn:hover { color: #ff758f; }

        .landing-footer {
          position: fixed;
          bottom: 1.5rem;
          left: 0; right: 0;
          text-align: center;
          font-size: 0.75rem;
          color: rgba(184, 107, 138, 0.7);
          font-weight: 600;
          letter-spacing: 1px;
          z-index: 10;
        }

        @media (max-width: 480px) {
          .landing-card { padding: 2rem 1.5rem; border-radius: 1.5rem; }
          .landing-title { font-size: 1.5rem; }
          .landing-heart { font-size: 2.8rem; }
        }
      ` }} />

      {/* Floating hearts */}
      <div className="floating-hearts">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: h.left,
              animationDuration: h.duration,
              animationDelay: h.delay,
              fontSize: h.size,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div className="landing-card">
        {!showLogin ? (
          <>
            <span className="landing-heart">💝</span>
            <h1 className="landing-title">KeysaaGift</h1>
            <p className="landing-message">{MASSAGES[messageIdx]}</p>
            <button className="landing-btn" onClick={() => setShowLogin(true)}>
              Buka Hadiah 🎁
            </button>
          </>
        ) : (
          <>
            <span className="landing-heart">🔐</span>
            <h1 className="landing-title">Masuk Dulu Ya</h1>
            <p className="landing-message">Isi username & password buka hadiahnya~</p>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="password-help">
                <a onClick={handlePasswordHelp}>Lupa password?</a>
              </div>
              <button type="submit" className="login-btn-submit" disabled={loading}>
                {loading ? "Membuka... 💕" : "Buka Hadiah 🎁"}
              </button>
              <button type="button" className="back-btn" onClick={() => setShowLogin(false)}>
                ← Kembali
              </button>
            </form>
          </>
        )}
      </div>

      <div className="landing-footer">Made with ♥ for Keysaa</div>
    </section>
  );
}
