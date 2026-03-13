async function loadTickets() {
    const response = await fetch("http://localhost:5000/tickets");

    const tickets = await response.json();

    const table = document.querySelector("#ticketTable tbody");

    table.innerHTML = "";

    tickets.forEach(ticket => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.title}</td>
            <td>${ticket.category}</td>
            <td>${ticket.priority}</td>
            <td>${ticket.status}</td>
        `;
        table.appendChild(row);
    });

}