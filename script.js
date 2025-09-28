// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.team-member, .event-card, .schedule-item, .event-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to team members
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-8px)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0)';
    });
});

// Add click effect to event cards
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });
});

// Dynamic date formatting for upcoming events
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Add current time to regular meetings
function updateMeetingTimes() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const isTuesday = dayOfWeek === 2;
    const isThursday = dayOfWeek === 4;
    
    if (isTuesday || isThursday) {
        const scheduleItems = document.querySelectorAll('.schedule-item');
        scheduleItems.forEach(item => {
            const day = item.querySelector('.day').textContent;
            if ((isTuesday && day === 'Tuesday') || (isThursday && day === 'Thursday')) {
                item.style.borderLeftColor = '#10b981';
                item.style.backgroundColor = '#f0fdf4';
                
                // Add "Today" indicator
                const todayIndicator = document.createElement('span');
                todayIndicator.textContent = ' • Today';
                todayIndicator.style.color = '#10b981';
                todayIndicator.style.fontWeight = '600';
                item.querySelector('.day').appendChild(todayIndicator);
            }
        });
    }
}

// Initialize dynamic features
document.addEventListener('DOMContentLoaded', () => {
    updateMeetingTimes();
    
    // Add loading animation to images and handle errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Handle successful load
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            console.log('Image loaded successfully:', img.src);
        });
        
        // Handle load errors
        img.addEventListener('error', () => {
            console.error('Failed to load image:', img.src);
            // Add fallback styling for broken images
            img.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
            `;
            fallback.textContent = img.alt.split(' ')[0].charAt(0);
            img.parentNode.appendChild(fallback);
        });
        
        // Force reload if image doesn't load within 3 seconds
        setTimeout(() => {
            if (img.style.opacity === '0') {
                console.log('Image taking too long to load, attempting reload:', img.src);
                const originalSrc = img.src;
                img.src = '';
                img.src = originalSrc;
            }
        }, 3000);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus indicators for accessibility
document.querySelectorAll('a, button, .team-member, .event-card').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #4f46e5';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
