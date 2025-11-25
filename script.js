document.addEventListener("DOMContentLoaded", function () {
    // ============== Smooth Scrolling ==============
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            // Only handle internal anchors (e.g., #about, not external links)
            const href = this.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ============== Mobile Menu Toggle ==============
    const menuToggle = document.createElement("div");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "&#9776;";
    document.querySelector("nav").prepend(menuToggle);

    const nav = document.querySelector("nav ul");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // ============== Hero Text Fade-in ==============
    const heroText = document.querySelector(".hero-text");
    if (heroText) {
        heroText.style.opacity = "0";
        heroText.style.transform = "translateY(30px)";
        setTimeout(() => {
            heroText.style.transition = "opacity 1s ease, transform 1s ease";
            heroText.style.opacity = "1";
            heroText.style.transform = "translateY(0)";
        }, 500);
    }

    // ============== Role Typing Animation ==============
    const roles = [
        "Web Developer",
        "Data Scientist",
        "Software Engineer",
        "Cloud Engineer",
        "Data Analyst"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    const typewriterElement = document.getElementById('role-typewriter');
    let isDeleting = false;

    function typeRole() {
        if (!typewriterElement) return; // guard if element missing

        const currentRole = roles[roleIndex];
        const fullText = currentRole.substring(0, charIndex);

        if (isDeleting) {
            typewriterElement.textContent = fullText;
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 500);
            } else {
                setTimeout(typeRole, 50);
            }
        } else {
            typewriterElement.textContent = fullText;
            charIndex++;
            if (charIndex > currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, 1000);
            } else {
                setTimeout(typeRole, 100);
            }
        }
    }

    setTimeout(typeRole, 1000);

    // ============== Scroll Animation for Sections ==============
    const sections = document.querySelectorAll('.fade-in');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Trigger on load in case section is already in view
});