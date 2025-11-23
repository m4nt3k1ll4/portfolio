// ============================================
// Terminal Engine - Main Controller
// ============================================

// DOM Elements
let terminalOutput;
let terminalInput;
let promptElement;
let autocompleteContainer;
let themeToggle;
let themeMenu;

// State
let commandHistory = [];
let historyIndex = -1;
let isProcessing = false;
let lastCommandExecuted = null; // Track last executed command for retranslation

// Initialize terminal
function initTerminal() {
    // Get DOM elements
    terminalOutput = document.getElementById("terminalOutput");
    terminalInput = document.getElementById("terminalInput");
    promptElement = document.getElementById("prompt");
    autocompleteContainer = document.getElementById("autocompleteContainer");
    themeToggle = document.getElementById("themeToggle");
    themeMenu = document.getElementById("themeMenu");

    // Hide terminal container initially
    document.getElementById("terminalContainer").classList.remove("visible");

    // Load saved theme
    loadSavedTheme();

    // Load command history from localStorage
    loadCommandHistory();

    // Initialize language system
    if (typeof initLanguageSystem === 'function') {
        initLanguageSystem();
    }

    // Initialize helper panel
    if (typeof initHelperPanel === 'function') {
        initHelperPanel();
    }

    // Setup event listeners
    setupEventListeners();

    // Check if welcome should be shown based on session
    const shouldShowWelcome = isWelcomePhase && !hasSeenWelcomeInSession();

    // Initialize welcome screen if in welcome phase and not seen in session
    if (shouldShowWelcome) {
        if (typeof initWelcomeScreen === 'function') {
            initWelcomeScreen();
            if (typeof startHelloWorldRotation === 'function') {
                startHelloWorldRotation();
            }
        }
        // Set welcome session timestamp
        if (typeof setWelcomeSession === 'function') {
            setWelcomeSession();
        }
    } else if (!isWelcomePhase) {
        // If not in welcome phase, show terminal and display message
        document.getElementById("terminalContainer").classList.add("visible");
        displayWelcomeMessage();
        terminalInput.focus();
    } else {
        // Session hasn't expired, skip welcome and show terminal
        isWelcomePhase = false;
        document.getElementById("terminalContainer").classList.add("visible");
        displayWelcomeMessage();
        terminalInput.focus();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Input handling
    terminalInput.addEventListener("keydown", handleKeyDown);
    terminalInput.addEventListener("input", handleInput);

    // Click anywhere to focus input
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".theme-menu") && !e.target.closest(".theme-btn")) {
            terminalInput.focus();
        }
    });

    // Theme toggle
    themeToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle("active");
    });

    // Theme selection
    document.querySelectorAll(".theme-option").forEach(option => {
        option.addEventListener("click", () => {
            const theme = option.dataset.theme;
            applyTheme(theme);
            themeMenu.classList.remove("active");
            const themeChangeMsg = `${t('success.themeChanged')}: ${theme}`;
            printOutput(themeChangeMsg, "success");
        });
    });

    // Close theme menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".theme-menu") && !e.target.closest(".theme-btn")) {
            themeMenu.classList.remove("active");
        }
    });

    // Mobile keyboard helpers
    const mobileTab = document.getElementById("mobileTab");
    const mobileUp = document.getElementById("mobileUp");
    const mobileDown = document.getElementById("mobileDown");
    const mobileClear = document.getElementById("mobileClear");

    if (mobileTab) {
        mobileTab.addEventListener("click", () => handleAutocomplete());
    }

    if (mobileUp) {
        mobileUp.addEventListener("click", () => navigateHistory("up"));
    }

    if (mobileDown) {
        mobileDown.addEventListener("click", () => navigateHistory("down"));
    }

    if (mobileClear) {
        mobileClear.addEventListener("click", () => {
            clearTerminal();
            terminalInput.focus();
        });
    }
}

