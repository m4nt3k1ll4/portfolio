// ============================================
// Portfolio Data - Virtual File System
// ============================================

const portfolioData = {
  // Personal Information
  personal: {
    name: "Juan Lorenzo Suárez Jiménez",
    username: "m4nt3k1ll4",
    title: "Full-Stack Web Developer",
    email: "contact@m4nt3k1ll4.dev",
    github: "https://github.com/m4nt3k1ll4",
    linkedin: "https://www.linkedin.com/in/juan-suárez-98ba7924b",
    cv: "./assets/media/CV-ENG-JUAN.pdf"
  },

  // About/Bio
  bio: `Juan Lorenzo Suárez Jiménez
Full-Stack Web Developer

I'm a passionate developer focused on transforming ideas into functional digital solutions. 
I see code as the ideal tool for creating, and I chose web development for its reach and versatility. 
Every project is an opportunity to learn and build something useful.

As a junior developer, I'm in constant learning, perfecting my skills with every line of code. 
I'm motivated by facing logical challenges, understanding how things work, and delivering well-structured products. 
My approach is to write clean, scalable code and follow best practices.`,

  // Projects
  projects: [
    {
      id: "crosstaskmanager",
      name: "CrossTaskManager",
      type: "SaaS Application",
      description: `Cross Task Manager: A SaaS task management platform with RESTful API (Laravel) 
and frontend (Angular). It ensures user, location, and assignment management with 
JWT authentication and 3 defined roles (CEO, Manager, Adviser) for efficient 
and organized supervision across different locations.`,
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
      description: `An attractive and functional landing page for the Variedades Humbertoss business, 
optimized for conversions, contact, and web presence.`,
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
      description: `A semi-static website for OF Medical organization, presenting information about 
its services and products with a shopping cart that stores products locally 
and exports to a direct WhatsApp message for better customer service.`,
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
      content: null // Will use translations from i18n
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
      content: null // Will use translations from i18n
    },
    "/projects": {
      type: "directory",
      children: ["crosstaskmanager", "variedades-humbertoss", "ofmedical", "README.md"]
    },
    "/projects/README.md": {
      type: "file",
      content: null // Will be generated dynamically with translations
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
      content: null // Will use translations from i18n
    },
    "/projects/crosstaskmanager/features.txt": {
      type: "file",
      content: null // Will use translations from i18n
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
      content: null // Will use translations from i18n
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
      if (typeof t === 'function') {
        return `${t('bio.header')}\n${t('bio.title')}\n\n${t('bio.intro')}\n\n${t('bio.detail')}`;
      }
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

    // Generate experience file
    if (path === "/about/experience.txt") {
      if (typeof t === 'function') {
        return `${t('file.experience.title')}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${t('file.experience.role')}\n${t('file.experience.duties')}\n\n${t('file.experience.projects')}\n\n${t('file.experience.skills')}`;
      }
      // Fallback to hardcoded English
      return file.content;
    }

    // Generate README.md
    if (path === "/README.md") {
      if (typeof t === 'function') {
        return `${t('file.readme.title')}\n\n${t('file.readme.welcome')}\n\n${t('file.readme.quickStart')}\n${t('file.readme.tip1')}\n${t('file.readme.tip2')}\n${t('file.readme.tip3')}\n${t('file.readme.tip4')}\n\n${t('file.readme.about')}\n${t('file.readme.aboutTip')}\n\n${t('file.readme.projects')}\n${t('file.readme.projectsTip')}\n\n${t('file.readme.skills')}\n${t('file.readme.skillsTip')}\n\n${t('file.readme.contact')}\n${t('file.readme.contactTip')}\n\n${t('file.readme.closing')}`;
      }
      // Fallback to hardcoded English
      return file.content;
    }

    // Generate projects README
    if (path === "/projects/README.md") {
      if (typeof t === 'function') {
        // Build projects list dynamically
        let projectsList = portfolioData.projects.map((p, i) => `${i + 1}. ${p.id} - ${p.name}`).join('\n');
        return `# ${typeof t === 'function' ? t('cmd.projects.header') : 'My Projects'}\n\n${typeof t === 'function' ? t('file.readme.projectsTip') : 'This directory contains information about my main projects.'}\n\n## Available Projects:\n${projectsList}\n\nUse 'cd <project-name>' to explore each project.\nUse 'ls' to see available files in each project directory.`;
      }
      // Return as is if t() not available
      return file.content;
    }

    // Generate CrossTaskManager tech-stack file
    if (path === "/projects/crosstaskmanager/tech-stack.txt") {
      if (typeof t === 'function') {
        return `CrossTaskManager - ${t('project.technologiesLabel')}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${t('file.crosstask.tech')}`;
      }
      return file.content;
    }

    // Generate CrossTaskManager features file
    if (path === "/projects/crosstaskmanager/features.txt") {
      if (typeof t === 'function') {
        return `CrossTaskManager - Key Features\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${t('file.crosstask.features')}`;
      }
      return file.content;
    }
  }

  return file.content;
}

// Generate project README
function generateProjectReadme(project) {
  let content = `# ${project.name}\n\n`;
  
  // Use translations if available
  const typeLabel = typeof t === 'function' ? t('project.typeLabel') : 'Type';
  const techLabel = typeof t === 'function' ? t('project.technologiesLabel') : 'Technologies';
  const linksLabel = typeof t === 'function' ? t('project.linksLabel') : 'Links';
  
  content += `${typeLabel}: ${project.type}\n\n`;
  content += `${project.description}\n\n`;
  content += `${techLabel}:\n`;
  project.tech.forEach(tech => {
    content += `  ⚡ ${tech}\n`;
  });
  content += `\n${linksLabel}:\n`;
  Object.entries(project.links).forEach(([key, url]) => {
    content += `  ${key}: ${url}\n`;
  });
  return content;
}

// Generate skills content
function generateSkillsContent(category, skills) {
  const categoryNameKeys = {
    frontend: 'skill.frontend',
    backend: 'skill.backend',
    database: 'skill.database',
    tools: 'skill.tools'
  };

  const categoryTitle = typeof t === 'function' ? t(categoryNameKeys[category]) : categoryNameKeys[category];
  let content = `${categoryTitle}\n`;
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
