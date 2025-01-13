document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM carregado");
    const menuToggle = document.getElementById("menu-toggle");
    const collapsibleMenu = document.getElementById("collapsible-menu");
    const toggleViewButton = document.getElementById("toggle-view");
    const ticketTable = document.getElementById("ticket-table");
    const cardGrid = document.querySelector(".card-grid");
    const mainContainer = document.getElementById("main-container");


    // nav collapsable menu
    menuToggle.addEventListener("click", function () {
        collapsibleMenu.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });


    // table to card view
    toggleViewButton.addEventListener("click", function () {
        toggleViewButton.classList.toggle("active");

        ticketTable.style.display = (ticketTable.style.display === "none") ? "table" : "none";
        cardGrid.style.display = (cardGrid.style.display === "none") ? "grid" : "none";

        toggleViewButton.innerHTML = (ticketTable.style.display === "none")
            ? '<i class="fa fa-table"></i> <span> Tabela </span>'
            : '<i class="fa fa-rectangle-list"></i> <span> Cartões </span>';
    });

    // Sort table
    const headers = ticketTable.querySelectorAll('th .table-header');
    let sortColumn = null;
    let sortOrder = 'asc';

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            if (sortColumn === index) {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = index;
                sortOrder = 'asc';
            }
            sortRows(index, sortOrder);
        });
    });

    function sortRows(columnIndex, order) {
        const tbody = ticketTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

            if (columnIndex === 0) { // Sort numeric values
                const numA = parseInt(cellA, 10);
                const numB = parseInt(cellB, 10);
                return order === 'asc' ? numA - numB : numB - numA;
            }

            return order === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });
        // Clear table rows
        tbody.innerHTML = '';
        // Re-render table rows
        rows.forEach(row => tbody.appendChild(row));
    }

    ticketTable.style.display = "none";
    cardGrid.style.display = "grid";
});
