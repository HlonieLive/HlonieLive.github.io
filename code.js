// 1. Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href').substring(1); // Get target section ID
        const targetElement = document.getElementById(targetId);

        // Scroll smoothly to the target section
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset by 70px to account for the nav bar height
            behavior: 'smooth'
        });
    });
});

// 2. Contact Form Validation
document.querySelector('form').addEventListener('submit', function (e) {
    const name = document.querySelector('input[type="text"]');
    const email = document.querySelector('input[type="email"]');
    const message = document.querySelector('textarea');
    let isValid = true;

    // Clear previous error messages
    clearErrors();

    // Name validation
    if (name.value.trim() === '') {
        isValid = false;
        showError(name, 'Please enter your name');
    }

    // Email validation
    if (email.value.trim() === '') {
        isValid = false;
        showError(email, 'Please enter your email');
    } else if (!isValidEmail(email.value)) {
        isValid = false;
        showError(email, 'Please enter a valid email address');
    }

    // Message validation
    if (message.value.trim() === '') {
        isValid = false;
        showError(message, 'Please enter your message');
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission if not valid
    }
});

// Helper function to show error messages
function showError(input, message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = message;
    input.classList.add('error-input');
    input.insertAdjacentElement('afterend', error);
}

// Helper function to clear previous error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error');
    const errorInputs = document.querySelectorAll('.error-input');
    errorMessages.forEach(error => error.remove());
    errorInputs.forEach(input => input.classList.remove('error-input'));
}

// Helper function to validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 3. Scroll Animations (Fade In)
const sections = document.querySelectorAll('.fade-in');

function handleScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Add the 'visible' class when the section is in view
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Initialize the scroll effect
window.addEventListener('scroll', handleScroll);
handleScroll(); // Call initially in case sections are already in view

// 4. Dropdown Project Navigation (Added from Previous Code)
function showProject(projectId) {
    // Hide all project details
    const projectDetails = document.querySelectorAll('.project-details');
    projectDetails.forEach(detail => detail.style.display = 'none'); // Hide all project details

    // Show the selected project's details
    const selectedProject = document.getElementById(projectId);
    if (selectedProject) {
        selectedProject.style.display = 'block'; // Display the selected project
    }
}