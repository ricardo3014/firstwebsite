(() => {
  "use strict";

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav background ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
    toTop.classList.toggle("is-visible", window.scrollY > 600);
  };

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinksEl = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinksEl.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navAnchors = Array.from(document.querySelectorAll("[data-nav]"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navAnchors.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".accordion__trigger").forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".accordion__trigger").forEach((other) => {
        if (other !== trigger) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });

  /* ---------- Countdown ----------
     Placeholder target date — update once real dates are confirmed. */
  const countdown = document.getElementById("countdown");
  const targetDate = new Date("2026-10-14T09:00:00");

  const pad = (n) => String(n).padStart(2, "0");

  const updateCountdown = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      countdown.querySelector("[data-days]").textContent = "0";
      countdown.querySelector("[data-hours]").textContent = "00";
      countdown.querySelector("[data-mins]").textContent = "00";
      countdown.querySelector("[data-secs]").textContent = "00";
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    countdown.querySelector("[data-days]").textContent = days;
    countdown.querySelector("[data-hours]").textContent = pad(hours);
    countdown.querySelector("[data-mins]").textContent = pad(mins);
    countdown.querySelector("[data-secs]").textContent = pad(secs);
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Newsletter form (demo only, no backend) ---------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterNote = document.getElementById("newsletterNote");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail").value.trim();
    if (!email) return;
    newsletterNote.textContent = `Thanks — we'll notify ${email} when dates are announced.`;
    newsletterForm.reset();
  });

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
