// ============================================
// Welcome Screen - Fullscreen Splash
// ============================================

const welcomeMessages = [
    { language: 'PHP', code: '&lt;?php echo "Hello World"; ?&gt;', color: '#777BB4', icon: 'devicon-php-plain' },
    { language: 'JavaScript', code: 'console.log("Hello World");', color: '#F7DF1E', icon: 'devicon-javascript-plain' },
    { language: 'Python', code: 'print("Hello World")', color: '#3776AB', icon: 'devicon-python-plain' },
    { language: 'HTML', code: '&lt;h1&gt;Hello World&lt;/h1&gt;', color: '#E34C26', icon: 'devicon-html5-plain' }
];

let isWelcomePhase = true;

// Welcome session management (20 minutes)
const WELCOME_SESSION_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds
const WELCOME_SESSION_KEY = 'portfolio-welcome-session';

// Check if welcome was already shown in this session
function hasSeenWelcomeInSession() {
    const sessionData = sessionStorage.getItem(WELCOME_SESSION_KEY);
    if (!sessionData) return false;
    
    const timestamp = parseInt(sessionData);
    const now = Date.now();
    const elapsed = now - timestamp;
    
    // If 20 minutes haven't passed, skip welcome
    if (elapsed < WELCOME_SESSION_TIME) {
        return true;
    }
    
    // If 20 minutes passed, clear session and show welcome again
    sessionStorage.removeItem(WELCOME_SESSION_KEY);
    return false;
}

// Set welcome session
function setWelcomeSession() {
    sessionStorage.setItem(WELCOME_SESSION_KEY, Date.now().toString());
}

// Welcome translations helper (uses centralized i18n)
function getWelcomeT(key) {
    // Map welcome keys to i18n keys
    const keyMap = {
        'welcome.main.title': 'welcome.screen.title',
        'welcome.main.subtitle': 'welcome.screen.subtitle',
        'welcome.main.instruction': 'welcome.screen.instruction',
        'welcome.main.cmdHint': 'welcome.screen.cmdHint',
        'welcome.main.continue': 'welcome.screen.continue'
    };
    
    const i18nKey = keyMap[key] || key;
    return t(i18nKey);
}

