document.documentElement.classList.add('js');
document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));
