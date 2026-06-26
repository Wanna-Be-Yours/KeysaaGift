"use client";

import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

export default function Profile2Page() {
  const handleDetailClick = (e) => {
    const item = e.currentTarget;
    item.style.transform = "scale(0.95)";
    setTimeout(() => {
      item.style.transform = "";
    }, 150);
  };

  return (
    <AuthGuard>
      <div className="profile-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .profile-container {
            font-family: 'Comic Neue', cursive;
            background: linear-gradient(135deg, #BDE0FE 0%, #FFC8DD 50%, #CDB4DB 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem 1rem;
            position: relative;
            overflow-x: hidden;
          }

          /* Floating shapes decoration */
          .floating-shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.2;
            animation: float 8s ease-in-out infinite;
          }

          .shape-1 {
            width: 100px;
            height: 100px;
            background: #FFAFCC;
            top: 10%;
            left: 8%;
            animation-delay: 0s;
          }

          .shape-2 {
            width: 70px;
            height: 70px;
            background: #CDB4DB;
            top: 15%;
            right: 12%;
            animation-delay: 3s;
          }

          .shape-3 {
            width: 120px;
            height: 120px;
            background: #BDE0FE;
            bottom: 10%;
            left: 15%;
            animation-delay: 6s;
          }

          .shape-4 {
            width: 80px;
            height: 80px;
            background: #FFC8DD;
            bottom: 20%;
            right: 8%;
            animation-delay: 2s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
            50% { transform: translateY(-30px) rotate(180deg) scale(0.9); }
            75% { transform: translateY(-15px) rotate(270deg) scale(1.1); }
          }

          /* Stars decoration */
          .star {
            position: absolute;
            color: #ffd700;
            font-size: 1.8rem;
            animation: twinkle 3s ease-in-out infinite;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }

          .star-1 { top: 12%; left: 6%; animation-delay: 0s; }
          .star-2 { top: 25%; right: 10%; animation-delay: 1s; }
          .star-3 { bottom: 30%; left: 10%; animation-delay: 2s; }
          .star-4 { bottom: 15%; right: 12%; animation-delay: 0.5s; }
          .star-5 { top: 40%; left: 3%; animation-delay: 1.5s; }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
          }

          /* Profile Card Container */
          .profile-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8));
            backdrop-filter: blur(10px);
            border-radius: 2.5rem;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            border: 3px solid transparent;
            background-clip: padding-box;
            position: relative;
            max-width: 400px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            animation: cardGlow 4s ease-in-out infinite;
            z-index: 10;
          }

          @keyframes cardGlow {
            0%, 100% { box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
            50% { box-shadow: 0 25px 50px rgba(189, 224, 254, 0.3); }
          }

          .profile-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 2.5rem;
            padding: 3px;
            background: linear-gradient(45deg, #BDE0FE, #FFC8DD, #CDB4DB, #FFAFCC);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            z-index: -1;
            animation: borderRotate 6s linear infinite;
          }

          @keyframes borderRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }

          /* Profile Image */
          .profile-image-container {
            position: relative;
            margin-bottom: 1.5rem;
            display: inline-block;
          }

          .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #ffffff;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            animation: pulse 3s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .image-ring {
            position: absolute;
            top: -8px;
            left: -8px;
            width: 136px;
            height: 136px;
            border-radius: 50%;
            background: linear-gradient(45deg, #BDE0FE, #FFC8DD, #CDB4DB);
            z-index: -1;
            animation: ringRotate 4s linear infinite;
          }

          @keyframes ringRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Profile Info */
          .profile-name {
            font-size: 2rem;
            font-weight: 700;
            color: #2d1b3d;
            margin-bottom: 0.5rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
            animation: nameGlow 2s ease-in-out infinite alternate;
          }

          @keyframes nameGlow {
            from { text-shadow: 1px 1px 3px rgba(0,0,0,0.1); }
            to { text-shadow: 2px 2px 8px rgba(189, 224, 254, 0.5); }
          }

          .profile-details {
            background: linear-gradient(135deg, #BDE0FE20, #FFC8DD20);
            border-radius: 1.5rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border: 2px solid rgba(255,255,255,0.3);
          }

          .detail-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            padding: 0.5rem;
            border-radius: 0.75rem;
            background: rgba(255,255,255,0.4);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .detail-item:hover {
            background: rgba(255,255,255,0.6);
            transform: translateX(5px);
          }

          .detail-item:last-child {
            margin-bottom: 0;
          }

          .detail-icon {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 1.1rem;
            color: #ffffff;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
          }

          .icon-age { background: linear-gradient(45deg, #FFAFCC, #FFC8DD); }
          .icon-birthday { background: linear-gradient(45deg, #FFC8DD, #CDB4DB); }
          .icon-hobby { background: linear-gradient(45deg, #CDB4DB, #BDE0FE); }

          .detail-content {
            flex: 1;
            text-align: left;
          }

          .detail-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #5a4b6b;
            margin-bottom: 0.2rem;
          }

          .detail-value {
            font-size: 1rem;
            font-weight: 400;
            color: #2d1b3d;
            line-height: 1.4;
          }

          /* About section special styling */
          .about-section {
            background: linear-gradient(135deg, #CDB4DB30, #BDE0FE30);
            border-radius: 1.2rem;
            padding: 1.2rem;
            margin-top: 1.5rem;
            border: 2px solid rgba(205, 180, 219, 0.3);
          }

          .about-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #2d1b3d;
            margin-bottom: 0.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .about-title i {
            color: #8b5cf6;
          }

          .about-text {
            font-size: 0.95rem;
            color: #5a4b6b;
            line-height: 1.6;
            text-align: center;
          }

          /* Styled Button */
          .styled-button {
            background: linear-gradient(135deg, #FFC8DD, #FFAFCC, #CDB4DB);
            color: white;
            border: none;
            border-radius: 2rem;
            padding: 0.9rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Comic Neue', cursive;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(255, 175, 204, 0.4);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }

          .styled-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
          }

          .styled-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 10px 30px rgba(255, 175, 204, 0.6);
            background: linear-gradient(135deg, #FFAFCC, #FFC8DD, #BDE0FE);
          }

          .styled-button:hover::before {
            left: 100%;
          }

          .styled-button:active {
            transform: translateY(-1px) scale(1.02);
          }

          .styled-button i {
            font-size: 1.2rem;
            animation: buttonIconBounce 2s ease-in-out infinite;
          }

          @keyframes buttonIconBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }

          /* Decorative elements */
          .heart {
            position: absolute;
            color: #ff6b9d;
            font-size: 1.2rem;
            animation: heartBeat 2s ease-in-out infinite;
          }

          .heart-1 { top: 10%; right: 15%; animation-delay: 0s; }
          .heart-2 { bottom: 15%; left: 10%; animation-delay: 1s; }

          @keyframes heartBeat {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.3); opacity: 1; }
          }

          /* Responsive Design */
          @media (max-width: 480px) {
            .profile-card {
              padding: 2rem 1.5rem;
              margin: 1rem;
            }
            .profile-image {
              width: 100px;
              height: 100px;
            }
            .image-ring {
              width: 116px;
              height: 116px;
              top: -8px;
              left: -8px;
            }
            .profile-name {
              font-size: 1.6rem;
            }
            .detail-item {
              flex-direction: column;
              text-align: center;
              padding: 1rem;
            }
            .detail-icon {
              margin-right: 0;
              margin-bottom: 0.5rem;
            }
            .detail-content {
              text-align: center;
            }
            .styled-button {
              padding: 0.8rem 1.5rem;
              font-size: 0.9rem;
            }
          }
        ` }} />

        {/* Floating shapes */}
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>

        {/* Stars */}
        <div className="star star-1">⭐</div>
        <div className="star star-2">✨</div>
        <div className="star star-3">🌟</div>
        <div className="star star-4">💫</div>
        <div className="star star-5">⭐</div>

        {/* Hearts */}
        <div className="heart heart-1">💖</div>
        <div className="heart heart-2">💕</div>

        {/* Profile Card */}
        <div className="profile-card">
          <Link href="/menu" className="back-to-menu">🏠</Link>
          <div className="profile-image-container">
            <div className="image-ring"></div>
            <img src="/Menu/profile/writers.webp" alt="Profile Picture" className="profile-image" />
          </div>

          <h1 className="profile-name">Ibnu Hambal Al Bantani Rch</h1>

          <div className="profile-details">
            <div className="detail-item" onClick={handleDetailClick}>
              <div className="detail-icon icon-age">
                <i className="fas fa-birthday-cake"></i>
              </div>
              <div className="detail-content">
                <div className="detail-label">Umur</div>
                <div className="detail-value">16 Tahun</div>
              </div>
            </div>

            <div className="detail-item" onClick={handleDetailClick}>
              <div className="detail-icon icon-birthday">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="detail-content">
                <div className="detail-label">Tanggal Lahir</div>
                <div className="detail-value">13 Juli 2009</div>
              </div>
            </div>

            <div className="detail-item" onClick={handleDetailClick}>
              <div className="detail-icon icon-hobby">
                <i className="fas fa-heart"></i>
              </div>
              <div className="detail-content">
                <div className="detail-label">Hobi</div>
                <div className="detail-value">Membaca, Badminton, Sulap</div>
              </div>
            </div>
          </div>

          <div className="about-section">
            <div className="about-title">
              <i className="fas fa-user"></i>
              Tentang Penulis
            </div>
            <div className="about-text">
              <button className="styled-button" onClick={() => window.location.href='https://wa.me/6282114073679?text=apa passwordnya'}>
                <i className="fab fa-whatsapp"></i> Mau kamu tambahin?
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
