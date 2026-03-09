document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Logic
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = document.getElementById('menu-icon');

    // Toggle menu
    const toggleMenu = () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
        
        if (menu.classList.contains('hidden')) {
            overlay.classList.add('hidden');
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            // Change to hamburger
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            overlay.classList.remove('hidden');
            // Allow display block to persist before animating opacity
            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
            }, 10);
            // Change to close icon
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    };

    btn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!menu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // 2. Intersection Observer for Scroll Animations
    // Reveals elements smoothly as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // 3. Header opacity styling on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // 4. Dark/Light Mode Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');
    
    // Check local storage for theme preference, default to dark
    let isDarkMode = localStorage.getItem('theme') !== 'light';

    const updateTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            // Background classes for dark mode are applied via default Tailwind bg-primary
            // but we add a custom 'dark-theme' class to easily override specific elements if needed
            document.body.classList.remove('bg-sky-50', 'text-slate-900');
            document.body.classList.add('bg-primary', 'text-slate-300');
            
            themeIconDark.classList.add('block');
            themeIconDark.classList.remove('hidden');
            themeIconLight.classList.add('hidden');
            themeIconLight.classList.remove('block');
            
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            // Switch body classes for light mode
            document.body.classList.remove('bg-primary', 'text-slate-300');
            document.body.classList.add('bg-sky-50', 'text-slate-900');
            
            themeIconDark.classList.add('hidden');
            themeIconDark.classList.remove('block');
            themeIconLight.classList.add('block');
            themeIconLight.classList.remove('hidden');
            
            localStorage.setItem('theme', 'light');
        }
    };

    // Initialize theme on load
    updateTheme();

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        updateTheme();
    });

    // 5. PDF Generation (Print) Logic
    const printResumeBtn = document.getElementById('print-resume-btn');
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Force Light Mode just for the PDF generation so it looks like a clean document
            const wasDarkMode = isDarkMode;
            if (isDarkMode) {
                isDarkMode = false;
                updateTheme();
            }
            
            // Allow CSS to apply, then print
            setTimeout(() => {
                window.print();
                
                // Restore Dark Mode if they were using it
                if (wasDarkMode) {
                    isDarkMode = true;
                    updateTheme();
                }
            }, 300);
        });
    }

});
