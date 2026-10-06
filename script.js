(function () {
  'use strict';

  // 1. THEME SWITCHING (LIGHT / DARK) WITH LOCALSTORAGE PERSISTENCE
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      themeLabel.textContent = 'Dark Mode';
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      themeLabel.textContent = 'Light Mode';
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  const savedTheme = localStorage.getItem('theme_preference');

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggleBtn.addEventListener('click', function () {
    const currentTheme =
      htmlEl.getAttribute('data-theme') || 'dark';

    const nextTheme =
      currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);

    try {
      localStorage.setItem(
        'theme_preference',
        nextTheme
      );
    } catch (e) {
      /* LocalStorage fallback if disabled */
    }
  });

  // 2. MOBILE DRAWER NAVIGATION
  const mobileToggle =
    document.getElementById('mobile-toggle');

  const mobileDrawer =
    document.getElementById('mobile-drawer');

  const mobileLinks =
    mobileDrawer.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isOpen =
      mobileDrawer.classList.contains('open');

    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute(
        'aria-expanded',
        'false'
      );
    } else {
      mobileDrawer.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute(
        'aria-expanded',
        'true'
      );
    }
  }

  mobileToggle.addEventListener(
    'click',
    toggleMobileMenu
  );

  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute(
        'aria-expanded',
        'false'
      );
    });
  });

  // 3. ACTIVE NAV SCROLL SPY
  const sections =
    document.querySelectorAll('section[id]');

  const navLinks =
    document.querySelectorAll(
      '#nav-tabs .nav-link'
    );

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight =
        section.offsetHeight;

      const sectionTop =
        section.offsetTop - 140;

      const sectionId =
        section.getAttribute('id');

      if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');

          if (
            link.getAttribute('href') ===
            '#' + sectionId
          ) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener(
    'scroll',
    updateActiveNav,
    { passive: true }
  );

    // 4. STORY SO FAR SLIDER

const storyData = [
  {
    category: "EARLY YEARS",
    year: "Childhood",
    title: "Childhood",
    description:
      "Strong early curiosity and fascination with technological tools.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.4 4.2L18 8.5l-4.6 1.3L12 14l-1.4-4.2L6 8.5l4.6-1.3L12 3z"></path>
        <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14z"></path>
      </svg>
    `
  },

  {
    category: "2015",
    year: "First Laptop",
    title: "First Laptop",
    description:
      "First personal computer introduced into the household; catalytic turning point.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="11" rx="1.5"></rect>
        <path d="M2 19h20"></path>
      </svg>
    `
  },

  {
    category: "FORMATIVE",
    year: "Self-Learning",
    title: "Self-Learning",
    description:
      "Mastered graphic design, video editing, and digital skills via YouTube tutorials.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <path d="M8 9l8 3-8 3V9z"></path>
      </svg>
    `
  },

  {
    category: "2025",
    year: "Marketing Roles",
    title: "Marketing Roles",
    description:
      "Led marketing operations at Star Group through trusted professional networks.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 18V10"></path>
        <path d="M10 18V6"></path>
        <path d="M16 18V9"></path>
        <path d="M22 18V4"></path>
        <path d="M3 21h20"></path>
      </svg>
    `
  },

  {
    category: "2026",
    year: "Entrepreneurship",
    title: "Entrepreneurship",
    description:
      "Founded Hiigsi Technologies to help community adapt to technology.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 21h14"></path>
        <path d="M7 21V8h10v13"></path>
        <path d="M9 8V5h6v3"></path>
        <path d="M10 12h4"></path>
        <path d="M10 16h4"></path>
      </svg>
    `
  },

  {
    category: "2026 – PRESENT",
    year: "Software Engineering",
    title: "Software Engineering",
    description:
      "Began formal engineering degree at Alhuda University.",
    icon: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 8l-4 4 4 4"></path>
        <path d="M16 8l4 4-4 4"></path>
        <path d="M14 5l-4 14"></path>
      </svg>
    `
  }
];


  const storyCard =
    document.getElementById("story-card");

  const storyCategory =
    document.getElementById("story-category");

  const storyYear =
    document.getElementById("story-year");

  const storyTitle =
    document.getElementById("story-title");

  const storyDescription =
    document.getElementById("story-description");
    const storyIcon =
  document.getElementById("story-icon");

  const storyCurrent =
    document.getElementById("story-current");

  const storyPrev =
    document.getElementById("story-prev");

  const storyNext =
    document.getElementById("story-next");

  const storyProgress =
    document.getElementById("story-progress-fill");


  let currentStory = 0;


  function updateStory(direction = "next") {

    const exitClass =
      direction === "next"
        ? "story-exit-left"
        : "story-exit-right";

    const enterClass =
      direction === "next"
        ? "story-enter-left"
        : "story-enter-right";


    storyCard.classList.add(exitClass);


    setTimeout(() => {

      const story = storyData[currentStory];

      storyCategory.textContent =
        story.category;

      storyYear.textContent =
        story.year;

      storyTitle.textContent =
        story.title;

      storyDescription.textContent =
        story.description;
storyIcon.innerHTML = story.icon;
      storyCurrent.textContent =
        String(currentStory + 1).padStart(2, "0");


      storyProgress.style.width =
        `${((currentStory + 1) / storyData.length) * 100}%`;


      storyCard.classList.remove(exitClass);

      storyCard.classList.add(enterClass);


      requestAnimationFrame(() => {

        requestAnimationFrame(() => {

          storyCard.classList.remove(
            enterClass
          );

        });

      });


      storyPrev.disabled =
        currentStory === 0;

      storyNext.disabled =
        currentStory === storyData.length - 1;

    }, 300);
  }


  storyNext.addEventListener("click", () => {

    if (currentStory < storyData.length - 1) {

      currentStory++;

      updateStory("next");

    }

  });


  storyPrev.addEventListener("click", () => {

    if (currentStory > 0) {

      currentStory--;

      updateStory("prev");

    }

  });


  // Keyboard navigation

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "ArrowRight" &&
      currentStory < storyData.length - 1
    ) {

      currentStory++;

      updateStory("next");

    }


    if (
      event.key === "ArrowLeft" &&
      currentStory > 0
    ) {

      currentStory--;

      updateStory("prev");

    }

  });


  // Initial state

  storyPrev.disabled = true;

  icon: "..."

  
})();