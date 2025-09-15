// Slideshow functionality
let slideIndex = 1;
let slideInterval;

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startSlideshow();
    initMobileMenu();

    // Initialize carousel after a short delay to ensure elements are loaded
    setTimeout(() => {
        if (document.getElementById('cardsContainer')) {
            initCircularCarousel();
        }
    }, 500);
});

// Show specific slide
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startSlideshow();
}

// Display slide function
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    // Show current slide and highlight current dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

// Auto slideshow
function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Start automatic slideshow
function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}


// Circular Carousel functionality - FIXED
let currentCarouselIndex = 0;
const totalCards = 6;

function initCircularCarousel() {
    const cardsContainer = document.getElementById('cardsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!cardsContainer || !prevBtn || !nextBtn) {
        console.log('Carousel elements not found, retrying...');
        return;
    }
    
    // Get card width based on screen size
    function getCardWidth() {
        if (window.innerWidth <= 480) return 250 + 32; // card width + gap
        if (window.innerWidth <= 768) return 280 + 32;
        return 320 + 32;
    }
    
    // Get number of visible cards based on screen size
    function getVisibleCards() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3; // Always show 3 on desktop
    }
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = getCardWidth();
        const translateX = -(currentCarouselIndex * cardWidth);
        cardsContainer.style.transform = `translateX(${translateX}px)`;
    }
    
    // Move to next card (circular) - FIXED
    function moveNext() {
        const visibleCards = getVisibleCards();
        
        currentCarouselIndex++;
        
        // If we go beyond the last possible position, wrap to beginning
        if (currentCarouselIndex > totalCards - visibleCards) {
            currentCarouselIndex = 0;
        }
        
        updateCarousel();
        
        // Add button hover effect
        nextBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Move to previous card (circular) - FIXED
    function movePrev() {
        const visibleCards = getVisibleCards();
        
        currentCarouselIndex--;
        
        // If we go below 0, wrap to the end
        if (currentCarouselIndex < 0) {
            currentCarouselIndex = totalCards - visibleCards;
        }
        
        updateCarousel();
        
        // Add button hover effect
        prevBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', moveNext);
    prevBtn.addEventListener('click', movePrev);
    
    // Initialize carousel position
    updateCarousel();
    
    console.log('Circular carousel initialized successfully!');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });

    slideshowContainer.addEventListener('mouseleave', function() {
        startSlideshow();
    });
}

// Add click effects to explore buttons
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const exploreButtons = document.querySelectorAll('.explore-btn');
        exploreButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);

                console.log('Explore button clicked for:', this.closest('.destination-card').querySelector('h3').textContent);
            });
        });
    }, 1000);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);