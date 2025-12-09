const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.get("/health", (req, res) => {
  res.json({ status: "Proxy Backend Running on Vercel ✅" });
});

app.post("/proxy", async (req, res) => {
  try {
    const {
      url,
      method = "GET",
      headers = {},
      body = {},
      params = {}
    } = req.body;

    if (!url) {
      return res.status(400).json({ error: "Provide Valid URL" });
    }

    const response = await axios({
      url,
      method,
      headers,
      params,
      data: body,
      timeout: 30000,
      validateStatus: () => true
    });

    res.status(response.status).json({
      status: response.status,
      headers: response.headers,
      data: response.data
    });

  } catch (e) {
    console.error("Proxy Error:", e?.response?.data || e.message);
    res.status(e?.response?.status || 500).json({
      error: e?.response?.data || "Proxy Server Failed"
    });
  }
});

// if (!process.env.VERCEL) {
//   const PORT = 5134;
//   app.listen(PORT, () => console.log("Local Backend running on: " + PORT));
// }

module.exports = app;
