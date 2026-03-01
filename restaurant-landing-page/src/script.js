/**
 * The Hearth & Harvest - Main JavaScript
 * Handles interactions, validation, and dark mode
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('bi-moon-stars', 'bi-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('bi-sun', 'bi-moon-stars');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('bi-moon-stars', 'bi-sun');
        }
    });

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // --- 3. Form Validation ---
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    // Character count for message
    if (messageInput) {
        messageInput.addEventListener('input', () => {
            charCount.textContent = messageInput.value.length;
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (bookingForm.checkValidity()) {
                // Simulate form submission
                const submitBtn = bookingForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

                setTimeout(() => {
                    bookingForm.classList.add('d-none');
                    formSuccess.classList.remove('d-none');
                    bookingForm.reset();
                    bookingForm.classList.remove('was-validated');
                }, 1500);
            }

            bookingForm.classList.add('was-validated');
        }, false);
    }

    // --- 4. Gallery Lightbox Logic ---
    const galleryModal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');

    if (galleryModal) {
        galleryModal.addEventListener('show.bs.modal', (event) => {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-bs-img');
            modalImage.src = imgSrc;
        });
    }

    // --- 5. Today's Special Badge (Stretch Feature) ---
    const specials = [
        "Sunday Roast with Herb Gravy",
        "Monday Mushroom Risotto",
        "Tuesday Taco Tradition",
        "Wednesday Wood-fired Lasagna",
        "Thursday Truffle Pasta",
        "Friday Fresh Catch",
        "Saturday Steak Night"
    ];

    const addSpecialsBadge = () => {
        const menuSection = document.querySelector('#menu .text-center');
        const dayIndex = new Date().getDay();
        const todaySpecial = specials[dayIndex];

        const badge = document.createElement('div');
        badge.className = 'badge bg-primary p-2 mb-3 animate-up';
        badge.innerHTML = `<i class="bi bi-star-fill me-1"></i> Today's Special: ${todaySpecial}`;
        
        menuSection.insertBefore(badge, menuSection.firstChild);
    };

    addSpecialsBadge();

    // --- 6. Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2', 'shadow');
        }
    });
});
