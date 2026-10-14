(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const content = window.BIRTHDAY_CONTENT || {};
    const screens = Array.from(document.querySelectorAll(".screen"));
    const header = document.getElementById("siteHeader");
    const footer = document.getElementById("siteFooter");
    const chapterIndicator = document.getElementById("chapterIndicator");
    const toast = document.getElementById("toast");
    const audio = document.getElementById("backgroundMusic");
    const soundToggle = document.getElementById("soundToggle");
    const soundLabel = document.getElementById("soundLabel");
    const brandLogo = document.getElementById("brandLogo");
    const brandLogoFallback = document.getElementById("brandLogoFallback");
    let toastTimer;

    const chapters = {
      opening: "A NOTE FOR YOU",
      birthday: "THE CELEBRATION",
      messages: "A FEW REMINDERS",
      gallery: "MOMENTS WORTH KEEPING",
      letter: "A LETTER FOR YOU",
      wishes: "FOR YOUR FUTURE",
      lastWish: "ONE LAST THING",
      brandPage: "MADE BY PRIME CREATIONS"
    };

    function setText(selector, value) {
      const element = document.querySelector(selector);
      if (element && value !== undefined && value !== null) element.textContent = value;
    }

    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
    }

    function goToScreen(id, options = {}) {
      const target = document.getElementById(id);
      if (!target || !target.classList.contains("screen")) {
        showToast("That part of the experience could not be found. Please try again.");
        console.error("Missing screen:", id);
        return;
      }

      screens.forEach(screen => {
        const active = screen.id === id;
        screen.hidden = !active;
        screen.classList.toggle("is-active", active);
        screen.setAttribute("aria-hidden", String(!active));
      });

      if (header) header.classList.toggle("header-on-brand", id === "brandPage");
      if (footer) footer.classList.toggle("footer-on-brand", id === "brandPage");
      if (chapterIndicator) chapterIndicator.textContent = chapters[id] || "A NOTE FOR YOU";
      document.body.classList.toggle("brand-mode", id === "brandPage");
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      if (id === "brandPage") setText("#copyrightYear", new Date().getFullYear());
    }

    // All user-facing names, dates, and contact information come from one config file.
    setText('[data-content="openingLabel"]', content.openingLabel || "A LITTLE SOMETHING FOR YOU");
    setText('[data-content="openingButton"]', content.openingButton || "OPEN YOUR SURPRISE");
    setText('[data-content="recipientName"]', content.recipientName || "[HER NAME]");
    setText('[data-content="creatorName"]', content.creatorName || "Priyam Mondal");

    const contactLink = document.getElementById("contactLink");
    if (contactLink) {
      const email = content.contactEmail || "primepriyam010@gmail.com";
      contactLink.href = "mailto:" + email;
      contactLink.textContent = "GET YOURS MADE — EMAIL PRIME CREATIONS ";
      const arrow = document.createElement("span");
      arrow.className = "button-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      contactLink.appendChild(arrow);
    }

    // Birthday date: never claim that the recipient's birthday is today unless it is.
    const dateElement = document.getElementById("birthdayDate");
    if (dateElement && content.birthdayDate) {
      const parts = content.birthdayDate.split("-").map(Number);
      const birthday = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      const sameDay = today.getFullYear() === birthday.getFullYear() &&
        today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate();
      const dateLabel = birthday.toLocaleDateString(undefined, { month: "long", day: "numeric" });
      dateElement.textContent = sameDay ? "TODAY IS YOUR DAY · " + dateLabel.toUpperCase() : "A LITTLE CELEBRATION OF YOU · " + dateLabel.toUpperCase();
    }

    // Opening action and all chapter navigation buttons.
    const revealButton = document.getElementById("revealButton");
    if (revealButton) revealButton.addEventListener("click", () => goToScreen("birthday"));
    document.querySelectorAll("[data-next]").forEach(button => {
      button.addEventListener("click", () => goToScreen(button.getAttribute("data-next")));
    });
    const brandPageButton = document.getElementById("brandPageButton");
    if (brandPageButton) brandPageButton.addEventListener("click", () => goToScreen("brandPage"));
    const replayLink = document.getElementById("replayLink");
    if (replayLink) replayLink.addEventListener("click", event => {
      event.preventDefault();
      goToScreen("opening");
    });

    // Gallery images: missing files become attractive, accessible placeholders.
    const photoPaths = Array.isArray(content.photoPaths) ? content.photoPaths : [];
    document.querySelectorAll(".photo-card").forEach((card, index) => {
      const img = card.querySelector("img");
      const placeholder = card.querySelector(".photo-placeholder");
      const configuredPath = photoPaths[index];
      if (!img) return;
      if (configuredPath) img.src = configuredPath;
      img.addEventListener("load", () => {
        img.classList.add("image-loaded");
        if (placeholder) placeholder.classList.add("placeholder-hidden");
      });
      img.addEventListener("error", () => {
        img.classList.remove("image-loaded");
        if (placeholder) placeholder.classList.remove("placeholder-hidden");
      });
      if (content.featuredPhotoIndex === index) card.classList.add("photo-featured");
      else card.classList.remove("photo-featured");
    });

    // Use a supplied logo if present; otherwise show the designed text fallback.
    if (brandLogo) {
      if (content.logoPath) brandLogo.src = content.logoPath;
      brandLogo.addEventListener("load", () => {
        brandLogo.classList.add("logo-loaded");
        if (brandLogoFallback) brandLogoFallback.hidden = true;
      });
      brandLogo.addEventListener("error", () => {
        brandLogo.classList.remove("logo-loaded");
        if (brandLogoFallback) brandLogoFallback.hidden = false;
      });
    }

    // Optional music never autoplays. A missing file simply keeps sound off.
    if (audio && content.musicPath) audio.src = content.musicPath;
    if (soundToggle && audio) {
      soundToggle.addEventListener("click", async () => {
        if (audio.paused) {
          try {
            await audio.play();
            soundToggle.setAttribute("aria-pressed", "true");
            soundLabel.textContent = "SOUND ON";
          } catch (error) {
            soundToggle.setAttribute("aria-pressed", "false");
            soundLabel.textContent = "SOUND OFF";
            showToast("Add your own audio file at assets/audio/your-song.mp3 to enable music.");
          }
        } else {
          audio.pause();
          soundToggle.setAttribute("aria-pressed", "false");
          soundLabel.textContent = "SOUND OFF";
        }
      });
      audio.addEventListener("error", () => {
        soundToggle.setAttribute("aria-pressed", "false");
        soundLabel.textContent = "SOUND OFF";
      });
    }

    // Keep keyboard focus useful when a screen changes.
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && document.body.classList.contains("brand-mode")) {
        goToScreen("opening");
      }
    });

    // Initialise accessibility state consistently.
    screens.forEach(screen => {
      const active = screen.id === "opening";
      screen.hidden = !active;
      screen.classList.toggle("is-active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    if (header) header.classList.remove("header-on-brand");
    if (footer) footer.classList.remove("footer-on-brand");

    console.info("Prime Creations birthday experience ready.");
  });
})();
