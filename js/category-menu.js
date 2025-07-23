// Category Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // If this is not a dropdown toggle (no dropdown menu after it), let the default action happen
            if (!toggle.nextElementSibling || !toggle.nextElementSibling.classList.contains('dropdown-menu')) {
                return;
            }

            const menu = this.nextElementSibling;
            const isOpen = menu && menu.style.display === 'block';

            if (!isOpen) {
                // First click: open dropdown, prevent navigation
                e.preventDefault();
                e.stopPropagation();
                // Close all other dropdowns
                const otherDropdowns = document.querySelectorAll('.dropdown');
                otherDropdowns.forEach(dropdown => {
                    if (dropdown !== this.parentElement) {
                        const otherMenu = dropdown.querySelector('.dropdown-menu');
                        if (otherMenu) otherMenu.style.display = 'none';
                    }
                });
                // Open current dropdown
                if (menu && menu.classList.contains('dropdown-menu')) {
                    menu.style.display = 'block';
                }
            } else {
                // Second click: allow navigation to category page
                // Close dropdowns (optional, for visual feedback)
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                // Do not preventDefault, allow navigation
            }
        });
    });
    
    // Handle clicks on menu items
    document.querySelectorAll('.dropdown-menu a').forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            // Only prevent default for anchor links (#) within the same page
            if (this.getAttribute('href').startsWith('#')) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close all dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.style.display = 'none';
                    });
                }
            }
            // For external links, let the default action happen
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.product-nav > .container > ul > li > a');
    
    // Remove active class from all links first
    document.querySelectorAll('.product-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === 'index.html' && (linkHref === './' || linkHref === 'index.html')) ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Highlight current section in dropdown
    if (window.location.hash) {
        const currentHash = window.location.hash;
        const matchingLink = document.querySelector(`.dropdown-menu a[href="${currentHash}"]`);
        if (matchingLink) {
            matchingLink.classList.add('active');
            const parentDropdown = matchingLink.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('> a').classList.add('active');
            }
        }
    }
});
