const express = require("express");
const router = express.Router();
const db = require("../config/database");

// CREATE TICKET
router.post("/", (req, res) => {
    const { title, description, category, priority, created_by } = req.body;

    const query = `
        INSERT INTO tickets (title, description, category, priority, created_by)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query, [title, description, category, priority, created_by],
        (error, result) => {
            if(error) {
                console.error(error);
                res.status(500).send("Error creating ticket");
                return;
            }

            res.status(201).json({
                message: "Ticket created successfully",
                ticketId: result.inserId
            });
        }
    );
});

module.exports = router;