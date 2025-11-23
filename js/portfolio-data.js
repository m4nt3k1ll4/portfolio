// ============================================
// Portfolio Data - Virtual File System
// ============================================

const portfolioData = {
  // Personal Information
  personal: {
    name: "Juan Lorenzo Suárez Jiménez",
    username: "m4nt3k1ll4",
    title: "Desarrollador Web Full-Stack Jr",
    email: "contact@m4nt3k1ll4.dev",
    github: "https://github.com/m4nt3k1ll4",
    linkedin: "https://www.linkedin.com/in/juan-suárez-98ba7924b",
    cv: "./assets/media/CV-ENG-JUAN.pdf"
  },

  // About/Bio
  bio: `Juan Lorenzo Suárez Jiménez
Desarrollador Web Full-Stack Jr

Soy un desarrollador apasionado por transformar ideas en soluciones digitales 
funcionales. Veo en el código la herramienta ideal para crear, y elegí la web 
por su alcance y versatilidad. Cada proyecto es una oportunidad para aprender 
y construir algo útil.

Como desarrollador junior, estoy en constante aprendizaje, perfeccionando mis 
habilidades con cada línea de código. Me motiva enfrentar desafíos lógicos, 
entender cómo funcionan las cosas y entregar productos bien estructurados. 
Mi enfoque está en escribir código limpio, escalable y seguir las mejores prácticas.`,

  // Projects
  projects: [
    {
      id: "crosstaskmanager",
      name: "CrossTaskManager",
      type: "SaaS Application",
      description: `Cross Task Manager: Un SaaS de gestión de tareas con API RESTful (Laravel) 
y frontend (Angular). Asegura la gestión de usuarios, sedes y asignaciones con 
autenticación JWT y 3 roles definidos (CEO, Manager, Adviser) para una supervisión 
eficiente y organizada en distintas sedes.`,
      tech: ["Angular 18", "Laravel 7", "JWT", "MySQL", "TypeScript", "PHP"],
      links: {
        frontend: "https://github.com/m4nt3k1ll4/CrossTaskManager_frontend",
        backend: "https://github.com/m4nt3k1ll4/CrossTaskManager_backend"
      },
      screenshot: "./assets/screenshots/loginScreenCTM.png"
    },
    {
      id: "variedades-humbertoss",
      name: "Variedades Humbertosss",
      type: "Landing Page",
      description: `Una landing page atractiva y funcional para el negocio de variedades 
Humbertoss, optimizada para conversiones, contacto y presencia web.`,
      tech: ["HTML5", "CSS3", "JavaScript"],
      links: {
        live: "https://www.variedadeshumbertosss.com"
      },
      screenshot: "./assets/screenshots/variedadeshumbertosss.jpeg"
    },
    {
      id: "ofmedical",
      name: "OF Medical SAS",
      type: "Semi-Static Website",
      description: `Una página semi-estática para la organización OF Medical, que presenta 
información sobre sus servicios y productos con un carrito de compras que almacena 
localmente los productos y exporta a un mensaje directo a WhatsApp para una mejor 
atención al cliente.`,
      tech: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
      links: {
        live: "https://www.ofmedicalsas.com"
      },
      screenshot: "./assets/screenshots/ofmedicalsas.png"
    }
  ],

  // Skills
  skills: {
    frontend: [
      { name: "Angular", level: 70, icon: "devicon-angularjs-plain" },
      { name: "TypeScript", level: 65, icon: "devicon-typescript-plain" },
      { name: "JavaScript", level: 70, icon: "devicon-javascript-plain" },
      { name: "HTML5", level: 75, icon: "devicon-html5-plain" },
      { name: "CSS3", level: 70, icon: "devicon-css3-plain" }
    ],
    backend: [
      { name: "Laravel", level: 65, icon: "devicon-laravel-plain" },
      { name: "PHP", level: 65, icon: "devicon-php-plain" },
      { name: "Cloudflare Workers", level: 60, icon: "devicon-cloudflare-plain" },
      { name: "Python", level: 45, icon: "devicon-python-plain" }
    ],
    database: [
      { name: "MySQL", level: 60, icon: "devicon-mysql-plain" },
      { name: "Firebase", level: 55, icon: "devicon-firebase-plain" }
    ],
    tools: [
      { name: "n8n", level: 65, icon: "fas fa-project-diagram" },
      { name: "Wrangler", level: 60, icon: "fas fa-terminal" },
      { name: "Git", level: 65, icon: "devicon-git-plain" },
      { name: "Linux", level: 55, icon: "devicon-linux-plain" },
      { name: "VS Code", level: 80, icon: "devicon-vscode-plain" },
      { name: "NPM", level: 65, icon: "devicon-npm-original-wordmark" },
      { name: "Composer", level: 60, icon: "devicon-composer-line" }
    ]
  },

  // Virtual File System
  fileSystem: {
    "/": {
      type: "directory",
      children: ["about", "projects", "skills", "contact", "README.md"]
    },
    "/README.md": {
      type: "file",
      content: `# M4nt3k1ll4 Portfolio

Welcome to my interactive terminal portfolio!

## Quick Start
- Type 'help' to see available commands
- Type 'ls' to list directory contents
- Type 'cd <directory>' to navigate
- Type 'cat <file>' to view file contents

## About Me
I'm a Full-Stack Developer specializing in Angular and Laravel.
Navigate to /about to learn more about me.

## Projects
Check out my projects in the /projects directory.

## Skills
View my technical skills in the /skills directory.

## Contact
Find my contact information in the /contact directory.

Happy exploring! 🚀`
    },
    "/about": {
      type: "directory",
      children: ["bio.txt", "cv.pdf", "experience.txt"]
    },
    "/about/bio.txt": {
      type: "file",
      content: null // Will use portfolioData.bio
    },
    "/about/cv.pdf": {
      type: "file",
      content: "[PDF FILE] Download CV",
      downloadLink: "./assets/media/CV-ENG-JUAN.pdf"
    },
    "/about/experience.txt": {
      type: "file",
      content: `Professional Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full-Stack Developer Jr (Current)
- Building modern web applications with Angular and Laravel
- Implementing RESTful APIs with JWT authentication
- Database design and optimization
- Version control with Git and GitHub

Key Projects:
- CrossTaskManager: SaaS task management platform
- Multiple client websites and landing pages
- E-commerce solutions with shopping cart functionality

Skills Development:
- Continuous learning and project building
- Following best practices and design patterns
- Problem-solving and logical thinking
- Clean code and documentation`
    },
    "/projects": {
      type: "directory",
      children: ["crosstaskmanager", "variedades-humbertoss", "ofmedical", "README.md"]
    },
    "/projects/README.md": {
      type: "file",
      content: `# My Projects

This directory contains information about my main projects.

## Available Projects:
1. crosstaskmanager - SaaS Task Management Platform
2. variedades-humbertoss - Business Landing Page
3. ofmedical - Medical Products E-commerce

Use 'cd <project-name>' to explore each project.
Use 'ls' to see available files in each project directory.`
    },
    "/projects/crosstaskmanager": {
      type: "directory",
      children: ["README.md", "tech-stack.txt", "features.txt", "links.txt"]
    },
    "/projects/crosstaskmanager/README.md": {
      type: "file",
      content: null // Will use project data
    },
    "/projects/crosstaskmanager/tech-stack.txt": {
      type: "file",
      content: `CrossTaskManager - Tech Stack
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
  ⚡ Angular 18
  ⚡ TypeScript
  ⚡ RxJS
  ⚡ Angular Material

Backend:
  ⚡ Laravel 7
  ⚡ PHP
  ⚡ JWT Authentication
  ⚡ RESTful API

Database:
  ⚡ MySQL

Features:
  ✓ Multi-role authentication (CEO, Manager, Adviser)
  ✓ Task management across multiple locations
  ✓ Real-time updates
  ✓ Secure API with JWT tokens`
    },
    "/projects/crosstaskmanager/features.txt": {
      type: "file",
      content: `CrossTaskManager - Key Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Authentication & Authorization:
  ✓ JWT-based authentication
  ✓ Role-based access control (RBAC)
  ✓ Three user roles: CEO, Manager, Adviser
  ✓ Secure password hashing

Task Management:
  ✓ Create, read, update, delete tasks
  ✓ Assign tasks to team members
  ✓ Task status tracking
  ✓ Priority levels
  ✓ Due date management

Multi-Location Support:
  ✓ Manage multiple business locations
  ✓ Location-specific task assignment
  ✓ Cross-location reporting

User Management:
  ✓ User registration and profiles
  ✓ Role assignment
  ✓ Activity tracking`
    },
    "/projects/crosstaskmanager/links.txt": {
      type: "file",
      content: `CrossTaskManager - Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub Repositories:
  Frontend: https://github.com/m4nt3k1ll4/CrossTaskManager_frontend
  Backend:  https://github.com/m4nt3k1ll4/CrossTaskManager_backend

Technologies:
  Angular:  https://angular.io
  Laravel:  https://laravel.com`
    },
    "/projects/variedades-humbertoss": {
      type: "directory",
      children: ["README.md", "info.txt"]
    },
    "/projects/variedades-humbertoss/README.md": {
      type: "file",
      content: null // Will use project data
    },
    "/projects/variedades-humbertoss/info.txt": {
      type: "file",
      content: `Variedades Humbertosss - Project Info
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type: Landing Page
Status: Live ✓

Description:
A modern, attractive landing page for Variedades Humbertoss,
a local variety store. Optimized for conversions and customer
engagement.

Technologies:
  ⚡ HTML5
  ⚡ CSS3
  ⚡ Vanilla JavaScript

Features:
  ✓ Responsive design
  ✓ Contact form
  ✓ Product showcase
  ✓ SEO optimized
  ✓ Fast loading times

Live Site: https://www.variedadeshumbertosss.com`
    },
    "/projects/ofmedical": {
      type: "directory",
      children: ["README.md", "info.txt"]
    },
    "/projects/ofmedical/README.md": {
      type: "file",
      content: null // Will use project data
    },
    "/projects/ofmedical/info.txt": {
      type: "file",
      content: `OF Medical SAS - Project Info
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type: Semi-Static E-commerce Website
Status: Live ✓

Description:
A semi-static website for OF Medical, featuring product
information and a shopping cart that integrates with
WhatsApp for customer orders.

Technologies:
  ⚡ HTML5
  ⚡ CSS3
  ⚡ JavaScript
  ⚡ LocalStorage API

Features:
  ✓ Product catalog
  ✓ Shopping cart (LocalStorage)
  ✓ WhatsApp integration
  ✓ Responsive design
  ✓ Product search and filtering

Live Site: https://www.ofmedicalsas.com`
    },
    "/skills": {
      type: "directory",
      children: ["frontend.txt", "backend.txt", "database.txt", "tools.txt", "summary.txt"]
    },
    "/skills/frontend.txt": {
      type: "file",
      content: null // Will be generated from skills data
    },
    "/skills/backend.txt": {
      type: "file",
      content: null // Will be generated from skills data
    },
    "/skills/database.txt": {
      type: "file",
      content: null // Will be generated from skills data
    },
    "/skills/tools.txt": {
      type: "file",
      content: null // Will be generated from skills data
    },
    "/skills/summary.txt": {
      type: "file",
      content: `Technical Skills Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Stack:
  Frontend:  Angular + TypeScript
  Backend:   Laravel + PHP
  Database:  MySQL

Strengths:
  ✓ Full-stack web development
  ✓ RESTful API design
  ✓ Single Page Applications (SPA)
  ✓ Database design and optimization
  ✓ Version control with Git
  ✓ Responsive web design

Currently Learning:
  ⚡ Advanced Angular patterns
  ⚡ Laravel best practices
  ✓ Testing (Unit & Integration)
  ⚡ DevOps basics

Use 'cat frontend.txt', 'cat backend.txt', etc. to see
detailed skill levels for each category.`
    },
    "/contact": {
      type: "directory",
      children: ["info.txt", "social.txt"]
    },
    "/contact/info.txt": {
      type: "file",
      content: `Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:     Juan Lorenzo Suárez Jiménez
Username: m4nt3k1ll4
Title:    Desarrollador Web Full-Stack Jr

GitHub:   https://github.com/m4nt3k1ll4
LinkedIn: https://www.linkedin.com/in/juan-suárez-98ba7924b

Feel free to reach out for:
  ✓ Job opportunities
  ✓ Freelance projects
  ✓ Collaboration
  ✓ Questions about my work

I'm always open to discussing new projects and opportunities!`
    },
    "/contact/social.txt": {
      type: "file",
      content: `Social Media & Links
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Professional:
  GitHub:   https://github.com/m4nt3k1ll4
  LinkedIn: https://www.linkedin.com/in/juan-suárez-98ba7924b

Portfolio:
  This interactive terminal portfolio showcases my work
  and technical skills in a unique way.

Download CV:
  Use 'cat /about/cv.pdf' to get the download link.`
    }
  }
};

