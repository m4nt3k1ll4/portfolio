// =====================================================
// SMOOTH SCROLL NAVIGATION
// =====================================================
document.querySelectorAll('.toc a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active link
            document.querySelectorAll('.toc a').forEach(link => {
                link.style.fontWeight = 'normal';
                link.style.color = 'var(--text-muted)';
            });
            this.style.fontWeight = '600';
            this.style.color = 'var(--primary-color)';
        }
    });
});

// =====================================================
// SCROLL TO TOP BUTTON
// =====================================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// HIGHLIGHT ACTIVE SECTION ON SCROLL
// =====================================================
const sections = document.querySelectorAll('.doc-section');
const navLinks = document.querySelectorAll('.toc a');

function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.fontWeight = 'normal';
        link.style.color = 'var(--text-muted)';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--primary-color)';
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// =====================================================
// COPY CODE BLOCKS
// =====================================================
document.querySelectorAll('pre').forEach((block) => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '<i class="fas fa-copy"></i>';
    button.title = 'Copiar código';
    
    button.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    `;

    block.style.position = 'relative';
    block.appendChild(button);

    button.addEventListener('click', async () => {
        const code = block.querySelector('code').textContent;
        
        try {
            await navigator.clipboard.writeText(code);
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = 'rgba(72, 187, 120, 0.3)';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i>';
                button.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    });

    button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    button.addEventListener('mouseleave', () => {
        if (!button.innerHTML.includes('check')) {
            button.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
});

// =====================================================
// KEYBOARD NAVIGATION
// =====================================================
document.addEventListener('keydown', (e) => {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});

// =====================================================
// MOBILE MENU TOGGLE (para sidebar en móvil)
// =====================================================
if (window.innerWidth <= 1024) {
    const sidebar = document.querySelector('.sidebar');
    const sidebarContent = document.querySelector('.sidebar-content');
    
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<i class="fas fa-bars"></i> Tabla de Contenidos';
    toggleButton.className = 'sidebar-toggle';
    toggleButton.style.cssText = `
        display: block;
        width: 100%;
        padding: 1rem;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
    `;
    
    sidebar.insertBefore(toggleButton, sidebarContent);
    sidebarContent.style.display = 'none';
    
    toggleButton.addEventListener('click', () => {
        if (sidebarContent.style.display === 'none') {
            sidebarContent.style.display = 'block';
            toggleButton.innerHTML = '<i class="fas fa-times"></i> Cerrar Menú';
        } else {
            sidebarContent.style.display = 'none';
            toggleButton.innerHTML = '<i class="fas fa-bars"></i> Tabla de Contenidos';
        }
    });
}

// =====================================================
// LAZY LOADING IMAGES (si se agregan en el futuro)
// =====================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// =====================================================
// PRINT FUNCTIONALITY
// =====================================================
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i>';
    printBtn.title = 'Imprimir documentación';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 5rem;
        right: 2rem;
        background: var(--info);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-5px)';
    });
    
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(printBtn);
}

addPrintButton();

// =====================================================
// ANALYTICS (opcional - descomentar si se necesita)
// =====================================================
/*
function trackPageView() {
    // Google Analytics o similar
    console.log('Page viewed:', window.location.pathname);
}

function trackSectionView(sectionId) {
    console.log('Section viewed:', sectionId);
}

trackPageView();
*/

console.log('📘 Documentación de Laravel 12 API cargada correctamente');
console.log('💡 Presiona "T" para ir al inicio de la página');
console.log('🖨️ Usa el botón de imprimir para guardar como PDF');