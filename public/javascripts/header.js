// Get all navigation links
const navLinks = document.querySelectorAll('.nav-links a');

// Get the current URL path
const currentPath = window.location.pathname;

// Loop through links to add the 'active' class to the current link
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});
