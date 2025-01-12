document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado");
    document.getElementById("menu-toggle").addEventListener("click", function() {
        const menu = document.getElementById("collapsible-menu");
        menu.classList.toggle("open");
        /*debug*/ //console.log(menu.classList);  // Verifica as classes aplicadas
        const icon = document.getElementById("menu-toggle");
        icon.classList.toggle("active");
    });
    
});

