// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Feature Cards Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Apply animation to pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// CTA Button Click Handler
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    const pricingSection = document.querySelector('#pricing');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = pricingSection.offsetTop - navbarHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
});

// Plan Buttons Click Handlers
const planButtons = document.querySelectorAll('.plan-button');
planButtons.forEach(button => {
    button.addEventListener('click', function() {
        const planName = this.closest('.pricing-card').querySelector('h3').textContent;

        // Simulate plan selection with animation
        this.textContent = 'Processando...';
        this.style.transform = 'scale(0.95)';

        setTimeout(() => {
            this.textContent = 'Selecionado ✓';
            this.style.background = '#10b981';

            // Show alert
            showNotification(`Plano ${planName} selecionado com sucesso!`, 'success');

            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'Escolher Plano';
                this.style.background = '';
                this.style.transform = '';
            }, 2000);
        }, 1000);
    });
});

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    // Simulate form submission
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.textContent = 'Enviado ✓';
        submitButton.style.background = '#10b981';

        // Show success notification
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        // Reset form
        contactForm.reset();

        // Reset button
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 2000);
    }, 1500);
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;

    // Add animation keyframes if not exists
    if (!document.querySelector('#notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add hover effect to nav links
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#6366f1';
    });

    link.addEventListener('mouseleave', function() {
        this.style.color = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Dynamic year for footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} TechFlow. Todos os direitos reservados.`;
}

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navbarHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Console welcome message
console.log('%c🚀 TechFlow Landing Page', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cFeito com HTML, CSS e JavaScript puro!', 'color: #8b5cf6; font-size: 14px;');
