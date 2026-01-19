import { LovelaceLabs } from "./components/LovelaceLabs";
import { ThemeToggle } from "./components/ThemeToggle";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = LovelaceLabs + ThemeToggle;
}

function registerStore() {
  // @ts-ignore
  const Alpine = window.Alpine;

  if (Alpine && !Alpine.store("theme")) {
    Alpine.store("theme", {
      current:
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"),

      init() {
        document.documentElement.classList.toggle(
          "dark",
          this.current === "dark",
        );
        this.updateFavicon();
      },

      toggle() {
        this.current = this.current === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle(
          "dark",
          this.current === "dark",
        );
        localStorage.setItem("theme", this.current);
        this.updateFavicon();
      },

      updateFavicon() {
        const favicon = document.querySelector('link[type="image/svg+xml"]');
        if (favicon) {
          favicon.setAttribute("href", `/favicon-${this.current}.svg`);
        }
      },
    });
  }
}

// @ts-ignore
if (window.Alpine) {
  registerStore();
} else {
  document.addEventListener("alpine:init", registerStore);
}