// Handle keyboard input
function handleKeyDown(e) {
    switch (e.key) {
        case "Enter":
            e.preventDefault();
            handleCommand();
            break;

        case "Tab":
            e.preventDefault();
            handleAutocomplete();
            break;

        case "ArrowUp":
            e.preventDefault();
            navigateHistory("up");
            break;

        case "ArrowDown":
            e.preventDefault();
            navigateHistory("down");
            break;

        case "l":
            if (e.ctrlKey) {
                e.preventDefault();
                clearTerminal();
            }
            break;

        case "c":
            if (e.ctrlKey) {
                e.preventDefault();
                terminalInput.value = "";
                printOutput("^C", "muted");
            }
            break;
    }
}

// Handle input changes
function handleInput() {
    // Hide autocomplete when input changes
    autocompleteContainer.classList.remove("active");
    autocompleteContainer.innerHTML = "";
}

// Handle command execution
async function handleCommand() {
    const input = terminalInput.value.trim();

    if (!input) {
        printPrompt();
        return;
    }

    // Display command
    printOutput(`${getPromptText()} ${input}`, "command");

    // Add to history
    addToHistory(input);

    // Parse and execute command
    executeCommand(input);

    // Clear input
    terminalInput.value = "";
    historyIndex = -1;

    // Hide autocomplete
    autocompleteContainer.classList.remove("active");
    autocompleteContainer.innerHTML = "";
}

// Execute command
async function executeCommand(input) {
    // Parse command and arguments
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Register last executed command for retranslation on language change
    if (commands[cmd]) {
        lastCommandExecuted = cmd;
    }

    // Check if command exists
    if (commands[cmd]) {
        try {
            const result = commands[cmd](args);

            if (result.type === "clear") {
                clearTerminal();
            } else if (result.type === "callback") {
                await result.callback({
                    printOutput,
                    scrollToBottom,
                    terminalOutput
                });
            } else {
                printOutput(result.content, result.type, result.animate);
            }
        } catch (error) {
            printOutput(`Error executing command: ${error.message}`, "error");
            console.error(error);
        }
    } else {
        printOutput(`${getCmdT('error.commandNotFound')}: ${cmd}. ${t('error.tryHelp')}`, "error");
    }

    // Update prompt with current path
    updatePrompt();

    // Scroll to bottom
    scrollToBottom();
}

// Print output to terminal
function printOutput(content, type = "info", animate = false) {
    const line = document.createElement("div");
    line.className = `output-line ${type}`;

    if (animate) {
        terminalOutput.appendChild(line);
        applyTypewriter(line, content);
    } else {
        line.innerHTML = content;
        terminalOutput.appendChild(line);
    }
}

// Print prompt
function printPrompt() {
    const line = document.createElement("div");
    line.className = "output-line command";
    line.innerHTML = getPromptText();
    terminalOutput.appendChild(line);
}

// Get prompt text
function getPromptText() {
    const path = getCurrentPath();
    const windowsPath = path === "/" ? "\\portfolio" : "\\portfolio" + path.replace(/\//g, "\\");
    return `<span class="prompt">PS C:\\Users\\Guest${windowsPath}&gt;</span>`;
}

// Update prompt
function updatePrompt() {
    promptElement.innerHTML = getPromptText().replace(/<\/?span[^>]*>/g, "");
}

// Clear terminal
function clearTerminal() {
    terminalOutput.innerHTML = "";
}

// Scroll to bottom
function scrollToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Get last executed command (for retranslation)
function getLastCommand() {
    return lastCommandExecuted;
}

// Navigate command history
function navigateHistory(direction) {
    if (commandHistory.length === 0) return;

    if (direction === "up") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
        }
    } else if (direction === "down") {
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else if (historyIndex === 0) {
            historyIndex = -1;
            terminalInput.value = "";
        }
    }
}

// Add command to history
function addToHistory(command) {
    // Don't add duplicate consecutive commands
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);

        // Limit history size
        if (commandHistory.length > 100) {
            commandHistory.shift();
        }

        // Save to localStorage
        saveCommandHistory();
    }
}

// Save command history to localStorage
function saveCommandHistory() {
    try {
        localStorage.setItem("terminal-history", JSON.stringify(commandHistory));
    } catch (e) {
        console.warn("Could not save command history:", e);
    }
}

