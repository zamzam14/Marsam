document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');

  if (!id) { window.location.href = 'Homepage.html'; return; }

  var aw = null;
  for (var i = 0; i < ARTWORKS.length; i++) {
    if (ARTWORKS[i].id === id) { aw = ARTWORKS[i]; break; }
  }

  if (!aw) { window.location.href = 'Homepage.html'; return; }

  document.title = aw.title + ' — مرسم';

  document.getElementById('aw-image').src   = aw.image;
  document.getElementById('aw-image').alt   = aw.title;
  document.getElementById('aw-badge').textContent      = aw.style;
  document.getElementById('aw-title').textContent      = aw.title;
  document.getElementById('aw-initial').textContent    = aw.artist.charAt(0);
  document.getElementById('aw-artist').textContent     = aw.artist;
  document.getElementById('aw-year').textContent       = aw.year + ' م';
  document.getElementById('aw-year-meta').textContent  = aw.year;
  document.getElementById('aw-style-meta').textContent = aw.style;
  document.getElementById('aw-desc').textContent       = aw.description;
  document.getElementById('aw-price').textContent      = aw.price + ' ريال';

  document.getElementById('link-instagram').href = 'https://instagram.com/' + aw.social.instagram;
  document.getElementById('link-facebook').href  = 'https://facebook.com/'  + aw.social.facebook;
  document.getElementById('link-twitter').href   = 'https://twitter.com/'   + aw.social.twitter;
});
