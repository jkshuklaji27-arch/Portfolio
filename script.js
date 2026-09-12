// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.service-card, .stat-item, .resume-item, .portfolio-item, .about-content, .contact-info, .contact-form');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // If it's a stat item, trigger counter
            if (entry.target.classList.contains('stat-item')) {
                const numberSpan = entry.target.querySelector('.stat-number');
                if (numberSpan) {
                    animateCounter(numberSpan);
                }
            }
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
});

// Add a class to trigger reveal
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.revealed').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// Also apply to elements when they become visible
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};
const observer = new IntersectionObserver(observerCallback, { threshold: 0.15 });
document.querySelectorAll('.service-card, .stat-item, .resume-item, .portfolio-item, .about-content, .contact-info, .contact-form').forEach(el => {
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    if (!target || element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    let current = 0;
    const increment = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = current;
        }
    }, 30);
}

// Trigger counters on page load for visible stats
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(span => {
        const rect = span.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateCounter(span);
        }
    });
});