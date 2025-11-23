// ============================================
// Terminal Commands Implementation
// ============================================

// Current working directory
let currentPath = "/";

// Command implementations
const commands = {
  // Help command - Modern categorized version
  help: () => {
    let output = `<div class="section-header">
  <i class="fas fa-question-circle"></i>
  <h2>Available Commands</h2>
</div>

<div class="help-section">
  <div class="help-category">
    <i class="fas fa-folder-tree"></i>
    <h3>Navigation</h3>
  </div>
  <div class="command-list">
    <div class="command-item">
      <span class="cmd">cd &lt;path&gt;</span>
      <span class="desc">Change directory</span>
    </div>
    <div class="command-item">
      <span class="cmd">ls, dir</span>
      <span class="desc">List directory contents</span>
    </div>
    <div class="command-item">
      <span class="cmd">pwd</span>
      <span class="desc">Print working directory</span>
    </div>
    <div class="command-item">
      <span class="cmd">tree</span>
      <span class="desc">Show directory tree</span>
    </div>
  </div>

  <div class="help-category">
    <i class="fas fa-file-alt"></i>
    <h3>File Operations</h3>
  </div>
  <div class="command-list">
    <div class="command-item">
      <span class="cmd">cat &lt;file&gt;</span>
      <span class="desc">Display file contents</span>
    </div>
  </div>

  <div class="help-category">
    <i class="fas fa-info-circle"></i>
    <h3>Information</h3>
  </div>
  <div class="command-list">
    <div class="command-item">
      <span class="cmd">whoami, about</span>
      <span class="desc">About me</span>
    </div>
    <div class="command-item">
      <span class="cmd">projects</span>
      <span class="desc">View my projects</span>
    </div>
    <div class="command-item">
      <span class="cmd">skills</span>
      <span class="desc">View my skills</span>
    </div>
    <div class="command-item">
      <span class="cmd">contact</span>
      <span class="desc">Contact information</span>
    </div>
  </div>

  <div class="help-category">
    <i class="fas fa-tools"></i>
    <h3>Utility</h3>
  </div>
  <div class="command-list">
    <div class="command-item">
      <span class="cmd">clear, cls</span>
      <span class="desc">Clear terminal</span>
    </div>
    <div class="command-item">
      <span class="cmd">theme &lt;name&gt;</span>
      <span class="desc">Change color theme</span>
    </div>
    <div class="command-item">
      <span class="cmd">help</span>
      <span class="desc">Show this help message</span>
    </div>
  </div>
</div>

<span class="success">💡 Tip:</span> Try <span class="cmd">skills</span> or <span class="cmd">projects</span> to see visual cards!`;

    return {
      type: "info",
      content: output
    };
  },

  // Clear terminal
  clear: () => {
    return { type: "clear" };
  },

  cls: () => {
    return { type: "clear" };
  },

  // List directory contents
  ls: (args) => {
    const path = args[0] ? resolvePath(args[0]) : currentPath;
    const contents = getDirectoryContents(path);

    if (!contents) {
      return {
        type: "error",
        content: `ls: cannot access '${path}': No such file or directory`
      };
    }

    let output = "";
    contents.forEach(item => {
      const icon = item.type === "directory" ? "📁" : "📄";
      const className = item.type === "directory" ? "info" : "text-primary";
      const suffix = item.type === "directory" ? "/" : "";
      output += `<span class="${className}">${icon} ${item.name}${suffix}</span>\n`;
    });

    return {
      type: "success",
      content: output
    };
  },

  dir: function (args) {
    return this.ls(args);
  },

  // Change directory
  cd: (args) => {
    if (!args[0]) {
      currentPath = "/";
      return {
        type: "success",
        content: `Changed to ${currentPath}`
      };
    }

    const newPath = resolvePath(args[0]);
    const dir = portfolioData.fileSystem[newPath];

    if (!dir) {
      return {
        type: "error",
        content: `cd: ${args[0]}: No such file or directory`
      };
    }

    if (dir.type !== "directory") {
      return {
        type: "error",
        content: `cd: ${args[0]}: Not a directory`
      };
    }

    currentPath = newPath;
    return {
      type: "success",
      content: `Changed to ${currentPath}`
    };
  },

  // Print working directory
  pwd: () => {
    return {
      type: "path",
      content: currentPath
    };
  },

  // Display file contents
  cat: (args) => {
    if (!args[0]) {
      return {
        type: "error",
        content: "cat: missing file operand"
      };
    }

    const filePath = resolvePath(args[0]);
    const content = getFileContent(filePath);

    if (content === null) {
      return {
        type: "error",
        content: `cat: ${args[0]}: No such file or directory`
      };
    }

    const file = portfolioData.fileSystem[filePath];

    // Handle downloadable files
    if (file.downloadLink) {
      return {
        type: "info",
        content: `${content}\n\n<a href="${file.downloadLink}" download class="project-link">📥 Click here to download</a>`
      };
    }

    return {
      type: "success",
      content: content
    };
  },

  // Show directory tree
  tree: (args) => {
    const startPath = args[0] ? resolvePath(args[0]) : currentPath;

    if (!portfolioData.fileSystem[startPath]) {
      return {
        type: "error",
        content: `tree: ${args[0]}: No such file or directory`
      };
    }

    const treeOutput = generateTree(startPath, "", true);
    return {
      type: "info",
      content: `<div style="white-space: pre; font-family: monospace; line-height: 1.2;">${startPath}\n${treeOutput}</div>`,
      animate: true
    };
  },

  // About/whoami - Modern profile card
  whoami: () => {
    let output = `<div class="profile-card">
  <div class="profile-header">
    <div class="avatar-container">
      <img src="./assets/media/juan-min.png" alt="${portfolioData.personal.name}">
    </div>
    <div class="profile-info">
      <h2>${portfolioData.personal.name}</h2>
      <p class="title">${portfolioData.personal.title}</p>
      <p style="color: var(--color-success); margin-top: 8px;"><i class="fas fa-user"></i> ${portfolioData.personal.username}</p>
    </div>
  </div>
  
  <div class="social-links">
    <a href="${portfolioData.personal.github}" target="_blank">
      <i class="fab fa-github"></i> GitHub
    </a>
    <a href="${portfolioData.personal.linkedin}" target="_blank">
      <i class="fab fa-linkedin"></i> LinkedIn
    </a>
    <a href="${portfolioData.personal.cv}" download>
      <i class="fas fa-file-pdf"></i> Download CV
    </a>
  </div>
</div>

<span class="muted">💡 Type 'cat /about/bio.txt' for my full bio</span>`;

    return {
      type: "info",
      content: output
    };
  },

  about: function () {
    return this.whoami();
  },

  // Projects - Modern cards with tech stack icons
  projects: () => {
    let output = `<div class="section-header">
  <i class="fas fa-folder-open"></i>
  <h2>My Projects</h2>
</div>\n`;

    portfolioData.projects.forEach((project) => {
      output += `<div class="project-card-modern">
  <div class="project-header">
    <i class="fas fa-rocket"></i>
    <h3>${project.name}</h3>
    <span class="badge">${project.type}</span>
  </div>
  <p class="project-description">${project.description}</p>
  
  <div class="tech-stack-visual">`;

      // Add tech icons
      project.tech.forEach(tech => {
        const icon = getTechIcon(tech);
        output += `\n    <i class="${icon} colored" title="${tech}"></i>`;
      });

      output += `\n  </div>
  
  <div class="project-links">`;

      Object.entries(project.links).forEach(([key, url]) => {
        const iconClass = key.includes('github') ? 'fab fa-github' : 'fas fa-external-link-alt';
        output += `\n    <a href="${url}" target="_blank" class="project-link-btn">
      <i class="${iconClass}"></i> ${key}
    </a>`;
      });

      output += `\n  </div>
</div>\n`;
    });

    output += `\n<span class="muted">💡 Navigate to /projects/&lt;project-id&gt; for more details</span>`;

    return {
      type: "success",
      content: output
    };
  },

  // Skills - Modern cards with colored icons and animated bars
  skills: () => {
    let output = `<div class="section-header">
  <i class="fas fa-code"></i>
  <h2>Technical Skills</h2>
</div>\n`;

    // Frontend
    output += `<div class="skill-category-section">
  <h3><i class="fas fa-laptop-code"></i> Frontend</h3>\n`;

    portfolioData.skills.frontend.forEach(skill => {
      output += `  <div class="skill-card">
    <div class="skill-header">
      <i class="${skill.icon} colored"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
    <div class="skill-bar-container">
      <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
    </div>
    <span class="skill-percentage">${skill.level}%</span>
  </div>\n`;
    });

    output += `</div>\n`;

    // Backend
    output += `<div class="skill-category-section">
  <h3><i class="fas fa-server"></i> Backend</h3>\n`;

    portfolioData.skills.backend.forEach(skill => {
      output += `  <div class="skill-card">
    <div class="skill-header">
      <i class="${skill.icon} colored"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
    <div class="skill-bar-container">
      <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
    </div>
    <span class="skill-percentage">${skill.level}%</span>
  </div>\n`;
    });

    output += `</div>\n`;

    // Database
    output += `<div class="skill-category-section">
  <h3><i class="fas fa-database"></i> Database</h3>\n`;

    portfolioData.skills.database.forEach(skill => {
      output += `  <div class="skill-card">
    <div class="skill-header">
      <i class="${skill.icon} colored"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
    <div class="skill-bar-container">
      <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
    </div>
    <span class="skill-percentage">${skill.level}%</span>
  </div>\n`;
    });

    output += `</div>\n`;

    // Tools
    output += `<div class="skill-category-section">
  <h3><i class="fas fa-tools"></i> Tools & Environment</h3>\n`;

    portfolioData.skills.tools.forEach(skill => {
      output += `  <div class="skill-card">
    <div class="skill-header">
      <i class="${skill.icon} colored"></i>
      <span class="skill-name">${skill.name}</span>
    </div>
    <div class="skill-bar-container">
      <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
    </div>
    <span class="skill-percentage">${skill.level}%</span>
  </div>\n`;
    });

    output += `</div>\n`;

    output += `\n<span class="muted">💡 Navigate to /skills for detailed information files</span>`;

    return {
      type: "success",
      content: output
    };
  },

  // Contact
  contact: () => {
    return {
      type: "info",
      content: `<span class="highlight">Contact Information</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="success">Name:</span>     ${portfolioData.personal.name}
<span class="success">Username:</span> ${portfolioData.personal.username}
<span class="success">Title:</span>    ${portfolioData.personal.title}

<span class="info">GitHub:</span>   <a href="${portfolioData.personal.github}" target="_blank" class="project-link">${portfolioData.personal.github}</a>
<span class="info">LinkedIn:</span> <a href="${portfolioData.personal.linkedin}" target="_blank" class="project-link">${portfolioData.personal.linkedin}</a>

<span class="muted">Use 'cat /contact/info.txt' for more details</span>`
    };
  },

  // Theme command
  theme: (args) => {
    if (!args[0]) {
      const availableThemes = getAvailableThemes();
      let output = `<span class="info">Available themes:</span>\n`;
      availableThemes.forEach(theme => {
        const current = theme.id === getCurrentTheme() ? " <span class='success'>(current)</span>" : "";
        output += `  • ${theme.name} (${theme.id})${current}\n`;
      });
      output += `\n<span class="muted">Usage: theme &lt;name&gt;</span>`;
      return {
        type: "info",
        content: output
      };
    }

    const themeName = args[0].toLowerCase();
    if (applyTheme(themeName)) {
      return {
        type: "success",
        content: `Theme changed to: ${themeName}`
      };
    } else {
      return {
        type: "error",
        content: `Theme '${themeName}' not found. Use 'theme' to see available themes.`
      };
    }
  },

  // Easter Eggs
  "sudo rm -rf /": () => {
    return {
      type: "error",
      content: `[ERROR] Permission denied: Nice try! 😏
This portfolio is protected by plot armor.
The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.

<span class="muted">Try 'theme matrix' for the full experience</span>`
    };
  },

  hack: () => {
    return {
      type: "callback",
      callback: async ({ terminalOutput, scrollToBottom }) => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Create container
        const container = document.createElement('div');
        container.className = 'output-line info';
        container.innerHTML = '<div class="hack-animation"></div>';
        terminalOutput.appendChild(container);
        const hackContainer = container.querySelector('.hack-animation');
        scrollToBottom();

        // Helper to append phase
        const addPhase = async (html, waitTime) => {
          hackContainer.innerHTML += html;
          scrollToBottom();
          await delay(waitTime);
        };

        // Phase 1: Initialization
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="info">[SYSTEM]</span> Initializing hack sequence...
    <div class="loading-bar">
      <div class="loading-fill"></div>
    </div>
  </div>`, 1200);

        // Phase 2: Scanning
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="warning">[SCAN]</span> Scanning network topology...
    <div class="scan-lines">
      <div class="scan-line">192.168.1.1 .......... <span class="success">OPEN</span></div>
      <div class="scan-line">192.168.1.100 ........ <span class="success">OPEN</span></div>
      <div class="scan-line">192.168.1.254 ........ <span class="error">FILTERED</span></div>
      <div class="scan-line">10.0.0.1 ............. <span class="success">OPEN</span></div>
    </div>
  </div>`, 1200);

        // Phase 3: Exploitation
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="success">[EXPLOIT]</span> Deploying payload...
    <div class="code-stream">
      <div class="code-line">0x7f3e4a2b1c9d</div>
      <div class="code-line">0x8a5c2f1e3b4d</div>
      <div class="code-line">0x9b6d3e2a4c5f</div>
      <div class="code-line">0x1c7a8e4b2d9f</div>
    </div>
  </div>`, 1200);

        // Phase 4: Cracking
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="warning">[CRACK]</span> Brute forcing encryption...
    <div class="loading-bar">
      <div class="loading-fill" style="animation-duration: 2s"></div>
    </div>
    <div class="crack-attempts">
      <div>Attempt 1: <span class="error">FAILED</span></div>
      <div>Attempt 2: <span class="error">FAILED</span></div>
      <div>Attempt 3: <span class="success">SUCCESS</span> ✓</div>
    </div>
  </div>`, 1400);

        // Phase 5: Access
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="success">[ACCESS]</span> Root privileges obtained! 🔓
    <div class="matrix-effect">
      <span class="matrix-char">0</span>
      <span class="matrix-char">1</span>
      <span class="matrix-char">0</span>
      <span class="matrix-char">1</span>
      <span class="matrix-char">1</span>
      <span class="matrix-char">0</span>
    </div>
  </div>`, 1200);

        // Phase 6: Final message
        await addPhase(`<div class="hack-phase" style="animation: slideIn 0.5s ease-out forwards;">
    <span class="highlight">⚠️ Just kidding! 😎</span>
    <p class="muted">This is a portfolio, not the Matrix.</p>
    <p class="info">But cool animation, right?</p>
    <p class="success">Try 'theme matrix' for the full experience!</p>
  </div>`, 0);
      }
    };
  },

  matrix: () => {
    return {
      type: "success",
      content: `<span class="success">Wake up, Neo...</span>
The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.

<span class="muted">Try 'theme matrix' for the full experience</span>`,
      animate: true
    };
  },

  coffee: () => {
    return {
      type: "warning",
      content: `☕ <span class="warning">Brewing coffee...</span>
<span class="success">[████████████]</span> 100%

<span class="success">Your coffee is ready!</span> ☕

<span class="muted">(This developer runs on coffee and code)</span>`,
      animate: true
    };
  },

  sudo: (args) => {
    if (args.join(" ") === "rm -rf /") {
      return commands["sudo rm -rf /"]();
    }
    return {
      type: "warning",
      content: `sudo: You are not in the sudoers file. This incident will be reported.

<span class="muted">Just kidding, you can't break anything here 😄</span>`,
      animate: true
    };
  }
};

