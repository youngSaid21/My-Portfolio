// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Typing Animation
const texts = ['Data & AI Student', 'Aspirant Data Scientist'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    
    document.querySelector('.typing-text').textContent = letter;
    
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

// Start typing animation
type();

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Image Gallery Modal (for project template)
const galleryImages = document.querySelectorAll('.gallery-grid img');
if (galleryImages.length > 0) {
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            // Add your image modal logic here
        });
    });
}

// Project Carousel
function initProjectCarousel() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    function organizeProjects() {
        // Clear existing content
        projectsGrid.innerHTML = '';
        
        // Get active filter
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        // Get filtered projects
        let filteredProjects = Array.from(projectCards).filter(card => {
            return activeFilter === 'all' || card.getAttribute('data-category') === activeFilter;
        });
        
        if (filteredProjects.length <= 4) {
            // If 4 or fewer projects, display them normally
            const projectSlide = document.createElement('div');
            projectSlide.className = 'project-slide';
            filteredProjects.forEach(project => projectSlide.appendChild(project.cloneNode(true)));
            projectsGrid.appendChild(projectSlide);
        } else {
            // Create carousel for more than 4 projects
            const slides = Math.ceil(filteredProjects.length / 4);
            let currentSlide = 0;
            
            // Create carousel container
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'carousel-container';
            
            // Create slides
            for (let i = 0; i < slides; i++) {
                const slideProjects = filteredProjects.slice(i * 4, (i + 1) * 4);
                const projectSlide = document.createElement('div');
                projectSlide.className = 'project-slide';
                slideProjects.forEach(project => projectSlide.appendChild(project.cloneNode(true)));
                carouselContainer.appendChild(projectSlide);
            }
            
            projectsGrid.appendChild(carouselContainer);
            
            // Create carousel controls
            const controls = document.createElement('div');
            controls.className = 'carousel-controls';
            controls.innerHTML = `
                <button class="carousel-btn prev"><i class="fas fa-chevron-left"></i></button>
                <div class="carousel-dots"></div>
                <button class="carousel-btn next"><i class="fas fa-chevron-right"></i></button>
            `;
            
            // Create dots
            const dotsContainer = controls.querySelector('.carousel-dots');
            for (let i = 0; i < slides; i++) {
                const dot = document.createElement('button');
                dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
            
            projectsGrid.appendChild(controls);
            
            function updateCarousel() {
                const allSlides = carouselContainer.querySelectorAll('.project-slide');
                carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update dots
                const dots = controls.querySelectorAll('.carousel-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            // Add event listeners for controls
            controls.querySelector('.prev').addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides) % slides;
                updateCarousel();
            });
            
            controls.querySelector('.next').addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides;
                updateCarousel();
            });
            
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateCarousel();
            }
        }
    }
    
    // Initialize carousel
    organizeProjects();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            organizeProjects();
        });
    });
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjectCarousel);
