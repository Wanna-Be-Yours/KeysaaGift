"use client";
// eslint-disable-next-line react-hooks/unsupported-syntax
// 'use no memo' — eval() is needed for this calculator, React Compiler can't optimize it

import { useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";

export default function LovelatorPage() {
  const [display, setDisplay] = useState("");
  const [showYesNo, setShowYesNo] = useState(false);
  const [screen, setScreen] = useState("calc"); // calc, congrats
  const [noBtnPos, setNoBtnPos] = useState({ position: "static", left: "auto", top: "auto" });

  const appendToDisplay = (value) => {
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => {
    setDisplay("");
    setShowYesNo(false);
  };

  const calculate = () => {
    try {
      let expression = display.replace(/×/g, "*").replace(/:/g, "/");
      if ("1+4".includes(expression)) {
        setDisplay("Alooo sayanggg");
      } else if ("4+1".includes(expression)) {
        setDisplay("Aku sayang kamu");
      } else if ("1*4".includes(expression)) {
        setDisplay("kangenn bangett");
      } else if ("4*1".includes(expression)) {
        setDisplay("ALOOO CANTIKKNYAA AKUU");
      } else if ("1-4".includes(expression)) {
        setDisplay("Mwaaaahhh sayanggg");
      } else if ("4-1".includes(expression)) {
        setDisplay("Ciaaa punyaa akuu");
      } else if ("1/4 ".includes(expression)) {
        setDisplay("Aku sayang kamuuuuuuu pokoknyaaa");
      } else if ("30012010".includes(expression)) {
        alert("Hari Kelahiran Wanita Termanis");
      } else if ("4/1".includes(expression)) {
        setShowYesNo(true);
        setDisplay("Do you lovee me?");
      } else {
        setDisplay(String(eval(expression)));
        setShowYesNo(false);
      }
    } catch (error) {
      setDisplay("Error");
      setShowYesNo(false);
    }
  };

  const handleButtonClick = (val) => {
    if (val === "=") {
      calculate();
    } else if (val === "C") {
      clearDisplay();
    } else {
      appendToDisplay(val);
    }
  };

  const handleNoMouseOver = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoBtnPos({
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 1000
    });
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    alert("Kok gitu? :( Coba lagi dong!");
  };

  const handleYesClick = () => {
    setScreen("congrats");
  };

  return (
    <AuthGuard>
      <div className="lovelator-page-container">
        <style dangerouslySetInnerHTML={{ __html: `
          .lovelator-page-container {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #FFC8DD, #FFAFCC, #BDE0FE);
            font-family: 'Poppins', sans-serif;
            width: 100%;
          }

          .container {
            text-align: center;
            margin-bottom: 15px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            padding: 10px;
            font-size: 14px;
            color: #d63384;
            font-weight: 500;
          }

          .calculator {
            background-color: pink;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 320px;
            border: 2px solid rgba(255, 255, 255, 0.5);
          }

          #display {
            width: 100%;
            height: 50px;
            background-color: white;
            border: none;
            border-radius: 10px;
            font-size: 24px;
            text-align: right;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 15px;
            color: #d63384;
          }

          .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }

          .calc-btn {
            background-color: white;
            border: none;
            border-radius: 8px;
            padding: 15px;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.1s;
            color: #333;
            font-weight: 600;
          }

          .calc-btn:hover {
            background-color: #ffcccb;
            transform: translateY(-2px);
          }

          .calc-btn:active {
            background-color: #ff9999;
          }

          .hidden {
            display: none !important;
          }

          #yes-btn {
            background-color: #4CAF50;
            color: white;
            grid-column: span 2;
          }

          #no-btn {
            background-color: #f44336;
            color: white;
            grid-column: span 2;
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

          /* Yes Screen Style */
          .next-screen {
            text-align: center;
            background-color: rgba(255, 192, 203, 0.95);
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin: 0 15px;
            max-width: 400px;
            width: 100%;
            color: #333;
          }

          .next-screen h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #d63384;
            font-weight: 700;
          }

          .next-screen p {
            font-size: 1.2rem;
            margin-bottom: 30px;
          }

          .btn-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .action-btn {
            background: linear-gradient(45deg, #ff9a9e, #fad0c4);
            border: none;
            padding: 15px 30px;
            font-size: 1rem;
            color: #333;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
          }
        ` }} />

        <Link href="/menu" className="back-to-menu">🏠</Link>

        {screen === "calc" ? (
          <div className="calculator">
            <div className="container">
              <p id="secret-message">
                Gunakan seluruh +,-,x,:, pada angka 1 dan 4, contohnya 1+4, 1-4, 1*4, 1/4 atau 4/1.
              </p>
            </div>

            <input type="text" id="display" disabled value={display} />

            <div className="buttons">
              {["7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "=", ":", "C"].map((char) => (
                <button
                  key={char}
                  className="calc-btn"
                  onClick={() => handleButtonClick(char)}
                  style={char === "=" ? { gridColumn: "span 2" } : {}}
                >
                  {char}
                </button>
              ))}

              {/* Secret buttons */}
              {showYesNo && (
                <>
                  <button id="yes-btn" className="calc-btn" onClick={handleYesClick}>
                    Yes 💚
                  </button>
                  <button
                    id="no-btn"
                    className="calc-btn"
                    onMouseOver={handleNoMouseOver}
                    onClick={handleNoClick}
                    style={{
                      position: noBtnPos.position,
                      left: noBtnPos.left,
                      top: noBtnPos.top,
                      zIndex: noBtnPos.zIndex
                    }}
                  >
                    No 💔
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="next-screen">
            <h1>Yo Halo Gitaa</h1>
            <p>Apaa yaa?? masii rahasia dehh</p>
            <div className="btn-container">
              <button
                className="action-btn"
                onClick={() => window.location.href = "https://wa.me/6282114073679?text="}
              >
                Kirim pesan
              </button>
              <button
                className="action-btn"
                onClick={() => setScreen("calc")}
              >
                Back To Calculator
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
