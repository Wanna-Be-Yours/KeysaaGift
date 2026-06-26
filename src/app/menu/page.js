"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function MenuPage() {
  const router = useRouter();

  const logout = () => {
    if (confirm("Yakin mau keluar?")) {
      localStorage.removeItem("isLoggedIn");
      router.push("/");
    }
  };

  const navigateTo = (page, e) => {
    const card = e.currentTarget;

    // Ripple effect
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    
    const x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    card.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 500);

    setTimeout(() => {
      switch (page) {
        case "profile":
          router.push("/menu/profile");
          break;
        case "profile-2":
          router.push("/menu/profile-2");
          break;
        case "music":
          router.push("/menu/music");
          break;
        case "album":
          window.alert("Fitur ini belum beres ya cantik");
          // router.push("/menu/album");
          break;
        case "flowers":
          router.push("/menu/flower");
          break;
        case "words":
          router.push("/menu/affirmation");
          break;
        case "calc":
          window.alert("Fitur ini belum beres ya cantik");
          // router.push("/menu/calc");
          break;
        case "gallery":
          window.alert("Fitur ini belum beres ya cantik");
          // router.push("/menu/gallery");
          break;
        case "games":
          router.push("/menu/games");
          break;
        case "birth":
          const now = new Date();
          const targetDate = new Date("2026-10-28T00:00:00");
          if (now >= targetDate) {
            router.push("/menu/birth");
          } else {
            alert("Sabar yaa, hadiah ini baru bisa dibuka tanggal 28 Oktober 2026! ✨");
          }
          break;
        default:
          alert("Halaman tidak ditemukan!");
      }
    }, 150);
  };

  return (
    <AuthGuard>
      <div className="menu-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .menu-container {
            font-family: 'Nunito', sans-serif;
            background: linear-gradient(135deg, #e8d5f5 0%, #fce4ec 50%, #dbeafe 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1.5rem 0.8rem 2rem;
            position: relative;
            overflow-x: hidden;
          }

          /* Logout button */
          .logout-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            margin-top: 0.8rem;
            background: transparent;
            border: 1.5px solid rgba(239, 68, 68, 0.3);
            padding: 0.4rem 1.2rem;
            border-radius: 999px;
            color: #ef4444;
            font-weight: 700;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Nunito', sans-serif;
          }

          .logout-btn:hover {
            background: #ef4444;
            color: white;
            border-color: #ef4444;
          }

          /* Decorative stars */
          .deco {
            position: absolute;
            pointer-events: none;
            font-size: 1.4rem;
            animation: twinkle 2.5s ease-in-out infinite;
            opacity: 0.7;
          }
          .deco-1 { top: 6%; left: 5%; animation-delay: 0s; }
          .deco-2 { top: 4%; right: 7%; animation-delay: 0.7s; }
          .deco-3 { top: 14%; left: 18%; animation-delay: 1.3s; font-size: 1rem; }
          .deco-4 { top: 10%; right: 22%; animation-delay: 1.8s; font-size: 1rem; }
          .deco-5 { bottom: 8%; left: 8%; animation-delay: 0.4s; }
          .deco-6 { bottom: 12%; right: 5%; animation-delay: 1.1s; }

          @keyframes twinkle {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.25); }
          }

          /* Header */
          .header {
            text-align: center;
            margin-bottom: 2rem;
            z-index: 10;
            position: relative;
          }

          .header h1 {
            font-size: 2.6rem;
            font-weight: 800;
            color: #3d1a6e;
            margin-bottom: 0.6rem;
            letter-spacing: -0.5px;
          }

          /* Main card wrapper */
          .page-wrapper {
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(16px);
            border-radius: 2rem;
            border: 1.5px solid rgba(255,255,255,0.8);
            padding: 1.8rem;
            max-width: 560px;
            width: 100%;
            z-index: 10;
            position: relative;
            box-shadow: 0 8px 40px rgba(160, 100, 220, 0.15);
          }

          /* Profile row */
          .profile-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          /* Grid rows */
          .grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 1rem;
          }

          /* Card base */
          .card {
            background: #fff;
            border-radius: 1.4rem;
            padding: 1.2rem 0.8rem;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 3px 14px rgba(0,0,0,0.07);
            border: 1.5px solid rgba(255,255,255,0.9);
            position: relative;
            overflow: hidden;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
            user-select: none;
          }

          .card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 28px rgba(130, 60, 200, 0.18);
          }

          .card:active {
            transform: scale(0.95);
            box-shadow: 0 2px 8px rgba(130, 60, 200, 0.12);
            background: #f9f0ff;
          }

          .card.profile-card {
            padding: 1.5rem 1rem;
          }

          .card-icon {
            font-size: 2.6rem;
            margin-bottom: 0.6rem;
            display: block;
            line-height: 1;
          }

          .card.profile-card .card-icon {
            font-size: 3rem;
          }

          .card-title {
            font-size: 1rem;
            font-weight: 800;
            color: #2d1b4e;
            margin-bottom: 0.3rem;
            line-height: 1.2;
          }

          .card.profile-card .card-title {
            font-size: 1.15rem;
          }

          .card-desc {
            font-size: 0.75rem;
            color: #7a6b8a;
            font-weight: 600;
            line-height: 1.4;
          }

          /* Badges */
          .badge {
            position: absolute;
            top: 0.55rem;
            right: 0.55rem;
            font-size: 0.6rem;
            font-weight: 800;
            padding: 0.2rem 0.5rem;
            border-radius: 999px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .badge-new {
            background: #d946ef;
            color: #fff;
          }

          .badge-special {
            background: #f59e0b;
            color: #fff;
          }

          .badge-heart {
            position: absolute;
            top: 0.55rem;
            right: 0.55rem;
            font-size: 1rem;
          }

          /* Footer strip */
          .footer-strip {
            margin-top: 1rem;
            background: linear-gradient(90deg, #f3e8ff, #fce7f3, #dbeafe);
            border-radius: 999px;
            padding: 0.6rem 1rem;
            text-align: center;
            font-size: 0.85rem;
            font-weight: 700;
            color: #7c3aed;
          }

          /* Ripple effect */
          .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(124, 58, 237, 0.18);
            transform: scale(0);
            animation: ripple-anim 0.45s ease-out forwards;
            pointer-events: none;
          }

          @keyframes ripple-anim {
            to { transform: scale(4); opacity: 0; }
          }

          /* Responsive */
          @media (max-width: 480px) {
            .header { margin-bottom: 1.2rem; }
            .header h1 { font-size: 1.75rem; }
            .page-wrapper { padding: 0.9rem; border-radius: 1.5rem; }
            .profile-row { gap: 0.7rem; margin-bottom: 0.7rem; }
            .grid-3 { gap: 0.7rem; margin-bottom: 0.7rem; }
            .card { border-radius: 1.1rem; padding: 0.9rem 0.5rem; }
            .card.profile-card { padding: 1.1rem 0.7rem; }
            .card-icon { font-size: 1.8rem; margin-bottom: 0.4rem; }
            .card.profile-card .card-icon { font-size: 2.2rem; }
            .card-title { font-size: 0.82rem; }
            .card-desc { font-size: 0.68rem; }
            .badge { font-size: 0.55rem; padding: 0.15rem 0.4rem; }
            .footer-strip { font-size: 0.78rem; padding: 0.5rem 0.8rem; }
            .deco { display: none; }
          }

          @media (max-width: 360px) {
            .grid-3 { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
            .card-icon { font-size: 1.6rem; }
            .card-title { font-size: 0.75rem; }
            .card-desc { display: none; }
          }
        ` }} />

        {/* Decorative elements */}
        <span className="deco deco-1">✨</span>
        <span className="deco deco-2">⭐</span>
        <span className="deco deco-3">💫</span>
        <span className="deco deco-4">🌟</span>
        <span className="deco deco-5">✨</span>
        <span className="deco deco-6">💫</span>

        {/* Header */}
        <div className="header">
          <h1>Pilih Menunya Yaa</h1>
        </div>

        {/* Page wrapper card */}
        <div className="page-wrapper">
          {/* Row 1: Profile & Profile-2 */}
          <div className="profile-row">
            <div className="card profile-card" onClick={(e) => navigateTo("profile", e)}>
              <span className="badge-heart">💗</span>
              <span className="card-icon">👩🏻</span>
              <div className="card-title">Keysaa</div>
              <div className="card-desc">A Sweetiest Person</div>
            </div>
            <div className="card profile-card" onClick={(e) => navigateTo("profile-2", e)}>
              <span className="card-icon">👤</span>
              <div className="card-title">Profile</div>
              <div className="card-desc">Lihat informasi penulis</div>
            </div>
          </div>

          {/* Row 2: Music, Album, Flowers */}
          <div className="grid-3">
            <div className="card" onClick={(e) => navigateTo("music", e)}>
              <span className="card-icon">🎵</span>
              <div className="card-title">Music</div>
              <div className="card-desc">Dengarkan album musik favorit</div>
            </div>
            <div className="card" onClick={(e) => navigateTo("album", e)}>
              <span className="card-icon">📚</span>
              <div className="card-title">Album</div>
              <div className="card-desc">Album tentang seseorang spesial</div>
            </div>
            <div className="card" onClick={(e) => navigateTo("flowers", e)}>
              <span className="card-icon">🌸</span>
              <div className="card-title">Flowers</div>
              <div className="card-desc">Saat lelah, buka bunga ini</div>
            </div>
          </div>

          {/* Row 3: Affirmation, Lovecalc, Birthday Wish */}
          <div className="grid-3">
            <div className="card" onClick={(e) => navigateTo("words", e)}>
              <span className="card-icon">💖</span>
              <div className="card-title">Affirmation</div>
              <div className="card-desc">Buat harimu berwarna dengan kata-kata positif</div>
            </div>
            <div className="card" onClick={(e) => navigateTo("calc", e)}>
              <span className="card-icon">🧮</span>
              <div className="card-title">Lovecalc</div>
              <div className="card-desc">Kalkulator yang berisi rahasia</div>
            </div>
            <div className="card" onClick={(e) => navigateTo("birth", e)}>
              <span className="badge badge-special">Spesial</span>
              <span className="card-icon">🎁</span>
              <div className="card-title">Birthday Wish</div>
              <div className="card-desc">Ungkapan spesial untuk seseorang</div>
            </div>
          </div>

          {/* Row 4: Gallery, Games */}
          <div className="grid-3">
            <div className="card" onClick={(e) => navigateTo("gallery", e)}>
              <span className="card-icon">🖼️</span>
              <div className="card-title">Gallery</div>
              <div className="card-desc">Koleksi foto-foto kita</div>
            </div>
            <div className="card" onClick={(e) => navigateTo("games", e)}>
              <span className="card-icon">🎮</span>
              <div className="card-title">Mini Games</div>
              <div className="card-desc">Main bareng, yuk!</div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="footer-strip">⭐ Wish Your Day Happier ⭐</div>

          {/* Logout button */}
          <button className="logout-btn" onClick={logout}>
            <span>🚪</span> Keluar
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
