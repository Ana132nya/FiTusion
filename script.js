/* ============================================================
   FiTusion – Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header Scroll Effect ---------- */
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile Navigation ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navButtons = document.getElementById('navButtons');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navButtons.classList.toggle('open');

    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navButtons.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = navLinks.querySelectorAll('a');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const match = navLinks.querySelector(`a[href="#${id}"]`);
        if (match) match.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- Scroll Animations (Intersection Observer) ---------- */
  const animElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animElements.forEach(el => observer.observe(el));

  /* ---------- Services Carousel ---------- */
  const servicesTrack = document.getElementById('servicesTrack');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;

  const updateCarousel = (index) => {
    currentSlide = index;
    const cardWidth = servicesTrack.querySelector('.service-card').offsetWidth + 20; // gap
    const cardsVisible = Math.floor(servicesTrack.parentElement.offsetWidth / cardWidth);
    const maxSlide = Math.max(0, servicesTrack.children.length - cardsVisible);
    const slideIndex = Math.min(index * cardsVisible, maxSlide);
    servicesTrack.style.transform = `translateX(-${slideIndex * cardWidth}px)`;

    carouselDots.forEach(dot => dot.classList.remove('active'));
    carouselDots[index]?.classList.add('active');
  };

  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      updateCarousel(parseInt(dot.dataset.index));
    });
  });

  // Auto-advance carousel
  let carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % carouselDots.length;
    updateCarousel(currentSlide);
  }, 5000);

  servicesTrack?.parentElement.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });

  servicesTrack?.parentElement.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % carouselDots.length;
      updateCarousel(currentSlide);
    }, 5000);
  });

  /* ---------- Testimonial Navigation ---------- */
  const testimonials = [
    {
      image: 'images/testimonial-james.png',
      quote: '"I Love The Variety Of Workouts On Fit Fusion. Whether It\'s HIIT, Yoga, Or Strength Training, There\'s Always Something New To Try. The Progress Tracking Tools Keep Me Motivated!"',
      name: '– James T.',
      location: 'LA, USA',
      stars: 5
    },
    {
      image: 'images/testimonial-ryan.png',
      quote: '"The trainers at FiTusion are incredible. They pushed me beyond my limits and helped me achieve results I never thought possible. Best investment in my health!"',
      name: '– Ryan B.',
      location: 'NY, USA',
      stars: 5
    },
    {
      image: 'images/trainer-logan.png',
      quote: '"FiTusion transformed my entire approach to fitness. The community support and personalized plans make every workout count. I\'ve never felt stronger!"',
      name: '– Ethan M.',
      location: 'Chicago, USA',
      stars: 5
    }
  ];

  let currentTestimonial = 0;
  const testimonialImage = document.querySelector('.testimonial-image img');
  const testimonialQuote = document.querySelector('.testimonial-content blockquote');
  const testimonialName = document.querySelector('.testimonial-author .name');
  const testimonialLocation = document.querySelector('.testimonial-author .location');

  const updateTestimonial = (index) => {
    currentTestimonial = index;
    const t = testimonials[index];

    // Fade out
    testimonialImage.style.opacity = '0';
    testimonialQuote.style.opacity = '0';

    setTimeout(() => {
      testimonialImage.src = t.image;
      testimonialQuote.textContent = t.quote;
      testimonialName.textContent = t.name;
      testimonialLocation.textContent = t.location;

      // Fade in
      testimonialImage.style.opacity = '1';
      testimonialQuote.style.opacity = '1';
    }, 300);
  };

  // Add transition for smooth fading
  if (testimonialImage) {
    testimonialImage.style.transition = 'opacity 0.3s ease';
  }
  if (testimonialQuote) {
    testimonialQuote.style.transition = 'opacity 0.3s ease';
  }

  document.getElementById('testimonialNext')?.addEventListener('click', () => {
    const next = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(next);
  });

  document.getElementById('testimonialPrev')?.addEventListener('click', () => {
    const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(prev);
  });

  /* ---------- CTA Form ---------- */
  document.getElementById('ctaForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) {
      const btn = e.target.querySelector('button');
      btn.textContent = '✓ Joined!';
      btn.style.background = '#1a1a1a';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Join Now';
        btn.style.background = '';
      }, 2500);
    }
  });

  /* ---------- Smooth Scroll for All Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Parallax-like Stat Cards ---------- */
  const statCards = document.querySelectorAll('.stat-card');
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateStatCards = () => {
    statCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (mouseX - centerX) / 80;
      const deltaY = (mouseY - centerY) / 80;

      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    requestAnimationFrame(animateStatCards);
  };

  // Only run parallax on desktop
  if (window.innerWidth > 992) {
    animateStatCards();
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('.stat-value');
  let counterAnimated = false;

  const animateCounters = () => {
    if (counterAnimated) return;
    const heroSection = document.getElementById('hero');
    const rect = heroSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counterAnimated = true;

      counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const isFloat = target % 1 !== 0;
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
        }, 40);
      });
    }
  };

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Initial check

});
