// ============================================
// Typewriter Effect for Text Content
// ============================================

class TypewriterEffect {
    constructor(element, text, speed = 30) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.isTyping = false;
    }

    async type() {
        if (this.isTyping) return;

        this.isTyping = true;
        this.element.innerHTML = '';

        // Split text into tags and content
        // Regex captures tags (<...>) and text content
        const parts = this.text.split(/(<[^>]*>)/g).filter(part => part !== '');

        return new Promise((resolve) => {
            let partIndex = 0;
            let charIndex = 0;

            const typeLoop = () => {
                if (partIndex >= parts.length) {
                    this.isTyping = false;
                    resolve();
                    return;
                }

                const currentPart = parts[partIndex];

                // If it's a tag, append it immediately and move to next part
                if (currentPart.startsWith('<') && currentPart.endsWith('>')) {
                    this.element.innerHTML += currentPart;
                    partIndex++;
                    // No delay for tags
                    setTimeout(typeLoop, 0);
                    return;
                }

                // If it's text, type it character by character
                if (charIndex < currentPart.length) {
                    const char = currentPart.charAt(charIndex);

                    // Handle newlines specially if they are not inside tags
                    if (char === '\n') {
                        this.element.innerHTML += '<br>';
                    } else {
                        this.element.innerHTML += char;
                    }

                    charIndex++;

                    // Variable speed
                    let delay = this.speed;
                    if (char === '.' || char === '!' || char === '?') {
                        delay = this.speed * 10;
                    } else if (char === ',' || char === ';' || char === ':') {
                        delay = this.speed * 5;
                    }

                    setTimeout(typeLoop, delay);
                } else {
                    // Finished current text part, move to next
                    partIndex++;
                    charIndex = 0;
                    setTimeout(typeLoop, 0);
                }
            };

            typeLoop();
        });
    }

    stop() {
        this.isTyping = false;
        this.element.innerHTML = this.text.replace(/\n/g, '<br>');
    }
}

// Helper function to apply typewriter to output
async function applyTypewriter(element, text, speed = 20) {
    const typewriter = new TypewriterEffect(element, text, speed);
    await typewriter.type();
}

// Check if typewriter should be used
function shouldUseTypewriter(content) {
    // Use typewriter for plain text longer than 100 characters
    // Don't use for HTML content
    return typeof content === 'string' &&
        !content.includes('<') &&
        content.length > 100;
}
