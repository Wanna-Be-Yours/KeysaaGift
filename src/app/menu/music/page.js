"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

const songs = [
  {
    id: 1,
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    album: "AM",
    albumArtUrl: "https://i.ytimg.com/vi/fJLQCf4mFP0/hqdefault.jpg",
    audioSrc: "/Menu/music/audio/IWB.mp3",
    videoBgSrc: "/Menu/music/videos/tiga.mp4",
    lyrics: [
      { time: 18.4, text: "I wanna be your vacuum cleaner" },
      { time: 22.0, text: "Breathing in your dust" },
      { time: 25.4, text: "I wanna be your Ford Cortina" },
      { time: 29.0, text: "I will never rust" },
      { time: 32.1, text: "If you like your coffee hot" },
      { time: 36.0, text: "Let me be your coffee pot" },
      { time: 39.7, text: "You call the shots, babe" },
      { time: 42.0, text: "I just wanna be yours" },
      { time: 46.2, text: "Secrets I have held in my heart" },
      { time: 50.0, text: "Are harder to hide than I thought" },
      { time: 53.5, text: "Maybe I just wanna be yours" },
      { time: 57.0, text: "I wanna be yours, I wanna be yours" },
      { time: 62.0, text: "Wanna be yours, wanna be yours, wanna be yours" },
      { time: 75.0, text: "Let me be your 'leccy meter and I'll never run out" },
      { time: 81.6, text: "Let me be the portable heater that you'll get cold without" },
      { time: 89.2, text: "I wanna be your setting lotion (wanna be)" },
      { time: 92.8, text: "Hold your hair in deep devotion (how deep?)" },
      { time: 96.0, text: "At least as deep as the Pacific Ocean" },
      { time: 99.6, text: "I wanna be yours" },
      { time: 103.3, text: "Secrets I have held in my heart" },
      { time: 106.8, text: "Are harder to hide than I thought" },
      { time: 110.0, text: "Maybe I just wanna be yours" },
      { time: 113.7, text: "I wanna be yours, I wanna be yours" },
      { time: 119.0, text: "Wanna be yours, wanna be yours, wanna be yours" },
      { time: 129.8, text: "Wanna be yours, wanna be yours, wanna be yours" },
      { time: 140.0, text: "Wanna be yours, wanna be yours" },
      { time: 146.0, text: "I wanna be your vacuum cleaner (Wanna be yours)" },
      { time: 150.0, text: "Breathing in your dust (Wanna be yours)" },
      { time: 153.1, text: "I wanna be your Ford Cortina (Wanna be yours)" },
      { time: 157.0, text: "I will never rust (Wanna be yours)" },
      { time: 159.7, text: "I just wanna be yours (Wanna be yours)" },
      { time: 163.0, text: "I just wanna be yours (Wanna be yours)" },
      { time: 166.7, text: "I just wanna be yours (Wanna be yours)" }
    ]
  }
];

