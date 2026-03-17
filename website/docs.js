// Sidebar toggle (mobile)
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

// Create overlay element
const overlay = document.createElement("div");
overlay.className = "sidebar-overlay";
document.body.appendChild(overlay);

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

sidebarToggle.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

overlay.addEventListener("click", closeSidebar);

// Close sidebar on link click (mobile)
sidebar.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });
});

// Active sidebar link tracking
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const sections = [];

sidebarLinks.forEach((link) => {
  const id = link.getAttribute("href")?.replace("#", "");
  if (id) {
    const section = document.getElementById(id);
    if (section) {
      sections.push({ id, el: section, link });
    }
  }
});

function updateActiveLink() {
  // Use getBoundingClientRect for accurate position regardless of nesting
  const offset = 100;
  let current = sections[0];

  for (const section of sections) {
    const rect = section.el.getBoundingClientRect();
    if (rect.top <= offset) {
      current = section;
    }
  }

  sidebarLinks.forEach((l) => l.classList.remove("sidebar-link--active"));
  if (current) {
    current.link.classList.add("sidebar-link--active");
    // Scroll the active link into view within the sidebar
    current.link.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// Copy code buttons
document.querySelectorAll(".code-copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const codeBlock = btn.closest(".code-block");
    const code = codeBlock.querySelector("pre code");
    const text = code.textContent;

    navigator.clipboard.writeText(text).then(() => {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    });
  });
});

// Smooth scroll offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href").replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.offsetTop - 72;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  });
});
