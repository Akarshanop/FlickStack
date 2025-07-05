// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app  = express();
const PORT = process.env.PORT || 5000;

/* ─── middleware ───────────────────────────────────────────── */
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

/* ─── routes ───────────────────────────────────────────────── */
app.use("/api", require("./routes"));

/* ─── start ────────────────────────────────────────────────── */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}/api`)
);
