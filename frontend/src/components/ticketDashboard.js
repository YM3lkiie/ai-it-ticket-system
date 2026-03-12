import React, { useEffect, useState } from "react";
import axios from "axios";

function TicketDashboard() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  return (
    <div>
      <h2>IT Tickets</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.category}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TicketDashboard;