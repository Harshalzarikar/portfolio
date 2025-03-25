// Project data
const projects = [
  {
    title: "Emotion Detection from Images",
    description:
      "Developed a Convolutional Neural Network (CNN) model to detect human emotions from facial images with high accuracy. The model recognizes emotions like happiness, sadness, anger, and surprise through real-time analysis of user-uploaded images.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "CNN"],
  },
  {
    title: "IPL Scorecard Prediction",
    description:
      "Created a machine learning model to predict the final score of IPL cricket matches using historical match data. Utilized regression techniques to analyze patterns and improve prediction accuracy. Presented predictions and insights via a user-friendly interface for enhanced accessibility.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
  },
  {
    title: "E-Commerce Platform with Real-Time Recommendations",
    description:
      "Developed an e-commerce website featuring dynamic product listings and a collaborative filtering recommendation engine. Integrated secure user authentication and payment processing system for end-to-end functionality.",
    technologies: ["Python", "Flask", "JavaScript", "HTML/CSS"],
  },
  {
    title: "AI-Powered Applications at Finsocial",
    description:
      "Developed NLP-based applications using Large Language Models (LLM) with Ollama, implemented FastAPI-based web applications, and created web scraping solutions for data extraction.",
    technologies: ["Python", "FastAPI", "LLM", "Web Scraping", "Ollama"],
  },
  {
    title: "Machine Learning Models at iNeuron.ai",
    description:
      "Implemented and optimized machine learning models for real-world business applications, focusing on data preprocessing, feature selection, and model tuning for improved accuracy.",
    technologies: [
      "Python",
      "Machine Learning",
      "Data Preprocessing",
      "Model Optimization",
    ],
  },
];

// Theme switcher functionality
function initThemeSwitcher() {
  const themeSwitch = document.getElementById("theme-switch");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(isDark) {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  } else {
    setTheme(prefersDarkScheme.matches);
  }

  themeSwitch.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    setTheme(!isDark);
  });
}

// Parallax effect
function initParallax() {
  const parallaxLayers = document.querySelectorAll(".parallax-layer");

  window.addEventListener("scroll", () => {
    parallaxLayers.forEach((layer) => {
      const speed = layer.getAttribute("data-speed");
      const yPos = -(window.pageYOffset * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Load projects and initialize filters
function loadProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  const filterContainer = document.createElement("div");
  filterContainer.className = "project-filters";
  projectsGrid.parentElement.insertBefore(filterContainer, projectsGrid);

  // Get unique technologies
  const allTechnologies = [
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];

  // Create filter buttons
  const allButton = document.createElement("button");
  allButton.className = "filter-btn active";
  allButton.textContent = "All";
  filterContainer.appendChild(allButton);

  allTechnologies.forEach((tech) => {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.textContent = tech;
    filterContainer.appendChild(button);
  });

  // Add projects
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card animate-on-scroll";
    projectCard.dataset.technologies = project.technologies.join(",");

    projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${project.technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
            </div>
        `;

    projectsGrid.appendChild(projectCard);
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const technology = button.textContent;
      const projectCards = document.querySelectorAll(".project-card");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const technologies = card.dataset.technologies.split(",");
        if (technology === "All" || technologies.includes(technology)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Initialize EmailJS
(function () {
  emailjs.init("8XbWB44ecWQNuOqzy");
})();

// Handle contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = this.querySelector("button");
  btn.disabled = true;
  btn.textContent = "Sending...";

  const templateParams = {
    from_name: this.name.value,
    from_email: this.email.value,
    message: this.message.value,
  };

  emailjs
    .send("service_unk3k1w", "template_4f3v8sp", templateParams)
    .then(() => {
      this.reset();
      alert("Thank you for your message! I will get back to you soon.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Oops! Something went wrong. Please try again later.");
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = "Send Message";
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initParallax();
  loadProjects();

  // Loading animation for project cards
  function addSkeletonLoading() {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.classList.add("skeleton");
      setTimeout(() => card.classList.remove("skeleton"), 1500);
    });
  }

  // Scroll to top button functionality
  const scrollButton = document.createElement("button");
  scrollButton.className = "scroll-to-top";
  scrollButton.innerHTML = "↑";
  document.body.appendChild(scrollButton);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Typing animation for hero section
  function setupTypingAnimation() {
    const heroTitle = document.querySelector(".hero-content h1");
    if (heroTitle) {
      heroTitle.classList.add("typing-text");
    }
  }

  function initParticles() {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
      },
      retina_detect: true,
    });
  }

  // Initialize particles
  initParticles();

  // Initialize all animations
  addSkeletonLoading();
  setupTypingAnimation();

  // Theme is already handled by initThemeSwitcher function

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Scroll animation using Intersection Observer
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animateElements.forEach((element) => observer.observe(element));

  // Skill bars animation with Intersection Observer
  const skillBars = document.querySelectorAll(".skill-bar");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progress = entry.target.querySelector(".skill-progress");
          const percentage = progress.getAttribute("data-progress");
          // Set initial width to 0
          progress.style.width = "0%";
          // Trigger animation after a small delay
          setTimeout(() => {
            progress.style.width = percentage + "%";
          }, 200);
          // Unobserve after animation is triggered
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
});
