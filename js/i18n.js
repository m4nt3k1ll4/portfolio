// ============================================
// Internationalization (i18n) System
// ============================================

let currentLanguage = 'es';

const translations = {
    es: {
        // ========== HELPER PANEL ==========
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
        'helper.sendMessage': 'Enviar Mensaje',
        'helper.learnTerminal': 'Aprender Terminal',
        'helper.showCommands': 'Mostrar Comandos',
        'helper.listFiles': 'Listar Archivos',
        'helper.showTree': 'Mostrar Árbol',
        'helper.funStuff': 'Diversión',
        'helper.hackMode': 'Modo Hack',
        'helper.matrix': 'Matrix',
        'helper.utilities': 'Utilidades',
        'helper.clearConsole': 'Limpiar Consola',
        'helper.goHome': 'Ir al Inicio',
        'helper.closeInfo': 'Cerrar Información',

        // ========== WELCOME MESSAGE ==========
        'welcome.title': 'Bienvenido a mi Portfolio Interactivo',
        'welcome.subtitle': 'Terminal PowerShell - Portafolio de Juan Lorenzo Suárez',
        'welcome.intro': 'Bienvenido a mi portafolio interactivo de terminal',
        'welcome.tip': 'Consejo: Usa TAB para autocompletar y las flechas ↑↓ para navegar el historial',
        'welcome.helpCmd': 'Escribe',
        'welcome.helpText': 'para ver los comandos disponibles.',
        'welcome.lsCmd': 'para listar el contenido del directorio.',

        // ========== WELCOME SCREEN ==========
        'welcome.screen.title': 'Bienvenido a mi portafolio',
        'welcome.screen.subtitle': 'Explora mis habilidades y proyectos',
        'welcome.screen.instruction': 'Escribe el comando de abajo para inicializar:',
        'welcome.screen.cmdHint': 'init portfolio',
        'welcome.screen.continue': 'Escribe <span class="highlight-cmd">init portfolio</span> para continuar',

        // ========== COMMANDS HELP ==========
        'cmd.help.title': 'Comandos Disponibles',
        'cmd.help.navigation': 'Navegación',
        'cmd.help.cd': 'Cambiar directorio',
        'cmd.help.ls': 'Listar contenido del directorio',
        'cmd.help.pwd': 'Imprimir directorio actual',
        'cmd.help.tree': 'Mostrar árbol de directorios',
        'cmd.help.fileOps': 'Operaciones de Archivo',
        'cmd.help.cat': 'Mostrar contenido del archivo',
        'cmd.help.info': 'Información',
        'cmd.help.whoami': 'Sobre mí',
        'cmd.help.projects': 'Ver mis proyectos',
        'cmd.help.skills': 'Ver mis habilidades',
        'cmd.help.contact': 'Información de contacto',
        'cmd.help.utility': 'Utilidades',
        'cmd.help.clear': 'Limpiar terminal',
        'cmd.help.theme': 'Cambiar tema de color',
        'cmd.help.help': 'Mostrar este mensaje de ayuda',
        'cmd.help.tip': '💡 Consejo:',
        'cmd.help.trySkills': 'Intenta escribir "skills" o "projects" para ver tarjetas visuales!',

        // ========== ERROR MESSAGES ==========
        'error.commandNotFound': 'Comando no encontrado',
        'error.invalidPath': 'Ruta inválida',
        'error.accessDenied': 'Acceso denegado',
        'error.fileNotFound': 'Archivo no encontrado',
        'error.tryHelp': 'Escribe "help" para ver los comandos disponibles',
        'error.cannotAccess': 'no puede acceder a',
        'error.noFileOperand': 'falta un archivo',
        'error.notDirectory': 'no es un directorio',

        // ========== SUCCESS MESSAGES ==========
        'success.cleared': 'Terminal limpiada',
        'success.themeChanged': 'Tema cambiado a',

        // ========== THEME COMMAND ==========
        'cmd.theme.availableThemes': 'Temas disponibles:',
        'cmd.theme.current': 'actual',
        'cmd.theme.usage': 'Uso:',
        'cmd.theme.notFound': 'Tema no encontrado. Usa "theme" para ver temas disponibles.',

        // ========== WHOAMI/ABOUT COMMAND ==========
        'cmd.whoami.header': 'GitHub',
        'cmd.whoami.linkedin': 'LinkedIn',
        'cmd.whoami.downloadCV': 'Descargar CV',
        'cmd.whoami.bio': '💡 Escribe "cat /about/bio.txt" para mi biografía completa',

        // ========== PROJECTS COMMAND ==========
        'cmd.projects.header': 'Mis Proyectos',
        'cmd.projects.navTip': '💡 Navega a /projects/&lt;project-id&gt; para más detalles',

        // ========== SKILLS COMMAND ==========
        'cmd.skills.header': 'Habilidades Técnicas',
        'cmd.skills.frontend': 'Frontend',
        'cmd.skills.backend': 'Backend',
        'cmd.skills.database': 'Base de Datos',
        'cmd.skills.tools': 'Herramientas y Entorno',
        'cmd.skills.navTip': '💡 Navega a /skills para archivos de información detallada',

        // ========== CONTACT COMMAND ==========
        'cmd.contact.header': 'Información de Contacto',
        'cmd.contact.name': 'Nombre:',
        'cmd.contact.username': 'Usuario:',
        'cmd.contact.title': 'Título:',
        'cmd.contact.github': 'GitHub:',
        'cmd.contact.linkedin': 'LinkedIn:',
        'cmd.contact.more': 'Usa "cat /contact/info.txt" para más detalles',
        'cmd.sendContact.prompt': '📧 Formulario de Contacto',
        'cmd.sendContact.name': 'Tu nombre:',
        'cmd.sendContact.email': 'Tu email:',
        'cmd.sendContact.message': 'Tu mensaje:',
        'cmd.sendContact.sending': 'Enviando...',
        'cmd.sendContact.success': '✅ ¡Mensaje enviado exitosamente!',
        'cmd.sendContact.error': '❌ Error al enviar el mensaje:',
        'cmd.sendContact.cancel': 'Cancelado',
        'cmd.sendContact.invalidEmail': 'Por favor ingresa un email válido',

        // ========== ERROR MESSAGES FOR COMMANDS ==========
        'error.tree.noFile': 'tree:',
        'error.ls.noFile': 'ls: no puede acceder a',
        'error.cat.missingFile': 'cat: falta un archivo',
        'error.cat.noFile': 'cat:',
        'error.cd.noDir': 'cd:',

        // ========== EASTER EGGS ==========
        'cmd.sudorm.permissionDenied': '[ERROR] Permiso denegado: ¡Buen intento! 😏',
        'cmd.sudorm.protected': 'Este portafolio está protegido por plot armor.',
        'cmd.sudorm.matrix': 'Matrix te tiene...',
        'cmd.sudorm.rabbit': 'Sigue al conejo blanco.',
        'cmd.sudorm.knock': 'Toc, toc, Neo.',
        'cmd.sudorm.tip': '💡 Intenta "theme matrix" para la experiencia completa',
        'cmd.hack.joking': '⚠️ ¡Solo bromeaba! 😎',
        'cmd.hack.portfolio': 'Esto es un portafolio, no Matrix.',
        'cmd.hack.tryMatrix': 'Intenta "theme matrix" para la experiencia completa',
        'cmd.coffee.brewing': '☕ Preparando café...',
        'cmd.coffee.done': '¡Tu café está listo! ☕',
        'cmd.coffee.msg': '(Este desarrollador funciona con café y código)',
        'cmd.sudo.msg': 'sudo: No estás en el archivo sudoers. Este incidente será reportado.',
        'cmd.sudo.joking': 'Solo bromeaba, no puedes romper nada aquí 😄',
        'cmd.matrix.wake': 'Despierta, Neo...',

        // ========== ERROR MESSAGES FOR COMMANDS (SPANISH) ==========
        'error.noSuchFile': 'No existe el archivo o directorio',
        'error.changedTo': 'Cambiado a',

        // ========== CONTENT TRANSLATIONS (SPANISH) ==========
        'content.changedTo': 'Cambiado a',
        'content.noSuchFile': 'No existe el archivo o directorio',
        'content.notDirectory': 'No es un directorio',

        // ========== BIO AND PERSONAL DATA (SPANISH) ==========
        'bio.header': 'Juan Lorenzo Suárez Jiménez',
        'bio.title': 'Desarrollador Web Full-Stack ',
        'bio.intro': `Soy un desarrollador apasionado por transformar ideas en soluciones digitales 
funcionales. Veo en el código la herramienta ideal para crear, y elegí la web 
por su alcance y versatilidad. Cada proyecto es una oportunidad para aprender 
y construir algo útil.`,
        'bio.detail': `Como desarrollador, estoy en constante aprendizaje, perfeccionando mis 
habilidades con cada línea de código. Me motiva enfrentar desafíos lógicos, 
entender cómo funcionan las cosas y entregar productos bien estructurados. 
Mi enfoque está en escribir código limpio, escalable y seguir las mejores prácticas.`,

        // ========== PERSONAL DATA (SPANISH) ==========
        'personal.name': 'Juan Lorenzo Suárez Jiménez',
        'personal.username': 'm4nt3k1ll4',
        'personal.title': 'Desarrollador Web Full-Stack',
        'personal.email': 'contact@m4nt3k1ll4.dev',

        // ========== PROJECT DESCRIPTIONS (SPANISH) ==========
        'project.crosstaskmanager.name': 'CrossTaskManager',
        'project.crosstaskmanager.type': 'Aplicación SaaS',
        'project.crosstaskmanager.desc': `Cross Task Manager: Un SaaS de gestión de tareas con API RESTful (Laravel) 
y frontend (Angular). Asegura la gestión de usuarios, sedes y asignaciones con 
autenticación JWT y 3 roles definidos (CEO, Manager, Adviser) para una supervisión 
eficiente y organizada en distintas sedes.`,

        'project.variedades-humbertoss.name': 'Variedades Humbertosss',
        'project.variedades-humbertoss.type': 'Página de Destino',
        'project.variedades-humbertoss.desc': `Una landing page atractiva y funcional para el negocio de variedades 
Humbertoss, optimizada para conversiones, contacto y presencia web.`,

        'project.ofmedical.name': 'OF Medical SAS',
        'project.ofmedical.type': 'Sitio Web Semi-estático',
        'project.ofmedical.desc': `Una página semi-estática para la organización OF Medical, que presenta 
información sobre sus servicios y productos con un carrito de compras que almacena 
localmente los productos y exporta a un mensaje directo a WhatsApp para una mejor 
atención al cliente.`,

        // ========== PROJECT FILE LABELS (SPANISH) ==========
        'project.typeLabel': 'Tipo',
        'project.technologiesLabel': 'Tecnologías',
        'project.linksLabel': 'Enlaces',

        // ========== SKILLS CATEGORIES (SPANISH) ==========
        'skill.frontend': 'Habilidades Frontend',
        'skill.backend': 'Habilidades Backend',
        'skill.database': 'Habilidades de Base de Datos',
        'skill.tools': 'Herramientas y Entorno',

        // ========== FILE SYSTEM CONTENT (SPANISH) ==========
        'file.readme.title': '# Portafolio M4nt3k1ll4',
        'file.readme.welcome': '¡Bienvenido a mi portafolio de terminal interactivo!',
        'file.readme.quickStart': '## Inicio Rápido',
        'file.readme.tip1': '- Escribe \'help\' para ver los comandos disponibles',
        'file.readme.tip2': '- Escribe \'ls\' para listar el contenido del directorio',
        'file.readme.tip3': '- Escribe \'cd <directorio>\' para navegar',
        'file.readme.tip4': '- Escribe \'cat <archivo>\' para ver el contenido del archivo',
        'file.readme.about': '## Sobre Mí',
        'file.readme.aboutTip': 'Soy un Desarrollador Full-Stack especializado en Angular y Laravel. Navega a /about para saber más sobre mí.',
        'file.readme.projects': '## Proyectos',
        'file.readme.projectsTip': 'Consulta mis proyectos en el directorio /projects.',
        'file.readme.skills': '## Habilidades',
        'file.readme.skillsTip': 'Ver mis habilidades técnicas en el directorio /skills.',
        'file.readme.contact': '## Contacto',
        'file.readme.contactTip': 'Encuentra mi información de contacto en el directorio /contact.',
        'file.readme.closing': '¡Que disfrutes explorando! 🚀',

        // ========== EXPERIENCE FILE (SPANISH) ==========
        'file.experience.title': 'Experiencia Profesional',
        'file.experience.role': 'Desarrollador Full-Stack Jr (Actual)',
        'file.experience.duties': '- Construyendo aplicaciones web modernas con Angular y Laravel\n- Implementando APIs RESTful con autenticación JWT\n- Diseño y optimización de bases de datos\n- Control de versiones con Git y GitHub',
        'file.experience.projects': 'Proyectos Clave:\n- CrossTaskManager: Plataforma SaaS de gestión de tareas\n- Múltiples sitios web de clientes y páginas de destino\n- Soluciones de comercio electrónico con funcionalidad de carrito',
        'file.experience.skills': 'Desarrollo de Habilidades:\n- Aprendizaje continuo y construcción de proyectos\n- Siguiendo mejores prácticas y patrones de diseño\n- Resolución de problemas y pensamiento lógico\n- Código limpio y documentación',

        // ========== PROJECT SPECIFIC FILES (SPANISH) ==========
        'file.crosstask.tech': 'Frontend:\n  ⚡ Angular 18\n  ⚡ TypeScript\n  ⚡ RxJS\n  ⚡ Angular Material\n\nBackend:\n  ⚡ Laravel 7\n  ⚡ PHP\n  ⚡ Autenticación JWT\n  ⚡ API RESTful\n\nBase de Datos:\n  ⚡ MySQL',
        'file.crosstask.features': 'Autenticación y Autorización:\n  ✓ Autenticación basada en JWT\n  ✓ Control de acceso basado en roles (RBAC)\n  ✓ Tres roles de usuario: CEO, Manager, Adviser\n  ✓ Hashing seguro de contraseñas\n\nGestión de Tareas:\n  ✓ Crear, leer, actualizar, eliminar tareas\n  ✓ Asignar tareas a miembros del equipo\n  ✓ Seguimiento del estado de las tareas\n  ✓ Niveles de prioridad\n  ✓ Gestión de fechas de vencimiento\n\nSoporte Multiubicación:\n  ✓ Administrar múltiples ubicaciones comerciales\n  ✓ Asignación de tareas específica por ubicación\n  ✓ Reportes entre ubicaciones\n\nGestión de Usuarios:\n  ✓ Registro de usuarios y perfiles\n  ✓ Asignación de roles\n  ✓ Seguimiento de actividades',

        // ========== CONTACT FILES (SPANISH) ==========
        'file.contact.info.title': 'Información de Contacto',
        'file.contact.availability': 'Siéntete libre de comunicarte para:\n  ✓ Oportunidades de empleo\n  ✓ Proyectos freelance\n  ✓ Colaboración\n  ✓ Preguntas sobre mi trabajo',
        'file.contact.closing': '¡Siempre estoy abierto a discutir nuevos proyectos y oportunidades!',
        'file.contact.social': 'Redes Sociales y Enlaces',
        'file.contact.professional': 'Profesional:',
        'file.contact.downloadCV': 'Usa \'cat /about/cv.pdf\' para obtener el enlace de descarga.',
    },
    en: {
        // ========== HELPER PANEL ==========
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
        'helper.sendMessage': 'Send Message',
        'helper.learnTerminal': 'Learn Terminal',
        'helper.showCommands': 'Show Commands',
        'helper.listFiles': 'List Files',
        'helper.showTree': 'Show Tree',
        'helper.funStuff': 'Fun Stuff',
        'helper.hackMode': 'Hack Mode',
        'helper.matrix': 'Matrix',
        'helper.utilities': 'Utilities',
        'helper.clearConsole': 'Clear Console',
        'helper.goHome': 'Go Home',
        'helper.closeInfo': 'Close Info',

        // ========== WELCOME MESSAGE ==========
        'welcome.title': 'Welcome to my Interactive Portfolio',
        'welcome.subtitle': 'PowerShell Terminal - Juan Lorenzo Suárez Portfolio',
        'welcome.intro': 'Welcome to my interactive terminal portfolio',
        'welcome.tip': 'Tip: Use TAB to autocomplete and arrow keys ↑↓ to navigate history',
        'welcome.helpCmd': 'Type',
        'welcome.helpText': 'to see available commands.',
        'welcome.lsCmd': 'to list directory contents.',

        // ========== WELCOME SCREEN ==========
        'welcome.screen.title': 'Welcome to my portfolio',
        'welcome.screen.subtitle': 'Explore my skills and projects',
        'welcome.screen.instruction': 'Type the command below to initialize:',
        'welcome.screen.cmdHint': 'init portfolio',
        'welcome.screen.continue': 'Type <span class="highlight-cmd">init portfolio</span> to continue',

        // ========== COMMANDS HELP ==========
        'cmd.help.title': 'Available Commands',
        'cmd.help.navigation': 'Navigation',
        'cmd.help.cd': 'Change directory',
        'cmd.help.ls': 'List directory contents',
        'cmd.help.pwd': 'Print working directory',
        'cmd.help.tree': 'Show directory tree',
        'cmd.help.fileOps': 'File Operations',
        'cmd.help.cat': 'Display file contents',
        'cmd.help.info': 'Information',
        'cmd.help.whoami': 'About me',
        'cmd.help.projects': 'View my projects',
        'cmd.help.skills': 'View my skills',
        'cmd.help.contact': 'Contact information',
        'cmd.help.utility': 'Utility',
        'cmd.help.clear': 'Clear terminal',
        'cmd.help.theme': 'Change color theme',
        'cmd.help.help': 'Show this help message',
        'cmd.help.tip': '💡 Tip:',
        'cmd.help.trySkills': 'Try "skills" or "projects" to see visual cards!',

        // ========== ERROR MESSAGES ==========
        'error.commandNotFound': 'Command not found',
        'error.invalidPath': 'Invalid path',
        'error.accessDenied': 'Access denied',
        'error.fileNotFound': 'File not found',
        'error.tryHelp': 'Type "help" to see available commands',
        'error.cannotAccess': 'cannot access',
        'error.noFileOperand': 'missing file operand',
        'error.notDirectory': 'Not a directory',

        // ========== SUCCESS MESSAGES ==========
        'success.cleared': 'Terminal cleared',
        'success.themeChanged': 'Theme changed to',

        // ========== THEME COMMAND ==========
        'cmd.theme.availableThemes': 'Available themes:',
        'cmd.theme.current': 'current',
        'cmd.theme.usage': 'Usage:',
        'cmd.theme.notFound': 'Theme not found. Use "theme" to see available themes.',

        // ========== WHOAMI/ABOUT COMMAND ==========
        'cmd.whoami.header': 'GitHub',
        'cmd.whoami.linkedin': 'LinkedIn',
        'cmd.whoami.downloadCV': 'Download CV',
        'cmd.whoami.bio': '💡 Type "cat /about/bio.txt" for my full bio',

        // ========== PROJECTS COMMAND ==========
        'cmd.projects.header': 'My Projects',
        'cmd.projects.navTip': '💡 Navigate to /projects/&lt;project-id&gt; for more details',

        // ========== SKILLS COMMAND ==========
        'cmd.skills.header': 'Technical Skills',
        'cmd.skills.frontend': 'Frontend',
        'cmd.skills.backend': 'Backend',
        'cmd.skills.database': 'Database',
        'cmd.skills.tools': 'Tools & Environment',
        'cmd.skills.navTip': '💡 Navigate to /skills for detailed information files',

        // ========== CONTACT COMMAND ==========
        'cmd.contact.header': 'Contact Information',
        'cmd.contact.name': 'Name:',
        'cmd.contact.username': 'Username:',
        'cmd.contact.title': 'Title:',
        'cmd.contact.github': 'GitHub:',
        'cmd.contact.linkedin': 'LinkedIn:',
        'cmd.contact.more': 'Use "cat /contact/info.txt" for more details',
        'cmd.sendContact.prompt': '📧 Contact Form',
        'cmd.sendContact.name': 'Your name:',
        'cmd.sendContact.email': 'Your email:',
        'cmd.sendContact.message': 'Your message:',
        'cmd.sendContact.sending': 'Sending...',
        'cmd.sendContact.success': '✅ Message sent successfully!',
        'cmd.sendContact.error': '❌ Error sending message:',
        'cmd.sendContact.cancel': 'Cancelled',
        'cmd.sendContact.invalidEmail': 'Please enter a valid email',

        // ========== ERROR MESSAGES FOR COMMANDS ==========
        'error.tree.noFile': 'tree:',
        'error.ls.noFile': 'ls: cannot access',
        'error.cat.missingFile': 'cat: missing file operand',
        'error.cat.noFile': 'cat:',
        'error.cd.noDir': 'cd:',
        'error.noSuchFile': 'No such file or directory',
        'error.notDirectory': 'Not a directory',
        'error.changedTo': 'Changed to',

        // ========== CONTENT TRANSLATIONS ==========
        'content.changedTo': 'Changed to',
        'content.noSuchFile': 'No such file or directory',
        'content.notDirectory': 'Not a directory',

        // ========== BIO AND PERSONAL DATA ==========
        'bio.header': 'Juan Lorenzo Suárez Jiménez',
        'bio.title': 'Full-Stack Web Developer ',
        'bio.intro': `I'm a passionate developer focused on transforming ideas into functional digital solutions. \nI see code as the ideal tool for creating, and I chose web development for its reach and versatility. \nEvery project is an opportunity to learn and build something useful.`,
        'bio.detail': `As a junior developer, I'm in constant learning, perfecting my skills with every line of code. \nI'm motivated by facing logical challenges, understanding how things work, and delivering well-structured products. \nMy approach is to write clean, scalable code and follow best practices.`,

        // ========== PERSONAL DATA ==========
        'personal.name': 'Juan Lorenzo Suárez Jiménez',
        'personal.username': 'm4nt3k1ll4',
        'personal.title': 'Full-Stack Web Developer',
        'personal.email': 'contact@m4nt3k1ll4.dev',

        // ========== PROJECT DESCRIPTIONS ==========
        'project.crosstaskmanager.name': 'CrossTaskManager',
        'project.crosstaskmanager.type': 'SaaS Application',
        'project.crosstaskmanager.desc': `Cross Task Manager: A SaaS task management platform with RESTful API (Laravel) \nand frontend (Angular). Ensures user, location, and assignment management with \nJWT authentication and 3 defined roles (CEO, Manager, Adviser) for efficient \nand organized supervision across multiple locations.`,

        'project.variedades-humbertoss.name': 'Variedades Humbertosss',
        'project.variedades-humbertoss.type': 'Landing Page',
        'project.variedades-humbertoss.desc': `An attractive and functional landing page for the Variedades Humbertoss business, \noptimized for conversions, contact, and web presence.`,

        'project.ofmedical.name': 'OF Medical SAS',
        'project.ofmedical.type': 'Semi-Static Website',
        'project.ofmedical.desc': `A semi-static website for OF Medical organization, presenting information about \nits services and products with a shopping cart that stores products locally \nand exports to a direct WhatsApp message for better customer service.`,

        // ========== PROJECT FILE LABELS ==========
        'project.typeLabel': 'Type',
        'project.technologiesLabel': 'Technologies',
        'project.linksLabel': 'Links',

        // ========== SKILLS CATEGORIES ==========
        'skill.frontend': 'Frontend Skills',
        'skill.backend': 'Backend Skills',
        'skill.database': 'Database Skills',
        'skill.tools': 'Tools & Environment',

        // ========== FILE SYSTEM CONTENT ==========
        'file.readme.title': '# M4nt3k1ll4 Portfolio',
        'file.readme.welcome': 'Welcome to my interactive terminal portfolio!',
        'file.readme.quickStart': '## Quick Start',
        'file.readme.tip1': '- Type \'help\' to see available commands',
        'file.readme.tip2': '- Type \'ls\' to list directory contents',
        'file.readme.tip3': '- Type \'cd <directory>\' to navigate',
        'file.readme.tip4': '- Type \'cat <file>\' to view file contents',
        'file.readme.about': '## About Me',
        'file.readme.aboutTip': 'I\'m a Full-Stack Developer specializing in Angular and Laravel. Navigate to /about to learn more about me.',
        'file.readme.projects': '## Projects',
        'file.readme.projectsTip': 'Check out my projects in the /projects directory.',
        'file.readme.skills': '## Skills',
        'file.readme.skillsTip': 'View my technical skills in the /skills directory.',
        'file.readme.contact': '## Contact',
        'file.readme.contactTip': 'Find my contact information in the /contact directory.',
        'file.readme.closing': 'Happy exploring! 🚀',

        // ========== EXPERIENCE FILE ==========
        'file.experience.title': 'Professional Experience',
        'file.experience.role': 'Full-Stack Developer Jr (Current)',
        'file.experience.duties': '- Building modern web applications with Angular and Laravel\n- Implementing RESTful APIs with JWT authentication\n- Database design and optimization\n- Version control with Git and GitHub',
        'file.experience.projects': 'Key Projects:\n- CrossTaskManager: SaaS task management platform\n- Multiple client websites and landing pages\n- E-commerce solutions with shopping cart functionality',
        'file.experience.skills': 'Skills Development:\n- Continuous learning and project building\n- Following best practices and design patterns\n- Problem-solving and logical thinking\n- Clean code and documentation',

        // ========== PROJECT SPECIFIC FILES ==========
        'file.crosstask.tech': 'Frontend:\n  ⚡ Angular 18\n  ⚡ TypeScript\n  ⚡ RxJS\n  ⚡ Angular Material\n\nBackend:\n  ⚡ Laravel 7\n  ⚡ PHP\n  ⚡ JWT Authentication\n  ⚡ RESTful API\n\nDatabase:\n  ⚡ MySQL',
        'file.crosstask.features': 'Authentication & Authorization:\n  ✓ JWT-based authentication\n  ✓ Role-based access control (RBAC)\n  ✓ Three user roles: CEO, Manager, Adviser\n  ✓ Secure password hashing\n\nTask Management:\n  ✓ Create, read, update, delete tasks\n  ✓ Assign tasks to team members\n  ✓ Task status tracking\n  ✓ Priority levels\n  ✓ Due date management\n\nMulti-Location Support:\n  ✓ Manage multiple business locations\n  ✓ Location-specific task assignment\n  ✓ Cross-location reporting\n\nUser Management:\n  ✓ User registration and profiles\n  ✓ Role assignment\n  ✓ Activity tracking',

        // ========== CONTACT FILES ==========
        'file.contact.info.title': 'Contact Information',
        'file.contact.availability': 'Feel free to reach out for:\n  ✓ Job opportunities\n  ✓ Freelance projects\n  ✓ Collaboration\n  ✓ Questions about my work',
        'file.contact.closing': 'I\'m always open to discussing new projects and opportunities!',
        'file.contact.social': 'Social Media & Links',
        'file.contact.professional': 'Professional:',
        'file.contact.downloadCV': 'Use \'cat /about/cv.pdf\' to get the download link.',

        // ========== EASTER EGGS ==========
        'cmd.sudorm.permissionDenied': '[ERROR] Permission denied: Nice try! 😏',
        'cmd.sudorm.protected': 'This portfolio is protected by plot armor.',
        'cmd.sudorm.matrix': 'The Matrix has you...',
        'cmd.sudorm.rabbit': 'Follow the white rabbit.',
        'cmd.sudorm.knock': 'Knock, knock, Neo.',
        'cmd.sudorm.tip': '💡 Try "theme matrix" for the full experience',
        'cmd.hack.joking': '⚠️ Just kidding! 😎',
        'cmd.hack.portfolio': 'This is a portfolio, not the Matrix.',
        'cmd.hack.tryMatrix': 'Try "theme matrix" for the full experience',
        'cmd.coffee.brewing': '☕ Brewing coffee...',
        'cmd.coffee.done': 'Your coffee is ready! ☕',
        'cmd.coffee.msg': '(This developer runs on coffee and code)',
        'cmd.sudo.msg': 'sudo: You are not in the sudoers file. This incident will be reported.',
        'cmd.sudo.joking': 'Just kidding, you can\'t break anything here 😄',
        'cmd.matrix.wake': 'Wake up, Neo...',

        // ========== ERROR MESSAGES FOR COMMANDS ==========
        'error.noSuchFile': 'No such file or directory',
        'error.changedTo': 'Changed to',

        // ========== CONTENT TRANSLATIONS ==========
        'content.changedTo': 'Changed to',
        'content.noSuchFile': 'No such file or directory',
        'content.notDirectory': 'Not a directory',

        // ========== BIO AND PERSONAL DATA ==========
        'bio.header': 'Juan Lorenzo Suárez Jiménez',
        'bio.title': 'Full-Stack Web Developer Jr',
        'bio.intro': `I'm a developer passionate about transforming ideas into functional digital solutions. 
I see code as the ideal tool for creating, and I chose the web for its reach and versatility. 
Each project is an opportunity to learn and build something useful.`,
        'bio.detail': `As a junior developer, I'm constantly learning, perfecting my skills with every line of code. 
I'm motivated by facing logical challenges, understanding how things work, and delivering 
well-structured products. My approach is to write clean, scalable code and follow best practices.`,

        // ========== PROJECT FILE LABELS ==========
        'project.typeLabel': 'Type',
        'project.technologiesLabel': 'Technologies',
        'project.linksLabel': 'Links',

        // ========== SKILLS CATEGORIES ==========
        'skill.frontend': 'Frontend Skills',
        'skill.backend': 'Backend Skills',
        'skill.database': 'Database Skills',
        'skill.tools': 'Tools & Environment',

        // ========== FILE SYSTEM CONTENT ==========
        'file.readme.title': '# M4nt3k1ll4 Portfolio',
        'file.readme.welcome': 'Welcome to my interactive terminal portfolio!',
        'file.readme.quickStart': '## Quick Start',
        'file.readme.tip1': '- Type \'help\' to see available commands',
        'file.readme.tip2': '- Type \'ls\' to list directory contents',
        'file.readme.tip3': '- Type \'cd <directory>\' to navigate',
        'file.readme.tip4': '- Type \'cat <file>\' to view file contents',
        'file.readme.about': '## About Me',
        'file.readme.aboutTip': 'I\'m a Full-Stack Developer specializing in Angular and Laravel. Navigate to /about to learn more about me.',
        'file.readme.projects': '## Projects',
        'file.readme.projectsTip': 'Check out my projects in the /projects directory.',
        'file.readme.skills': '## Skills',
        'file.readme.skillsTip': 'View my technical skills in the /skills directory.',
        'file.readme.contact': '## Contact',
        'file.readme.contactTip': 'Find my contact information in the /contact directory.',
        'file.readme.closing': 'Happy exploring! 🚀',

        // ========== EXPERIENCE FILE ==========
        'file.experience.title': 'Professional Experience',
        'file.experience.role': 'Full-Stack Developer Jr (Current)',
        'file.experience.duties': '- Building modern web applications with Angular and Laravel\n- Implementing RESTful APIs with JWT authentication\n- Database design and optimization\n- Version control with Git and GitHub',
        'file.experience.projects': 'Key Projects:\n- CrossTaskManager: SaaS task management platform\n- Multiple client websites and landing pages\n- E-commerce solutions with shopping cart functionality',
        'file.experience.skills': 'Skills Development:\n- Continuous learning and project building\n- Following best practices and design patterns\n- Problem-solving and logical thinking\n- Clean code and documentation',

        // ========== PROJECT SPECIFIC FILES ==========
        'file.crosstask.tech': 'Frontend:\n  ⚡ Angular 18\n  ⚡ TypeScript\n  ⚡ RxJS\n  ⚡ Angular Material\n\nBackend:\n  ⚡ Laravel 7\n  ⚡ PHP\n  ⚡ JWT Authentication\n  ⚡ RESTful API\n\nDatabase:\n  ⚡ MySQL',
        'file.crosstask.features': 'Authentication & Authorization:\n  ✓ JWT-based authentication\n  ✓ Role-based access control (RBAC)\n  ✓ Three user roles: CEO, Manager, Adviser\n  ✓ Secure password hashing\n\nTask Management:\n  ✓ Create, read, update, delete tasks\n  ✓ Assign tasks to team members\n  ✓ Task status tracking\n  ✓ Priority levels\n  ✓ Due date management\n\nMulti-Location Support:\n  ✓ Manage multiple business locations\n  ✓ Location-specific task assignment\n  ✓ Cross-location reporting\n\nUser Management:\n  ✓ User registration and profiles\n  ✓ Role assignment\n  ✓ Activity tracking',

        // ========== CONTACT FILES ==========
        'file.contact.info.title': 'Contact Information',
        'file.contact.availability': 'Feel free to reach out for:\n  ✓ Job opportunities\n  ✓ Freelance projects\n  ✓ Collaboration\n  ✓ Questions about my work',
        'file.contact.closing': 'I\'m always open to discussing new projects and opportunities!',
        'file.contact.social': 'Social Media & Links',
        'file.contact.professional': 'Professional:',
        'file.contact.downloadCV': 'Use \'cat /about/cv.pdf\' to get the download link.',
    }
};

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Get command translation (alias for t)
function getCmdT(key) {
    return t(key);
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

    // Update welcome message in terminal if it was already displayed
    updateTerminalWelcomeMessage();

    return true;
}

