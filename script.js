// ==========================================
// Bayana Rent Car - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // 2. Sticky Header
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Populate Fleet Section dynamically
    const fleetContainer = document.getElementById('fleet-container');

    const cars = [
        {
            name: "G-Class Brabus",
            image: "images/hero.png",
            passengers: 5,
            gearbox: "Auto",
            type: "SUV Luxe"
        },
        {
            name: "Range Rover Sport",
            image: "images/rover.png",
            passengers: 5,
            gearbox: "Auto",
            type: "SUV Premium"
        },
        {
            name: "Porsche 911 Carrera",
            image: "images/porsche.png",
            passengers: 2,
            gearbox: "Auto",
            type: "Sportive"
        }
    ];

    cars.forEach((car, index) => {
        const delay = index * 0.15; // Calculate delay based on index
        const carHTML = `
            <div class="car-card reveal" style="transition-delay: ${delay}s;">
                <div class="car-img-wrapper">
                    <img src="${car.image}" alt="${car.name}" class="car-image">
                </div>
                <div class="car-details">
                    <h3 class="car-title">${car.name}</h3>
                    <div class="car-features">
                        <div class="car-feature">
                            <i class="fas fa-user-friends"></i>
                            <span>${car.passengers} Places</span>
                        </div>
                        <div class="car-feature">
                            <i class="fas fa-cogs"></i>
                            <span>${car.gearbox}</span>
                        </div>
                        <div class="car-feature">
                            <i class="fas fa-car-side"></i>
                            <span>${car.type}</span>
                        </div>
                    </div>
                    <div class="car-price-book">
                        <a href="https://wa.me/212700050208?text=Bonjour,%20je%20souhaite%20réserver%20la%20${encodeURIComponent(car.name)}" class="btn btn-outline-gold btn-sm w-100" target="_blank">
                            <i class="fab fa-whatsapp"></i> Réserver
                        </a>
                    </div>
                </div>
            </div>
        `;
        fleetContainer.innerHTML += carHTML;
    });

    // 4. Scroll Reveal & Active Link (Scroll Spy)
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section[id], footer[id]');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        const scrollY = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Reveal animations
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });

        // Active link highlight (Scroll Spy)
        // Highlight Contact if at the bottom of the page
        if (scrollY + clientHeight >= scrollHeight - 50) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-link[href="#contact"]').classList.add('active');
            return;
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initially

});
