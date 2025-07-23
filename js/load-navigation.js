// Load navigation component
function loadNavigation() {
    fetch('components/navigation.html')
        .then(response => response.text())
        .then(html => {
            // Insert navigation before the first <main> element or at the beginning of the body
            const mainElement = document.querySelector('main');
            const navigationContainer = document.createElement('div');
            navigationContainer.id = 'navigation-container';
            navigationContainer.innerHTML = html;
            
            if (mainElement) {
                mainElement.parentNode.insertBefore(navigationContainer, mainElement);
            } else {
                document.body.insertBefore(navigationContainer, document.body.firstChild);
            }
            
            // Load navigation styles
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'css/navigation.css';
            document.head.appendChild(link);
            
            // Load navigation script
            const script = document.createElement('script');
            script.src = 'js/navigation.js';
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
}

// Load navigation when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavigation);
} else {
    loadNavigation();
}
