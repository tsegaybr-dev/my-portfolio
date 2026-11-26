
// GET HTML ELEMENTS
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// ===============================
// DARK AND LIGHT MODE
// ===============================

// Load previously saved theme
const savedTheme = localStorage.getItem("portfolioTheme");

// Apply saved theme
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

// Update theme button icon and accessibility label
function updateThemeButton() {
    const isDark = document.body.classList.contains("dark-theme");

    if (isDark) {
        themeBtn.textContent = "☀️";
        themeBtn.setAttribute("aria-label", "Switch to light mode");
        themeBtn.title = "Switch to light mode";
    } else {
        themeBtn.textContent = "🌙";
        themeBtn.setAttribute("aria-label", "Switch to dark mode");
        themeBtn.title = "Switch to dark mode";
    }
}

// Set initial icon
updateThemeButton();

// Toggle dark and light mode
themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    // Save selected theme
    localStorage.setItem(
        "portfolioTheme",
        isDark ? "dark" : "light"
    );

    updateThemeButton();

});


// ===============================
// MOBILE MENU
// ===============================

// Open and close mobile menu
menuBtn.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

// Close menu after clicking a navigation link
const navItems = navLinks.querySelectorAll("a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute("aria-label", "Open navigation menu");

    });

});

// Close menu when Escape is pressed
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute("aria-label", "Open navigation menu");

    }

});

// Close mobile menu when resizing to desktop
window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute("aria-label", "Open navigation menu");

    }

});
