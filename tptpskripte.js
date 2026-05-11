const darkToggle = document.getElementById('darkModeToggle');

function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    if (darkToggle) {
        darkToggle.textContent = isDark ? '☀️' : '🌙';
        darkToggle.setAttribute('aria-label', isDark ? 'Prebaci na svjetli mod' : 'Prebaci na tamni mod');
    }
}