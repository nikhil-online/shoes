/* NIKE landing page — interactions (extracted from index.html) */
  // ── MOBILE MENU TOGGLE ──
  (function() {
    var toggle = document.getElementById('navMenuToggle');
    var menu = document.getElementById('navLinks');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Close menu when link is clicked
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      }
    });
  })();

  // ── LOADER: Drop H-E-L-L-O letter by letter ──
  var letters = ['H','E','L','L','O'];
  var wrap = document.getElementById('heroWrap');

  letters.forEach(function(letter, i) {
    var el = document.createElement('div');
    el.className = 'hero-word';
    el.setAttribute('data-text', letter);
    el.textContent = letter;
    wrap.appendChild(el);
    // Each letter drops in staggered: 300ms, 500ms, 700ms, 900ms, 1100ms
    setTimeout(function() { el.classList.add('visible'); }, 300 + i * 200);
  });

  // Tagline at 1600ms
  setTimeout(function() {
    document.getElementById('tagline').classList.add('visible');
  }, 1600);

  // Bottom brand text at 1900ms
  setTimeout(function() {
    document.getElementById('loaderBrand').classList.add('visible');
  }, 1900);

  // Progress bar fills across the full 2.9s
  setTimeout(function() {
    document.getElementById('loaderProgress').style.width = '100%';
  }, 50);

  // Transition to main page at 2900ms (≈3s total)
  setTimeout(function() {
    var loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.6s ease';
    loader.style.opacity = '0';
    setTimeout(function() {
      loader.style.display = 'none';
      document.getElementById('main-page').style.display = 'block';
      document.body.style.overflow = 'auto';
    }, 600);
  }, 2900);

  // ── SINGLE TAB (no switching needed) ──
  // "SHOES & WEARINGS" is always active — no switchTab logic required

  // ── FILTER CHIPS ──
  document.querySelectorAll('.filter-chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      this.closest('.filter-bar').querySelectorAll('.filter-chip').forEach(function(c) { c.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // ── VIDEO AUTOPLAY FIX (works on file:// AND http://) ──
  (function() {
    var vid = document.getElementById('heroClothingVideo');
    var yt  = document.getElementById('heroYTFallback');
    if (!vid || !yt) return;

    function showYT() {
      vid.style.display = 'none';
      yt.style.display  = 'block';
    }

    // Try to play immediately
    var playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise.catch(function() {
        // Autoplay blocked (file:// protocol) — play on first user interaction
        var overlay = document.createElement('div');
        overlay.id = 'videoPlayOverlay';
        overlay.style.cssText = [
          'position:absolute', 'inset:0', 'z-index:10',
          'display:flex', 'align-items:center', 'justify-content:center',
          'cursor:pointer', 'border-radius:inherit'
        ].join(';');

        var btn = document.createElement('div');
        btn.style.cssText = [
          'width:60px', 'height:60px', 'border-radius:50%',
          'background:rgba(255,255,255,0.15)',
          'border:2px solid rgba(255,255,255,0.6)',
          'display:flex', 'align-items:center', 'justify-content:center',
          'font-size:22px', 'color:#fff',
          'backdrop-filter:blur(4px)',
          'transition:transform 0.2s, background 0.2s'
        ].join(';');
        btn.innerHTML = '&#9654;';
        overlay.appendChild(btn);

        vid.closest('.hero-banner-video').appendChild(overlay);

        // Play on any click/touch anywhere on the page
        function startVideo() {
          vid.play().then(function() {
            var el = document.getElementById('videoPlayOverlay');
            if (el) el.remove();
          }).catch(showYT);
          document.removeEventListener('click', startVideo);
          document.removeEventListener('touchstart', startVideo);
        }

        overlay.addEventListener('click', startVideo);
        document.addEventListener('click', startVideo, { once: true });
        document.addEventListener('touchstart', startVideo, { once: true });
      });
    }

    // If video fails to load at all (missing/empty file), show YouTube fallback
    vid.addEventListener('error', showYT);
    setTimeout(function() {
      if (vid.readyState === 0 || vid.networkState === 3) showYT();
    }, 2000);
  })();

  // ── SHOES VIDEO AUTOPLAY FIX (nike1.mp4) ──
  (function() {
    var vid = document.getElementById('heroShoesVideo');
    if (!vid) return;

    var p = vid.play();
    if (p !== undefined) {
      p.catch(function() {
        // Autoplay blocked on file:// — play on first interaction
        function startIt() { vid.play(); }
        document.addEventListener('click', startIt, { once: true });
        document.addEventListener('touchstart', startIt, { once: true });
      });
    }
  })();