// Helper function to get file content
function getFileContent(path) {
  const file = portfolioData.fileSystem[path];

  if (!file || file.type !== "file") {
    return null;
  }

  // If content is null, generate it dynamically
  if (file.content === null) {
    if (path === "/about/bio.txt") {
      return portfolioData.bio;
    }

    // Generate project README
    if (path.includes("/projects/") && path.endsWith("/README.md")) {
      const projectId = path.split("/")[2];
      const project = portfolioData.projects.find(p => p.id === projectId);
      if (project) {
        return generateProjectReadme(project);
      }
    }

    // Generate skills files
    if (path.startsWith("/skills/")) {
      const category = path.split("/")[2].replace(".txt", "");
      if (portfolioData.skills[category]) {
        return generateSkillsContent(category, portfolioData.skills[category]);
      }
    }
  }

  return file.content;
}

// Generate project README
function generateProjectReadme(project) {
  let content = `# ${project.name}\n\n`;
  content += `Type: ${project.type}\n\n`;
  content += `${project.description}\n\n`;
  content += `Technologies:\n`;
  project.tech.forEach(tech => {
    content += `  ⚡ ${tech}\n`;
  });
  content += `\nLinks:\n`;
  Object.entries(project.links).forEach(([key, url]) => {
    content += `  ${key}: ${url}\n`;
  });
  return content;
}

// Generate skills content
function generateSkillsContent(category, skills) {
  const categoryNames = {
    frontend: "Frontend Skills",
    backend: "Backend Skills",
    database: "Database Skills",
    tools: "Tools & Environment"
  };

  let content = `${categoryNames[category]}\n`;
  content += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  skills.forEach(skill => {
    const bars = Math.round(skill.level / 10);
    const filled = "█".repeat(bars);
    const empty = "░".repeat(10 - bars);
    content += `⚡ ${skill.name.padEnd(15)} [${filled}${empty}] ${skill.level}%\n`;
  });

  return content;
}

// Get directory contents
function getDirectoryContents(path) {
  const dir = portfolioData.fileSystem[path];

  if (!dir || dir.type !== "directory") {
    return null;
  }

  return dir.children.map(child => {
    const childPath = path === "/" ? `/${child}` : `${path}/${child}`;
    const childItem = portfolioData.fileSystem[childPath];
    return {
      name: child,
      type: childItem ? childItem.type : "unknown",
      path: childPath
    };
  });
}
