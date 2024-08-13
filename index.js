document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    };

    document.querySelector('.arrow-left').addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    });

    document.querySelector('.arrow-right').addEventListener('click', () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    // Initialize first slide
    showSlide(currentSlide);
});
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scroll Down
        header.classList.add('hidden');
    } else {
        // Scroll Up
        header.classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Optional: Handle touch events for mobile devices
window.addEventListener('touchstart', function() {
    header.classList.remove('hidden');
});

    // Function to open an album and scroll to the album detail section
    function openAlbum(albumId) {
        console.log("Opening album:", albumId); // Log to verify the function is being called

        // Hide all album detail sections
        document.querySelectorAll('.album-images').forEach(album => {
            album.style.display = 'none';
        });
        
        // Show the selected album detail section
        const album = document.getElementById(albumId);
        if (album) { // Check if the album exists
            album.style.display = 'block';

            // Smoothly scroll to the selected album detail section
            album.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error("Album with ID", albumId, "not found");
        }
    }

    // Add event listeners to each album image to open lightbox
    document.querySelectorAll('.album-images img').forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

