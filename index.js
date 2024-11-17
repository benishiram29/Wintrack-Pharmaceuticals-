


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


document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let images = [];

    function openAlbum(albumId) {
        console.log("Opening album:", albumId); // Log to verify the function is being called

        // Hide all album detail sections
        document.querySelectorAll('.album-images').forEach(album => {
            album.style.display = 'none';
        });

        // Show the selected album detail section
        const album = document.getElementById(albumId);
        if (album) {
            album.style.display = 'block';

            // Delay the scroll operation to ensure content is loaded
            setTimeout(() => {
                // Find the heading within the album
                const heading = album.querySelector('h2, h3, h4, .album-heading'); // Adjust selector as per your HTML structure
                const albumOffset = album.getBoundingClientRect().top + window.scrollY;
                
                // Calculate offset dynamically
                if (heading) {
                    const headingOffset = heading.getBoundingClientRect().top + window.scrollY;
                    const desiredOffset = headingOffset - (window.innerHeight / 2 - heading.offsetHeight / 2); // Center the heading in view
                    window.scrollTo({
                        top: desiredOffset,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: albumOffset,
                        behavior: 'smooth'
                    });
                }
            }, 100);

            // Update images array and set initial index
            images = Array.from(album.getElementsByTagName('img'));
            currentIndex = 0;

            // Add event listeners to the images within the opened album
            images.forEach((img, index) => {
                img.addEventListener('click', () => openLightbox(index));
            });
        } else {
            console.error("Album with ID", albumId, "not found");
        }
    }

    function openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightbox.style.display = 'block';
        lightboxImg.src = images[index].src;
        currentIndex = index;
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
    }

    function changeSlide(direction) {
        currentIndex += direction;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        document.getElementById('lightbox-img').src = images[currentIndex].src;
    }

    document.querySelectorAll('.album').forEach(album => {
        const albumId = album.getAttribute('onclick').match(/'([^']+)'/)[1];
        album.addEventListener('click', () => openAlbum(albumId));
    });

    document.querySelector('.close').addEventListener('click', closeLightbox);
    document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
    document.querySelector('.next').addEventListener('click', () => changeSlide(1));
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
