// ==UserScript==
// @name         bacon hub 2.3 🥓 (fancy)
// @namespace    https://discord.gg/7BecyWuu8K
// @version      1.4.0
// @description  bacon hub auto box
// @author       bqcon hub
// @match        *://*.linkvertise.com/*
// @match        *://*.loot-link.com/*
// @match        *://*.loot-links.com/*
// @match        *://*.lootdest.com/*
// @match        *://*.lootdest.org/*
// @match        *://*.lootlinks.co/*
// @match        *://*.work.ink/*
// @updateURL    https://raw.githubusercontent.com/ly5878259-cpu/bacon-but-noob/main/bacon-but-noob.user.js
// @downloadURL  https://raw.githubusercontent.com/ly5878259-cpu/bacon-but-noob/main/bacon-but-noob.user.js
// icon          c:\Users\E450\OneDrive\Pictures\Screenshots\Screenshot 2025-11-23 150534.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const host = location.hostname;
  const isLoot = /loot|lootdest|loot-links|lootlinks/i.test(host);
  const WAIT_TIME = isLoot
    ? Math.floor(Math.random() * (90 - 60 + 1)) + 60
    : 30;

  const DISCORD_URL = "https://discord.gg/7BecyWuu8K";

  function createOverlay() {
    // Overlay covering full page
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top:0; left:0;
      width:100%; height:100%;
      background: rgba(1,6,14,0.95);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:2147483647;
      backdrop-filter:blur(10px);
      font-family:sans-serif;
    `;

    const box = document.createElement('div');
    // Fancy bacon theme
    box.style.cssText = `
      position: relative;
      z-index:2147483648;
      background: linear-gradient(145deg, #ff6b4a, #aa2e1d, #ffb37a);
      padding: 40px;
      border-radius: 25px;
      border: 2px solid #ff4d2d;
      width: 460px;
      text-align: center;
      box-shadow: 0 0 30px rgba(255,80,50,0.6), 0 10px 40px rgba(255,100,60,0.4);
      color: #fff;
      transition: transform 0.2s;
    `;
    box.onmouseenter = () => (box.style.transform = 'scale(1.02)');
    box.onmouseleave = () => (box.style.transform = 'scale(1)');

    let secondsLeft = WAIT_TIME;

    box.innerHTML = `
      <h2 style="color:#ffd6aa;margin:0 0 10px 0;letter-spacing:3px;text-transform:uppercase;">
        bacon hub 🥓
      </h2>
      <p id="status-msg" style="color:#fff3e6;font-size:14px;margin-bottom:20px;">
        Preparing your link...
      </p>
      <div id="timer-circle" style="font-size:60px;font-weight:bold;color:#ffd6aa;margin-bottom:30px;">
        ${secondsLeft}
      </div>
      <div id="input-area" style="display:none;margin-bottom:25px;opacity:0;transition:0.5s;">
        <p style="color:#ffdd99;font-size:13px;margin-bottom:10px;">
          ✓ Ready! Paste link below:
        </p>
        <input type="text" id="manual-url" style="
          width:100%;
          padding:15px;
          border-radius:12px;
          background:#331111;
          color:#fff;
          border: 1px solid #ff4d2d;
          outline:none;
        ">
      </div>
      <div style="display:flex;gap:15px;">
        <button id="btn-go" disabled style="
          flex:2;
          padding:15px;
          background:#331111;
          color:#ffb3a3;
          border-radius:12px;
          font-weight:bold;
          border: 1px solid #ff4d2d;
          transition:0.2s;
        ">PLEASE WAIT</button>
        <button id="btn-cancel" style="
          flex:1;
          padding:15px;
          background:#441111;
          color:#ffb3a3;
          border-radius:12px;
          border: 1px solid #ff4d2d;
          transition:0.2s;
        ">CANCEL</button>
      </div>
      <p style="margin-top:18px;font-size:13px;">
        🥓 <a href="${DISCORD_URL}" target="_blank"
           style="color:#ffd6aa;text-decoration:none;font-weight:bold;">
           Join our Discord
        </a>
      </p>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const timerDisp = document.getElementById('timer-circle');
    const statusMsg = document.getElementById('status-msg');
    const inputArea = document.getElementById('input-area');
    const input = document.getElementById('manual-url');
    const goBtn = document.getElementById('btn-go');
    const cancelBtn = document.getElementById('btn-cancel');

    const timer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft > 0) {
        timerDisp.textContent = secondsLeft;
      } else {
        clearInterval(timer);
        timerDisp.style.display = 'none';
        statusMsg.textContent = 'Verification successful!';
        statusMsg.style.color = '#ffdd99';
        inputArea.style.display = 'block';
        setTimeout(() => (inputArea.style.opacity = '1'), 10);
        goBtn.disabled = false;
        goBtn.textContent = 'CONTINUE';
        goBtn.style.background = '#ff6b4a';
        goBtn.style.color = '#fff';
        input.focus();
      }
    }, 1000);

    goBtn.onclick = () => {
      const link = input.value.trim();
      if (link.startsWith('http')) window.location.href = link;
      else alert('Please enter a valid link!');
    };

    cancelBtn.onclick = () => {
      clearInterval(timer);
      overlay.remove();
      document.body.style.overflow = '';
    };
  }

  async function main() {
    const p = new URLSearchParams(window.location.search);
    if (p.get('iwantreferrer')) return;

    if (/loot|linkvertise/i.test(host)) {
      createOverlay();
    }
  }

  if (document.readyState === 'complete') main();
  else window.addEventListener('load', main);

})();