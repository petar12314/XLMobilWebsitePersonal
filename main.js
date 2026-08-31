/* ==========================================================================
   XL Mobil — main.js
   Shared behaviour for all pages. Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     Sticky header: toggle .is-scrolled past ~8px
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Mobile nav: hamburger toggle + body scroll lock
     ---------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ----------------------------------------------------------------------
     Hero one-time staggered entrance
     ---------------------------------------------------------------------- */
  var hero = document.querySelector(".hero");
  if (hero && !reduceMotion) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add("hero-in"); });
    });
  } else if (hero) {
    hero.classList.add("hero-in");
  }

  /* ----------------------------------------------------------------------
     Scroll reveal: add .is-visible once per element
     ---------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ----------------------------------------------------------------------
     Contact form: inline validation, no reload, fake success state
     ---------------------------------------------------------------------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    var status = form.querySelector(".form-status");

    var validators = {
      ime: function (v) {
        if (!v.trim()) return "Unesite vaše ime.";
        if (v.trim().length < 2) return "Ime je prekratko.";
        return "";
      },
      telefon: function (v) {
        if (!v.trim()) return "Unesite broj telefona da vas možemo kontaktirati.";
        if (!/[0-9]{6,}/.test(v.replace(/[\s\-/()+]/g, ""))) return "Unesite ispravan broj telefona.";
        return "";
      },
      poruka: function (v) {
        if (!v.trim()) return "Napišite kratku poruku — šta vam treba?";
        if (v.trim().length < 10) return "Poruka je prekratka, dodajte malo detalja.";
        return "";
      }
    };

    var validateField = function (field) {
      var input = field.querySelector("input, textarea");
      if (!input || !validators[input.name]) return true;
      var msg = validators[input.name](input.value);
      field.classList.toggle("has-error", !!msg);
      var errBox = field.querySelector(".field__error");
      if (errBox) errBox.textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    };

    form.querySelectorAll(".field").forEach(function (field) {
      var input = field.querySelector("input, textarea");
      if (!input) return;
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        if (field.classList.contains("has-error")) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));
      var ok = true;
      var firstBad = null;
      fields.forEach(function (field) {
        var valid = validateField(field);
        if (!valid && !firstBad) firstBad = field;
        ok = ok && valid;
      });

      if (!ok) {
        if (status) status.classList.remove("is-ok");
        if (firstBad) {
          var badInput = firstBad.querySelector("input, textarea");
          if (badInput) badInput.focus();
        }
        return;
      }

      var name = (form.querySelector('[name="ime"]') || {}).value || "";
      form.reset();
      fields.forEach(function (field) {
        field.classList.remove("has-error");
        var errBox = field.querySelector(".field__error");
        if (errBox) errBox.textContent = "";
      });
      if (status) {
        status.textContent = "Hvala, " + name.trim().split(" ")[0] +
          "! Poruka je zabeležena — javićemo se na dati broj tokom radnog vremena. " +
          "Za hitne stvari pozovite 064/9090-004.";
        status.classList.add("is-ok");
        status.focus();
      }
    });
  }

  /* ----------------------------------------------------------------------
     Footer year stamp (also handled inline as a fallback)
     ---------------------------------------------------------------------- */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
