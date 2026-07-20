const year = document.querySelector("#year");
const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');
const hamburger = document.querySelector("[data-hamburger]");
const navDrawer = document.querySelector(".nav-drawer");

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

function setTheme(theme) {
  root.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  }
  if (themeColor) {
    themeColor.setAttribute("content", theme === "dark" ? "#101d19" : "#f8fbf8");
  }
}

const stored = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(stored || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  setTheme(nextTheme);
});

hamburger?.addEventListener("click", () => {
  const open = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !open);
  navDrawer.toggleAttribute("data-open");
  hamburger.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
});

navDrawer?.addEventListener("click", (e) => {
  if (e.target.closest("a, button")) {
    hamburger.setAttribute("aria-expanded", "false");
    navDrawer.removeAttribute("data-open");
    hamburger.setAttribute("aria-label", "Open navigation");
  }
});
