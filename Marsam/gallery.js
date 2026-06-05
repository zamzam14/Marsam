document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('gallery-grid');
  if (!grid) return;

  /* ── Stats ── */
  var artists = new Set(ARTWORKS.map(function (a) { return a.artist; })).size;
  var styles  = new Set(ARTWORKS.map(function (a) { return a.style;  })).size;
  animateCount('stat-artworks', ARTWORKS.length);
  animateCount('stat-artists',  artists);
  animateCount('stat-styles',   styles);

  ARTWORKS.forEach(function (aw) {
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
});

function animateCount(id, target) {
  var el = document.getElementById(id);
  if (!el) return;
  var val  = 0;
  var step = Math.max(1, Math.ceil(target / 30));
  var tick = function () {
    val = Math.min(val + step, target);
    el.textContent = val;
    if (val < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
