const year = document.querySelector("#year");
const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');

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

setTheme(localStorage.getItem("portfolio-theme") || "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  setTheme(nextTheme);
});
