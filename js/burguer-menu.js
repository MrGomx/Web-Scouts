// Obtén referencias a los elementos del menú y el botón hamburguesa
const mobileMenu = document.querySelector('.nav-links');
const mobileMenuButton = document.querySelector('.mobile-menu');

// Agrega un controlador de eventos al botón hamburguesa para mostrar/ocultar el menú móvil
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});


