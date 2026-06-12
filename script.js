(function() {
    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Modo escuro/claro
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    
    function setTheme(theme) {
        if(theme === 'dark') {
            body.classList.add('dark');
            localStorage.setItem('agrisustentavel-theme', 'dark');
            toggleBtn.innerHTML = '☀️ Modo Claro';
        } else {
            body.classList.remove('dark');
            localStorage.setItem('agrisustentavel-theme', 'light');
            toggleBtn.innerHTML = '🌙 Modo Escuro';
        }
    }
    
    const savedTheme = localStorage.getItem('agrisustentavel-theme');
    if(savedTheme === 'dark') setTheme('dark');
    else if(savedTheme === 'light') setTheme('light');
    else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        prefersDark ? setTheme('dark') : setTheme('light');
    }
    
    toggleBtn.addEventListener('click', () => {
        body.classList.contains('dark') ? setTheme('light') : setTheme('dark');
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.card, .tip-card, .stat, .benefit-item');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealThreshold = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealThreshold) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', checkReveal);
    
    // Garantir que elementos sejam revelados
    setTimeout(checkReveal, 100);
})();
