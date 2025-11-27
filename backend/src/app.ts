import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TODO: add routes later
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
