// === JJMGINON-DEV — PORTFOLIO SCRIPT === //
// Vanilla JavaScript (ES6+), no build tools, no modules. Loaded with <script src="js/script.js" defer></script>

document.documentElement.classList.remove("no-js");

// === LOADER === //
// Hides the splash screen once the page has finished loading (with a small minimum display time).

const initLoader = () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const MIN_DISPLAY_MS = 350;
    const start = performance.now();

    const hide = () => {
        const elapsed = performance.now() - start;
        const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
        window.setTimeout(() => {
            loader.classList.add("is-hidden");
            loader.setAttribute("aria-hidden", "true");
        }, wait);
    };

    if (document.readyState === "complete") {
        hide();
    } else {
        window.addEventListener("load", hide, { once: true });
    }
};

// === THEME TOGGLE === //
// Persists the chosen theme in localStorage and respects the user's OS-level preference on first visit.

const initTheme = () => {
    const STORAGE_KEY = "jjmginon-dev-theme";
    const toggleBtn = document.getElementById("themeToggle");

    const getStoredTheme = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return null;
        }
    };

    const storeTheme = (theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // localStorage unavailable (private mode, etc.) — fail silently
        }
    };

    const applyTheme = (theme) => {
        document.documentElement.setAttribute("data-theme", theme);
        if (toggleBtn) {
            const isLight = theme === "light";
            toggleBtn.setAttribute("aria-pressed", String(isLight));
            toggleBtn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
        }
    };

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = getStoredTheme() || (prefersLight ? "light" : "dark");
    applyTheme(initial);

    toggleBtn?.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "light" ? "dark" : "light";
        applyTheme(next);
        storeTheme(next);
    });
};

// === NAVIGATION === //
// Mobile hamburger menu: open/close, close on link click, close on Escape, close on outside click.

const initNavigation = () => {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    const isMobileLayout = () => window.matchMedia("(max-width: 899px)").matches;

    const closeMenu = () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        if (isMobileLayout()) menu.setAttribute("inert", "");
    };

    const openMenu = () => {
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
        menu.removeAttribute("inert");
    };

    if (isMobileLayout()) menu.setAttribute("inert", "");

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");
        isOpen ? closeMenu() : openMenu();
    });

    menu.querySelectorAll("[data-nav-link]").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
            toggle.focus();
        }
    });

    document.addEventListener("click", (e) => {
        const isMobileMenuOpen = menu.classList.contains("is-open");
        const clickedInsideNav = e.target.closest(".nav");
        if (isMobileMenuOpen && !clickedInsideNav) {
            closeMenu();
        }
    });

    const desktopQuery = window.matchMedia("(min-width: 900px)");
    desktopQuery.addEventListener("change", (e) => {
        if (e.matches) {
            menu.classList.remove("is-open");
            menu.removeAttribute("inert");
        } else {
            closeMenu();
        }
    });
};

// === SCROLL SPY === //
// Highlights the nav link matching the section currently in the viewport.

const initScrollSpy = () => {
    const links = Array.from(document.querySelectorAll("[data-nav-link]"));
    if (!links.length) return;

    const sections = links
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!sections.length) return;

    const setActive = (id) => {
        links.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isMatch);
            if (isMatch) {
                link.setAttribute("aria-current", "true");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible) {
                setActive(visible.target.id);
            }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
};

// === SCROLL REVEAL === //
// Adds .is-visible to .reveal elements as they enter the viewport, using IntersectionObserver.

const initReveal = () => {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        targets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
};

// === PROJECT FILTER === //
// Filters the project grid by the data-tags attribute on each card, driven by the filter bar.

const initProjectFilter = () => {
    const buttons = document.querySelectorAll(".filter-bar__btn");
    const cards = document.querySelectorAll(".project-card");
    const emptyState = document.getElementById("projectGridEmpty");
    if (!buttons.length || !cards.length) return;

    const applyFilter = (filter) => {
        let visibleCount = 0;

        cards.forEach((card) => {
            const tags = card.dataset.tags || "";
            const matches = filter === "all" || tags.split(" ").includes(filter);
            card.classList.toggle("is-filtered-out", !matches);
            if (matches) visibleCount += 1;
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    };

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");
            applyFilter(btn.dataset.filter);
        });
    });
};

// === SCROLL PROGRESS BAR === //
// Updates a fixed top bar to reflect how far the user has scrolled through the page.

const initProgressBar = () => {
    const track = document.getElementById("progressBar");
    const fill = document.getElementById("progressBarFill");
    if (!track || !fill) return;

    let ticking = false;

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

        fill.style.width = `${percent}%`;
        track.setAttribute("aria-valuenow", String(Math.round(percent)));
        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        },
        { passive: true }
    );

    update();
};

// === BACK TO TOP === //
// Reveals a button once the user has scrolled past the hero section; scrolls smoothly back to top.

const initBackToTop = () => {
    const button = document.getElementById("backToTop");
    if (!button) return;

    const SHOW_AFTER_PX = 480;
    let ticking = false;

    const update = () => {
        const shouldShow = window.scrollY > SHOW_AFTER_PX;
        button.hidden = false;
        button.classList.toggle("is-visible", shouldShow);
        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        },
        { passive: true }
    );

    button.addEventListener("click", () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
        document.querySelector(".nav__logo")?.focus();
    });

    update();
};

// === HERO TYPEWRITER === //
// Types and deletes a rotating list of taglines. Falls back to a single static line if the user prefers reduced motion.

const initTypewriter = () => {
    const el = document.getElementById("typewriterText");
    if (!el) return;

    const LINES = [
        "built with clean HTML, CSS & JavaScript",
        "clean code, purposeful solutions",
        "accessible experiences for every user",
        "exploring serverless architecture",
    ];
    const TYPE_SPEED_MS = 55;
    const DELETE_SPEED_MS = 30;
    const HOLD_MS = 1600;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        el.textContent = LINES[0];
        return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
        const currentLine = LINES[lineIndex];

        if (!deleting) {
            charIndex += 1;
            el.textContent = currentLine.slice(0, charIndex);

            if (charIndex === currentLine.length) {
                deleting = true;
                window.setTimeout(tick, HOLD_MS);
                return;
            }
            window.setTimeout(tick, TYPE_SPEED_MS);
        } else {
            charIndex -= 1;
            el.textContent = currentLine.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                lineIndex = (lineIndex + 1) % LINES.length;
            }
            window.setTimeout(tick, DELETE_SPEED_MS);
        }
    };

    tick();
};

// === FOOTER YEAR === //
// Keeps the copyright year current without a manual edit each year.

const initFooterYear = () => {
    const el = document.getElementById("footerYear");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
};

// === INIT === //

initLoader();
initTheme();
initNavigation();
initScrollSpy();
initReveal();
initProjectFilter();
initProgressBar();
initBackToTop();
initTypewriter();
initFooterYear();