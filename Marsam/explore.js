var STYLE_ICONS = {
  'تجريدي':  '🎨',
  'رقمي':    '💻',
  'انطباعي': '🌸',
  'بوب آرت': '⚡',
  'واقعي':   '🖼️',
  'مستقبلي': '🚀'
};

var MOOD_ICONS = {
  'هادئ':    '🌿',
  'حيوي':    '⚡',
  'غامض':    '🌙',
  'رومانسي': '🌹',
  'حزين':    '🌧️',
  'ملهم':    '✨'
};

document.addEventListener('DOMContentLoaded', function () {

  /* ── Tab switching ── */
  var tabBtns = document.querySelectorAll('.exp-tab-btn');
  var panels  = document.querySelectorAll('.exp-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      panels.forEach(function  (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
      clearFilter();
      renderGallery(ARTWORKS, 'جميع الأعمال');
    });
  });

  /* ── Build filter cards ── */
  buildStyleCards();
  buildMoodCards();
  buildArtistCards();

  /* ── Show all artworks initially ── */
  renderGallery(ARTWORKS, 'جميع الأعمال');

  /* ── Clear filter button ── */
  document.getElementById('exp-clear').addEventListener('click', function () {
    clearFilter();
    renderGallery(ARTWORKS, 'جميع الأعمال');
  });
});

/* ─────────────────── Build: Style Cards ─────────────────── */
function buildStyleCards() {
  var counts = {};
  ARTWORKS.forEach(function (aw) {
    counts[aw.style] = (counts[aw.style] || 0) + 1;
  });

  var container = document.getElementById('style-cards');
  Object.keys(counts).forEach(function (style) {
    var card = document.createElement('button');
    card.className = 'exp-filter-card';
    card.innerHTML =
      '<span class="exp-card-icon">'  + (STYLE_ICONS[style] || '🎨') + '</span>' +
      '<span class="exp-card-name">'  + style + '</span>' +
      '<span class="exp-card-count">' + counts[style] + ' عمل</span>';

    card.addEventListener('click', function () {
      highlight(card, 'style-cards');
      var filtered = ARTWORKS.filter(function (a) { return a.style === style; });
      renderGallery(filtered, 'أسلوب: ' + style);
      scrollToResults();
    });
    container.appendChild(card);
  });
}

/* ─────────────────── Build: Mood Cards ─────────────────── */
function buildMoodCards() {
  var counts = {};
  ARTWORKS.forEach(function (aw) {
    if (aw.mood) counts[aw.mood] = (counts[aw.mood] || 0) + 1;
  });

  var container = document.getElementById('mood-cards');
  Object.keys(counts).forEach(function (mood) {
    var card = document.createElement('button');
    card.className = 'exp-filter-card exp-mood-card';
    card.innerHTML =
      '<span class="exp-card-icon">'  + (MOOD_ICONS[mood] || '🌟') + '</span>' +
      '<span class="exp-card-name">'  + mood + '</span>' +
      '<span class="exp-card-count">' + counts[mood] + ' عمل</span>';

    card.addEventListener('click', function () {
      highlight(card, 'mood-cards');
      var filtered = ARTWORKS.filter(function (a) { return a.mood === mood; });
      renderGallery(filtered, 'مزاج: ' + mood);
      scrollToResults();
    });
    container.appendChild(card);
  });
}

/* ─────────────────── Build: Artist Cards ─────────────────── */
function buildArtistCards() {
  var artistMap = {};
  ARTWORKS.forEach(function (aw) {
    if (!artistMap[aw.artist]) {
      artistMap[aw.artist] = { count: 0, style: aw.style };
    }
    artistMap[aw.artist].count++;
  });

  var container = document.getElementById('artist-cards');
  Object.keys(artistMap).forEach(function (name) {
    var info = artistMap[name];
    var card = document.createElement('button');
    card.className = 'exp-artist-card';
    card.innerHTML =
      '<div class="exp-artist-avatar">' + name.charAt(0) + '</div>' +
      '<div class="exp-artist-info">' +
        '<div class="exp-artist-name">' + name + '</div>' +
        '<div class="exp-artist-meta">' + info.style + ' &nbsp;·&nbsp; ' + info.count + ' عمل</div>' +
      '</div>' +
      '<svg class="exp-artist-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4l4 4-4 4"/></svg>';

    card.addEventListener('click', function () {
      highlight(card, 'artist-cards');
      var filtered = ARTWORKS.filter(function (a) { return a.artist === name; });
      renderGallery(filtered, 'أعمال: ' + name);
      scrollToResults();
    });
    container.appendChild(card);
  });
}

/* ─────────────────── Render Gallery ─────────────────── */
function renderGallery(artworks, label) {
  var grid      = document.getElementById('exp-gallery-grid');
  var titleEl   = document.getElementById('exp-results-title');
  var noResults = document.getElementById('exp-no-results');
  var clearBtn  = document.getElementById('exp-clear');

  grid.innerHTML = '';
  titleEl.textContent = label || 'جميع الأعمال';
  clearBtn.style.display = (label && label !== 'جميع الأعمال') ? 'inline-flex' : 'none';

  if (!artworks.length) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  artworks.forEach(function (aw) {
    var card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML =
      '<div class="card-img-wrap">' +
        '<img src="' + aw.thumb + '" alt="' + aw.title + '" loading="lazy">' +
        '<div class="card-hover-overlay"><span class="card-hover-text">عرض التفاصيل</span></div>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-style-tag">' + aw.style + '</span>' +
        '<h3 class="card-title">' + aw.title + '</h3>' +
        '<p class="card-artist">' + aw.artist + '</p>' +
        '<div class="card-footer">' +
          '<span class="card-year">' + aw.year + '</span>' +
          '<span class="card-price">' + aw.price + ' ريال</span>' +
        '</div>' +
      '</div>';
    card.addEventListener('click', function () {
      window.location.href = 'artwork.html?id=' + aw.id;
    });
    grid.appendChild(card);
  });
}

/* ─────────────────── Helpers ─────────────────── */
function highlight(activeCard, containerId) {
  document.getElementById(containerId)
    .querySelectorAll('.exp-filter-card, .exp-artist-card')
    .forEach(function (c) { c.classList.remove('active'); });
  activeCard.classList.add('active');
}

function clearFilter() {
  document.querySelectorAll('.exp-filter-card, .exp-artist-card')
    .forEach(function (c) { c.classList.remove('active'); });
  document.getElementById('exp-clear').style.display = 'none';
}

function scrollToResults() {
  document.querySelector('.exp-results')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}
