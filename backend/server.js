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