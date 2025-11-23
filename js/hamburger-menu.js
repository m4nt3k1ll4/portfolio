// ============================================
// Hamburger Menu for Mobile Helper Panel
// ============================================

function initHamburgerMenu() {
    // Get hamburger button from HTML (already exists in header)
    const hamburgerBtn = document.getElementById('hamburgerMenu');
    const helperPanel = document.getElementById('helperPanel');

    if (!hamburgerBtn || !helperPanel) {
        console.warn('Hamburger menu or helper panel not found');
        console.log('hamburgerBtn:', hamburgerBtn);
        console.log('helperPanel:', helperPanel);
        return;
    }

    console.log('Hamburger menu initialized successfully');

    // Toggle helper panel on hamburger click
    hamburgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        console.log('Hamburger clicked!');
        helperPanel.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
        console.log('Helper panel active:', helperPanel.classList.contains('active'));
    });

    // Close helper panel when clicking outside
    document.addEventListener('click', function (e) {
        if (!helperPanel.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            helperPanel.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });

    // Close helper panel when clicking a helper button
    const helperButtons = document.querySelectorAll('.helper-btn');
    helperButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Small delay to allow command execution
            setTimeout(() => {
                helperPanel.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }, 300);
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    initHamburgerMenu();
}
