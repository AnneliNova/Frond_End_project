const toggle = document.getElementById('myToggle');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        window.location.href = 'theme.html';
    } else {
        window.location.href = 'index.html';
    }
});

if (window.location.href.includes('theme.html')) {
    toggle.checked = true;
}
