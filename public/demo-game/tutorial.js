/**
 * ═══════════════════════════════════════════════════════════════
 *  AGAVE Demo Tutorial Overlay — Vanilla JS
 * ═══════════════════════════════════════════════════════════════
 *
 *  Drop tutorial.js + tutorial.css into the demo folder and add
 *  these tags to index.html (before </body>):
 *
 *    <link rel="stylesheet" href="tutorial.css" />
 *    <script src="tutorial.js"></script>
 *
 *  The tutorial auto-starts on the login screen, waits for login,
 *  then walks through the game UI. After 75 clicks it shows a
 *  "got the hang of it" modal.
 *
 *  CONFIG: edit CLICK_LIMIT, HOME_URL, and the steps arrays below.
 * ═══════════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  var CLICK_LIMIT = 75;
  var HOME_URL = '/';

  var gameSteps = [
    { title: 'These Are Your Prizes', desc: "These four prizes are what you're playing for. You're already qualified for the first one!", zones: [{ top: 4.8, left: 0, width: 100, height: 24 }], tip: 'below' },
    { title: 'Unlock Higher Prizes', desc: "See a lock? Tap that prize to complete a quick task and unlock better rewards. These three are locked \u2014 tap any of them!", zones: [{ top: 4.8, left: 50, width: 50, height: 12 }, { top: 16.8, left: 0, width: 100, height: 12 }], tip: 'below' },
    { title: 'How to Play', desc: "Tap this bar anytime to read the full rules and tips for winning.", zones: [{ top: 28.8, left: 0, width: 100, height: 5.2 }], tip: 'below' },
    { title: 'The Winning Number', desc: "This is your target! Match your number to this one and you win.", zones: [{ top: 36, left: 0, width: 48, height: 10 }], tip: 'below' },
    { title: 'Your Number', desc: "Your current number. Each tap of the HIT button moves it up!", zones: [{ top: 36, left: 52, width: 48, height: 10 }], tip: 'below' },
    { title: 'The HIT Button', desc: "Tap this to play! Each tap moves your number closer. Hurry \u2014 other players are tapping too!", zones: [{ top: 48, left: 28, width: 72, height: 34 }], tip: 'above' },
    { title: 'Next Winning Numbers', desc: "If someone hits the winning number first, no worries \u2014 these are the next ones coming up!", zones: [{ top: 48, left: 0, width: 28, height: 34 }], tip: 'above' },
    { title: "Go Win Something!", desc: "You know how it works now. Start tapping and good luck! \ud83c\udf89", zones: null, tip: 'center' }
  ];

  var phase = 'login';
  var currentStep = 0;
  var clickCount = 0;
  var overlayEl = null;
  var loginTipEl = null;
  var limitEl = null;

  function getContainerRect() {
    var c = document.getElementById('rootDiv');
    if (c) return c.getBoundingClientRect();
    return { left: 0, top: 0, width: 480, height: 900 };
  }

  function el(tag, cls, attrs) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { node.style[k] = attrs[k]; });
    return node;
  }

  function txt(parent, tag, text, cls) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  // ─── Login tooltip ──────────────────────────────────────
  function showLoginTip() {
    if (loginTipEl) return;
    var cr = getContainerRect();
    loginTipEl = el('div', 'tut-login-tip', {
      top: (cr.top + cr.height * 0.1) + 'px',
      left: (cr.left + (cr.width - Math.min(300, cr.width - 32)) / 2) + 'px',
      width: Math.min(300, cr.width - 32) + 'px'
    });
    txt(loginTipEl, 'h3', 'Welcome to the AGAVE Demo!');
    txt(loginTipEl, 'p', 'Log in or play as anonymous to continue.');
    txt(loginTipEl, 'p', '\ud83d\udc47 Log in or play as anonymous below', 'tut-hint');
    document.body.appendChild(loginTipEl);
  }

  function hideLoginTip() {
    if (loginTipEl) { loginTipEl.remove(); loginTipEl = null; }
  }

  function pollForLogin() {
    var interval = setInterval(function () {
      var login = document.getElementById('login-screen');
      var main = document.getElementById('main-console');
      if ((login && login.classList.contains('hide')) || (main && main.classList.contains('show'))) {
        clearInterval(interval);
        hideLoginTip();
        phase = 'game';
        currentStep = 0;
        renderGameStep();
        attachClickTracker();
      }
    }, 500);
  }

  // ─── Game step rendering ────────────────────────────────
  function renderGameStep() {
    removeOverlay();
    if (phase !== 'game') return;
    var step = gameSteps[currentStep];
    if (!step) { phase = 'done'; return; }

    var cr = getContainerRect();
    var tipW = Math.min(300, cr.width - 24);

    overlayEl = el('div', 'tut-overlay');
    var zones = step.zones;

    if (!zones) {
      overlayEl.appendChild(el('div', 'tut-dark'));
      var tip = buildTooltip(step, tipW);
      tip.style.top = (cr.top + cr.height / 2) + 'px';
      tip.style.left = (cr.left + (cr.width - tipW) / 2) + 'px';
      tip.style.transform = 'translateY(-50%)';
      overlayEl.appendChild(tip);
    } else {
      var absZones = zones.map(function (z) {
        return { t: cr.top + cr.height * z.top / 100, l: cr.left + cr.width * z.left / 100, w: cr.width * z.width / 100, h: cr.height * z.height / 100 };
      });

      var bboxTop = Math.min.apply(null, absZones.map(function (z) { return z.t; }));
      var bboxBottom = Math.max.apply(null, absZones.map(function (z) { return z.t + z.h; }));

      if (absZones.length === 1) {
        var hl = el('div', 'tut-highlight', { top: absZones[0].t + 'px', left: absZones[0].l + 'px', width: absZones[0].w + 'px', height: absZones[0].h + 'px' });
        overlayEl.appendChild(hl);
      } else {
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'tut-svg-overlay');
        var defs = document.createElementNS(svgNS, 'defs');
        var mask = document.createElementNS(svgNS, 'mask');
        mask.setAttribute('id', 'tut-mask');
        var maskBg = document.createElementNS(svgNS, 'rect');
        maskBg.setAttribute('width', vw); maskBg.setAttribute('height', vh); maskBg.setAttribute('fill', 'white');
        mask.appendChild(maskBg);
        absZones.forEach(function (z) {
          var r = document.createElementNS(svgNS, 'rect');
          r.setAttribute('x', z.l); r.setAttribute('y', z.t); r.setAttribute('width', z.w); r.setAttribute('height', z.h);
          r.setAttribute('rx', '8'); r.setAttribute('fill', 'black');
          mask.appendChild(r);
        });
        defs.appendChild(mask);
        svg.appendChild(defs);
        var overlay = document.createElementNS(svgNS, 'rect');
        overlay.setAttribute('width', vw); overlay.setAttribute('height', vh);
        overlay.setAttribute('fill', 'rgba(0,0,0,0.82)'); overlay.setAttribute('mask', 'url(#tut-mask)');
        svg.appendChild(overlay);
        overlayEl.appendChild(svg);

        absZones.forEach(function (z) {
          overlayEl.appendChild(el('div', 'tut-highlight-multi', { top: z.t + 'px', left: z.l + 'px', width: z.w + 'px', height: z.h + 'px' }));
        });
      }

      var tip2 = buildTooltip(step, tipW);
      if (step.tip === 'above') {
        tip2.style.bottom = (window.innerHeight - bboxTop + 12) + 'px';
      } else {
        tip2.style.top = (bboxBottom + 12) + 'px';
      }
      tip2.style.left = (cr.left + (cr.width - tipW) / 2) + 'px';
      tip2.style.width = tipW + 'px';
      overlayEl.appendChild(tip2);
    }

    document.body.appendChild(overlayEl);
  }

  function buildTooltip(step, width) {
    var tooltip = el('div', 'tut-tooltip');
    tooltip.style.width = width + 'px';

    txt(tooltip, 'h3', step.title);
    txt(tooltip, 'p', step.desc);

    var dots = el('div', 'tut-dots');
    for (var i = 0; i < gameSteps.length; i++) {
      dots.appendChild(el('div', 'tut-dot' + (i === currentStep ? ' active' : '')));
    }
    tooltip.appendChild(dots);

    var nav = el('div', 'tut-nav');
    var isLast = currentStep === gameSteps.length - 1;

    var backBtn = document.createElement('button');
    backBtn.className = 'tut-btn tut-btn-back';
    backBtn.textContent = 'Back';
    if (currentStep === 0) backBtn.disabled = true;
    backBtn.onclick = function () { if (currentStep > 0) { currentStep--; renderGameStep(); } };
    nav.appendChild(backBtn);

    var skipBtn = document.createElement('button');
    skipBtn.className = 'tut-btn tut-btn-skip';
    skipBtn.textContent = 'Skip';
    skipBtn.onclick = function () { phase = 'done'; removeOverlay(); };
    nav.appendChild(skipBtn);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'tut-btn tut-btn-next';
    nextBtn.textContent = isLast ? "Let's Go!" : 'Next';
    nextBtn.onclick = function () {
      if (isLast) { phase = 'done'; removeOverlay(); }
      else { currentStep++; renderGameStep(); }
    };
    nav.appendChild(nextBtn);

    tooltip.appendChild(nav);
    return tooltip;
  }

  function removeOverlay() {
    if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  }

  // ─── Click tracking ─────────────────────────────────────
  function attachClickTracker() {
    var tryAttach = function () {
      var btn = document.querySelector('[data-testid="btn-increment"]') || document.querySelector('.main-button');
      if (btn && !btn.getAttribute('data-tut-tracked')) {
        btn.setAttribute('data-tut-tracked', '1');
        btn.addEventListener('click', function () {
          clickCount++;
          if (clickCount >= CLICK_LIMIT) showClickLimit();
        });
        return true;
      }
      return false;
    };
    if (!tryAttach()) {
      var obs = new MutationObserver(function () { if (tryAttach()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  }

  // ─── Click limit modal ──────────────────────────────────
  function showClickLimit() {
    if (limitEl) return;
    limitEl = el('div', 'tut-limit-overlay');

    var bg = el('div', 'tut-limit-bg');
    limitEl.appendChild(bg);

    var modal = el('div', 'tut-limit-modal');
    var header = el('div', 'tut-limit-header');
    txt(header, 'div', '\ud83c\udf89', 'emoji');
    txt(header, 'h1', "Looks Like You've Got the Hang of It!");
    modal.appendChild(header);

    var body = el('div', 'tut-limit-body');
    txt(body, 'p', 'Now you know how AGAVE works! Stay tuned for upcoming live games where you can compete for real prizes.');

    var keepBtn = document.createElement('button');
    keepBtn.className = 'tut-limit-btn tut-limit-btn-primary';
    keepBtn.textContent = 'Keep Exploring Demo';
    keepBtn.onclick = function () { clickCount = 0; limitEl.remove(); limitEl = null; };
    body.appendChild(keepBtn);

    var homeLink = document.createElement('a');
    homeLink.className = 'tut-limit-btn tut-limit-btn-secondary';
    homeLink.textContent = 'Back to Home';
    homeLink.href = HOME_URL;
    body.appendChild(homeLink);

    modal.appendChild(body);
    limitEl.appendChild(modal);
    document.body.appendChild(limitEl);
  }

  // ─── Block right-click ──────────────────────────────────
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  // ─── Init ───────────────────────────────────────────────
  function init() {
    var check = setInterval(function () {
      if (document.getElementById('rootDiv')) {
        clearInterval(check);
        showLoginTip();
        pollForLogin();
      }
    }, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
