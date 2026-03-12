const express = require("express");
const router = express.Router();
const db = require("../config/database");

const classifyTicket = require("../services/ticketClassifier");
const suggestFix = require("../services/troubleshooter")

// CREATE TICKET
router.post("/", (req, res) => {

    const { title, description, created_by } = req.body;
    const text = title + " " + description;
    const aiResult = classifyTicket(text);
    const suggestions = suggestFix(text);

    const query = `
        INSERT INTO tickets (title, description, category, priority, created_by)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query, [title, description, aiResult.category, aiResult.priority, created_by],
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send("Error creating ticket");
                return;
            }

            res.json({
                message: "Ticket created",
                ticketId: result.insertId,
                category: aiResult.category,
                priority: aiResult.priority,
                suggestions: suggestions
            });
        }
    );
});

/*
// GET ALL TICKETS SO THAT SYSTEM CAN RETRIEVE ALL TICKETS FROM MYSQL
router.get("/", (req, res) => {
    const query = "SELECT * FROM tickets";

    db.query(query, (error, results) => {
        if(error){
            console.error(error);
            res.status(500).send("Error retrieving tickets");
            return;
        }
        res.json(results);
    });
});
*/

// UPDATE GET ALL TICKETS TO ALSO INCLUDE FILTERS
router.get("/", (req, res) => {
    let query = "SELECT * FROM tickets WHERE 1=1";
    let params = [];

    if(req.query.status) {
        query += " AND status = ?";
        params.push(req.query.status);
    }

    if(req.query.priority) {
        query += " AND priority = ?";
        params.push(req.query.priority);
    }

    if(req.query.assigned_to) {
        query += " AND assigned_to = ?";
        params.push(req.query.assigned_to);
    }

    db.query(query, params, (error, results) => {
        if(error) {
            console.error(error);
            res.status(500).send("Error retrieving tickets");
            return;
        }

        res.json(results);
    });
});

// GET A SINGLE TICKET BY ITS ID
router.get("/:id", (req, res) => {
    const ticketId = req.params.id;
    
    const query = "SELECT * FROM tickets WHERE id = ?";

    db.query(query, [ticketId], (error, results) => {
        if(error) {
            console.error(error);
            res.status(500).send("Error retrieving ticket");
            return;
        }

        if(results.length === 0) {
            res.status(400).json({ message: "Ticket not found" });
            return;
        }

        res.json(results[0]);
    });
});

// UPDATING STATUS OF TICKET
router.patch("/:id/status", (req, res) => {
    const ticketId = req.params.id;
    const { status } = req.body;

    const query = "UPDATE tickets SET status = ? WHERE id = ?";

    db.query(query, [status, ticketId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).json({ message: "Ticket not found" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.json({ message: "Ticket status updated successfully" });
    });
});

// ASSIGN TECHNICIAN TO TICKET
router.patch("/:id/assign", (req, res) => {
    const ticketId = req.params.id;
    const { assigned_to } = req.body;

    const query = "UPDATE tickets SET assigned_to = ? WHERE id = ?";

    db.query(query, [assigned_to, ticketId], (error, result) => {
        if(error) {
            console.error(error);
            res.status(500).send("Error assigning ticket");
            return;
        }

        if(result.affectedRows ===0) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }

        res.json({ message: "Ticket assisgned successfully "});
    });
});

module.exports = router;