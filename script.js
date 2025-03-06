document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links 
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                }); 
            } 
        });
    });
    
    // Toggle button for mobile navigation
    const menuToggle = document.createElement("div");
    menuToggle.classList.add("menu-toggle");
    menuToggle.innerHTML = "&#9776;";
    document.querySelector("nav").prepend(menuToggle);
    
    const nav = document.querySelector("nav ul");
    
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active"); 
    });
    
    // Simple animation for hero section
    const heroText = document.querySelector(".hero-text");
    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        heroText.style.transition = "opacity 1s, transform 1s";
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";
    }, 500);
});