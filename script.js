(() => {
  'use strict';
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('nav-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }));
  }

  const storySteps = [...document.querySelectorAll('.story-step')];
  const previews = [...document.querySelectorAll('.viewer-image')];
  const caption = document.querySelector('#viewer-caption');
  const counter = document.querySelector('#viewer-counter');
  const names = ['GRAN FORMATO', 'PERSONALIZADOS', 'LETREROS NEÓN', 'IMPRESIÓN 3D', 'CORTE LÁSER'];
  let current = 0;
  const setStory = index => {
    if (index === current || index < 0 || index >= previews.length) return;
    current = index;
    previews.forEach((image, i) => image.classList.toggle('is-visible', i === index));
    storySteps.forEach((step, i) => step.classList.toggle('is-current', i === index));
    if (caption) caption.textContent = names[index];
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / 05`;
  };
  if ('IntersectionObserver' in window && storySteps.length) {
    const observer = new IntersectionObserver(entries => {
      const candidates = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio);
      if (candidates.length) setStory(Number(candidates[0].target.dataset.story));
    }, { rootMargin: '-20% 0px -28% 0px', threshold: [0, 0.25, 0.5, 0.8] });
    storySteps.forEach(step => observer.observe(step));
  }
})();
