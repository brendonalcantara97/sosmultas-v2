// Reveal on scroll
(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();

// Menu mobile
function toggleMenu() {
  var m = document.getElementById('mobile-menu');
  if (m) m.style.display = (m.style.display === 'flex' ? 'none' : 'flex');
}

// Carrossel de depoimentos
function scrollReviews(dir) {
  var el = document.getElementById('reviews');
  if (!el) return;
  var card = el.querySelector('.review-card');
  var step = card ? card.getBoundingClientRect().width + 20 : 340;
  el.scrollBy({ left: dir * step, behavior: 'smooth' });
}
