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

async function createTicket(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const created_by = document.getElementById("created_by").value;
    
    const response = await fetch("http://localhost:5000/tickets", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                created_by
            })
        });

    const result = await response.json();
    console.log(result);
    alert("Ticket created successfully");
    document.getElementById("ticketForm").reset();
    loadTickets();
}


window.onload = () => {
    loadTickets();
};

setInterval(loadTickets, 5000);

document
    .getElementById("ticketForm")
    .addEventListener("submit", createTicket);