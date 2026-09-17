const params = new URLSearchParams(window.location.search);
const design = params.get('design');
const body = document.body;

body.dataset.design = 'clinical';
if (design === '2') body.dataset.design = 'product';
if (design === '3') body.dataset.design = 'editorial';
if (design === '4') {
  body.dataset.design = 'dark';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0b1719');
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionOK = !prefersReducedMotion.matches;

function setupMobileNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  if (!menuButton || !menu) return;

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    menu.classList.toggle('is-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }));
}

function setupRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    '.section-intro, .workflow-line, .capability-grid, .security-panel, '
    + '.specialties-copy, .specialty-cloud, .voices, .quote-grid, .faq-list, .cta-section'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--delay', `${Math.min(index * 20, 80)}ms`);
  });

  document.querySelectorAll('.workflow-line article, .capability-grid .capability-card, .quote-grid blockquote')
    .forEach((element, index) => element.style.setProperty('--index', index));

  const showAll = () => document.querySelectorAll('.reveal, .workflow-line')
    .forEach(element => element.classList.add('is-visible'));

  if (!motionOK || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.12, rootMargin: '0px 0px -20px' });

  document.querySelectorAll('.reveal, .workflow-line').forEach(element => observer.observe(element));
}

function setupMockupSemantics() {
  document.querySelector('.hero-visual figcaption')?.classList.add('visual-caption');
  document.querySelectorAll('.step-icon, .people-row, .status i, .shield')
    .forEach(element => element.setAttribute('aria-hidden', 'true'));
}

function setupScrollState() {
  const header = document.querySelector('.site-header');
  const heroVisual = document.querySelector('.hero-visual');
  let ticking = false;

  const update = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
    if (motionOK && heroVisual && window.scrollY < 720) {
      heroVisual.style.setProperty('--parallax-y', `${Math.min(window.scrollY * 0.035, 22)}px`);
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function setupMetricAnimation() {
  document.querySelectorAll('.trust-number').forEach(number => {
    const match = number.textContent.match(/(\d+)/);
    if (match) number.dataset.value = match[1];
  });
  if (!motionOK || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const number = entry.target;
    const value = Number(number.dataset.value);
    const started = performance.now();
    const tick = now => {
      const progress = Math.min((now - started) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.textContent = `${Math.round(value * eased)}+`;
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
    observer.unobserve(number);
  }), { threshold: 0.55 });

  document.querySelectorAll('.trust-number').forEach(number => observer.observe(number));
}

function setupWorkflow() {
  const workflow = document.querySelector('.workflow-line');
  if (!workflow) return;
  const steps = [...workflow.querySelectorAll('article')];
  const mobileWorkflow = window.matchMedia('(max-width: 520px)');
  let mobileTrackingActive = false;

  const updateMobileProgress = () => {
    if (!mobileWorkflow.matches || !steps.length) return;

    // The mobile line is sized from the actual first and last step markers so
    // variable copy length and viewport height cannot leave it stuck at step 1.
    const markerOffset = 28;
    const start = steps[0].offsetTop + markerOffset;
    const end = steps[steps.length - 1].offsetTop + markerOffset;
    const trackingPoint = window.innerHeight * 0.54;
    const positions = steps.map(step => step.getBoundingClientRect().top + markerOffset);
    const progress = Math.min(1, Math.max(0, (trackingPoint - positions[0]) / (positions[positions.length - 1] - positions[0] || 1)));
    const activeIndex = Math.max(0, positions.reduce((current, position, index) => (
      position <= trackingPoint ? index : current
    ), -1));

    workflow.style.setProperty('--workflow-line-start', `${start}px`);
    workflow.style.setProperty('--workflow-line-length', `${Math.max(end - start, 0)}px`);
    workflow.style.setProperty('--workflow-progress', progress.toFixed(3));
    workflow.classList.add('is-mobile-tracked');
    steps.forEach((step, index) => step.classList.toggle('is-current', index <= activeIndex));
  };

  const setupMobileTracking = () => {
    if (mobileTrackingActive) return;
    mobileTrackingActive = true;
    window.addEventListener('scroll', updateMobileProgress, { passive: true });
    window.addEventListener('resize', updateMobileProgress);
    updateMobileProgress();
  };

  mobileWorkflow.addEventListener('change', () => {
    if (mobileWorkflow.matches) setupMobileTracking();
    else workflow.classList.remove('is-mobile-tracked');
  });

  const activate = () => {
    workflow.classList.add('flow-live');
    if (mobileWorkflow.matches) {
      setupMobileTracking();
      return;
    }
    steps.forEach((step, index) => {
      if (motionOK) window.setTimeout(() => step.classList.add('is-current'), index * 160 + 260);
      else step.classList.add('is-current');
    });
  };

  if (!motionOK || !('IntersectionObserver' in window)) {
    workflow.classList.add('is-visible');
    activate();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      activate();
      observer.disconnect();
    }
  }, { threshold: 0.25 });
  observer.observe(workflow);
}

function setupSectionTracking() {
  const links = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window) || !sections.length) return;

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

function setupTestimonialStates() {
  document.querySelectorAll('.quote-grid blockquote').forEach(quote => {
    const activate = () => quote.classList.add('is-active');
    const deactivate = () => quote.classList.remove('is-active');
    quote.addEventListener('pointerenter', activate);
    quote.addEventListener('pointerleave', deactivate);
    quote.addEventListener('focusin', activate);
    quote.addEventListener('focusout', deactivate);
  });
}

function setupVariantSwitcher() {
  const currentDesign = design || '1';
  document.querySelectorAll('.variant-switch a[data-variant]').forEach(link => {
    link.classList.toggle('is-current', link.dataset.variant === currentDesign);
    if (link.dataset.variant === currentDesign) link.setAttribute('aria-current', 'page');
  });
}

setupMobileNavigation();
setupMockupSemantics();
setupRevealAnimations();
setupScrollState();
setupMetricAnimation();
setupWorkflow();
setupSectionTracking();
setupTestimonialStates();
setupVariantSwitcher();
