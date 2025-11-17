// ===================================
// Performance Optimization - Preload critical assets
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero video
    const videoPreload = document.createElement('link');
    videoPreload.rel = 'preload';
    videoPreload.as = 'video';
    videoPreload.href = 'promotional_video.mp4';
    document.head.appendChild(videoPreload);
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#' || href === '#privacy' || href === '#terms' || href === '#accessibility') {
            e.preventDefault();
            return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    // Debounce scroll event for performance
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class when scrolling down
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScrollTop = scrollTop;
    }, 10);
});

// ===================================
// Update Active Navigation Link
// ===================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Animation on Scroll (AOS) Implementation
// ===================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===================================
// Newsletter Form Submission
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Simple email validation
        if (email && validateEmail(email)) {
            // Show success message
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? '#7FB539' : '#FF6B6B',
        color: '#fff',
        fontWeight: '600',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '300px'
    });

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
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

// ===================================
// Hero Video Optimization
// ===================================
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    // Ensure video plays on mobile devices
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    // Ensure seamless looping
    heroVideo.loop = true;
    heroVideo.muted = true;
    heroVideo.autoplay = true;

    // Play video when loaded
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.play().catch(error => {
            console.log('Video autoplay failed:', error);
            // Fallback: try to play on user interaction
            document.addEventListener('click', () => {
                heroVideo.play();
            }, { once: true });
        });
    });

    // Ensure video loops seamlessly without interruption
    heroVideo.addEventListener('ended', () => {
        heroVideo.currentTime = 0;
        heroVideo.play();
    });

    // Handle video errors
    heroVideo.addEventListener('error', (e) => {
        console.log('Video error:', e);
    });

    // Keep video playing when in viewport (hero section)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(err => console.log('Play error:', err));
            }
            // Don't pause hero video even when out of viewport
        });
    }, { threshold: 0.1 });

    videoObserver.observe(heroVideo);
}

// ===================================
// Tech Card Hover Effects Enhancement
// ===================================
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ===================================
// Blog Card Click Tracking (for analytics)
// ===================================
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Track blog card clicks (integrate with analytics platform)
        console.log(`Blog card ${index + 1} clicked`);
        // Example: gtag('event', 'blog_card_click', { 'card_index': index + 1 });
    });
});

// ===================================
// Schedule Table Mobile Optimization
// ===================================
function optimizeScheduleTable() {
    const scheduleTable = document.querySelector('.schedule-table');
    if (!scheduleTable) return;

    if (window.innerWidth < 768) {
        scheduleTable.style.fontSize = '0.85rem';
    } else {
        scheduleTable.style.fontSize = '';
    }
}

window.addEventListener('resize', optimizeScheduleTable);
optimizeScheduleTable();

// ===================================
// CTA Button Click Tracking
// ===================================
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonLocation = button.closest('section')?.id || 'unknown';

        // Track CTA clicks (integrate with analytics)
        console.log(`CTA clicked: "${buttonText}" in section: ${buttonLocation}`);
        // Example: gtag('event', 'cta_click', { 'button_text': buttonText, 'section': buttonLocation });
    });
});

// ===================================
// Session Duration Tracking
// ===================================
let sessionStartTime = Date.now();
let lastActivityTime = Date.now();
let totalActiveTime = 0;

// Track user activity
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
        lastActivityTime = Date.now();
    }, { passive: true });
});

// Calculate active session time
setInterval(() => {
    const now = Date.now();
    const timeSinceActivity = now - lastActivityTime;

    // Consider user active if activity within last 30 seconds
    if (timeSinceActivity < 30000) {
        totalActiveTime += 5000; // Add 5 seconds
    }
}, 5000);

// Send session data before user leaves
window.addEventListener('beforeunload', () => {
    const totalSessionTime = Date.now() - sessionStartTime;
    const engagementRate = (totalActiveTime / totalSessionTime) * 100;

    // Track session metrics (integrate with analytics)
    console.log(`Session duration: ${totalSessionTime}ms, Active time: ${totalActiveTime}ms, Engagement: ${engagementRate.toFixed(2)}%`);
    // Example: gtag('event', 'session_end', { 'duration': totalSessionTime, 'active_time': totalActiveTime });
});

// ===================================
// Page Performance Metrics
// ===================================
window.addEventListener('load', () => {
    // Measure page load performance
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:');
        console.log(`- Page Load Time: ${pageLoadTime}ms`);
        console.log(`- DOM Ready Time: ${domReadyTime}ms`);
        console.log(`- Render Time: ${renderTime}ms`);

        // Track performance metrics (integrate with analytics)
        // Example: gtag('event', 'page_performance', { 'load_time': pageLoadTime });
    }

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===================================
// Scroll Depth Tracking (for engagement)
// ===================================
let maxScrollDepth = 0;
const scrollMilestones = [25, 50, 75, 100];
const reachedMilestones = new Set();

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.pageYOffset;
    const scrollPercentage = (scrolled / scrollHeight) * 100;

    if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;
    }

    // Track scroll milestones
    scrollMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !reachedMilestones.has(milestone)) {
            reachedMilestones.add(milestone);
            console.log(`Scroll milestone reached: ${milestone}%`);
            // Example: gtag('event', 'scroll_depth', { 'percentage': milestone });
        }
    });
}, { passive: true });

// ===================================
// Optimize Performance - Reduce Repaints
// ===================================
// Use requestAnimationFrame for smooth animations
let ticking = false;

function optimizedScrollHandler() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Perform scroll-based updates here
            ticking = false;
        });
        ticking = true;
    }
}

// ===================================
// Accessibility Enhancements
// ===================================
// Skip to main content for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #0066B3;
    color: white;
    padding: 8px;
    z-index: 10001;
    text-decoration: none;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for cards
document.querySelectorAll('.tech-card, .blog-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ===================================
// Reduced Motion Support
// ===================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.removeAttribute('data-aos');
        el.classList.add('aos-animate');
    });
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🌊 Welcome to Aquatic Recovery Center!', 'color: #0066B3; font-size: 20px; font-weight: bold;');
console.log('%cWhere Water Heals 💧', 'color: #7FB539; font-size: 16px; font-weight: bold;');
console.log('%cWebsite designed for optimal performance and user experience.', 'color: #666; font-size: 12px;');

// ===================================
// Service Worker Registration (for PWA capabilities)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// Exit Intent Detection (reduce bounce rate)
// ===================================
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitIntentShown && window.pageYOffset < 500) {
        exitIntentShown = true;
        // Show exit intent popup or offer
        console.log('Exit intent detected - show retention offer');
        // Example: show modal with special offer
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace('2025', new Date().getFullYear());
}

// ===================================
// Print Styles Optimization
// ===================================
window.addEventListener('beforeprint', () => {
    // Pause video before printing
    if (heroVideo) {
        heroVideo.pause();
    }
});

// ===================================
// Performance: Debounce Helper
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    optimizeScheduleTable();
}, 250);

window.addEventListener('resize', debouncedResize);

// ===================================
// Initialize all functions
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Aquatic Recovery Center website initialized successfully!');
    console.log('🎯 Performance optimizations active');
    console.log('📊 Analytics tracking ready');
    console.log('♿ Accessibility features enabled');
});
