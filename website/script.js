// Copy install command
const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("bunx create-rejoice-app your_app_name").then(() => {
    copyLabel.textContent = "Copied!";
    setTimeout(() => {
      copyLabel.textContent = "Copy";
    }, 2000);
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".feature-row, .agents-text, .agents-code").forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// Inject fade-in styles
const style = document.createElement("style");
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
