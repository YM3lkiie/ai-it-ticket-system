require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const ticketRoutes = require("./routes/tickets");

app.use("/tickets", ticketRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});