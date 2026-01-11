document.addEventListener("DOMContentLoaded", function () {

    // ============== Theme Toggle ==============
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check local storage. If 'light', enable light mode. Otherwise (null or 'dark'), stay dark.
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        updateIcon(true);
    } else {
        body.classList.remove('light-mode');
        updateIcon(false);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateIcon(isLight);
        });
    }

    function updateIcon(isLight) {
        if (isLight) {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        } else {
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
    }
    
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
    
    // ============== AWS Badges Show More ============== 
    const showMoreBtn = document.getElementById('show-more-badges');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            // Use case-insensitive check because of CSS text-transform: uppercase
            const currentText = showMoreBtn.innerText.toUpperCase();
            const isExpanding = currentText.includes('SHOW MORE');
            
            const allBadges = document.querySelectorAll('.aws-badge-item');
            
            if (isExpanding) {
                // Expanding
                allBadges.forEach((badge, index) => {
                    if (index >= 3) badge.classList.remove('hidden');
                });
                showMoreBtn.innerText = 'Show Less';
                
                // Scroll to newly revealed content
                if (allBadges[3]) {
                    allBadges[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                // Collapsing
                allBadges.forEach((badge, index) => {
                    if (index >= 3) badge.classList.add('hidden');
                });
                showMoreBtn.innerText = 'Show More Badges';
                
                // Scroll back up to the section title
                document.querySelector('#aws-badges .section-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ============== Certificates Show More ============== 
    const showMoreCertsBtn = document.getElementById('show-more-certs');
    if (showMoreCertsBtn) {
        showMoreCertsBtn.addEventListener('click', () => {
            const currentText = showMoreCertsBtn.innerText.toUpperCase();
            const isExpanding = currentText.includes('SHOW MORE');
            const allCerts = document.querySelectorAll('#certificates-grid .certificate-card');
            
            if (isExpanding) {
                allCerts.forEach((cert, index) => {
                    if (index >= 3) cert.classList.remove('hidden');
                });
                showMoreCertsBtn.innerText = 'Show Less Certificates';
                if (allCerts[3]) {
                    allCerts[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                allCerts.forEach((cert, index) => {
                    if (index >= 3) cert.classList.add('hidden');
                });
                showMoreCertsBtn.innerText = 'Show More Certificates';
                document.querySelector('#certificates .section-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

// ============== Highlights Mobile-Friendly Carousel ==============
const highlightTrack = document.querySelector('.highlights-track');
if (highlightTrack) {
    const originalCards = Array.from(highlightTrack.querySelectorAll('.highlight-card'));
    if (originalCards.length === 0) return;

    // On mobile: use simple smooth sliding track
    if (window.innerWidth <= 768) {
        let mobileIndex = 0;
        const totalMobile = originalCards.length;
        
        // Setup track for sliding
        highlightTrack.style.display = 'flex';
        highlightTrack.style.flexDirection = 'row';
        highlightTrack.style.transition = 'transform 0.5s ease-in-out';
        highlightTrack.style.width = `${totalMobile * 100}%`;
        highlightTrack.style.height = '400px';
        highlightTrack.classList.add('mobile-mode');

        originalCards.forEach(card => {
            card.style.display = 'block';
            card.style.flex = `0 0 ${100 / totalMobile}%`;
            card.style.width = `${100 / totalMobile}%`;
            card.style.opacity = '1';
            const overlay = card.querySelector('.highlight-overlay');
            if (overlay) overlay.style.opacity = '1';
        });

        function updateMobileSlide() {
            highlightTrack.style.transform = `translateX(-${mobileIndex * 100}%)`;
        }

        const prevBtn = document.getElementById('prev-highlight');
        const nextBtn = document.getElementById('next-highlight');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileIndex = (mobileIndex - 1 + totalMobile) % totalMobile;
                updateMobileSlide();
                resetMobileTimer();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileIndex = (mobileIndex + 1) % totalMobile;
                updateMobileSlide();
                resetMobileTimer();
            });
        }

        let mobileTimer = setInterval(() => {
            mobileIndex = (mobileIndex + 1) % totalMobile;
            updateMobileSlide();
        }, 5000);

        function resetMobileTimer() {
            clearInterval(mobileTimer);
            mobileTimer = setInterval(() => {
                mobileIndex = (mobileIndex + 1) % totalMobile;
                updateMobileSlide();
            }, 5000);
        }

        updateMobileSlide();
    } 
    // Desktop: keep stationary projector
    else {
        const highlightData = originalCards.map(card => ({
            src: card.querySelector('img').src,
            title: card.querySelector('h3').innerText,
            desc: card.querySelector('p').innerText
        }));

        highlightTrack.innerHTML = '';
        const slots = [];
        for (let i = 1; i <= 5; i++) {
            const slot = document.createElement('div');
            slot.className = `highlight-card slot-${i}`;
            slot.innerHTML = `
                <img src="" alt="" style="opacity:0;">
                <div class="highlight-overlay">
                    <h3></h3>
                    <p></p>
                </div>
            `;
            highlightTrack.appendChild(slot);
            slots.push(slot);
        }

        let currentIndex = 0;
        function updateProjector() {
            slots.forEach((slot, slotIndex) => {
                const dataIndex = (currentIndex + (slotIndex - 2) + highlightData.length) % highlightData.length;
                const data = highlightData[dataIndex];
                const img = slot.querySelector('img');
                const overlay = slot.querySelector('.highlight-overlay');
                const h3 = overlay.querySelector('h3');
                const p = overlay.querySelector('p');

                img.src = data.src;
                img.alt = data.title;
                h3.innerText = data.title;
                p.innerText = data.desc;
                img.style.opacity = '1';
                overlay.style.opacity = slotIndex === 2 ? '1' : '0';
            });
        }

        function slideNext() {
            currentIndex = (currentIndex + 1) % highlightData.length;
            updateProjector();
            resetTimer();
        }

        function slidePrev() {
            currentIndex = (currentIndex - 1 + highlightData.length) % highlightData.length;
            updateProjector();
            resetTimer();
        }

        const prevBtn = document.getElementById('prev-highlight');
        const nextBtn = document.getElementById('next-highlight');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                slidePrev(); // ← shows PREVIOUS highlight
                resetTimer();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                slideNext(); // → shows NEXT highlight
                resetTimer();
            });
        }

        let autoTimer = setInterval(slideNext, 5000);
        function resetTimer() {
            clearInterval(autoTimer);
            autoTimer = setInterval(slideNext, 5000);
        }
        updateProjector();
    }
}

// ============== Certificate Modal Functionality ==============
// Intercept ALL certificate clicks (including dynamically added ones)
document.addEventListener('click', function(e) {
    const certLink = e.target.closest('#certificates-grid .certificate-card a.view-cert') || 
                     e.target.closest('#certificates-grid .certificate-card a:not(.view-cert)');
    
    if (certLink && certLink.innerText.toUpperCase().includes('VIEW CERTIFICATE')) {
        e.preventDefault();
        
        // Find the image in the same card
        const card = certLink.closest('.certificate-card');
        const img = card.querySelector('img');
        
        if (img && img.src) {
            openCertModal(img.src);
        } else if (certLink.getAttribute('href') && certLink.getAttribute('href') !== '#') {
            openCertModal(certLink.getAttribute('href'));
        }
    }
});

function openCertModal(imgSrc) {
    // Create modal if it doesn't exist
    if (!document.getElementById('cert-modal')) {
        const modalHTML = `
            <div id="cert-modal" class="cert-modal-overlay">
                <div class="cert-modal-content">
                    <button class="cert-modal-close" onclick="window.closeCertModal()">×</button>
                    <img src="${imgSrc}" alt="Certificate">
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    } else {
        // Update existing modal image
        document.querySelector('#cert-modal img').src = imgSrc;
    }
    
    document.getElementById('cert-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

window.closeCertModal = function() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
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
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.addProject = function() {
    const title = document.getElementById('project-title').value;
    const fileInput = document.getElementById('project-file');
    const desc = document.getElementById('project-desc').value;
    const link = document.getElementById('project-link').value || '#';
    let imgUrl = 'https://via.placeholder.com/600x320?text=Project+Image          ';

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
        <a href="${link}" class="view-cert">View Certificate</a>
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

window.openBadgeModal = function(element) {
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
    const email = 'lehlohonolotshabalala00@gmail.com';
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

    // ============== Inject Success Popup HTML ==============
    if (!document.getElementById('success-popup')) {
        const popupHTML = `
        <div id="success-popup" class="popup-overlay">
            <div class="popup-content">
                <div class="popup-icon-container">
                    <div class="popup-icon">✓</div>
                </div>
                <h3 class="popup-title">Sent!</h3>
                <p class="popup-message">Message sent to Lehlohonolo. Thank you for reaching out!</p>
                <button class="popup-btn" onclick="closeSuccessPopup()">Close</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
    }

    // ============== Contact Form Handling ==============
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const actionUrl = this.action;
            const formData = new FormData(this);
            
            // Disable button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Use FormSubmit.co AJAX capabilities
            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' 
                }
            })
            .then(response => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;

                if (response.ok) {
                    contactForm.reset();
                    openSuccessPopup(); // Show Custom Popup
                } else {
                    alert('Oops! There was a problem submitting your form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                alert('Oops! There was a network error. Please check your connection and try again.');
            });
        });
    }


// Global functions for popup
window.openSuccessPopup = function() {
    const popup = document.getElementById('success-popup');
    if (popup) popup.classList.add('active');
}

window.closeSuccessPopup = function() {
    const popup = document.getElementById('success-popup');
    if (popup) popup.classList.remove('active');
}

});

// ============== Background Animation (Home Page) ==============
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 60; // Not too crowded
    const connectionDistance = 150;
    const moveSpeed = 0.5;

    // Resize handling
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * moveSpeed;
            this.vy = (Math.random() - 0.5) * moveSpeed;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            const isLight = document.body.classList.contains("light-mode");
            ctx.fillStyle = isLight ? "rgba(0, 102, 255, 0.5)" : "rgba(255, 170, 0, 0.5)"; // Blue for light, Orange for dark
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        const isLight = document.body.classList.contains("light-mode");
        const lineColor = isLight ? "0, 102, 255" : "255, 170, 0"; 

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Opacity based on distance inverted
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.2})`; // Low opacity lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
});