// ==UserScript==
// @name         bacon but noob.2.0
// @namespace    Credits Fqzzdx (https://discord.gg/4BCpKSgVHx)
// @version      1.0.4
// @description  the userscript is not all mine Fqzzdx also help me here join this (https://discord.gg/4BCpKSgVHx)
// @author       bacon but noob.2.0
// @match        *://linkvertise.com/*
// @match        *://loot-link.com/*
// @match        *://loot-links.com/*
// @match        *://lootdest.com/*
// @match        *://lootdest.org/*
// @match        *://lootlinks.co/*
// @match        *://lootlinks.com/*
// @match        *://work.ink/*
// @match        *://*.*.*/*?iwantreferrer=*
// @updateURL    https://raw.githubusercontent.com/ly5878259-cpu/bacon-but-noob/main/bacon-but-noob.user.js
// @downloadURL  https://raw.githubusercontent.com/ly5878259-cpu/bacon-but-noob/main/bacon-but-noob.user.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const CONFIG = {
    wait: 25,
    LootLabs: true,
    WorkInk: true
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const isBot = () =>
    document.title.includes('Just a moment') ||
    document.title.includes('Just a second');

  function showManualBypassUI() {
    const oldOverlay = document.getElementById('fear-manual-overlay');
    if (oldOverlay) oldOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'fear-manual-overlay';
    overlay.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(1, 6, 14, 0.98);display:flex;align-items:center;justify-content:center;z-index:9999999;backdrop-filter:blur(15px);font-family:sans-serif;';

    const box = document.createElement('div');
    box.style.cssText =
      'background:#0a0a0a;padding:40px;border-radius:20px;border:1px solid #3f0886ff;width:450px;text-align:center;box-shadow:0 0 50px rgba(0,102,204,0.5);color:#fff;';

    let secondsLeft = CONFIG.wait;
    box.innerHTML = `
      <h2 style="color:#0066cc;margin:0 0 10px 0;letter-spacing:3px;text-transform:uppercase;">
        bacon but noob.2.0 https://discord.gg/7BecyWuu8K
      </h2>
      <p id="status-msg" style="color:#888;font-size:14px;margin-bottom:20px;">
        Creating a safe environment......
      </p>
      <div id="timer-circle" style="font-size:60px;font-weight:bold;color:#0066cc;margin-bottom:30px;">
        ${secondsLeft}
      </div>
      <div id="input-area" style="display:none;margin-bottom:25px;opacity:0;transition:0.5s;">
        <p style="color:#00ff00;font-size:13px;margin-bottom:10px;">
          ✓ Ready! Paste link below:
        </p>
        <input type="text" id="manual-url" style="width:100%;padding:15px;border-radius:8px;background:#000;color:#fff;">
      </div>
      <div style="display:flex;gap:15px;">
        <button id="btn-go" disabled style="flex:2;padding:15px;background:#1a1a1a;color:#444;border-radius:10px;font-weight:bold;">
          PLEASE WAIT
        </button>
        <button id="btn-cancel" style="flex:1;padding:15px;background:#222;color:#ccc;border-radius:10px;">
          CANCEL
        </button>
      </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

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
        statusMsg.style.color = '#00ff00';
        inputArea.style.display = 'block';
        setTimeout(() => (inputArea.style.opacity = '1'), 10);
        goBtn.disabled = false;
        goBtn.textContent = 'CONTINUE';
        goBtn.style.background = '#0066cc';
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
    };
  }

  async function main() {
    if (isBot()) return;

    const p = new URLSearchParams(window.location.search);
    if (p.get('iwantreferrer')) return;

    if (location.href.includes('trw.lat/?url=')) {
      showManualBypassUI();
      return;
    }

    if (confirm('bacon but noob- Do you want to open the bypass link paste box?')) {
      showManualBypassUI();
    }
  }

  if (document.readyState === 'complete') main();
  else window.addEventListener('load', main);
})();
