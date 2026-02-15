// Бургер-меню для Bulma
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка "Наверх"
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Бургер-меню
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
            
            // Обновление aria-expanded
            const isExpanded = menuToggle.classList.contains('is-active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('.navbar-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                mainNav.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }
    
    // Плавный скролл к якорям (только на главной странице)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Подсветка активного пункта меню
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.navbar-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
            // Убираем якоря из сравнения
            const cleanHref = href.split('#')[0];
            let cleanCurrentPath = currentPath.split('#')[0];
            
            // Убираем ведущий слеш для сравнения
            if (cleanCurrentPath.startsWith('/')) {
                cleanCurrentPath = cleanCurrentPath.substring(1);
            }
            
            // Определяем текущую страницу
            let currentPage = cleanCurrentPath;
            if (currentPage === '' || currentPage === 'index.html') {
                currentPage = 'index.html';
            }
            
            // Сравниваем
            if ((currentPage === cleanHref) || 
                (currentPage === '' && cleanHref === 'index.html') ||
                (currentPage === '/' && cleanHref === 'index.html')) {
                item.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
            }
        }
    });
});