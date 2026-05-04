/* ============================================
   PORTFOLIO MAIN JAVASCRIPT
   Modern Portfolio Functionality
   ============================================ */

const portfolioSecurity = window.PortfolioSecurity || {};
const escapeMainHtml = (value) => typeof portfolioSecurity.escapeHtml === 'function'
  ? portfolioSecurity.escapeHtml(value)
  : String(value ?? '');
const safeMainUrl = (value, fallback = '#') => typeof portfolioSecurity.sanitizeUrl === 'function'
  ? portfolioSecurity.sanitizeUrl(value, fallback)
  : (value || fallback);
const safeMainClasses = (value) => typeof portfolioSecurity.sanitizeClassList === 'function'
  ? portfolioSecurity.sanitizeClassList(value)
  : String(value ?? '');
const safeMainColor = (value, fallback = 'currentColor') => typeof portfolioSecurity.sanitizeCssColor === 'function'
  ? portfolioSecurity.sanitizeCssColor(value, fallback)
  : (value || fallback);
const safeMainPercent = (value) => {
  if (typeof portfolioSecurity.sanitizePercent === 'function') {
    return portfolioSecurity.sanitizePercent(value);
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? Math.min(100, Math.max(0, numericValue)) : 0;
};
const hardenMainLinks = (root = document) => {
  if (typeof portfolioSecurity.hardenExternalLinks === 'function') {
    portfolioSecurity.hardenExternalLinks(root);
  }
};

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
  initializeUIActions();
    initializeScrollAnimations();
    initializeContactForm();
    renderImpactStats();
    renderFeaturedProjects();
    renderProjects();
    renderSkills();
    initializeMobileMenu();
    initializeScrollToTop();
  hardenMainLinks();
});

// ============================================
// DATA LOADING
// ============================================
async function loadData() {
    try {
    const [projectsData, skillsData] = await Promise.all([
      fetchJson('./data/projects.json'),
      fetchJson('./data/skills.json')
    ]);

    state.projects = Array.isArray(projectsData.projects) ? projectsData.projects : [];
    state.skills = Array.isArray(skillsData.skillCategories) ? skillsData.skillCategories : [];
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

function initializeUIActions() {
  document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const { filter } = button.dataset;
      filterProjects(filter || 'all');
    });
  });

  const downloadButton = document.querySelector('[data-action="download-cv"]');
  if (downloadButton) {
    downloadButton.addEventListener('click', downloadCV);
  }

  attachImageFallbacks(document);
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll('img[data-fallback-src]').forEach((image) => {
    if (image.dataset.fallbackBound === 'true') {
      return;
    }

    image.dataset.fallbackBound = 'true';
    image.addEventListener('error', handleImageFallback);
  });
}

