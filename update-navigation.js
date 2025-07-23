const fs = require('fs');
const path = require('path');

// Files to update (relative to the script location)
const htmlFiles = [
    'about-us.html',
    'accessibility.html',
    'braille.html',
    'contact-us.html',
    'fire-sign.html',
    'indoor-sign.html',
    'privacy-policy.html',
    'road-safety.html',
    'road-signs.html',
    'security-equipments.html',
    'terms-and-conditions.html',
    'vehicle-graphics.html'
];

// The navigation script to add
const navigationScript = `
    <!-- Load Navigation Component -->
    <script src="js/load-navigation.js"></script>
`;

// Update each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${file}`);
        return;
    }
    
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already updated
    if (content.includes('load-navigation.js')) {
        console.log(`Already updated: ${file}`);
        return;
    }
    
    // Find the closing head tag and insert our script before it
    if (content.includes('</head>')) {
        // Add navigation script before closing head
        content = content.replace(
            '</head>',
            `    <!-- Load Navigation Component -->
    <link rel="stylesheet" href="css/navigation.css">
</head>`
        );
        
        // Add navigation script before closing body
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                `    <script src="js/navigation.js"></script>
    <script src="js/load-navigation.js"></script>
</body>`
            );
            
            // Remove any existing navigation HTML (between <!-- Navigation Start --> and <!-- Navigation End --> comments)
            content = content.replace(/<!--\s*Navigation Start\s*-->[\s\S]*?<!--\s*Navigation End\s*-->/g, '');
            
            // Remove any existing navigation scripts and styles
            content = content.replace(/<link[^>]*navigation\.css[^>]*>\n?/g, '');
            content = content.replace(/<script[^>]*navigation\.js[^>]*>[\s\S]*?<\/script>\n?/g, '');
            
            // Save the file
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
        } else {
            console.warn(`No </body> tag found in ${file}`);
        }
    } else {
        console.warn(`No </head> tag found in ${file}`);
    }
});

console.log('Navigation update complete!');
