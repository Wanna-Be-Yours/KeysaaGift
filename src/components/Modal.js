"use client";

import { useEffect } from "react";

export function showModal({ title, message, type = "info", onConfirm, onCancel, confirmText = "OK", cancelText = "Batal" }) {
  const existing = document.querySelector(".custom-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "custom-modal-overlay";

  const iconMap = {
    info: "💕",
    warning: "⚠️",
    success: "🎉",
    error: "😢",
    question: "❓",
    heart: "💌",
  };

  overlay.innerHTML = `
    <div class="custom-modal">
      <div class="custom-modal-icon">${iconMap[type] || "💕"}</div>
      ${title ? `<div class="custom-modal-title">${title}</div>` : ""}
      <div class="custom-modal-message">${message}</div>
      <div class="custom-modal-buttons">
        ${onCancel ? `<button class="custom-modal-btn cancel">${cancelText}</button>` : ""}
        <button class="custom-modal-btn confirm">${onConfirm ? confirmText : "OK"}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const style = document.createElement("style");
  style.textContent = `
    .custom-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(89, 13, 34, 0.4);
      backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
      animation: modalFadeIn 0.2s ease;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .custom-modal {
      background: white;
      border-radius: 1.5rem;
      padding: 2rem 1.8rem;
      max-width: 340px;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 60px rgba(89, 13, 34, 0.2);
      animation: modalPop 0.3s ease;
    }
    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.85) translateY(20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .custom-modal-icon {
      font-size: 2.5rem;
      margin-bottom: 0.8rem;
    }
    .custom-modal-title {
      font-family: 'Nunito', sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      color: #590d22;
      margin-bottom: 0.5rem;
    }
    .custom-modal-message {
      font-family: 'Nunito', sans-serif;
      font-size: 0.9rem;
      color: #7a6b8a;
      line-height: 1.5;
      margin-bottom: 1.2rem;
    }
    .custom-modal-buttons {
      display: flex; gap: 0.6rem; justify-content: center;
    }
    .custom-modal-btn {
      padding: 0.55rem 1.4rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'Nunito', sans-serif;
      border: none;
    }
    .custom-modal-btn.confirm {
      background: #ff758f;
      color: white;
    }
    .custom-modal-btn.confirm:hover {
      background: #ff4d6d;
      transform: translateY(-2px);
    }
    .custom-modal-btn.cancel {
      background: #f3e8ff;
      color: #7c3aed;
    }
    .custom-modal-btn.cancel:hover {
      background: #e9d5ff;
    }
  `;
  document.head.appendChild(style);

  return new Promise((resolve) => {
    const confirmBtn = overlay.querySelector(".custom-modal-btn.confirm");
    const cancelBtn = overlay.querySelector(".custom-modal-btn.cancel");

    const cleanup = () => {
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.15s ease";
      setTimeout(() => overlay.remove(), 150);
    };

    confirmBtn.addEventListener("click", () => {
      cleanup();
      resolve(true);
      if (onConfirm) onConfirm();
    });

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        cleanup();
        resolve(false);
        if (onCancel) onCancel();
      });
    }

    if (!onCancel) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          cleanup();
          resolve(true);
        }
      });
    }
  });
}
