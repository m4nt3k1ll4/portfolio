// ============================================
// Internationalization (i18n) System
// ============================================

let currentLanguage = 'es';

const translations = {
    es: {
        // Helper Panel
        'helper.title': 'Acciones Rápidas',
        'helper.intro': '¿No estás familiarizado con terminales? Haz clic en estos botones para explorar:',
        'helper.aboutMe': 'Sobre Mí',
        'helper.viewProfile': 'Ver Perfil',
        'helper.readBio': 'Leer Biografía',
        'helper.mySkills': 'Mis Habilidades',
        'helper.viewSkills': 'Ver Habilidades',
        'helper.browseSkills': 'Explorar Habilidades',
        'helper.projects': 'Proyectos',
        'helper.viewProjects': 'Ver Proyectos',
        'helper.browseProjects': 'Explorar Proyectos',
        'helper.contact': 'Contacto',
        'helper.contactInfo': 'Información de Contacto',
        'helper.learnTerminal': 'Aprender Terminal',
        'helper.showCommands': 'Mostrar Comandos',
        'helper.listFiles': 'Listar Archivos',
        'helper.showTree': 'Mostrar Árbol',
        'helper.funStuff': 'Diversión',
        'helper.hackMode': 'Modo Hack',
        'helper.matrix': 'Matrix',

        // Welcome Message
        'welcome.title': 'Bienvenido a mi Portfolio Interactivo',
        'welcome.subtitle': 'Terminal PowerShell - Portafolio de Juan Lorenzo Suárez',
        'welcome.intro': 'Escribe "help" para ver los comandos disponibles',
        'welcome.tip': 'Consejo: Usa TAB para autocompletar y las flechas ↑↓ para navegar el historial'
    },
    en: {
        // Helper Panel
        'helper.title': 'Quick Actions',
        'helper.intro': 'Not familiar with terminals? Click these buttons to explore:',
        'helper.aboutMe': 'About Me',
        'helper.viewProfile': 'View Profile',
        'helper.readBio': 'Read Bio',
        'helper.mySkills': 'My Skills',
        'helper.viewSkills': 'View Skills',
        'helper.browseSkills': 'Browse Skills',
        'helper.projects': 'Projects',
        'helper.viewProjects': 'View Projects',
        'helper.browseProjects': 'Browse Projects',
        'helper.contact': 'Contact',
        'helper.contactInfo': 'Contact Info',
        'helper.learnTerminal': 'Learn Terminal',
        'helper.showCommands': 'Show Commands',
        'helper.listFiles': 'List Files',
        'helper.showTree': 'Show Tree',
        'helper.funStuff': 'Fun Stuff',
        'helper.hackMode': 'Hack Mode',
        'helper.matrix': 'Matrix',

        // Welcome Message
        'welcome.title': 'Welcome to my Interactive Portfolio',
        'welcome.subtitle': 'PowerShell Terminal - Juan Lorenzo Suárez Portfolio',
        'welcome.intro': 'Type "help" to see available commands',
        'welcome.tip': 'Tip: Use TAB to autocomplete and arrow keys ↑↓ to navigate history'
    }
};

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Switch language
function switchLanguage(lang) {
    if (!translations[lang]) return false;

    currentLanguage = lang;
    updateUIText();
    localStorage.setItem('portfolio-lang', lang);

    // Update language button
    const langBtn = document.getElementById('currentLang');
    if (langBtn) {
        langBtn.textContent = lang.toUpperCase();
    }

    return true;
}

// Update all UI text with current language
function updateUIText() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
}

// Load saved language preference
function loadSavedLanguage() {
    const savedLang = localStorage.getItem('portfolio-lang');
    if (savedLang && translations[savedLang]) {
        switchLanguage(savedLang);
    }
}

// Initialize language system
function initLanguageSystem() {
    loadSavedLanguage();

    // Setup language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLanguage === 'es' ? 'en' : 'es';
            switchLanguage(newLang);
        });
    }
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}
