// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown > a');
    
    // Add click event for mobile
    dropdownToggles.forEach(toggle => {
        // Prevent default behavior on mobile to allow dropdown to work
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) { // Mobile view
                e.preventDefault();
                const menu = this.nextElementSibling;
                const isOpen = menu.style.display === 'block';
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu.vertical-menu').forEach(m => {
                    if (m !== menu) m.style.display = 'none';
                });
                
                // Toggle current dropdown
                menu.style.display = isOpen ? 'none' : 'block';
            }
        });
        
        // Add hover for desktop
        const parentLi = toggle.parentElement;
        parentLi.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Desktop view
                const menu = this.querySelector('.dropdown-menu.vertical-menu');
                if (menu) menu.style.display = 'block';
            }
        });
        
        parentLi.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) { // Desktop view
                const menu = this.querySelector('.dropdown-menu.vertical-menu');
                if (menu) menu.style.display = 'none';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropdown > a')) {
            document.querySelectorAll('.dropdown-menu.vertical-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
    
    // Close dropdowns when scrolling on mobile
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown-menu.vertical-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    }, { passive: true });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Hide all dropdowns on desktop
            document.querySelectorAll('.dropdown-menu.vertical-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Set active state for current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.product-nav a[href]').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
});
