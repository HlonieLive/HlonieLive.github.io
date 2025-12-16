document.addEventListener("DOMContentLoaded", function () {
    
    // ============== Mobile Menu Toggle ==============
    const menuToggle = document.getElementById("mobile-menu");
    const navList = document.querySelector("nav ul");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active");
            
            // Hamburger Animation Toggle
            const spans = menuToggle.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                // Reset hamburger
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ============== Smooth Scrolling ==============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ============== Intersection Observer for Fade-in Animations ==============
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ============== Active Nav Link on Scroll (Scroll Spy) ==============
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) { // Offset for header
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // ============== Role Typing Animation ==============
    const roles = [
        "Frontend Developer",
        "Web Developer",
        "Data Scientist",
        "Software Engineer",
        "Cloud Engineer",
        "Data Analyst"
    ];

    const typewriterElement = document.getElementById('role-typewriter');
    
    if (typewriterElement) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                charIndex--;
                typeSpeed = 50; 
            } else {
                charIndex++;
                typeSpeed = 100;
            }

            typewriterElement.textContent = currentRole.substring(0, charIndex);

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(typeRole, typeSpeed);
        }

        setTimeout(typeRole, 1000);
    }
    
    // ============== Add Buttons Event Listeners ==============
    const addProjectBtn = document.getElementById('add-project-btn');
    const addCertBtn = document.getElementById('add-cert-btn');

    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => openModal('project-modal'));
    }
    if (addCertBtn) {
        addCertBtn.addEventListener('click', () => openModal('cert-modal'));
    }
    const addQualBtn = document.getElementById('add-qual-btn');
    if (addQualBtn) {
        addQualBtn.addEventListener('click', () => openModal('qual-modal'));
    }
    const addBadgeBtn = document.getElementById('add-badge-btn');
    if (addBadgeBtn) {
        addBadgeBtn.addEventListener('click', () => openModal('add-badge-modal'));
    }
});

// ============== Global Functions for Dynamic Functionality ==============

window.removeElement = function(element) {
    if (confirm('Are you sure you want to remove this item? (Changes are temporary)')) {
        // Remove the parent card (div.project-card or div.certificate-card)
        element.parentElement.remove();
    }
}

window.editElement = function(element) {
    const card = element.parentElement;
    const title = card.querySelector('h3') || card.querySelector('h4'); // Support h4 for badges
    const desc = card.querySelector('p:not(.institution):not(.year)'); // Try to target main description
    
    // Simple prompt-based edit
    if (title) {
        const newTitle = prompt("Edit Title:", title.innerText);
        if (newTitle) title.innerText = newTitle;
    }
    
    // Attempt to edit description if it exists
    if (desc) {
         const newDesc = prompt("Edit Description:", desc.innerText);
         if (newDesc) desc.innerText = newDesc;
    }
}

window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

window.addProject = function() {
    const title = document.getElementById('project-title').value;
    const fileInput = document.getElementById('project-file');
    const desc = document.getElementById('project-desc').value;
    const link = document.getElementById('project-link').value || '#';
    let imgUrl = 'https://via.placeholder.com/600x320?text=Project+Image';

    if (title && desc) {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createProjectCard(title, e.target.result, desc, link);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            createProjectCard(title, null, desc, link);
        }
        
        closeModal('project-modal');
        
        // Clear inputs
        document.getElementById('project-title').value = '';
        fileInput.value = '';
        document.getElementById('project-desc').value = '';
        document.getElementById('project-link').value = '';
    } else {
        alert('Please fill in at least the Title and Description.');
    }
}

function createProjectCard(title, img, desc, link) {
    // Target the new specific grid container
    const projectGrid = document.getElementById('projects-grid');
    // We no longer need to find the button for insertion reference since button is outside
    
    const newCard = document.createElement('div');
    newCard.classList.add('project-card');
    
    // Condition for image
    const imgHTML = img ? `<img src="${img}" alt="${title}">` : '';

    newCard.innerHTML = `
        <button class="remove-btn" onclick="removeElement(this)">x</button>
        <button class="edit-btn" onclick="editElement(this)">✎</button>
        ${imgHTML}
        <h3>${title}</h3>
        <p>${desc}</p>
        <a href="${link}" target="_blank">View Repository</a>
    `;
    
    // Append to the grid container
    projectGrid.appendChild(newCard);
}

window.addCertificate = function() {
    const title = document.getElementById('cert-title').value;
    const issuer = document.getElementById('cert-issuer').value;
    const fileInput = document.getElementById('cert-file');
    const link = document.getElementById('cert-link').value || '#';

    // Helper for adding cert card (inline since it wasn't separate function in reading)
    // Wait, createCertCard IS a function, just not shown fully in previous read? 
    // Actually previous read showed createCertCard being called.
    // Let's assume createCertCard exists or logic is inline.
    // Step 275 shows createCertCard usage. So I must update THAT function too.
    
    if (title && issuer) {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createCertCard(title, issuer, e.target.result, link);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            createCertCard(title, issuer, null, link);
        }

        closeModal('cert-modal');
        
        // Clear inputs
        document.getElementById('cert-title').value = '';
        document.getElementById('cert-issuer').value = '';
        fileInput.value = '';
        document.getElementById('cert-link').value = '';
    } else {
        alert('Please fill in the Title and Issuer.');
    }
}

