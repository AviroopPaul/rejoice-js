// Copy install command
const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("bunx create-rejoice-app@latest your_app_name").then(() => {
    copyLabel.textContent = "Copied!";
    setTimeout(() => {
      copyLabel.textContent = "Copy";
    }, 2000);
  });
});

// MCP Modal
const mcpOverlay = document.getElementById("mcpModalOverlay");
const mcpOpenBtn = document.getElementById("connectMcpBtn");
const mcpCloseBtn = document.getElementById("mcpModalClose");

mcpOpenBtn.addEventListener("click", () => mcpOverlay.classList.add("open"));
mcpCloseBtn.addEventListener("click", () => mcpOverlay.classList.remove("open"));
mcpOverlay.addEventListener("click", (e) => {
  if (e.target === mcpOverlay) mcpOverlay.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") mcpOverlay.classList.remove("open");
});

// MCP Tabs
document.querySelectorAll(".mcp-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".mcp-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".mcp-tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
  });
});

// MCP Copy buttons
document.querySelectorAll(".mcp-copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(btn.dataset.copy).then(() => {
      const svg = btn.querySelector("svg");
      const original = svg.innerHTML;
      svg.innerHTML =
        '<polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      btn.style.color = "var(--green)";
      setTimeout(() => {
        svg.innerHTML = original;
        btn.style.color = "";
      }, 1500);
    });
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
