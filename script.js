/* ==========================================================================
   PORTFOLIO INTERACTIVE LOGIC & ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. PROJECT DATA
  const projectsData = {
    'civic-issue-system': {
      title: 'Crowdsourced Civic Issue Reporting System',
      year: '2026',
      desc: 'Developing a web-based platform that allows citizens to report civic issues such as potholes, garbage accumulation, water leakage, and streetlight failures by uploading images and location details. The system uses geolocation to map reported issues and send them to the appropriate municipal authorities. It also provides a dashboard to track complaints, update status, and manage issue resolution efficiently, promoting transparency and faster response to civic problems.',
      problem: 'Civic complaints often go unnoticed due to traditional, slow, and non-transparent reporting channels. Municipal authorities lack real-time geolocation tracking and unified dashboards to efficiently manage and prioritize reported public complaints.',
      solution: 'A centralized, geolocation-enabled MERN stack application where citizens upload images and precise coordinates of issues. The system maps these coordinates, routes reports directly to relevant municipal offices, and displays statuses transparently on a public dashboard.',
      features: [
        'Interactive mapping of local issues using Geolocation & maps APIs.',
        'Image upload with automatic metadata processing.',
        'Public dashboard for tracking real-time status (Reported, In Progress, Resolved).',
        'Administrative dashboard with role-based access for municipal department authorities.',
        'Automated report categorization and priority matrix routing.'
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Geolocation API', 'Google Maps API'],
      
      images: [
        'images/civiceye1.png',
        'images/Civiceye2.png',
        'images/civiceye3.png',
        'images/civiceye4.png'
      ]
    },
    'hirelens-analyzer': {
      title: 'HireLens - Resume Analyzer',
      year: '2025',
      desc: 'Developed a full-stack Resume Analyzer using the MERN stack that evaluates uploaded resumes and generates a relevance score. The application provides detailed feedback on resume quality, highlighting strengths and areas for improvement. It analyzes skills, keywords, and resume content to help users improve their resumes through data-driven recommendations.',
      problem: 'Job seekers face difficulty understanding why their resumes are screened out by Automated Applicant Tracking Systems (ATS), lacking structured, data-driven feedback on resume keyword alignment and content quality.',
      solution: 'An interactive analyzer built on MERN that reads uploaded PDF resumes, parses core skills/keywords, and grades their alignment with specific job domains, highlighting strengths and recommending specific improvements.',
      features: [
        'Resume file parsing (PDF/DOCX support).',
        'Keyword match scoring engine compared against industry standards.',
        'Custom interactive feedback dashboard showing score breakdown.',
        'Intelligent skill gaps identification and matching courses recommendations.',
        'Clean user workspace history saving previous reviews.'
      ],
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      
      images: [
        'images/resume_analyser1.png',
        'images/resume_analyser2.png'
      ]
    },
    'weather-app': {
      title: 'Weather Forecasting App',
      year: '2025',
      desc: 'Developed a dynamic weather forecasting application that provides real-time weather updates using the OpenWeatherMap API. Users can search for cities and view temperature, humidity, wind speed, and weather conditions through a clean and responsive interface.',
      problem: 'Traditional weather checkers have crowded UI layouts full of ads and lack responsive, fast-loading, minimalist forecasting reports for mobile users.',
      solution: 'A clean Django and Python-backed web app consuming the OpenWeatherMap API to display crisp coordinates, current temperature, pressure, humidity, and forecast description in a minimalist glassmorphic interface.',
      features: [
        'Live city-based weather search querying OpenWeatherMap API.',
        'Detailed metric details (temperature, humidity, wind speed, atmospheric pressure).',
        'Responsive dynamic card layout changing styles based on current weather conditions.',
        'Lightweight backend implementation minimizing API rate limit exhaustion.'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Python', 'Django', 'OpenWeatherMap API'],
      
      images: [
        'images/weather1.png',
        'images/weather2.png'
      ]
    }
  };

  // 2. NAV ACCORDION / HAMBURGER MENU
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // 3. STICKY NAVBAR HEADER
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Set initial state of scrolled header on reload
  if (window.scrollY > 50) {
    siteHeader.classList.add('scrolled');
  }

  // 4. ACTIVE SECTION NAVIGATION OBSERVER
  const sections = document.querySelectorAll('section[id]');
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle portion
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // 5. TYPEWRITER EFFECT
  const typewriterElement = document.getElementById('typewriter');
  const typewriterWords = [
    'Full Stack Developer',
    'Software Developer',
    'MERN Stack Developer',
    'ECE Student',
    'Problem Solver',
    'Tech Enthusiast'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = typewriterWords[wordIndex];
    
    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // deletion is faster
    } else {
      // Typing text
      typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // normal speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % typewriterWords.length;
      typingSpeed = 500; // pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  // Start Typewriter
  if (typewriterElement) {
    setTimeout(type, 1000);
  }

  // 6. SCROLL REVEAL (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // trigger slightly before entry
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // 7. IN-SITE PROJECT SHOWCASE ROUTING
  const portfolioContainer = document.getElementById('portfolio-container');
  const showcaseView = document.getElementById('project-showcase-view');
  const showcaseBackBtn = document.getElementById('showcase-back-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Showcase elements
  const scTitle = document.getElementById('showcase-title');
  const scYear = document.getElementById('showcase-year');
  const scBanner = document.getElementById('showcase-banner');
  const scDesc = document.getElementById('showcase-desc');
  const scProblem = document.getElementById('showcase-problem');
  const scSolution = document.getElementById('showcase-solution');
  const scFeatures = document.getElementById('showcase-features');
  const scTechTags = document.getElementById('showcase-tech-tags');
  const scGithubLink = document.getElementById('showcase-github-link');
  const scLiveLink = document.getElementById('showcase-live-link');
  const scGallerySection = document.getElementById('showcase-gallery-section');
  const carouselTrack = document.getElementById('carousel-track');
  const carouselDots = document.getElementById('carousel-dots');
  const carouselBtnPrev = document.getElementById('carousel-btn-prev');
  const carouselBtnNext = document.getElementById('carousel-btn-next');

  let currentCarouselIndex = 0;
  let carouselSlides = [];

  function openProjectShowcase(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    // Populate general details
    scTitle.textContent = project.title;
    scYear.textContent = project.year;
    scDesc.textContent = project.desc;
    scProblem.textContent = project.problem;
    scSolution.textContent = project.solution;

    // Populate Tech stack tags
    scTechTags.innerHTML = '';
    project.tech.forEach(techName => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = techName;
      scTechTags.appendChild(tag);
    });

    // Populate Features
    scFeatures.innerHTML = '';
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      scFeatures.appendChild(li);
    });

    // Repopulate Links
    scGithubLink.href = project.github;
    if (project.live && project.live !== '#') {
      scLiveLink.href = project.live;
      scLiveLink.classList.remove('disabled');
      scLiveLink.removeAttribute('disabled');
    } else {
      scLiveLink.href = '#';
      scLiveLink.classList.add('disabled');
      scLiveLink.setAttribute('disabled', 'true');
    }

    // Populate Banner Image & Carousel Gallery
    scBanner.innerHTML = '';
    if (project.images && project.images.length > 0) {
      // If there are project images, set first as banner
      const bannerImg = document.createElement('img');
      bannerImg.src = project.images[0];
      bannerImg.alt = `${project.title} Banner`;
      scBanner.appendChild(bannerImg);

      // Populate Gallery Carousel
      scGallerySection.style.display = 'block';
      carouselTrack.innerHTML = '';
      carouselDots.innerHTML = '';
      currentCarouselIndex = 0;

      project.images.forEach((imgSrc, idx) => {
        // Slide
        const slide = document.createElement('li');
        slide.className = 'carousel-slide';
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${project.title} Screenshot ${idx + 1}`;
        slide.appendChild(img);
        carouselTrack.appendChild(slide);

        // Dot
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide-to', idx);
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        carouselDots.appendChild(dot);
      });

      carouselSlides = Array.from(carouselTrack.children);

      // Handle carousel buttons visibility
      if (project.images.length > 1) {
        carouselBtnPrev.classList.remove('hidden');
        carouselBtnNext.classList.remove('hidden');
      } else {
        carouselBtnPrev.classList.add('hidden');
        carouselBtnNext.classList.add('hidden');
      }
      
      updateCarouselPosition();

    } else {
      // Fallback banner gradient representation
      const bannerFallback = document.createElement('div');
      bannerFallback.className = 'project-placeholder-visual';
      bannerFallback.style.width = '100%';
      bannerFallback.style.height = '100%';
      
      // Select gradients based on project
      if (projectId === 'civic-issue-system') {
        bannerFallback.style.background = 'linear-gradient(135deg, #41436A, #984063)';
        bannerFallback.innerHTML = '<i class="fa-solid fa-map-location-dot" style="font-size: 6rem; opacity: 0.15;"></i>';
      } else {
        bannerFallback.style.background = 'linear-gradient(135deg, #984063, #F64668)';
        bannerFallback.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart" style="font-size: 6rem; opacity: 0.15;"></i>';
      }
      scBanner.appendChild(bannerFallback);

      // Hide gallery carousel
      scGallerySection.style.display = 'none';
    }

    // Toggle View State
    document.body.classList.add('showcase-open');
    showcaseView.classList.add('active');
    showcaseView.setAttribute('aria-hidden', 'false');
    showcaseView.scrollTo({ top: 0, behavior: 'instant' });

    // Push hash to state to allow browser back button closure
    window.location.hash = `project-${projectId}`;
  }

  function closeProjectShowcase() {
    document.body.classList.remove('showcase-open');
    showcaseView.classList.remove('active');
    showcaseView.setAttribute('aria-hidden', 'true');
    
    // Clear project hashes but keep default scroll state
    if (window.location.hash.startsWith('#project-')) {
      // Remove hash without scrolling
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  // Bind trigger click on project cards
  projectCards.forEach(card => {
    const trigger = card.querySelector('.project-details-trigger');
    const projectId = card.getAttribute('data-project-id');
    
    if (trigger && projectId) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openProjectShowcase(projectId);
      });
    }
  });

  // Bind back button click
  showcaseBackBtn.addEventListener('click', () => {
    closeProjectShowcase();
    // Scroll smoothly to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Listen to popstate hash changes (handles physical browser back button clicks)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (!hash.startsWith('#project-') && document.body.classList.contains('showcase-open')) {
      closeProjectShowcase();
    } else if (hash.startsWith('#project-') && !document.body.classList.contains('showcase-open')) {
      const projectId = hash.replace('#project-', '');
      openProjectShowcase(projectId);
    }
  });

  // Handle page reload with project hash
  const initialHash = window.location.hash;
  if (initialHash.startsWith('#project-')) {
    const projectId = initialHash.replace('#project-', '');
    // Delay slightly to let resources initialize
    setTimeout(() => {
      openProjectShowcase(projectId);
    }, 200);
  }

  // 8. GALLERY CAROUSEL LOGIC
  function updateCarouselPosition() {
    if (carouselSlides.length === 0) return;
    const amountToMove = carouselSlides[currentCarouselIndex].style.left;
    carouselTrack.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    // Update dots status
    const dots = Array.from(carouselDots.children);
    dots.forEach((dot, idx) => {
      if (idx === currentCarouselIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  carouselBtnPrev.addEventListener('click', () => {
    if (currentCarouselIndex > 0) {
      currentCarouselIndex--;
      updateCarouselPosition();
    } else {
      currentCarouselIndex = carouselSlides.length - 1;
      updateCarouselPosition();
    }
  });

  carouselBtnNext.addEventListener('click', () => {
    if (currentCarouselIndex < carouselSlides.length - 1) {
      currentCarouselIndex++;
      updateCarouselPosition();
    } else {
      currentCarouselIndex = 0;
      updateCarouselPosition();
    }
  });

  // Dots selection
  carouselDots.addEventListener('click', (e) => {
    const targetDot = e.target.closest('.carousel-dot');
    if (!targetDot) return;
    currentCarouselIndex = parseInt(targetDot.getAttribute('data-slide-to'), 10);
    updateCarouselPosition();
  });

  // 9. FORM VALIDATION & EMAILJS
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');
      
      let isValid = true;
      
      // Name validation
      if (nameInput.value.trim() === '') {
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('invalid');
      }
      
      // Email validation
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('invalid');
      }
      
      // Subject validation
      if (subjectInput.value.trim() === '') {
        subjectInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        subjectInput.parentElement.classList.remove('invalid');
      }
      
      // Message validation
      if (messageInput.value.trim() === '') {
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('invalid');
      }
      
      if (isValid) {
        // Send state trigger
        const submitBtn = document.getElementById('form-submit-btn');
        const origBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        
        // MOCK EMAILJS SENDING PIPELINE
        // In real execution, user connects EmailJS using script:
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnHTML;
          
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
          
          contactForm.reset();
          
          // Clear status after 5 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 6000);
        }, 1500);
      } else {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Please correct the highlighted errors in the form.';
        formStatus.style.display = 'block';
      }
    });
  }

  // 10. CURRENT YEAR IN FOOTER
  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
});