// Update terminal welcome message when language changes
function updateTerminalWelcomeMessage() {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;

    const allLines = Array.from(terminalOutput.querySelectorAll('.output-line'));
    if (allLines.length === 0) return;

    // Simply retranslate all commands without touching welcome message
    retranslateAllCommands(allLines);
}

// Retranslate all translatable commands generically
function retranslateAllCommands(allLines) {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput || !allLines || allLines.length === 0) return;

    const translatableCommands = ['whoami', 'about', 'skills', 'projects', 'contact', 'cat', 'ls', 'pwd', 'tree', 'help', 'theme'];
    if (typeof commands === 'undefined') return;

    // Find all command-output pairs (look for lines with 'command' class)
    const commandsToUpdate = [];
    
    for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];
        
        // Look for lines marked as 'command' (user input)
        if (!line.classList.contains('command')) continue;
        
        // Parse the command
        const cmdText = line.textContent.trim();
        const parts = cmdText.split(/\s+/);
        const cmdName = parts[0].toLowerCase();
        const cmdArgs = parts.slice(1);
        
        // Only process translatable commands
        if (!translatableCommands.includes(cmdName)) continue;
        
        // Collect all output lines until next command or prompt
        const outputLines = [];
        let j = i + 1;
        while (j < allLines.length) {
            const nextLine = allLines[j];
            // Stop at next command line or prompt  
            if (nextLine.classList.contains('command') || nextLine.textContent.includes('PS ')) {
                break;
            }
            outputLines.push(nextLine);
            j++;
        }
        
        commandsToUpdate.push({
            cmdName: cmdName,
            cmdArgs: cmdArgs,
            outputLines: outputLines,
            cmdElement: line
        });
    }
    
    // Execute all commands and regenerate outputs IN REVERSE ORDER
    // This prevents insertion point issues when removing elements
    for (let i = commandsToUpdate.length - 1; i >= 0; i--) {
        const cmd = commandsToUpdate[i];
        try {
            // Remove old outputs first
            cmd.outputLines.forEach(line => {
                try {
                    line.remove();
                } catch (e) {}
            });
            
            // Execute command with new language
            const result = commands[cmd.cmdName](cmd.cmdArgs);
            if (result && result.content) {
                // Create new output element
                const newOutput = document.createElement("div");
                newOutput.className = `output-line ${result.type}`;
                newOutput.innerHTML = result.content;
                if (window.PortfolioSecurity && typeof window.PortfolioSecurity.hardenExternalLinks === 'function') {
                    window.PortfolioSecurity.hardenExternalLinks(newOutput);
                }
                
                // Insert immediately after the command element
                const nextSibling = cmd.cmdElement.nextSibling;
                if (nextSibling) {
                    cmd.cmdElement.parentNode.insertBefore(newOutput, nextSibling);
                } else {
                    terminalOutput.appendChild(newOutput);
                }
            }
        } catch (e) {
            console.error('Error retranslating:', cmd.cmdName, e);
        }
    }
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
