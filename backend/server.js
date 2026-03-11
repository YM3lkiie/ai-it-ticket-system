/*
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Ticket System API Running");
});

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`Sever running on ${PORT}`);
});
*/

const express = require("express");
const db = require("./config/database");

const app = express();
app.use(express.json());

app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (error, results) => {
        if(error) {
            res.status(500).send("Database error");
            return;
        }
        res.send("Database connected successfully");
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Sever running on ${PORT}`);
});