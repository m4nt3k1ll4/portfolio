// ============================================
// Theme System
// ============================================

const themes = {
    powershell: {
        name: "PowerShell",
        bgPrimary: "#012456",
        bgSecondary: "#001628",
        bgHeader: "linear-gradient(180deg, #1a3a5c 0%, #012456 100%)",
        textPrimary: "#CCCCCC",
        textSecondary: "#6A9955",
        textMuted: "#808080",
        colorInfo: "#569CD6",
        colorSuccess: "#4EC9B0",
        colorWarning: "#CE9178",
        colorError: "#F48771",
        colorCommand: "#DCDCAA",
        colorPath: "#4FC1FF",
        colorHighlight: "#C586C0",
        borderColor: "#1a3a5c",
        scrollbarThumb: "#3a5a7c",
        scrollbarTrack: "#001628"
    },

    vscode: {
        name: "VS Code Dark",
        bgPrimary: "#1E1E1E",
        bgSecondary: "#252526",
        bgHeader: "linear-gradient(180deg, #2d2d30 0%, #1E1E1E 100%)",
        textPrimary: "#D4D4D4",
        textSecondary: "#6A9955",
        textMuted: "#858585",
        colorInfo: "#4FC1FF",
        colorSuccess: "#89D185",
        colorWarning: "#D7BA7D",
        colorError: "#F48771",
        colorCommand: "#DCDCAA",
        colorPath: "#4FC1FF",
        colorHighlight: "#C586C0",
        borderColor: "#3e3e42",
        scrollbarThumb: "#424242",
        scrollbarTrack: "#1E1E1E"
    },

    matrix: {
        name: "Matrix",
        bgPrimary: "#0D0208",
        bgSecondary: "#000000",
        bgHeader: "linear-gradient(180deg, #1a1a1a 0%, #0D0208 100%)",
        textPrimary: "#00FF41",
        textSecondary: "#008F11",
        textMuted: "#003B00",
        colorInfo: "#00FF41",
        colorSuccess: "#39FF14",
        colorWarning: "#CCFF00",
        colorError: "#FF0000",
        colorCommand: "#00FF41",
        colorPath: "#00FF41",
        colorHighlight: "#39FF14",
        borderColor: "#003B00",
        scrollbarThumb: "#00FF41",
        scrollbarTrack: "#000000"
    },

    dracula: {
        name: "Dracula",
        bgPrimary: "#282A36",
        bgSecondary: "#21222C",
        bgHeader: "linear-gradient(180deg, #44475A 0%, #282A36 100%)",
        textPrimary: "#F8F8F2",
        textSecondary: "#6272A4",
        textMuted: "#6272A4",
        colorInfo: "#8BE9FD",
        colorSuccess: "#50FA7B",
        colorWarning: "#FFB86C",
        colorError: "#FF5555",
        colorCommand: "#F1FA8C",
        colorPath: "#8BE9FD",
        colorHighlight: "#FF79C6",
        borderColor: "#44475A",
        scrollbarThumb: "#6272A4",
        scrollbarTrack: "#21222C"
    }
};

// Current theme
let currentTheme = "powershell";

// Apply theme to document
function applyTheme(themeName) {
    const theme = themes[themeName];

    if (!theme) {
        console.error(`Theme "${themeName}" not found`);
        return false;
    }

    const root = document.documentElement;

    // Apply all theme colors
    root.style.setProperty("--bg-primary", theme.bgPrimary);
    root.style.setProperty("--bg-secondary", theme.bgSecondary);
    root.style.setProperty("--bg-header", theme.bgHeader);
    root.style.setProperty("--text-primary", theme.textPrimary);
    root.style.setProperty("--text-secondary", theme.textSecondary);
    root.style.setProperty("--text-muted", theme.textMuted);
    root.style.setProperty("--color-info", theme.colorInfo);
    root.style.setProperty("--color-success", theme.colorSuccess);
    root.style.setProperty("--color-warning", theme.colorWarning);
    root.style.setProperty("--color-error", theme.colorError);
    root.style.setProperty("--color-command", theme.colorCommand);
    root.style.setProperty("--color-path", theme.colorPath);
    root.style.setProperty("--color-highlight", theme.colorHighlight);
    root.style.setProperty("--border-color", theme.borderColor);
    root.style.setProperty("--scrollbar-thumb", theme.scrollbarThumb);
    root.style.setProperty("--scrollbar-track", theme.scrollbarTrack);

    currentTheme = themeName;

    // Save to localStorage
    try {
        localStorage.setItem("terminal-theme", themeName);
    } catch (e) {
        console.warn("Could not save theme to localStorage:", e);
    }

    return true;
}

// Load theme from localStorage
function loadSavedTheme() {
    try {
        const savedTheme = localStorage.getItem("terminal-theme");
        if (savedTheme && themes[savedTheme]) {
            applyTheme(savedTheme);
            return savedTheme;
        }
    } catch (e) {
        console.warn("Could not load theme from localStorage:", e);
    }

    // Default theme
    applyTheme("powershell");
    return "powershell";
}

// Get list of available themes
function getAvailableThemes() {
    return Object.keys(themes).map(key => ({
        id: key,
        name: themes[key].name
    }));
}

// Get current theme name
function getCurrentTheme() {
    return currentTheme;
}

// Get theme info
function getThemeInfo(themeName) {
    return themes[themeName] || null;
}
