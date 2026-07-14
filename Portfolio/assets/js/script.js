/**
 * Pure JavaScript Portfolio Interactions
 * Native execution, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU CONTROLLER
       ========================================================================== */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ==========================================================================
       STICKY NAVBAR & ACTIVE SCROLL INDICATOR
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section, header');

    window.addEventListener('scroll', () => {
        // Sticky transition
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting on scroll
        let currentSec = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop) {
                currentSec = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       SCROLL REVEAL ENGINE
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(elem => {
            const elemTop = elem.getBoundingClientRect().top;
            if (elemTop < triggerBottom) {
                elem.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger instantly on load

    /* ==========================================================================
       PURE JS TYPING ANIMATION
       ========================================================================== */
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = JSON.parse(typingElement.getAttribute('data-words'));
        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIdx];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = 150;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIdx === currentWord.length) {
                typeSpeed = 1500; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        };

        setTimeout(type, 1000);
    }

    /* ==========================================================================
       COUNTER ANIMATION FOR STATS
       ========================================================================== */
    const stats = document.querySelectorAll('.stat-num');
    let countersStarted = false;

    const startCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50; // Dynamic rate
            let count = 0;

            const updateCounter = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.ceil(count);
                    setTimeout(updateCounter, 25);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    };

    // Trigger counters only when about section is visible
    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', () => {
        if (!aboutSection) return;
        const top = aboutSection.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.75 && !countersStarted) {
            countersStarted = true;
            startCounters();
        }
    });
});
