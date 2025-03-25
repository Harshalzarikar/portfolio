// Smooth reveal animation for sections
const revealElements = document.querySelectorAll(".animate-on-scroll");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize animations
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // Initial check

// Project filter animation
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.textContent.toLowerCase();

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const technologies = item.dataset.technologies.toLowerCase().split(",");
      const shouldShow = filter === "all" || technologies.includes(filter);

      item.style.opacity = "0";
      setTimeout(() => {
        item.style.display = shouldShow ? "block" : "none";
        if (shouldShow) {
          setTimeout(() => {
            item.style.opacity = "1";
          }, 50);
        }
      }, 300);
    });
  });
});

// Skill bar animation
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    // Reset width to ensure animation works
    bar.style.width = "0%";
    // Trigger reflow
    bar.offsetHeight;
    // Animate to target width
    requestAnimationFrame(() => {
      bar.style.width = progress + "%";
    });
  });
};

// Initialize skill bar animation when in view
const skillSection = document.querySelector(".skills-grid");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          animateSkillBars();
        }, 100);
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillSection) {
  skillObserver.observe(skillSection);
}
