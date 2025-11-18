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
const videoFallback = document.querySelector('.hero-video-fallback');

if (heroVideo) {
    // Ensure video plays on mobile devices
    heroVideo.setAttribute('playsinline', '');
    heroVideo.setAttribute('webkit-playsinline', '');

    // Ensure seamless looping
    heroVideo.loop = true;
    heroVideo.muted = true;
    heroVideo.autoplay = true;

    // Check if video has actual content
    let videoHasContent = false;
    let videoDuration = 0;

    // Monitor video playback for debugging
    heroVideo.addEventListener('loadedmetadata', () => {
        videoDuration = heroVideo.duration;
        console.log('✅ Video loaded - Duration:', videoDuration.toFixed(2), 'seconds');
        console.log('Video dimensions:', heroVideo.videoWidth, 'x', heroVideo.videoHeight);
    });

    // Track playback progress
    let lastLoggedSecond = -1;
    heroVideo.addEventListener('timeupdate', () => {
        const currentSecond = Math.floor(heroVideo.currentTime);
        if (currentSecond !== lastLoggedSecond) {
            console.log('▶️ Video playback:', currentSecond + 1, '/', Math.ceil(videoDuration), 'seconds');
            lastLoggedSecond = currentSecond;
        }
    });

    // Play video when loaded
    heroVideo.addEventListener('loadeddata', () => {
        // Check if video has actual duration (not empty/corrupted)
        if (heroVideo.duration && heroVideo.duration > 0 && heroVideo.duration !== Infinity) {
            videoHasContent = true;
            heroVideo.style.display = 'block';
            if (videoFallback) {
                videoFallback.style.display = 'none';
            }

            console.log('🎬 Starting video playback...');
            heroVideo.play().catch(error => {
                console.log('❌ Video autoplay failed:', error);
                // Fallback: try to play on user interaction
                document.addEventListener('click', () => {
                    console.log('🖱️ Playing video on user click');
                    heroVideo.play();
                }, { once: true });
            });
        } else {
            // Video is empty or invalid, hide it and show fallback
            heroVideo.style.display = 'none';
            if (videoFallback) {
                videoFallback.style.display = 'block';
            }
            console.log('⚠️ Video file is empty or invalid. Using gradient background.');
        }
    });

    // Monitor when video naturally loops (for debugging)
    heroVideo.addEventListener('ended', () => {
        console.log('🔄 Video ended, browser will loop (duration was:', videoDuration.toFixed(2), 'seconds)');
        // Note: We don't manually restart since loop=true handles this
        // The browser's native loop should handle seamless looping
    });

    // Monitor when video plays
    heroVideo.addEventListener('play', () => {
        console.log('▶️ Video playing');
    });

    // Monitor when video pauses
    heroVideo.addEventListener('pause', () => {
        console.log('⏸️ Video paused at', heroVideo.currentTime.toFixed(2), 'seconds');
    });

    // Monitor seeking
    heroVideo.addEventListener('seeking', () => {
        console.log('⏩ Video seeking to', heroVideo.currentTime.toFixed(2), 'seconds');
    });

    heroVideo.addEventListener('seeked', () => {
        console.log('✅ Video seeked to', heroVideo.currentTime.toFixed(2), 'seconds');
    });

    // Handle video errors - show fallback
    heroVideo.addEventListener('error', (e) => {
        console.log('❌ Video error - using fallback background:', e);
        heroVideo.style.display = 'none';
        if (videoFallback) {
            videoFallback.style.display = 'block';
        }
    });

    // Timeout to check if video loaded - if not, show fallback
    setTimeout(() => {
        if (!videoHasContent) {
            heroVideo.style.display = 'none';
            if (videoFallback) {
                videoFallback.style.display = 'block';
            }
            console.log('⏱️ Video did not load properly. Using animated gradient background.');
        }
    }, 2000);

    // Keep video playing when in viewport (hero section)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && videoHasContent) {
                if (heroVideo.paused) {
                    console.log('👁️ Video in viewport, resuming playback');
                    heroVideo.play().catch(err => console.log('Play error:', err));
                }
            }
            // Don't pause hero video even when out of viewport
        });
    }, { threshold: 0.1 });

    videoObserver.observe(heroVideo);

    // Log final setup
    console.log('🎥 Video element configured with loop=true, autoplay=true, muted=true');
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
// Testimonial Carousel
// ===================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const indicators = document.querySelectorAll('.indicator');
let currentTestimonial = 0;
let autoPlayInterval;

function showTestimonial(index) {
    // Remove active class from all cards
    testimonialCards.forEach(card => {
        card.classList.remove('active', 'prev');
    });

    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Add active class to current card
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }

    // Add active class to current indicator
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }

    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(next);
}

function prevTestimonial() {
    const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prev);
}

// Event listeners for carousel buttons
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showTestimonial(index);
        resetAutoPlay();
    });
});

// Auto-play functionality
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Pause auto-play when user hovers over testimonials
const testimonialsSection = document.querySelector('.testimonials-carousel-wrapper');
if (testimonialsSection) {
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    testimonialsSection.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    const testimonialsVisible = testimonialsSection &&
        testimonialsSection.getBoundingClientRect().top < window.innerHeight &&
        testimonialsSection.getBoundingClientRect().bottom > 0;

    if (testimonialsVisible) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
            resetAutoPlay();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (testimonialsSection) {
    testimonialsSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - show next
            nextTestimonial();
        } else {
            // Swiped right - show previous
            prevTestimonial();
        }
        resetAutoPlay();
    }
}

// Initialize carousel
if (testimonialCards.length > 0) {
    showTestimonial(0);
    startAutoPlay();
}

// ===================================
// Pricing Card Interactions
// ===================================
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add subtle tilt effect on hover
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Track pricing card clicks
    card.addEventListener('click', function() {
        const planName = this.querySelector('.pricing-title').textContent;
        console.log(`Pricing plan clicked: ${planName}`);
        // Example: gtag('event', 'pricing_plan_click', { 'plan': planName });
    });
});

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
