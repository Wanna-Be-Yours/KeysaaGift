"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import GALLERY_PHOTOS from "@/data/gallery-photos.json";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState({ open: false, src: "", title: "" });
  const [loaded, setLoaded] = useState({});
  const [petals, setPetals] = useState([]);
  const modalRef = useRef(null);

  // Falling petals
  useEffect(() => {
    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev.slice(-15),
        {
          id: Math.random(),
          char: ["🌸", "🌺", "🌷", "💮"][Math.floor(Math.random() * 4)],
          left: Math.random() * 100 + "vw",
          duration: Math.random() * 3 + 4 + "s",
          opacity: Math.random() * 0.3 + 0.2,
        },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (src, title) => {
    setLightbox({ open: true, src, title });
  };

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, src: "", title: "" });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeLightbox]);

  const handleImgLoad = (idx) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }));
  };

  const hasPhotos = GALLERY_PHOTOS.length > 0;

  return (
    <AuthGuard>
      <div className="gallery-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .gallery-container {
            --pink-light: #fff5f7;
            --pink-soft: #ffe3eb;
            --pink-mid:  #ffb3c6;
            --pink-main: #ff758f;
            --pink-deep: #ff4d6d;
            --pink-dark: #590d22;
            --cream:     #fffcf7;
            --shadow-sm: rgba(89, 13, 34, 0.04);
            --shadow-md: rgba(89, 13, 34, 0.08);
            --shadow-lg: rgba(89, 13, 34, 0.14);

            background: var(--pink-light);
            min-height: 100vh;
            font-family: 'Lato', sans-serif;
            color: var(--pink-dark);
            background-image:
              radial-gradient(circle at 5% 10%, rgba(255,182,193,0.2) 0%, transparent 40%),
              radial-gradient(circle at 95% 85%, rgba(255,117,143,0.1) 0%, transparent 55%),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0%, transparent 100%);
            overflow-x: hidden;
          }

          /* ---------- HEADER ---------- */
          .gallery-header {
            text-align: center;
            padding: clamp(1.2rem, 4vh, 2rem) 1.5rem 0.5rem;
            position: relative;
            z-index: 5;
          }
          .gallery-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(1.8rem, 5vw, 2.6rem);
            color: var(--pink-dark);
            font-weight: 700;
            margin-bottom: 0.2rem;
          }
          .gallery-header p {
            font-size: 0.75rem;
            color: var(--pink-main);
            font-weight: 400;
            letter-spacing: 4px;
            text-transform: uppercase;
          }

          /* ---------- MASONRY ---------- */
          .masonry-wrapper {
            max-width: 960px;
            margin: 0 auto;
            padding: 1rem 1rem 2rem;
            position: relative;
            z-index: 5;
          }

          .masonry-grid {
            columns: 2;
            column-gap: 0.75rem;
          }

          @media (min-width: 600px) {
            .masonry-grid { columns: 3; column-gap: 1rem; }
          }
          @media (min-width: 900px) {
            .masonry-grid { columns: 4; column-gap: 1rem; }
          }

          .masonry-item {
            break-inside: avoid;
            margin-bottom: 0.75rem;
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 4px 15px var(--shadow-sm);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .masonry-item:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 30px var(--shadow-md);
          }

          .masonry-item img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.4s ease, opacity 0.3s ease;
            opacity: 0;
          }
          .masonry-item img.loaded {
            opacity: 1;
          }
          .masonry-item:hover img.loaded {
            transform: scale(1.05);
          }

          .masonry-item .img-placeholder {
            width: 100%;
            background: linear-gradient(135deg, var(--pink-soft), var(--pink-mid));
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 180px;
          }
          .masonry-item .img-placeholder::after {
            content: '🌸';
            font-size: 2rem;
            opacity: 0.4;
          }

          .masonry-item .photo-title {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            padding: 1.2rem 0.6rem 0.5rem;
            background: linear-gradient(transparent, rgba(0,0,0,0.5));
            color: white;
            font-family: 'Caveat', cursive;
            font-size: 1.1rem;
            font-weight: 700;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }
          .masonry-item:hover .photo-title {
            opacity: 1;
          }

          /* ---------- EMPTY STATE ---------- */
          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
          }
          .empty-state .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          .empty-state h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: var(--pink-dark);
            margin-bottom: 0.5rem;
          }
          .empty-state p {
            color: var(--pink-main);
            font-size: 0.9rem;
          }

          /* ---------- LIGHTBOX ---------- */
          .lightbox {
            position: fixed; inset: 0;
            background: rgba(56, 10, 17, 0.7);
            backdrop-filter: blur(12px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            transition: opacity 0.3s ease;
          }
          .lightbox-content {
            position: relative;
            max-width: 600px;
            width: 100%;
            max-height: 85vh;
            background: white;
            padding: 8px;
            border-radius: 8px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
          }
          .lightbox img {
            width: 100%;
            height: auto;
            max-height: calc(85vh - 60px);
            object-fit: contain;
            border-radius: 4px;
          }
          .lightbox-title {
            text-align: center;
            padding: 0.5rem 0.5rem 0.2rem;
            font-family: 'Caveat', cursive;
            font-size: 1.4rem;
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
            transition: background 0.2s;
          }
          .close-btn:hover { background: rgba(255, 255, 255, 0.35); }

          /* ---------- FOOTER ---------- */
          .gallery-footer {
            text-align: center;
            padding: 1rem;
            color: var(--pink-main);
            font-size: 0.72rem;
            letter-spacing: 2px;
            font-weight: 300;
          }

          /* ---------- PETALS ---------- */
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

          /* ---------- BACK BUTTON ---------- */
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

        {/* Back to Menu */}
        <Link href="/menu" className="back-to-menu" title="Kembali ke Menu Utama">🏠</Link>

        {/* Petals */}
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDuration: petal.duration,
              opacity: petal.opacity,
            }}
          >
            {petal.char}
          </div>
        ))}

        {/* Header */}
        <header className="gallery-header">
          <h1>Gallery</h1>
          <p>Images Collection💕</p>
        </header>

        {/* Masonry Grid */}
        <div className="masonry-wrapper">
          {hasPhotos ? (
            <div className="masonry-grid">
              {GALLERY_PHOTOS.map((photo, idx) => (
                <div
                  key={idx}
                  className="masonry-item"
                  onClick={() => openLightbox(`/Menu/Gallery/${photo.src}`, photo.title)}
                >
                  <div className="img-placeholder" style={{ display: loaded[idx] ? "none" : "flex" }} />
                  <img
                    src={`/Menu/Gallery/${photo.src}`}
                    alt={photo.title}
                    loading="lazy"
                    onLoad={() => handleImgLoad(idx)}
                    className={loaded[idx] ? "loaded" : ""}
                  />
                  <div className="photo-title">{photo.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📷</div>
              <h2>Belum Ada Foto</h2>
              <p>Tambahkan file .webp ke folder Gallery dan daftarkan di page.js ya!</p>
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div className="lightbox" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()} ref={modalRef}>
              <button className="close-btn" onClick={closeLightbox}>✕</button>
              <img src={lightbox.src} alt={lightbox.title} />
              <div className="lightbox-title">{lightbox.title}</div>
            </div>
          </div>
        )}

        <footer className="gallery-footer">🌸 Made with Love &bull; Gallery 🌸</footer>
      </div>
    </AuthGuard>
  );
}
