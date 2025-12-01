import dotenv from "dotenv";
import app from "./app";
import { connectDatabase } from "./core/database/index";

dotenv.config();

async function start() {
  await connectDatabase();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();
