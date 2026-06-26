"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const TOTAL_PAGES = 10;

export default function AlbumPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: "", caption: "" });
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Falling Petals animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev.slice(-20), // limit total petals
        {
          id: Math.random(),
          char: Math.random() > 0.5 ? "🌸" : "🌺",
          left: Math.random() * 100 + "vw",
          duration: Math.random() * 3 + 4 + "s",
          opacity: Math.random() * 0.4 + 0.3,
        }
      ]);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const changePage = (delta) => {
    if (isDesktop) {
      const currentSpread = Math.ceil(currentPage / 2);
      const nextSpread = currentSpread + delta;
      if (nextSpread >= 0 && nextSpread <= 5) {
        setCurrentPage(nextSpread === 0 ? 0 : (nextSpread - 1) * 2 + 1);
      }
    } else {
      const next = currentPage + delta;
      if (next >= 0 && next <= TOTAL_PAGES) {
        setCurrentPage(next);
      }
    }
  };

  const getPageClass = (pageNum) => {
    let classes = ["page"];
    if (isDesktop) {
      const currentSpread = Math.ceil(currentPage / 2);
      if (currentSpread === 0) {
        if (pageNum === 0) classes.push("cover-page active");
      } else {
        const leftPageNum = (currentSpread - 1) * 2 + 1;
        const rightPageNum = leftPageNum + 1;

        if (pageNum < leftPageNum) {
          classes.push("flipped");
        } else if (pageNum === leftPageNum) {
          classes.push("left-page active");
        } else if (pageNum === rightPageNum) {
          if (pageNum <= TOTAL_PAGES) {
            classes.push("right-page active");
          }
        }
      }
      if (pageNum === 10 && Math.ceil(currentPage / 2) === 5) {
        classes.push("active left-page");
      }
    } else {
      if (pageNum < currentPage) {
        classes.push("flipped");
      } else if (pageNum === currentPage) {
        classes.push("active");
      }
    }
    return classes.join(" ");
  };

  const openLightbox = (src, caption) => {
    setLightbox({ open: true, src, caption });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "", caption: "" });
  };

  const currentSpreadIndex = isDesktop ? Math.ceil(currentPage / 2) : currentPage;
  const totalSteps = isDesktop ? 6 : 11;

  return (
    <AuthGuard>
      <div className="album-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .album-container {
            --pink-light: #fff5f7;
            --pink-soft: #ffe3eb;
            --pink-mid:  #ffb3c6;
            --pink-main: #ff758f;
            --pink-deep: #ff4d6d;
            --pink-dark: #590d22;
            --cream:     #fffcf7;
            --gold:      #dfb15b;
            --shadow-sm: rgba(89, 13, 34, 0.03);
            --shadow-md: rgba(89, 13, 34, 0.08);
            --shadow-lg: rgba(89, 13, 34, 0.14);
            --transition-smooth: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

            background: var(--pink-light);
            min-height: 100vh;
            font-family: 'Lato', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-x: hidden;
            color: var(--pink-dark);
            background-image:
              radial-gradient(circle at 5% 10%, rgba(255,182,193,0.2) 0%, transparent 40%),
              radial-gradient(circle at 95% 85%, rgba(255,117,143,0.1) 0%, transparent 55%),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0%, transparent 100%);
            width: 100%;
          }

          /* Header & Footer */
          header {
            width: 100%;
            text-align: center;
            padding: clamp(1.2rem, 4vh, 2rem) 1.5rem 0.8rem;
            z-index: 5;
          }
          header h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.8rem, 5vw, 2.6rem);
            color: var(--pink-dark);
            font-weight: 700;
            margin-bottom: 0.2rem;
          }
          header p {
            font-size: 0.75rem;
            color: var(--pink-main);
            font-weight: 400;
            letter-spacing: 4px;
            text-transform: uppercase;
          }

          footer {
            width: 100%;
            text-align: center;
            padding: 1.2rem 1rem;
            color: var(--pink-main);
            font-size: 0.72rem;
            letter-spacing: 2px;
            font-weight: 300;
            margin-top: auto;
            z-index: 5;
          }

          /* 3D BOOK COVER */
          .album-wrapper {
            width: 100%;
            max-width: 1200px;
            padding: 0 1rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            z-index: 5;
          }

          .book-container {
            position: relative;
            width: 100%;
            max-width: 480px;
            height: 560px;
            margin: 0 auto 1.2rem;
            background: #4a0e17;
            padding: 8px;
            border-radius: 12px;
            box-shadow: 
              0 20px 45px rgba(89, 13, 34, 0.22),
              0 8px 16px rgba(0, 0, 0, 0.15);
            border: 1px solid #380a11;
            transition: var(--transition-smooth);
            perspective: 2000px;
            overflow: hidden;
          }

          @media (max-height: 700px) {
            .book-container { height: 480px; }
          }

          @media (min-width: 992px) {
            .book-container {
              max-width: 1080px;
              height: 650px;
              padding: 12px 14px;
              border-radius: 16px;
            }
          }

          .album-book {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
          }

          .page {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--cream);
            background-image: linear-gradient(to right, #fffdfa 0%, #fdfbf7 95%, #f7f3eb 100%);
            box-shadow: inset 0 0 15px rgba(0,0,0,0.02);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 1;
            opacity: 0;
            pointer-events: none;
            backface-visibility: hidden;
            transform-origin: left center;
            transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, z-index 0s linear 0.4s;
          }

          .page.active {
            opacity: 1;
            z-index: 5;
            pointer-events: auto;
            transform: rotateY(0deg);
          }

          .page.flipped {
            transform: rotateY(-180deg);
            opacity: 1;
            z-index: 1;
            pointer-events: none;
          }

          @media (min-width: 992px) {
            .page {
              width: 50%;
              left: 50%;
              transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, z-index 0s linear 0s;
            }
            
            .page.left-page {
              left: 0;
              opacity: 1;
              z-index: 5;
              pointer-events: auto;
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              background: linear-gradient(to right, #fffdfa 0%, #fdfbf7 90%, #eae2d5 100%);
              box-shadow: inset 15px 0 25px rgba(89, 13, 34, 0.015);
              transform-origin: right center;
              transform: rotateY(0deg);
            }
            
            .page.right-page {
              left: 50%;
              opacity: 1;
              z-index: 5;
              pointer-events: auto;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              background: linear-gradient(to left, #fffdfa 0%, #fdfbf7 90%, #eae2d5 100%);
              box-shadow: inset -15px 0 25px rgba(89, 13, 34, 0.015);
              transform-origin: left center;
              transform: rotateY(0deg);
            }
            
            .page.cover-page {
              left: 50%;
              width: 50%;
              opacity: 1;
              z-index: 10;
              pointer-events: auto;
              border-radius: 0 8px 8px 0;
              box-shadow: 5px 10px 25px rgba(89, 13, 34, 0.15);
              transform-origin: left center;
              transform: rotateY(0deg);
            }

            .page.flipped {
              transform: rotateY(-180deg);
              left: 0;
              opacity: 0;
              z-index: 0;
            }
          }

          .page-inner {
            width: 100%;
            height: 100%;
            padding: clamp(0.8rem, 3.5vw, 1.4rem);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
          }

          .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: clamp(0.5rem, 2vw, 0.8rem);
            border-bottom: 1px dashed var(--pink-soft);
            padding-bottom: 0.4rem;
            flex-shrink: 0;
          }
          
          .page-title {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            font-size: clamp(0.9rem, 2vw, 1.1rem);
            color: var(--pink-dark);
          }
          
          .page-theme {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-weight: 600;
            font-size: clamp(0.8rem, 1.8vw, 0.95rem);
            color: var(--pink-main);
          }

          /* BENTO SCRAPBOOK GRID */
          .photo-grid {
            flex-grow: 1;
            display: grid;
            gap: 0.8rem;
            overflow: hidden;
            height: 100%;
          }

          .bento-layout-a .photo-grid { grid-template-columns: 1.15fr 1fr; grid-template-rows: 1fr 1fr; }
          .bento-layout-a .photo-card:nth-child(1) { grid-row: span 2; }

          .bento-layout-b .photo-grid { grid-template-columns: 1fr 1.15fr; grid-template-rows: 1fr 1fr; }
          .bento-layout-b .photo-card:nth-child(3) { grid-row: span 2; }

          .bento-layout-c .photo-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 1.15fr 1fr; }
          .bento-layout-c .photo-card:nth-child(1) { grid-column: span 2; }

          .bento-layout-d .photo-grid { grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1.15fr; }
          .bento-layout-d .photo-card:nth-child(3) { grid-column: span 2; }

          .photo-card {
            background: white;
            padding: 8px 8px 10px;
            box-shadow: 0 4px 10px rgba(89, 13, 34, 0.04);
            border-radius: 2px;
            cursor: pointer;
            position: relative;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(89, 13, 34, 0.02);
            transition: var(--transition-smooth);
            height: 100%;
            width: 100%;
          }
          
          .photo-card:nth-child(odd) { transform: rotate(-1.2deg); }
          .photo-card:nth-child(even) { transform: rotate(1deg); }

          .photo-card:hover {
            transform: translateY(-6px) scale(1.03) rotate(0deg) !important;
            box-shadow: 0 12px 25px rgba(89, 13, 34, 0.12);
            z-index: 10;
          }

          .photo-frame {
            width: 100%;
            height: 0;
            flex-grow: 1;
            background: #fafafa;
            overflow: hidden;
            border-radius: 2px;
            position: relative;
            border: 1px solid rgba(0,0,0,0.03);
          }

          .photo-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 0.5s ease;
          }
          
          .photo-card:hover img { transform: scale(1.04); }

          .washi-tape {
            position: absolute;
            top: -8px;
            left: 50%;
            transform: translateX(-50%) rotate(-2deg);
            width: 55px;
            height: 15px;
            background: rgba(255, 182, 193, 0.4);
            backdrop-filter: blur(1px);
            border-left: 1px dashed rgba(255,255,255,0.4);
            border-right: 1px dashed rgba(255,255,255,0.4);
            box-shadow: 0 1px 2px rgba(0,0,0,0.03);
            z-index: 5;
          }

          /* COVER & BACK COVER */
          .page-cover {
            background: linear-gradient(135deg, #c9184a 0%, #ff4d6d 50%, #ff758f 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            box-shadow: inset 0 0 40px rgba(0,0,0,0.25);
          }
          
          .cover-border {
            border: 3px double rgba(255, 215, 0, 0.4);
            padding: clamp(2rem, 5vw, 3.5rem) clamp(1.2rem, 4vw, 2.2rem);
            width: 85%;
            max-width: 360px;
            backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            text-align: center;
          }
          
          .cover-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2rem, 5vw, 2.8rem);
            font-style: italic;
            font-weight: 700;
            color: white;
            text-shadow: 0 3px 6px rgba(0,0,0,0.15);
            margin-bottom: 0.5rem;
          }
          
          .cover-sub {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: 600;
          }

          /* LOVE LETTER PAGE */
          .letter-page { height: 100%; }
          .letter-container {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            height: 100%;
          }
          .letter-paper {
            background: #fdfaf6;
            background-image: linear-gradient(#e8dfd8 1px, transparent 1px);
            background-size: 100% 24px;
            border: 1px solid #ebdcd0;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            padding: clamp(1rem, 3vw, 1.4rem);
            display: flex;
            flex-direction: column;
            position: relative;
            line-height: 24px;
          }
          .letter-salutation {
            font-family: 'Caveat', cursive;
            font-size: clamp(1.3rem, 3vw, 1.5rem);
            font-weight: 700;
            color: var(--pink-dark);
            margin-bottom: 0.2rem;
          }
          .letter-body {
            font-family: 'Caveat', cursive;
            font-size: clamp(1.15rem, 2.5vw, 1.3rem);
            color: #4a3e3d;
            flex-grow: 1;
            overflow-y: auto;
            line-height: 25px;
          }
          .wax-seal {
            width: 44px;
            height: 44px;
            background: var(--pink-deep);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: bold;
            box-shadow: 
              0 4px 8px rgba(0,0,0,0.15),
              inset -2px -2px 4px rgba(0,0,0,0.3);
            transform: rotate(-12deg);
            margin: 0.3rem auto 0;
            cursor: pointer;
          }

          /* CLOSING CARD */
          .closing-page {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 1.5rem !important;
          }
          .closing-card {
            background: white;
            border: 1px solid rgba(89, 13, 34, 0.04);
            padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem);
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(89, 13, 34, 0.05);
            text-align: center;
            position: relative;
            width: 90%;
            max-width: 320px;
            transform: rotate(1deg);
          }
          .closing-heart {
            font-size: clamp(3rem, 6vw, 4rem);
            margin-bottom: 0.8rem;
            animation: heartbeat 1.5s infinite ease-in-out;
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          .closing-sub {
            font-family: 'Caveat', cursive;
            font-size: clamp(1.2rem, 3vw, 1.45rem);
            color: var(--pink-main);
          }

          /* NAVIGATION & CONTROLS */
          .page-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-bottom: 1rem;
            z-index: 5;
          }
          .dot {
            width: 7px; height: 7px;
            border-radius: 50%;
            background: var(--pink-soft);
            cursor: pointer;
            transition: var(--transition-smooth);
          }
          .dot.active {
            background: var(--pink-deep);
            transform: scale(1.3);
          }
          .dot.cover-dot { background: #dfb15b; }

          .nav-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1.5rem;
            margin-top: 0.4rem;
            z-index: 5;
          }
          .nav-btn {
            background: white;
            border: 1px solid var(--pink-soft);
            color: var(--pink-dark);
            padding: 0.5rem 1.2rem;
            border-radius: 30px;
            font-family: 'Playfair Display', serif;
            font-size: 0.9rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 10px var(--shadow-sm);
            transition: var(--transition-smooth);
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .nav-btn:hover:not(:disabled) {
            background: var(--pink-deep);
            color: white;
            border-color: var(--pink-deep);
          }
          .nav-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
          .page-count {
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--pink-main);
            min-width: 100px;
            text-align: center;
          }

          .sticker {
            position: absolute;
            font-size: clamp(1.2rem, 3vw, 1.8rem);
            z-index: 1;
            pointer-events: none;
            animation: floatSticker 4s ease-in-out infinite;
          }
          @keyframes floatSticker {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-6px) rotate(5deg); }
          }

          /* LIGHTBOX ZOOM */
          .lightbox {
            position: fixed; inset: 0;
            background: rgba(56, 10, 17, 0.65);
            backdrop-filter: blur(12px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            transition: opacity 0.4s ease;
          }
          .lightbox-content {
            position: relative;
            max-width: 480px;
            width: 100%;
            background: white;
            padding: 10px 10px 55px;
            border-radius: 6px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          }
          .lightbox img {
            width: 100%;
            height: auto;
            max-height: 62vh;
            object-fit: contain;
            border-radius: 4px;
          }
          .lightbox-caption {
            position: absolute;
            bottom: 18px; left: 0; right: 0;
            text-align: center;
            font-family: 'Caveat', cursive;
            font-size: 1.5rem;
            color: var(--pink-dark);
            font-weight: 700;
          }
          .close-btn {
            position: absolute;
            top: -45px; right: 0;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white; 
            font-size: 1.3rem;
            width: 36px; height: 36px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Petal falling anim */
          .petal {
            position: fixed;
            top: -20px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 1;
            animation: fall linear forwards;
          }
          @keyframes fall {
            to { transform: translateY(110vh) rotate(360deg); opacity: 0; }
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
          }
          .back-to-menu:hover {
            transform: scale(1.1) rotate(-10deg);
          }
        ` }} />

        {/* Floating Back to Menu Button */}
        <Link href="/menu" className="back-to-menu" title="Kembali ke Menu Utama">🏠</Link>

        {/* Petals falling effect */}
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDuration: petal.duration,
              opacity: petal.opacity
            }}
          >
            {petal.char}
          </div>
        ))}

        <header>
          <h1>My Sweet Album</h1>
          <p>A collection of My Favorite Person</p>
        </header>

        <div className="album-wrapper">
          {/* Page Dots Indicator */}
          <div className="page-indicator">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === 0 ? "cover-dot" : ""} ${idx === currentSpreadIndex ? "active" : ""}`}
                onClick={() => {
                  if (isDesktop) {
                    setCurrentPage(idx === 0 ? 0 : (idx - 1) * 2 + 1);
                  } else {
                    setCurrentPage(idx);
                  }
                }}
              />
            ))}
          </div>

          {/* Book frame */}
          <div className="book-container">
            <div className="album-book">
              {/* PAGE 0: Cover */}
              <div className={getPageClass(0)}>
                <div className="page-cover" style={{ height: "100%" }}>
                  <div className="cover-border">
                    <div className="cover-sub">Digital Scrapbook</div>
                    <div className="cover-title">My Sweetheart</div>
                    <div style={{ width: "50px", height: "2px", background: "rgba(255,215,0,0.4)", margin: "1.2rem auto", borderRadius: "1px" }}></div>
                    <div className="cover-sub">A Cutest Person</div>
                  </div>
                  <div className="sticker" style={{ top: "12%", left: "10%" }}>🌸</div>
                  <div className="sticker" style={{ bottom: "12%", right: "12%" }}>💖</div>
                </div>
              </div>

              {/* PAGE 1 */}
              <div className={`${getPageClass(1)} bento-layout-a`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 1</span>
                    <em className="page-theme">Cutest Moments</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/1.webp", "Cutest #1")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/1.webp" alt="Album 1" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/2.webp", "Cutest #2")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/2.webp" alt="Album 2" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/3.webp", "Cutest #3")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/3.webp" alt="Album 3" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 2 */}
              <div className={`${getPageClass(2)} bento-layout-b`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 2</span>
                    <em className="page-theme">Pure Happiness</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/4.webp", "Golden Hour")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/4.webp" alt="Album 4" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/5.webp", "Sunshine")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/5.webp" alt="Album 5" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/6.webp", "Starry Night")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/6.webp" alt="Album 6" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 3 */}
              <div className={`${getPageClass(3)} bento-layout-c`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 3</span>
                    <em className="page-theme">Sweet Magic</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/7.webp", "Pure Nature")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/7.webp" alt="Album 7" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/8.webp", "Sea Breeze")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/8.webp" alt="Album 8" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/9.webp", "Blue Waves")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/9.webp" alt="Album 9" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 4 */}
              <div className={`${getPageClass(4)} bento-layout-d`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 4</span>
                    <em className="page-theme">Prettiest Smile</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/10.webp", "Adventure")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/10.webp" alt="Album 10" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/11.webp", "Summer Vibes")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/11.webp" alt="Album 11" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/12.webp", "Tropical Paradise")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/12.webp" alt="Album 12" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 5 */}
              <div className={`${getPageClass(5)} bento-layout-a`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 5</span>
                    <em className="page-theme">Special Day</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/13.webp", "Special Day")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/13.webp" alt="Album 13" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/14.webp", "Celebration")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/14.webp" alt="Album 14" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/16.webp", "Precious Gift")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/16.webp" alt="Album 16" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 6 */}
              <div className={`${getPageClass(6)} bento-layout-b`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 6</span>
                    <em className="page-theme">Pure Joy</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/17.webp", "Pure Joy")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/17.webp" alt="Album 17" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/18.webp", "Together")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/18.webp" alt="Album 18" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/19.webp", "Always You")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/19.webp" alt="Album 19" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 7 */}
              <div className={`${getPageClass(7)} bento-layout-c`}>
                <div className="page-inner">
                  <div className="page-header">
                    <span className="page-title">✦ Halaman 7</span>
                    <em className="page-theme">My Whole Universe</em>
                  </div>
                  <div className="photo-grid">
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/20.webp", "Beautiful Smile")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/20.webp" alt="Album 20" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/21.webp", "Eternal Love")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/21.webp" alt="Album 21" /></div>
                    </div>
                    <div className="photo-card" onClick={() => openLightbox("/Menu/FavAlbum-main/images/22.webp", "Fond Album")}>
                      <div className="washi-tape"></div>
                      <div className="photo-frame"><img src="/Menu/FavAlbum-main/images/22.webp" alt="Album 22" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 8: Ruled Stationery Letter */}
              <div className={getPageClass(8)}>
                <div className="page-inner letter-page">
                  <div className="page-header">
                    <span className="page-title">✦ Love Note</span>
                    <em className="page-theme">For My Favorite Person</em>
                  </div>
                  <div className="letter-container">
                    <div className="letter-paper">
                      <p className="letter-salutation">Dear Gita,</p>
                      <p className="letter-body">
                        Teruntuk pemilik mata indah yang diam-diam mampu membuat dunia terasa lebih tenang, entah sejak kapan aku mulai jatuh pada cara matamu memandang semesta. Ada sesuatu di sana—sesuatu yang sulit dijelaskan oleh kata-kata biasa. Seolah setiap tatapanmu menyimpan rumah bagi hati-hati yang lelah, tempat seseorang bisa tinggal sejenak tanpa merasa dihakimi oleh dunia.
                        <br /><br />
                        Dan aku menyadari, beberapa perasaan memang terlalu besar untuk dititipkan hanya lewat puisi. Karena itu aku memilih membuat album ini, menjadikannya ruang untuk seluruh hal yang gagal diucapkan mulutku sendiri. Di antara nada-nada yang mungkin terdengar sederhana, ada bagian dari diriku yang pelan-pelan belajar jujur tentang rasa kagum yang tumbuh begitu dalam kepadamu.
                        <br /><br />
                        Sebab matamu tidak hanya indah untuk dipandang, tetapi juga menenangkan untuk dikenang. Mereka mengajarkanku tentang bagaimana seseorang bisa hadir tanpa banyak suara, namun tetap meninggalkan gema yang panjang di kepala. And somehow, your eyes feel like midnight skies quiet, distant, yet impossible to stop admiring.
                        <br /><br />
                        Dan jika suatu hari nanti kamu bertanya kenapa semua ini tercipta, maka jawabannya sederhana: karena ada beberapa manusia yang kehadirannya terlalu berarti untuk dijelaskan dengan satu kalimat saja. Mereka harus diabadikan lewat lagu, lewat puisi, lewat hal-hal kecil yang terus hidup bahkan ketika waktu mulai berjalan terlalu jauh.
                        <br /><br />
                        maaff yaa kaloo album nya belumm rapihhh, nantii akuu rapihinn lagiii sayanggg
                      </p>
                      <div className="wax-seal" title="Seal with love">G</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAGE 9: Closing message */}
              <div className={getPageClass(9)}>
                <div className="page-inner closing-page">
                  <div className="closing-card">
                    <div className="closing-heart">💖</div>
                    <p className="closing-sub">Albumm iniii indahh karenaa yangg ada di dalem album inii kamuuu</p>
                    <div className="washi-tape" style={{ top: "-6px", width: "65px" }}></div>
                  </div>
                </div>
              </div>

              {/* PAGE 10: Back Cover */}
              <div className={getPageClass(10)}>
                <div className="page-cover" style={{ height: "100%", background: "linear-gradient(135deg, #590d22 0%, #800f2f 50%, #a21232 100%)" }}>
                  <div className="cover-border" style={{ borderColor: "rgba(255, 215, 0, 0.3)" }}>
                    <div className="cover-sub" style={{ color: "rgba(255,255,255,0.75)" }}>Made with Love</div>
                    <div className="cover-title" style={{ fontSize: "2rem" }}>For Keysaa</div>
                    <div style={{ width: "40px", height: "1px", background: "rgba(255,215,0,0.3)", margin: "1rem auto" }}></div>
                    <div className="cover-sub" style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>24.05.2026</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Navigation controls */}
          <div className="nav-bar">
            <button className="nav-btn" disabled={currentSpreadIndex === 0} onClick={() => changePage(-1)}>
              <span>←</span> Prev
            </button>
            <span className="page-count">
              {currentSpreadIndex === 0 ? "Cover" : `Buku ${currentSpreadIndex} / 5`}
            </span>
            <button className="nav-btn" disabled={currentSpreadIndex === 5} onClick={() => changePage(1)}>
              Next <span>→</span>
            </button>
          </div>
        </div>

        {/* Polaroid Lightbox zoom */}
        {lightbox.open && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeLightbox}>✕</button>
              <img src={lightbox.src} alt={lightbox.caption} />
              <div className="lightbox-caption">{lightbox.caption}</div>
            </div>
          </div>
        )}

        <footer>🌸 Made with Love &bull; My Sweet Album 🌸</footer>
      </div>
    </AuthGuard>
  );
}