function handleImageFallback(event) {
  const image = event.currentTarget;
  const fallbackSrc = image.dataset.fallbackSrc;

  if (!fallbackSrc || image.dataset.fallbackApplied === 'true') {
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = fallbackSrc;

  if (image.dataset.fallbackWidth) {
    image.style.maxWidth = image.dataset.fallbackWidth;
  }
}

function getPortfolioStats() {
  const liveProjects = state.projects.filter((project) => Boolean(project.demoUrl)).length;

  return [
    {
      value: '2 años',
      label: 'experiencia en producción',
      detail: 'desarrollo y mantenimiento de aplicaciones web'
    },
    {
      value: `${state.projects.length}`,
      label: 'proyectos seleccionados',
      detail: 'sistemas internos, sitios y landings publicadas'
    },
    {
      value: `${liveProjects}`,
      label: 'sitios en producción',
      detail: 'proyectos con salida pública y objetivo comercial'
    },
    {
      value: '3',
      label: 'etapas recientes',
      detail: 'Cybertec, Daitech y trabajo freelance'
    }
  ];
}

function renderImpactStats() {
  const statsContainer = document.getElementById('impactStatsContainer');
  if (!statsContainer) return;

  statsContainer.innerHTML = getPortfolioStats().map((stat, index) => `
    <article class="hero-stat fade-in" style="animation-delay: ${index * 0.08}s">
      <strong>${escapeMainHtml(stat.value)}</strong>
      <span>${escapeMainHtml(stat.label)}</span>
      <small>${escapeMainHtml(stat.detail)}</small>
    </article>
  `).join('');
}

function getFeaturedProjects() {
  const featuredProjects = state.projects.filter((project) => project.featured);
  const sourceProjects = featuredProjects.length ? featuredProjects : state.projects;
  return sourceProjects.slice(0, 3);
}

function renderFeaturedProjects() {
  const featuredProjectsContainer = document.getElementById('featuredProjectsContainer');
  if (!featuredProjectsContainer) return;

  featuredProjectsContainer.innerHTML = getFeaturedProjects().map(createFeaturedProjectMarkup).join('');
  attachImageFallbacks(featuredProjectsContainer);
  hardenMainLinks(featuredProjectsContainer);

  // Re-observe featured cards after injection.
  initializeScrollAnimations();
}

function createFeaturedProjectMarkup(project, index) {
  const imageSrc = safeMainUrl(project.image, './assets/screenshots/placeholder.png');
  const title = escapeMainHtml(project.title);
  const category = escapeMainHtml(project.category || 'Proyecto');
  const year = escapeMainHtml(project.year || 'Actual');
  const caseLabel = index === 0 ? 'Caso principal' : 'Caso destacado';
  const description = escapeMainHtml(project.longDescription || project.description);
  const technologies = Array.isArray(project.technologies) ? project.technologies.slice(0, 4) : [];
  const tagsMarkup = technologies.map((technology) => `<span class="tag">${escapeMainHtml(technology)}</span>`).join('');
  const highlightsMarkup = Array.isArray(project.features)
    ? project.features.slice(0, 3).map((feature) => `<li>${escapeMainHtml(feature)}</li>`).join('')
    : '';
  const projectLinks = [
    createProjectLinkMarkup(project.demoUrl, 'btn btn-primary btn-sm', 'fas fa-external-link-alt', 'Abrir caso'),
    createProjectLinkMarkup(project.githubUrl, 'btn btn-outline btn-sm', 'fab fa-github', 'Revisar código')
  ].filter(Boolean).join('');
  const footerMarkup = projectLinks
    ? `<div class="project-links">${projectLinks}</div>`
    : '<p class="card-description">Proyecto con acceso privado o despliegue interno.</p>';

  return `
    <article class="card featured-case fade-in ${index === 0 ? 'featured-case-primary' : ''}">
      <div class="featured-case-media">
        <img src="${imageSrc}" alt="${title}" class="project-image" data-fallback-src="./assets/screenshots/placeholder.png">
      </div>
      <div class="featured-case-body">
        <div class="case-meta">
          <span>${escapeMainHtml(caseLabel)}</span>
          <span>${category} · ${year}</span>
        </div>
        <h3 class="featured-case-title">${title}</h3>
        <p class="featured-case-description">${description}</p>
        <div class="project-tags">
          ${tagsMarkup}
        </div>
        <ul class="case-highlights">
          ${highlightsMarkup}
        </ul>
        ${footerMarkup}
      </div>
    </article>
  `;
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

    projectsContainer.innerHTML = filteredProjects.map(createProjectCardMarkup).join('');
    attachImageFallbacks(projectsContainer);
    hardenMainLinks(projectsContainer);

    // Re-observe new elements
    initializeScrollAnimations();
}

function createProjectCardMarkup(project) {
    const imageSrc = safeMainUrl(project.image, './assets/screenshots/placeholder.png');
    const title = escapeMainHtml(project.title);
  const category = escapeMainHtml(project.category || 'Proyecto');
  const year = escapeMainHtml(project.year || 'Actual');
    const description = escapeMainHtml(project.description);
    const tags = Array.isArray(project.tags)
    ? project.tags.slice(0, 4).map((tag) => `<span class="tag">${escapeMainHtml(tag)}</span>`).join('')
        : '';
  const projectLinks = [
    createProjectLinkMarkup(project.demoUrl, 'btn btn-primary btn-sm', 'fas fa-external-link-alt', 'Ver Demo'),
    createProjectLinkMarkup(project.githubUrl, 'btn btn-outline btn-sm', 'fab fa-github', 'Código')
  ].filter(Boolean).join('');
  const footerMarkup = projectLinks
    ? `<div class="project-links">${projectLinks}</div>`
    : '<p class="card-description">Proyecto con acceso privado o repositorio no público.</p>';

    return `
    <div class="card project-card fade-in">
      <img src="${imageSrc}" alt="${title}" class="project-image" data-fallback-src="./assets/screenshots/placeholder.png">
      <div class="card-content">
        <div class="project-meta">
          <span>${category}</span>
          <span>${year}</span>
        </div>
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        
        <div class="project-tags">
          ${tags}
        </div>
        
        ${footerMarkup}
      </div>
    </div>
  `;
}

function createProjectLinkMarkup(url, className, iconClass, label) {
    const safeHref = safeMainUrl(url);
    if (!url || safeHref === '#') {
        return '';
    }

    return `<a href="${safeHref}" class="${className}" target="_blank" rel="noopener noreferrer">
            <i class="${iconClass}"></i> ${escapeMainHtml(label)}
          </a>`;
}

// ============================================
// SKILLS RENDERING
// ============================================
function renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer) return;

    skillsContainer.innerHTML = state.skills.map(createSkillCategoryMarkup).join('');

    // Re-observe new elements
    initializeScrollAnimations();
}

function createSkillCategoryMarkup(category, index) {
    const categoryIcon = safeMainClasses(category.icon);
    const categoryColor = safeMainColor(category.color, 'currentColor');
    const categoryName = escapeMainHtml(category.name);
    const categorySkills = Array.isArray(category.skills) ? category.skills.map(createSkillItemMarkup).join('') : '';

    return `
    <div class="skill-category fade-in" style="animation-delay: ${index * 0.1}s">
      <h3>
        <i class="fas ${categoryIcon}" style="color: ${categoryColor}"></i>
        ${categoryName}
      </h3>
      <div class="skill-grid">
        ${categorySkills}
      </div>
    </div>
  `;
}

function createSkillItemMarkup(skill) {
    const iconClass = safeMainClasses(skill.icon);
    const skillName = escapeMainHtml(skill.name);

    return `
          <div class="skill-item hover-lift">
            <div class="skill-icon">
              <i class="${iconClass}"></i>
            </div>
            <div class="skill-name">${skillName}</div>
          </div>
        `;
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

    const icon = document.createElement('i');
    icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;

    const text = document.createElement('span');
    text.textContent = message;

    notification.append(icon, text);

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
  const cvUrl = safeMainUrl('./assets/cv/CV_FULLSTACK_JUAN_SUAREZ_ES.pdf');
  if (cvUrl === '#') {
    showNotification('No se pudo localizar el CV.', 'error');
    return;
  }

    const link = document.createElement('a');
  link.href = cvUrl;
    link.download = 'CV_FULLSTACK_JUAN_SUAREZ_ES.pdf';
  document.body.appendChild(link);
    link.click();
  link.remove();

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
