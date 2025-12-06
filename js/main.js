/* ============================================
   PORTFOLIO MAIN JAVASCRIPT
   Modern Portfolio Functionality
   ============================================ */

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    projects: [],
    skills: [],
    currentFilter: 'all',
    isMenuOpen: false
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    renderProjects();
    renderSkills();
    initializeMobileMenu();
    initializeScrollToTop();
});

// ============================================
// DATA LOADING
// ============================================
async function loadData() {
    try {
        // Load projects
        const projectsResponse = await fetch('./data/projects.json');
        const projectsData = await projectsResponse.json();
        state.projects = projectsData.projects;

        // Load skills
        const skillsResponse = await fetch('./data/skills.json');
        const skillsData = await skillsResponse.json();
        state.skills = skillsData.skillCategories;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ============================================
// NAVIGATION
// ============================================
function initializeNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Close mobile menu if open
                if (state.isMenuOpen) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    state.isMenuOpen = !state.isMenuOpen;
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .stagger-item');
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================
// PROJECTS RENDERING
// ============================================
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;

    const filteredProjects = state.currentFilter === 'all'
        ? state.projects
        : state.projects.filter(p => p.category === state.currentFilter);

    projectsContainer.innerHTML = filteredProjects.map(project => `
    <div class="card project-card fade-in">
      <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='./assets/screenshots/placeholder.png'">
      <div class="card-content">
        <h3 class="card-title">${project.title}</h3>
        <p class="card-description">${project.description}</p>
        
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        
        <div class="project-links">
          ${project.demoUrl ? `<a href="${project.demoUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
            <i class="fas fa-external-link-alt"></i> Ver Demo
          </a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-outline btn-sm" target="_blank" rel="noopener">
            <i class="fab fa-github"></i> Código
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

    // Re-observe new elements
    initializeScrollAnimations();
}

// ============================================
// SKILLS RENDERING
// ============================================
function renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = state.skills.map((category, index) => `
    <div class="skill-category fade-in" style="animation-delay: ${index * 0.1}s">
      <h3>
        <i class="fas ${category.icon}" style="color: ${category.color}"></i>
        ${category.name}
      </h3>
      <div class="skill-grid">
        ${category.skills.map(skill => `
          <div class="skill-item hover-lift">
            <div class="skill-icon">
              <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level" style="font-size: 0.75rem; color: var(--color-text-muted);">
              ${skill.years} ${skill.years === 1 ? 'año' : 'años'}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

    // Re-observe new elements
    initializeScrollAnimations();
}

// ============================================
// PROJECT FILTERING
// ============================================
function filterProjects(category) {
    state.currentFilter = category;

    // Update filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    renderProjects();
}

// ============================================
// CONTACT FORM
// ============================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    <span>${message}</span>
  `;

    notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid ${type === 'success' ? 'var(--color-accent-green)' : 'var(--color-accent-red)'};
    color: var(--color-text-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--glass-shadow);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SCROLL TO TOP
// ============================================
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

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
}

// ============================================
// DOWNLOAD CV
// ============================================
function downloadCV() {
    // Create a link to download CV
    const link = document.createElement('a');
    link.href = './assets/cv/Juan_Lorenzo_Suarez_CV.pdf';
    link.download = 'Juan_Lorenzo_Suarez_CV.pdf';
    link.click();

    showNotification('Descargando CV...', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
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

// ============================================
// ANIMATIONS FOR NOTIFICATIONS
// ============================================
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
  
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(255, 51, 102, 0.3);
  }
  
  .scroll-top-btn.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .scroll-top-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(255, 51, 102, 0.4);
  }
`;
document.head.appendChild(style);

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================
window.filterProjects = filterProjects;
window.downloadCV = downloadCV;