// Helper: Resolve path (handle relative and absolute paths)
function resolvePath(path) {
  if (path.startsWith("/")) {
    return path === "/" ? "/" : path.replace(/\/$/, "");
  }

  if (path === "..") {
    if (currentPath === "/") return "/";
    const parts = currentPath.split("/").filter(p => p);
    parts.pop();
    return "/" + parts.join("/");
  }

  if (path === ".") {
    return currentPath;
  }

  if (currentPath === "/") {
    return "/" + path;
  }

  return currentPath + "/" + path;
}

// Helper: Generate skill bar
function generateSkillBar(skill) {
  const bars = Math.round(skill.level / 10);
  const filled = "█".repeat(bars);
  const empty = "░".repeat(10 - bars);
  return `⚡ <span class="skill-name">${skill.name.padEnd(15)}</span> <span class="success">[${filled}${empty}]</span> <span class="info">${skill.level}%</span>\n`;
}

// Helper: Generate tree structure
function generateTree(path, prefix = "", isLast = true) {
  const contents = getDirectoryContents(path);
  if (!contents) return "";

  let output = "";
  contents.forEach((item, index) => {
    const isLastItem = index === contents.length - 1;
    const connector = isLastItem ? "└── " : "├── ";
    const icon = item.type === "directory" ? "📁" : "📄";

    output += `${prefix}${connector}${icon} ${item.name}\n`;

    if (item.type === "directory") {
      const newPrefix = prefix + (isLastItem ? "    " : "│   ");
      output += generateTree(item.path, newPrefix, isLastItem);
    }
  });

  return output;
}

// Get current path (for prompt)
function getCurrentPath() {
  return currentPath;
}

// Helper: Get tech icon class from technology name
function getTechIcon(tech) {
  const techMap = {
    'Angular': 'devicon-angularjs-plain',
    'Angular 18': 'devicon-angularjs-plain',
    'Laravel': 'devicon-laravel-plain',
    'Laravel 7': 'devicon-laravel-plain',
    'TypeScript': 'devicon-typescript-plain',
    'JavaScript': 'devicon-javascript-plain',
    'PHP': 'devicon-php-plain',
    'MySQL': 'devicon-mysql-plain',
    'HTML5': 'devicon-html5-plain',
    'CSS3': 'devicon-css3-plain',
    'JWT': 'fas fa-key',
    'Python': 'devicon-python-plain',
    'Git': 'devicon-git-plain',
    'Firebase': 'devicon-firebase-plain',
    'LocalStorage': 'fas fa-database'
  };

  return techMap[tech] || 'fas fa-code';
}
