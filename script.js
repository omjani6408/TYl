// Portfolio Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and gallery items
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mediaBtns = document.querySelectorAll('.media-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Carousel functionality
    initCarousel();
    
    // Current active filters
    let activeCategory = 'jewelry';
    let activeMedia = 'photo';
    
    // Check if we're on a category page and set appropriate defaults
    const isCategoryPage = document.querySelector('.category-gallery');
    if (isCategoryPage) {
        // On category pages, show photos by default
        activeMedia = 'photo';
    }
    
    // Initialize gallery
    filterGallery();
    
    // Category filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all category buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update active category
            activeCategory = this.getAttribute('data-filter');
            // Filter gallery
            filterGallery();
        });
    });
    
    // Media filter buttons
    mediaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all media buttons
            mediaBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Update active media type
            activeMedia = this.getAttribute('data-media');
            // Filter gallery
            filterGallery();
        });
    });
    
    // Category card clicks - now handled by href links to separate pages
    // Removed the click handler since cards now link to separate pages
    
    // Filter gallery function
    function filterGallery() {
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemMedia = item.getAttribute('data-media');
            
            // Check if we're on a category page or main page
            const isCategoryPage = document.querySelector('.category-gallery');
            
            if (isCategoryPage) {
                // On category pages, only filter by media type
                if (itemMedia === activeMedia) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }
            } else {
                // On main page, filter by both category and media
                if (itemCategory === activeCategory && itemMedia === activeMedia) {
                    item.classList.add('show');
                    item.style.display = 'block';
                } else {
                    item.classList.remove('show');
                    item.style.display = 'none';
                }
            }
        });
        
        // Update media button counts
        updateMediaCounts();
    }
    
    // Update media button counts based on active category
    function updateMediaCounts() {
        const isCategoryPage = document.querySelector('.category-gallery');
        
        if (isCategoryPage) {
            // On category pages, count all photos and videos
            const photoCount = document.querySelectorAll('.gallery-item.photo').length;
            const videoCount = document.querySelectorAll('.gallery-item.video').length;
            
            // Update photo button text
            const photoBtn = document.querySelector('.media-btn[data-media="photo"]');
            if (photoBtn) {
                photoBtn.textContent = `Photo (${photoCount})`;
            }
            
            // Update video button text
            const videoBtn = document.querySelector('.media-btn[data-media="video"]');
            if (videoBtn) {
                videoBtn.textContent = `Video (${videoCount})`;
            }
        } else {
            // On main page, count by category
            const photoCount = document.querySelectorAll(`.gallery-item.${activeCategory}.photo`).length;
            const videoCount = document.querySelectorAll(`.gallery-item.${activeCategory}.video`).length;
            
            // Update photo button text
            const photoBtn = document.querySelector('.media-btn[data-media="photo"]');
            if (photoBtn) {
                photoBtn.textContent = `Photo (${photoCount})`;
            }
            
            // Update video button text
            const videoBtn = document.querySelector('.media-btn[data-media="video"]');
            if (videoBtn) {
                videoBtn.textContent = `Video (${videoCount})`;
            }
        }
    }
    
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
    
    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, Message)');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Gallery item click handlers for lightbox effect
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            } else {
                const videoPlaceholder = this.querySelector('.video-placeholder');
                if (videoPlaceholder) {
                    const videoTitle = videoPlaceholder.querySelector('span').textContent;
                    openVideoModal(videoTitle);
                }
            }
        });
    });
    
    // Lightbox functionality
    function openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <div class="lightbox-caption">${alt}</div>
            </div>
        `;
        
        // Add styles
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            cursor: default;
        `;
        
        const img = lightbox.querySelector('.lightbox-image');
        img.style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        `;
        
        const caption = lightbox.querySelector('.lightbox-caption');
        caption.style.cssText = `
            color: white;
            text-align: center;
            margin-top: 10px;
            font-size: 16px;
        `;
        
        // Add to page
        document.body.appendChild(lightbox);
        
        // Close handlers
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    // Video modal functionality
    function openVideoModal(title) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <span class="video-modal-close">&times;</span>
                <div class="video-placeholder-large">
                    <i class="fas fa-play-circle"></i>
                    <h3>${title}</h3>
                    <p>Video content would be displayed here</p>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const content = modal.querySelector('.video-modal-content');
        content.style.cssText = `
            position: relative;
            max-width: 80%;
            max-height: 80%;
            cursor: default;
            text-align: center;
        `;
        
        const placeholder = modal.querySelector('.video-placeholder-large');
        placeholder.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 60px 40px;
            border-radius: 15px;
            color: white;
        `;
        
        const icon = placeholder.querySelector('i');
        icon.style.cssText = `
            font-size: 4rem;
            margin-bottom: 20px;
            display: block;
        `;
        
        const closeBtn = modal.querySelector('.video-modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close handlers
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .gallery-item, .about-text, .three-pillars').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
            z-index: 1001;
        `;
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: white;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 50px 20px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    transition: left 0.3s ease;
                    z-index: 1000;
                }
                
                .nav-menu.mobile-open {
                    left: 0;
                }
                
                .nav-menu .nav-link {
                    margin: 15px 0;
                    font-size: 1.2rem;
                    padding: 15px 30px;
                    border-radius: 25px;
                    background: #f8f9fa;
                    width: 100%;
                    text-align: center;
                    max-width: 200px;
                }
                
                .nav-menu .nav-link.contact-btn {
                    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
                    color: white;
                }
            }
            
            @media (max-width: 575px) {
                .nav-menu {
                    top: 60px;
                    height: calc(100vh - 60px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add mobile menu button
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-open');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('mobile-open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                const navMenu = document.querySelector('.nav-menu');
                navMenu.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            
            if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
                navMenu.classList.remove('mobile-open');
                const icon = mobileBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Carousel initialization function
    function initCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show specific slide
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        // Function to go to next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }
        
        // Function to start auto-slide
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
        }
        
        // Function to stop auto-slide
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoSlide();
                startAutoSlide(); // Restart auto-slide
            });
        });
        
        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoSlide);
            carousel.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Start auto-slide
        startAutoSlide();
    }
});

// Utility functions
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

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(function() {
    // Scroll handling code here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
