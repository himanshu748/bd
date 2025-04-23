/* filepath: /D:/BD International/script.js */
$(document).ready(function() {
    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    } else {
        console.warn("Burger menu elements not found.");
    }

    // Smooth scrolling
    const headerHeight = document.querySelector('header').offsetHeight;

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const top = targetElement.offsetTop - headerHeight;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });

                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            } else {
                console.warn(`Target element ${targetId} not found.`);
            }
        });
    });

    // Highlight active section
    function highlightActiveSection() {
        const currentURL = window.location.href;
        const enrollButton = document.querySelector('.nav-links .enroll-button');
        const facultiesLink = document.querySelector('.nav-links a[href="faculties.html"]');
        let scrollPosition = window.scrollY + 100; // Add offset and define scrollPosition here

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });

        if (enrollButton) {
            enrollButton.classList.remove('active');
        }

        if (currentURL.indexOf("enroll.html") > -1) {
            if (enrollButton) {
                enrollButton.classList.add('active');
            }
        } else if (currentURL.indexOf("faculties.html") > -1) {
            if (facultiesLink) {
                facultiesLink.classList.add('active');
            }
        } else {
            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop - headerHeight;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.id;
                const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

                if (correspondingLink) {
                  if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    correspondingLink.classList.add('active');
                  }
                }
            });
        }
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Call on page load

    // Leaflet map
    var map;

    function initMap() {
        if (document.getElementById('map')) {
            try {
                map = L.map('map').setView([26.34, 86.07], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([26.34, 86.07]).addTo(map)
                    .bindPopup('B.D. International Public School')
                    .openPopup();
            } catch (error) {
                console.error("Leaflet map initialization error:", error);
            }
        }
    }

    initMap();

    // Gallery slider functionality
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryBtnPrev = document.querySelector('.gallery-btn-prev');
    const galleryBtnNext = document.querySelector('.gallery-btn-next');
    const imageWidth = 500; // Width of each image

    if (galleryBtnPrev && galleryBtnNext && galleryContainer) {
        galleryBtnNext.addEventListener('click', () => {
            galleryContainer.scrollLeft += imageWidth;
        });

        galleryBtnPrev.addEventListener('click', () => {
            galleryContainer.scrollLeft -= imageWidth;
        });
    }
});