function createCertCard(title, issuer, img, link) {
    const certGrid = document.getElementById('certificates-grid');
    
    const newCard = document.createElement('div');
    newCard.classList.add('certificate-card');
    
    const imgHTML = img ? `<img src="${img}" alt="${title}">` : '';

    newCard.innerHTML = `
        <button class="remove-btn" onclick="removeElement(this)">x</button>
        <button class="edit-btn" onclick="editElement(this)">✎</button>
        ${imgHTML}
        <h3>${title}</h3>
        <p>Issued by ${issuer}</p>
        <a href="${link}" target="_blank">View Certificate</a>
    `;
    
    certGrid.appendChild(newCard);
}

window.addQualification = function() {
    const degree = document.getElementById('qual-degree').value;
    const inst = document.getElementById('qual-inst').value;
    const year = document.getElementById('qual-year').value;
    const desc = document.getElementById('qual-desc').value;

    if (degree && inst) {
        createQualificationCard(degree, inst, year, desc);
        closeModal('qual-modal');

        // Clear inputs
        document.getElementById('qual-degree').value = '';
        document.getElementById('qual-inst').value = '';
        document.getElementById('qual-year').value = '';
        document.getElementById('qual-desc').value = '';
    } else {
        alert('Please fill in at least the Degree and Institution.');
    }
}

function createQualificationCard(degree, inst, year, desc) {
    const qualGrid = document.getElementById('qualifications-grid');

    const newCard = document.createElement('div');
    newCard.classList.add('qualification-card');

    newCard.innerHTML = `
        <button class="remove-btn" onclick="removeElement(this)">x</button>
        <button class="edit-btn" onclick="editElement(this)">✎</button>
        <div class="qual-icon">🎓</div>
        <h3>${degree}</h3>
        <p class="institution">${inst}</p>
        <p class="year">${year}</p>
        <p class="desc">${desc}</p>
    `;

    qualGrid.appendChild(newCard);
}

function openBadgeModal(element) {
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    
    document.getElementById('badge-modal-title').innerText = title;
    document.getElementById('badge-modal-desc').innerText = desc;
    

    openModal('badge-modal');
}

window.addBadge = function() {
    const title = document.getElementById('badge-name-input').value;
    const subtitle = document.getElementById('badge-subtitle-input').value;
    const link = document.getElementById('badge-link-input').value || '#';
    const desc = document.getElementById('badge-desc-input').value;
    const fileInput = document.getElementById('badge-img-input');
    
    // Validate required fields
    if (title && link) {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                createBadgeItem(title, subtitle, link, desc, e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            // Default fallback image if none selected
            createBadgeItem(title, subtitle, link, desc, 'images/aws_logo.png');
        }
        
        closeModal('add-badge-modal');
        
        // Clear inputs
        document.getElementById('badge-name-input').value = '';
        document.getElementById('badge-subtitle-input').value = '';
        fileInput.value = '';
        document.getElementById('badge-link-input').value = '';
        document.getElementById('badge-desc-input').value = '';
    } else {
        alert('Please fill in at least the Title and Link.');
    }
}

function createBadgeItem(title, subtitle, link, desc, imgSrc) {
    const container = document.querySelector('.aws-badges-grid');
    const newItem = document.createElement('div');
    newItem.className = 'aws-badge-item';
    newItem.setAttribute('data-title', title);
    newItem.setAttribute('data-desc', desc || 'No description provided.');
    
    newItem.innerHTML = `
        <button class="remove-btn" onclick="removeElement(this)">x</button>
        <button class="edit-btn" onclick="editElement(this)">✎</button>
        <img src="${imgSrc}" alt="${title}" onclick="openBadgeModal(this.parentElement)">
        <h4><a href="${link}" target="_blank">${title}</a></h4>
        <p>${subtitle || ''}</p>
    `;
    container.appendChild(newItem);
}

// ============== Profile Image Upload ============== 
const profileUpload = document.getElementById('profile-upload');
const profilePic = document.getElementById('profile-pic');

if (profileUpload && profilePic) {
    profileUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

// ============== Copy Email Function ============== 
window.copyEmail = function(element) {
    const email = 'lehlohoholotshabalala00@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = element.querySelector('.tooltip-text');
        // Save original text if not already saved (though simple logic is enough)
        tooltip.innerText = 'Copied Email!';
        setTimeout(() => {
            tooltip.innerText = email;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
