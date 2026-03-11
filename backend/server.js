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

const app = express();
app.use(express.json());

const ticketRoutes = require("./routes/tickets");

app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
