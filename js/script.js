// Navigation functionality
const navMenu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

// Smooth scrolling for navigation
navMenu.addEventListener("click", (e) => {
  const target = e.target.getAttribute("href");

  // Only handle internal links
  if (target && target.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(target);

    if (section) {
      const sectionTop = section.offsetTop - 80;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      // Close mobile menu after clicking
      if (window.innerWidth <= 768) {
        toggleMenu();
      }
    }
  }
});

// Mobile menu toggle
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  const hamburger = document.getElementById("hamburger");
  
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typewriting effect
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 150;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typewriter effect
document.addEventListener('DOMContentLoaded', function() {
  const txtElement = document.querySelector('.typewrite');
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-delay') || 3000;
    new TypeWriter(txtElement, words, wait);
  }

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const animatedElements = document.querySelectorAll('.portfolio-grid > div, .work-bottom > div, .tech-item');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});
