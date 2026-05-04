(function (global) {
    const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
    const SAFE_COLOR_PATTERN = /^(#[0-9a-fA-F]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%]+\)|var\(--[a-zA-Z0-9_-]+\)|[a-zA-Z]+)$/;

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function sanitizeUrl(value, fallback = '#') {
        const url = String(value ?? '').trim();

        if (!url) {
            return fallback;
        }

        if (/^(#|\/(?!\/)|\.{1,2}\/)/.test(url)) {
            return url;
        }

        try {
            const parsedUrl = new URL(url, global.location.href);
            return SAFE_PROTOCOLS.has(parsedUrl.protocol) ? parsedUrl.href : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function sanitizeClassList(value) {
        return String(value ?? '')
            .split(/\s+/)
            .filter((token) => /^[a-zA-Z0-9_-]+$/.test(token))
            .join(' ');
    }

    function sanitizeCssColor(value, fallback = 'currentColor') {
        const color = String(value ?? '').trim();
        return SAFE_COLOR_PATTERN.test(color) ? color : fallback;
    }

    function sanitizePercent(value, fallback = 0) {
        const numericValue = Number(value);

        if (!Number.isFinite(numericValue)) {
            return fallback;
        }

        return Math.min(100, Math.max(0, numericValue));
    }

    function mergeRel(existingValue, tokens) {
        const relTokens = new Set(String(existingValue ?? '').split(/\s+/).filter(Boolean));
        tokens.forEach((token) => relTokens.add(token));
        return Array.from(relTokens).join(' ');
    }

    function hardenExternalLinks(root = global.document) {
        if (!root || typeof root.querySelectorAll !== 'function') {
            return;
        }

        root.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.rel = mergeRel(link.getAttribute('rel'), ['noopener', 'noreferrer']);
        });
    }

    global.PortfolioSecurity = {
        escapeHtml,
        sanitizeUrl,
        sanitizeClassList,
        sanitizeCssColor,
        sanitizePercent,
        hardenExternalLinks
    };
})(window);