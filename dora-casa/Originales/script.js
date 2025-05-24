document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navPanel = document.querySelector('.nav-panel');
    const closeNav = document.querySelector('.close-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const floatingBg = document.querySelector('.floating-background');
    const heroSection = document.querySelector('.hero');
    const interludeSection = document.querySelector('.interlude');
    const ticketsSection = document.querySelector('.tickets-section');
    const ctaSection = document.querySelector('.cta-section');
    const sponsorsSection = document.querySelector('.sponsors-section');

    // Función para abrir/cerrar el panel
    function toggleNavPanel() {
        navPanel.classList.toggle('active');
        document.body.style.overflow = navPanel.classList.contains('active') ? 'hidden' : '';
    }

    // Evento para el botón de menú
    menuToggle.addEventListener('click', toggleNavPanel);

    // Evento para el botón de cerrar
    closeNav.addEventListener('click', toggleNavPanel);

    // Cerrar el panel cuando se hace clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', toggleNavPanel);
    });

    // Manejar el scroll para el navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Añadir fondo al navbar cuando se hace scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Ocultar/mostrar navbar según dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;

        // Calcular posiciones de las secciones
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const ticketsBottom = ticketsSection.offsetTop + ticketsSection.offsetHeight;
        const ctaTop = ctaSection.offsetTop;
        const sponsorsTop = sponsorsSection?.offsetTop || Infinity;

        // Manejar visibilidad del fondo
        if (currentScroll > heroBottom && currentScroll < sponsorsTop) {
            floatingBg.style.opacity = '1';
            
            // Efecto parallax
            floatingBg.style.transform = `translateY(${currentScroll * 0.5}px)`;
        } else {
            floatingBg.style.opacity = '0';
        }

        // Ocultar durante la sección de tickets
        if (currentScroll > ticketsBottom && currentScroll < ctaTop) {
            floatingBg.style.opacity = '0';
        }

        // Agregar al script existente
        const scrolled = window.pageYOffset;
        const floatingCircles = document.querySelectorAll('.floating-circle');
        const mainCircle = document.querySelector('.main-circle');
        
        // Rotar el círculo principal sutilmente
        if (mainCircle) {
            mainCircle.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
        }
        
        // Rotar cada círculo flotante con diferentes velocidades
        floatingCircles.forEach((circle, index) => {
            const rotationSpeed = 0.1 + (index * 0.05); // Velocidades diferentes para cada círculo
            circle.style.transform = `rotate(${scrolled * rotationSpeed}deg)`;
        });
    });

    // Manejar el formulario de descuento
    const discountForm = document.querySelector('.discount-form');
    if (discountForm) {
        discountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Muchas gracias por contactarte, tu mensaje ha sido enviado.';
            
            discountForm.innerHTML = '';
            discountForm.appendChild(successMessage);
        });
    }
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            
            // Mostrar mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Muchas gracias por contactarte, tu mensaje ha sido enviado.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }

    // Ajustar el tamaño del círculo principal en dispositivos móviles
    function adjustMainCircleSize() {
        const mainCircle = document.querySelector('.main-circle');
        if (mainCircle && window.innerWidth <= 768) {
            const size = Math.max(window.innerWidth, window.innerHeight) * 0.9;
            mainCircle.style.width = `${size}px`;
            mainCircle.style.height = `${size}px`;
        }
    }

    // Llamar a la función al cargar y al cambiar el tamaño de la ventana
    window.addEventListener('load', adjustMainCircleSize);
    window.addEventListener('resize', adjustMainCircleSize);

    // Manejar errores de carga de imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            // Cargar una imagen por defecto o agregar una clase de error
            this.src = '/assets/images/placeholder.png';
            this.classList.add('image-error');
        };
    });

    // Lazy load para imágenes no críticas
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    const floatingCircles = document.querySelectorAll('.floating-circle');
    const mainCircle = document.querySelector('.main-circle');
    
    // Función para animar las flores
    function animateFlowers() {
        let scrolled = window.pageYOffset;
        
        // Rotar el círculo principal
        if (mainCircle) {
            mainCircle.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
        }
        
        // Animar cada flor flotante
        floatingCircles.forEach((circle, index) => {
            const speed = 0.1 + (index * 0.05);
            const rotation = scrolled * speed;
            const translateY = Math.sin(scrolled * 0.002 + index) * 20;
            
            circle.style.transform = `
                rotate(${rotation}deg)
                translate(0, ${translateY}px)
            `;
        });
    }

    // Optimizar el scroll con requestAnimationFrame
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateFlowers();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Asegurar que el marquee sea infinito
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        // Clonar el contenido para asegurar continuidad
        const content = marqueeTrack.innerHTML;
        marqueeTrack.innerHTML = content + content+ content;
    }
});
