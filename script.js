// ========================================
// Portfolio JavaScript - Clean & Professional
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initMatrixRain();
    initNavigation();
    initMobileMenu();
    initTypingEffect();
    initScrollAnimations();
    initSmoothScroll();
});

// ========================================
// Cursor Glow Effect
// ========================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (!cursorGlow) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Smooth follow effect
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        
        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========================================
// Matrix Rain Background Effect
// ========================================
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Characters - mix of code symbols and characters
    const chars = '01アイウエオカキクケコ{}[]<>=/*+-_;:,.()$#@!%^&|~`';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track y position of each column
    const drops = Array(columns).fill(1);
    
    function draw() {
        // Semi-transparent background for fade effect
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Orange text matching the theme
        ctx.fillStyle = '#f97316';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop randomly after reaching bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const nav = document.getElementById('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 15, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            nav.style.background = 'rgba(10, 10, 15, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// Typing Effect
// ========================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    
    if (!typingElement) return;
    
    const titles = [
        'LLM Engineer',
        'Backend Developer',
        'Python Developer',
        'AI Systems Architect',
        'Team Lead'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        }
        
        // If deletion is complete
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// ========================================
// Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-content, .about-skills, .experience-card, .project-card, ' +
        '.publication-card, .achievement-card, .education-card, .contact-card, ' +
        '.hero-content, .hero-visual, .code-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => projectObserver.observe(card));
}

// ========================================
// Active Navigation Link
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.style.color = '#f97316';
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// Stats Counter Animation
// ========================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isDecimal = finalValue.includes('.');
        const hasPlus = finalValue.includes('+');
        const numericValue = parseFloat(finalValue);
        
        if (isNaN(numericValue)) return;
        
        let current = 0;
        const increment = numericValue / 40;
        const duration = 1500;
        const stepTime = duration / 40;
        
        stat.textContent = '0';
        
        const counter = setInterval(() => {
            current += increment;
            
            if (current >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(counter);
            } else {
                let displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
                stat.textContent = displayValue + (hasPlus ? '+' : '');
            }
        }, stepTime);
    });
}

// Trigger stats animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

// ========================================
// Console Message
// ========================================
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #f97316;');
console.log('%cLooking to hire? Reach out at iamriju01@gmail.com', 'font-size: 14px; color: #9898a8;');
console.log('%cOr connect on LinkedIn: linkedin.com/in/riju-saha-102705254', 'font-size: 14px; color: #9898a8;');