// Initialize welcome screen
function initWelcomeScreen() {
    const body = document.body;
    
    // Create welcome overlay
    const welcomeScreen = document.createElement("div");
    welcomeScreen.id = "welcomeScreen";
    welcomeScreen.className = "welcome-screen active";
    
    welcomeScreen.innerHTML = `
        <div class="welcome-container">
            <!-- Header Controls -->
            <div class="welcome-header">
                <div class="welcome-controls">
                    <!-- Language Toggle -->
                    <button class="welcome-btn lang-btn" id="welcomeLangToggle" title="Change language">
                        <i class="fas fa-globe"></i>
                        <span id="welcomeCurrentLang">${currentLanguage.toUpperCase()}</span>
                    </button>

                    <!-- Theme Toggle -->
                    <button class="welcome-btn theme-btn" id="welcomeThemeToggle" title="Change theme">
                        <i class="fas fa-palette"></i>
                    </button>
                    <div class="welcome-theme-menu" id="welcomeThemeMenu">
                        <div class="theme-option" data-theme="powershell">PowerShell</div>
                        <div class="theme-option" data-theme="vscode">VS Code</div>
                        <div class="theme-option" data-theme="matrix">Matrix</div>
                        <div class="theme-option" data-theme="dracula">Dracula</div>
                    </div>
                </div>
            </div>

            <div class="welcome-content">
                <!-- Hello World Sequence -->
                <div class="hello-world-section">
                    <div class="code-blocks">
                        ${welcomeMessages.map((msg, index) => `
                            <div class="code-block code-block-${index + 1}" data-index="${index}">
                                <div class="code-header">
                                    <i class="devicon ${msg.icon}" style="color: ${msg.color}"></i>
                                    <span class="code-language" style="color: ${msg.color}">${msg.language}</span>
                                </div>
                                <div class="code-content">
                                    <span class="code-text">${msg.code}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Welcome Text -->
                <div class="welcome-text-section">
                    <h1 class="welcome-title" id="welcomeTitle">${getWelcomeT('welcome.main.title')}</h1>
                    <p class="welcome-subtitle" id="welcomeSubtitle">${getWelcomeT('welcome.main.subtitle')}</p>
                </div>
                
                <!-- Input Section -->
                <div class="welcome-input-section">
                    <div class="welcome-prompt">
                        <span class="prompt-prefix">PS C:></span>
                        <input type="text" id="welcomeInput" class="welcome-input" placeholder="${getWelcomeT('welcome.main.cmdHint')}" autofocus autocomplete="off" spellcheck="false">
                        <span class="input-cursor"></span>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="welcome-footer">
                    <p id="welcomeFooterText">${getWelcomeT('welcome.main.continue')}</p>
                </div>
            </div>
        </div>
    `;
    
    body.appendChild(welcomeScreen);
    
    // Setup input handler
    const welcomeInput = document.getElementById("welcomeInput");
    welcomeInput.addEventListener("keydown", handleWelcomeKeyDown);
    welcomeInput.addEventListener("keyup", handleWelcomeKeyUp);
    
    // Keep focus on input when clicking on it
    welcomeInput.addEventListener("click", (e) => {
        e.stopPropagation();
        welcomeInput.focus();
    });
    
    // Also prevent clicks on the container from affecting the input
    const welcomePrompt = document.querySelector(".welcome-prompt");
    welcomePrompt.addEventListener("click", (e) => {
        e.stopPropagation();
        if (e.target !== welcomeInput && e.target.className !== "input-cursor") {
            welcomeInput.focus();
        }
    });
    
    // Setup theme controls
    setupWelcomeThemeControls();
    setupWelcomeLanguageControls();
}

function handleWelcomeKeyDown(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const input = e.target.value.trim();
        
        if (input.toLowerCase() === "init portfolio") {
            handleInitPortfolio();
        } else {
            // Invalid command
            const input = e.target;
            input.classList.add("error");
            setTimeout(() => input.classList.remove("error"), 300);
            input.value = "";
        }
    }
}

function handleWelcomeKeyUp(e) {
    // Update input cursor visibility
    if (e.target.value === "") {
        e.target.classList.remove("has-input");
    } else {
        e.target.classList.add("has-input");
    }
}

async function handleInitPortfolio() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const welcomeInput = document.getElementById("welcomeInput");
    
    // Disable input
    welcomeInput.disabled = true;
    
    // Add command display
    const welcomePrompt = document.querySelector(".welcome-prompt");
    welcomePrompt.classList.add("executed");
    
    // Animation - fade out welcome, fade in terminal
    welcomeScreen.classList.add("fade-out");
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Hide welcome screen and show terminal
    welcomeScreen.style.display = "none";
    
    // Clean up event listeners
    if (window.welcomeCloseMenuHandler) {
        document.removeEventListener("click", window.welcomeCloseMenuHandler);
        window.welcomeCloseMenuHandler = null;
    }
    
    // Update state
    isWelcomePhase = false;
    
    // Show main terminal content
    document.getElementById("terminalContainer").classList.add("visible");
    const terminalInput = document.getElementById("terminalInput");
    terminalInput.focus();
    
    // Trigger welcome message on terminal
    displayWelcomeMessage();
}

// Auto-rotate Hello World codes
function startHelloWorldRotation() {
    const codeBlocks = document.querySelectorAll(".code-block");
    let currentIndex = 0;
    
    // Show first block immediately
    if (codeBlocks[0]) {
        codeBlocks[0].classList.add("active");
    }
    
    // Rotate through blocks
    const rotationInterval = setInterval(() => {
        if (!document.getElementById("welcomeScreen") || !document.getElementById("welcomeScreen").classList.contains("active")) {
            clearInterval(rotationInterval);
            return;
        }
        
        // Hide current
        codeBlocks[currentIndex].classList.remove("active");
        
        // Show next
        currentIndex = (currentIndex + 1) % codeBlocks.length;
        codeBlocks[currentIndex].classList.add("active");
    }, 2500);
}

// Setup welcome theme controls
function setupWelcomeThemeControls() {
    const themeToggle = document.getElementById("welcomeThemeToggle");
    const themeMenu = document.getElementById("welcomeThemeMenu");
    const welcomeInput = document.getElementById("welcomeInput");
    
    if (!themeToggle || !themeMenu) return;
    
    // Toggle menu
    themeToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle("active");
    });
    
    // Close menu when clicking outside (but not on input)
    const closeMenuHandler = (e) => {
        // Don't close if clicking on theme controls or input
        if (e.target.closest(".theme-btn") || 
            e.target.closest(".welcome-theme-menu") || 
            e.target.closest(".welcome-input")) {
            return;
        }
        themeMenu.classList.remove("active");
    };
    
    document.addEventListener("click", closeMenuHandler);
    
    // Store handler for cleanup
    window.welcomeCloseMenuHandler = closeMenuHandler;
    
    // Theme selection
    document.querySelectorAll("#welcomeThemeMenu .theme-option").forEach(option => {
        option.addEventListener("click", () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            themeMenu.classList.remove("active");
        });
    });
}

// Setup welcome language controls
function setupWelcomeLanguageControls() {
    const langToggle = document.getElementById("welcomeLangToggle");
    
    if (!langToggle) return;
    
    langToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        // Toggle language
        const currentLangSpan = document.getElementById("welcomeCurrentLang");
        const newLang = currentLanguage === "es" ? "en" : "es";
        
        // Update global language
        switchLanguage(newLang);
        
        // Update welcome screen text
        updateWelcomeScreenLanguage(newLang);
        
        // Update language display
        currentLangSpan.textContent = newLang.toUpperCase();
    });
}

// Update welcome screen text based on language
function updateWelcomeScreenLanguage(lang) {
    const titleElem = document.getElementById("welcomeTitle");
    const subtitleElem = document.getElementById("welcomeSubtitle");
    const footerElem = document.getElementById("welcomeFooterText");
    const inputElem = document.getElementById("welcomeInput");
    
    if (titleElem) titleElem.textContent = getWelcomeT('welcome.main.title');
    if (subtitleElem) subtitleElem.textContent = getWelcomeT('welcome.main.subtitle');
    if (footerElem) footerElem.innerHTML = getWelcomeT('welcome.main.continue');
    if (inputElem) inputElem.placeholder = getWelcomeT('welcome.main.cmdHint');
}
