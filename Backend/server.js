require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app  = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


app.use("/api", require("./routes"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/api`)
);
