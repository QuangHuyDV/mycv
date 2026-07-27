// Interactivity and Scroll Animations for Đặng Quang Huy Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Elements
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const themeCheckbox = document.getElementById("checkbox");
  const sections = document.querySelectorAll("section");

  // 2. Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = navToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark";
      } else {
        icon.className = "fa-solid fa-bars";
      }
    });
  }

  // Close menu when clicking a link (mobile view)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.querySelector("i").className = "fa-solid fa-bars";
      }
    });
  });

  // 3. Theme Toggle (Dark / Light Theme)
  // Check local storage for preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) {
    document.body.className = currentTheme;
    if (currentTheme === "light-theme") {
      themeCheckbox.checked = true;
    }
  }

  themeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      document.body.className = "light-theme";
      localStorage.setItem("theme", "light-theme");
    } else {
      document.body.className = "";
      localStorage.setItem("theme", "");
    }
  });

  // 4. Shrink Navbar on Scroll (toggle class to avoid layout thrashing)
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // run once and on scroll
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll);

  // 5. Active Link Highlight on Scroll
  const highlightLink = () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document
          .querySelector(`.nav-menu a[href*=${sectionId}]`)
          ?.classList.add("active");
      } else {
        document
          .querySelector(`.nav-menu a[href*=${sectionId}]`)
          ?.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", highlightLink);

  // 6. Scroll Triggered Entrance Animations (Intersection Observer)
  const fadeElements = document.querySelectorAll(".fade-in");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  fadeElements.forEach((el, index) => {
    // Add a slight delay for staggered appearance if needed
    el.style.transitionDelay = `${index * 0.05}s`;
    scrollObserver.observe(el);
  });
});
