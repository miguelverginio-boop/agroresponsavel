(function() {
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Modo escuro/claro com persistência local
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            localStorage.setItem('agrisustentavel-theme', 'dark');
            if (toggleBtn) toggleBtn.innerHTML = '☀️ Modo Claro';
        } else {
            body.classList.remove('dark');
            localStorage.setItem('agrisustentavel-theme', 'light');
            if (toggleBtn) toggleBtn.innerHTML = '🌙 Modo Escuro';
        }
    }
    
    // Carregar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('agrisustentavel-theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else if (savedTheme === 'light') {
        setTheme('light');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        prefersDark ? setTheme('dark') : setTheme('light');
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.contains('dark') ? setTheme('light') : setTheme('dark');
        });
    }

    // Scroll Reveal Animation - elementos surgem ao rolar a página
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
    
    // Verificar elementos ao carregar e ao rolar
    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', checkReveal);
    
    // Garantir que elementos sejam revelados após pequeno delay
    setTimeout(checkReveal, 100);
})();
