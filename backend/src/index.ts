import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./core/database/index.js";

dotenv.config();

async function start() {
  await connectDatabase();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();
