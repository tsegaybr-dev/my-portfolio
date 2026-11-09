/* =====================================
   1. SELECT HTML ELEMENTS
===================================== */

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");


/* =====================================
   2. DARK MODE / LIGHT MODE
===================================== */

// Load saved theme
function loadTheme() {

    const savedTheme = localStorage.getItem("portfolioTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeBtn.textContent = "🌙";
    }
}

// Toggle theme
themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        themeBtn.textContent = "☀️";
        themeBtn.setAttribute("aria-label", "Switch to light mode");

        localStorage.setItem("portfolioTheme", "dark");

    } else {
        themeBtn.textContent = "🌙";
        themeBtn.setAttribute("aria-label", "Switch to dark mode");

        localStorage.setItem("portfolioTheme", "light");
    }

});

// Initialize theme
loadTheme();


/* =====================================
   3. MOBILE NAVIGATION MENU
===================================== */

// Open and close menu
menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


// Close menu after clicking a navigation link
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute("aria-label", "Open navigation menu");

    });

});


// Close menu when clicking outside
document.addEventListener("click", function (event) {

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

    }

});


// Close menu using Escape key
document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

    }

});


// Close mobile menu when returning to desktop size
window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        navLinks.classList.remove("active");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute("aria-expanded", "false");

    }

});


/* =====================================
   4. CONTACT FORM VALIDATION
===================================== */

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();


    // Check empty fields
    if (name === "" || email === "" || message === "") {

        formStatus.textContent = "Please fill in all fields.";

        return;

    }


    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        formStatus.textContent = "Please enter a valid email address.";

        return;

    }


    // Display confirmation
    formStatus.textContent =
        "Your message is valid! Connect a backend or email service to send it.";

    // Clear form
    contactForm.reset();

});


/* =====================================
   5. UPDATE FOOTER YEAR
===================================== */

const footer = document.querySelector("footer");

if (footer) {

    const footerParagraph = footer.querySelector("p");

    if (footerParagraph) {

        footerParagraph.innerHTML =
            `&copy; ${new Date().getFullYear()} Tsegay Brhane. All Rights Reserved.`;

    }

}


/* =====================================
   6. ACTIVE NAVIGATION LINK
===================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

const observerOptions = {
    root: null,
    threshold: 0.35
};

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                navigationItems.forEach(function (link) {

                    link.classList.remove("current");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("current");

                    }

                });

            }

        });

    },
    observerOptions
);


// Observe all sections
sections.forEach(function (section) {

    sectionObserver.observe(section);

});


/* =====================================
   7. WELCOME MESSAGE
===================================== */

console.log("Welcome to Tsegay Brhane's Portfolio!");

console.log("JavaScript loaded successfully.");