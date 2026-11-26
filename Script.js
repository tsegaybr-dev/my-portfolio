
// GET HTML ELEMENTS
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// ===============================
// DARK AND LIGHT MODE
// ===============================

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolioTheme");
} catch (error) {
    console.warn("Theme storage is unavailable.");
}

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

function updateThemeButton() {
    if (!themeBtn) return;

    const isDark = document.body.classList.contains("dark-theme");

    themeBtn.textContent = isDark ? "☀️" : "🌙";

    themeBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeBtn.title = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";
}

updateThemeButton();

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        try {
            localStorage.setItem(
                "portfolioTheme",
                isDark ? "dark" : "light"
            );
        } catch (error) {
            console.warn("Could not save theme preference.");
        }

        updateThemeButton();
    });
}

// ===============================
// MOBILE MENU
// ===============================

function closeMobileMenu() {
    if (!navLinks || !menuBtn) return;

    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation menu");
}

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";

        menuBtn.setAttribute("aria-expanded", String(isOpen));

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    // Close menu when a navigation link is clicked
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close menu using Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    // Close menu when switching to desktop size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}