// Load command history from localStorage
function loadCommandHistory() {
    try {
        const saved = localStorage.getItem("terminal-history");
        if (saved) {
            commandHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.warn("Could not load command history:", e);
        commandHistory = [];
    }
}

// Handle autocomplete
function handleAutocomplete() {
    const input = terminalInput.value.trim();

    if (!input) {
        // Show all commands
        showAutocompleteSuggestions(Object.keys(commands));
        return;
    }

    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    // If only command is typed, autocomplete commands
    if (parts.length === 1) {
        const matches = Object.keys(commands).filter(c => c.startsWith(cmd));
        if (matches.length > 0) {
            if (matches.length === 1) {
                terminalInput.value = matches[0] + " ";
            } else {
                showAutocompleteSuggestions(matches);
            }
        }
        return;
    }

    // If command is complete, autocomplete paths
    if (["cd", "ls", "cat", "tree", "dir"].includes(cmd)) {
        const partial = parts[parts.length - 1];
        const suggestions = getPathSuggestions(partial);

        if (suggestions.length === 1) {
            parts[parts.length - 1] = suggestions[0];
            terminalInput.value = parts.join(" ");
        } else if (suggestions.length > 0) {
            showAutocompleteSuggestions(suggestions);
        }
    }
}

// Get path suggestions for autocomplete
function getPathSuggestions(partial) {
    const currentDir = getCurrentPath();
    const contents = getDirectoryContents(currentDir);

    if (!contents) return [];

    return contents
        .map(item => item.name)
        .filter(name => name.startsWith(partial))
        .sort();
}

// Show autocomplete suggestions
function showAutocompleteSuggestions(suggestions) {
    autocompleteContainer.innerHTML = "";

    if (suggestions.length === 0) {
        autocompleteContainer.classList.remove("active");
        return;
    }

    suggestions.forEach(suggestion => {
        const item = document.createElement("div");
        item.className = "autocomplete-item";
        item.textContent = suggestion;
        item.addEventListener("click", () => {
            const parts = terminalInput.value.trim().split(/\s+/);
            if (parts.length === 1) {
                terminalInput.value = suggestion + " ";
            } else {
                parts[parts.length - 1] = suggestion;
                terminalInput.value = parts.join(" ");
            }
            autocompleteContainer.classList.remove("active");
            terminalInput.focus();
        });
        autocompleteContainer.appendChild(item);
    });

    autocompleteContainer.classList.add("active");
}

// Display welcome message
function displayWelcomeMessage() {
    const welcome = `<span class="highlight">PowerShell 7.4.0</span>
<span class="muted">Copyright (c) M4nt3k1ll4. All rights reserved.</span>

<span class="info">${t('welcome.intro')}</span>

${t('welcome.intro') ? `${t('welcome.helpCmd')} '<span class="success">help</span>' ${t('welcome.helpText')}<br>${t('welcome.helpCmd')} '<span class="success">ls</span>' ${t('welcome.lsCmd')}` : ''}

<span class="muted">${t('welcome.tip')}</span>
`;

    printOutput(welcome, "info");
    printOutput("", "info"); // Empty line
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTerminal);
} else {
    initTerminal();
}

// ============================================
// Helper Panel Integration
// ============================================

function initHelperPanel() {
    const helperPanel = document.getElementById('helperPanel');
    const helperToggle = document.getElementById('helperToggle');
    const terminalContainer = document.getElementById('terminalContainer');

    if (!helperPanel || !helperToggle) return;

    // Toggle helper panel
    helperToggle.addEventListener('click', () => {
        helperPanel.classList.toggle('collapsed');
        terminalContainer.classList.toggle('helper-collapsed');
    });

    // Setup helper button click handlers
    document.querySelectorAll('.helper-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const command = btn.getAttribute('data-command');
            if (command) {
                // Execute command
                terminalInput.value = command;
                handleCommand();
                terminalInput.focus();
            }
        });
    });
}