export default function MusicPage() {
  const [activePage, setActivePage] = useState("home"); // home, detail, player
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [speed, setSpeed] = useState(1.0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat-1, 2: repeat-all
  const [activeBgClass, setActiveBgClass] = useState("");

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const lyricsContainerRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [volume, speed]);

  const loadSong = (index) => {
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.src = songs[index].audioSrc;
      audioRef.current.load();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.error(e));
        setIsPlaying(true);
      }
    }
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    if (audioRef.current) {
      audioRef.current.src = songs[index].audioSrc;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.error(e));
    }
  };

  const nextSong = () => {
    let nextIndex = currentSongIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    playSong(nextIndex);
  };

  const prevSong = () => {
    let prevIndex = currentSongIndex;
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    playSong(prevIndex);
  };

  const handleProgressBarClick = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Synchronize lyrics scrolling
  useEffect(() => {
    const activeLyric = currentSong?.lyrics.find((lyric, idx) => {
      const nextLyric = currentSong.lyrics[idx + 1];
      return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
    });

    if (activeLyric && lyricsContainerRef.current) {
      const activeSpan = lyricsContainerRef.current.querySelector(`.lyric-line[data-time="${activeLyric.time}"]`);
      if (activeSpan) {
        activeSpan.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentTime, currentSong]);

  return (
    <AuthGuard>
      <div className={`music-page-container ${activePage}-bg`}>
        <style dangerouslySetInnerHTML={{ __html: `
          .music-page-container {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            position: relative;
            background: linear-gradient(to bottom, #BDE0FE, #FFC8DD);
          }

          .video-background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.7s ease-in-out;
            pointer-events: none;
          }

          .video-background-container.active {
            opacity: 1;
          }

          .video-background-container video {
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            object-fit: cover;
          }

          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
          }

          .page {
            width: 100%;
            max-width: 800px;
            padding: 1rem;
            display: none;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            z-index: 2;
          }

          .page.active {
            display: flex;
          }

          header {
            width: 100%;
            text-align: center;
            margin-bottom: 1.5rem;
          }

          header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: rgb(30, 30, 40);
          }

          .song-list {
            list-style: none;
            padding: 0;
            width: 100%;
            max-width: 600px;
          }

          .song-list li {
            background-color: #CDB4DB;
            padding: 1rem 1.5rem;
            margin-bottom: 0.75rem;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.1s ease;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }

          .song-list li:hover {
            background-color: rgba(138, 92, 246, 0.28);
            transform: translateY(-2px);
          }

          .song-art-list {
            width: 50px;
            height: 50px;
            border-radius: 0.5rem;
            margin-right: 1rem;
            object-fit: cover;
          }

          .song-info-list h3 {
            margin: 0 0 0.25rem 0;
            font-size: 1.1rem;
            color: #ffffff;
            font-weight: 700;
          }

          .song-info-list p {
            margin: 0;
            font-size: 0.85rem;
            color: rgb(30,30,40);
          }

          .back-btn {
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
            background-color: #CDB4DB;
            color: #fff;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 2rem;
            cursor: pointer;
            font-size: 0.9rem;
            z-index: 10;
            transition: background-color 0.2s ease;
          }

          .back-btn:hover {
            background-color: #BDE0FE;
          }

          .music-player-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80%;
            height: 50%;
            min-height: 90vh;
            padding-top: 3rem;
          }

          .music-player-box {
            background: radial-gradient(circle at top left, #BDE0FE, #FFC8DD);
            border-radius: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            width: 100%;
            max-width: 400px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
          }

          .player-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
          }

          .album-art-player {
            width: 80px;
            height: 80px;
            border-radius: 0.5rem;
            margin-right: 1rem;
            object-fit: cover;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          }

          .track-info-player h2 {
            font-size: 1.4rem;
            font-weight: 600;
            margin: 0 0 0.25rem 0;
            color: rgb(30,30,40);
          }

          .track-info-player p {
            font-size: 0.9rem;
            color: gray;
            margin: 0;
          }

          .lyrics-container {
            height: 180px;
            overflow-y: auto;
            background: radial-gradient(circle at top left, #CDB4DB, #CDB4DB);
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            font-size: 0.95rem;
            color: #d0d0d0;
          }

          .lyric-line {
            color: rgba(255, 255, 255, 0.4);
            transition: color 0.3s ease;
            display: block;
            margin-bottom: 0.2em;
          }

          .lyric-line.highlight {
            color: #FFFFFF;
            font-weight: 600;
          }

          .progress-bar-container-player {
            background-color: rgb(30,30,40);
            border-radius: 5px;
            cursor: pointer;
            height: 10px;
            width: 100%;
          }

          .progress-bar-player {
            background-color: #EDF2FB;
            height: 100%;
            border-radius: 5px;
          }

          .time-display-player {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: rgb(30,30,40);
            margin-top: 0.5rem;
          }

          .main-controls-player {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 1rem;
          }

          .control-btn-player {
            background: none;
            border: none;
            color: #CDB4DB;
            font-size: 1.6rem;
            cursor: pointer;
            transition: color 0.2s ease, transform 0.1s ease;
            padding: 0.5rem;
          }

          .control-btn-player:hover {
            color: #EDF2FB;
            transform: scale(1.1);
          }

          .control-btn-player.play-pause-player {
            font-size: 2.2rem;
            color: rgb(30,30,40);
          }

          .control-btn-player.active-feature {
            color: #EDF2FB !important;
          }

          .secondary-controls-player {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.5rem;
            width: 100%;
            flex-wrap: wrap;
            gap: 1rem;
          }

          .volume-control-player, .playback-speed-control {
            display: flex;
            align-items: center;
          }

          .volume-slider-player, .speed-slider {
            width: 80px;
            margin: 0 0.5rem;
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
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.2);
          }
        ` }} />

        <Link href="/menu" className="back-to-menu">🏠</Link>

        {/* Video background for Player page */}
        <div className={`video-background-container ${activePage === "player" && currentSong?.videoBgSrc ? "active" : ""}`}>
          {currentSong?.videoBgSrc && (
            <video
              ref={videoRef}
              src={currentSong.videoBgSrc}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          <div className="video-overlay"></div>
        </div>

        {/* HOME PAGE */}
        <div className={`page ${activePage === "home" ? "active" : ""}`}>
          <header>
            <h1>Daftar Lagu</h1>
          </header>
          <main style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <ul className="song-list">
              {songs.map((song, idx) => (
                <li key={song.id} onClick={() => {
                  setCurrentSongIndex(idx);
                  setActivePage("player");
                  playSong(idx);
                }}>
                  <img src={song.albumArtUrl} alt={song.title} className="song-art-list" />
                  <div className="song-info-list">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>

        {/* PLAYER PAGE */}
        <div className={`page ${activePage === "player" ? "active" : ""}`}>
          <button className="back-btn" onClick={() => {
            setActivePage("home");
            if (audioRef.current) audioRef.current.pause();
            setIsPlaying(false);
          }}>
            <i className="fas fa-arrow-left"></i> Kembali
          </button>

          <div className="music-player-container">
            <div className="music-player-box">
              <div className="player-header">
                <img src={currentSong?.albumArtUrl} alt="Album Art" className="album-art-player" />
                <div className="track-info-player">
                  <h2>{currentSong?.title}</h2>
                  <p>{currentSong?.artist}</p>
                </div>
              </div>

              <div ref={lyricsContainerRef} className="lyrics-container">
                {currentSong?.lyrics.map((lyric, idx) => {
                  const nextLyric = currentSong.lyrics[idx + 1];
                  const isHighlighted = currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
                  return (
                    <span
                      key={idx}
                      data-time={lyric.time}
                      className={`lyric-line ${isHighlighted ? "highlight" : ""}`}
                    >
                      {lyric.text}
                    </span>
                  );
                })}
              </div>

              <div className="player-controls">
                <div style={{ marginBottom: "1rem" }}>
                  <div className="progress-bar-container-player" onClick={handleProgressBarClick}>
                    <div
                      className="progress-bar-player"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="time-display-player">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="main-controls-player">
                  <button className="control-btn-player" onClick={prevSong}><i className="fas fa-backward-step"></i></button>
                  <button className="control-btn-player play-pause-player" onClick={handlePlayPause}>
                    <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                  </button>
                  <button className="control-btn-player" onClick={nextSong}><i className="fas fa-forward-step"></i></button>
                </div>

                <div className="secondary-controls-player">
                  <button
                    className={`control-btn-player small-icon ${repeatMode > 0 ? "active-feature" : ""}`}
                    onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
                  >
                    <i className="fas fa-repeat"></i>
                  </button>
                  <button
                    className={`control-btn-player small-icon ${isShuffle ? "active-feature" : ""}`}
                    onClick={() => setIsShuffle(!isShuffle)}
                  >
                    <i className="fas fa-shuffle"></i>
                  </button>
                  <div className="volume-control-player">
                    <i className="fas fa-volume-down" style={{ color: "#1e1e28" }}></i>
                    <input
                      type="range"
                      className="volume-slider-player"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                    <i className="fas fa-volume-up" style={{ color: "#1e1e28" }}></i>
                  </div>
                  <div className="playback-speed-control">
                    <i className="fas fa-tachometer-alt" style={{ color: "#1e1e28" }}></i>
                    <input
                      type="range"
                      className="speed-slider"
                      min="0.5"
                      max="2.0"
                      step="0.25"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    />
                    <span style={{ fontSize: "0.85rem", color: "#1e1e28" }}>{speed.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onEnded={() => {
            if (repeatMode === 1 && audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(e => console.error(e));
            } else {
              nextSong();
            }
          }}
        />
      </div>
    </AuthGuard>
  );
}
