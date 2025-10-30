document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Función para alternar la visibilidad del menú móvil
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            // Alterna la clase 'hidden' para mostrar/ocultar el menú
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cierra el menú móvil si se hace clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});