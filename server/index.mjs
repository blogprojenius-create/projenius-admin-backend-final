import "dotenv/config";
import { createApp } from "./app.mjs";
import { connectDatabase } from "./config/db.mjs";
import { startScheduledBlogPublisher } from "./jobs/newsletterQueue.mjs";

const PORT = Number(process.env.API_PORT || process.env.PORT || 5000);
const app = createApp();

const server = app.listen(PORT, () => {
  console.log(`ProJenius API running on http://localhost:${PORT}`);
});

connectDatabase()
  .then(() => {
    console.log("MongoDB connected successfully.");
    startScheduledBlogPublisher();
  })
  .catch((error) => {
    console.error("MongoDB connection failed. The API server is still running.");
    console.error(error.message || error);
    console.error("Fix MongoDB Atlas Network Access / MONGODB_URI, then restart the backend.");
  });

function shutdown(signal) {
  console.log(`${signal} received. Shutting down ProJenius API.`);
  server.close(() => process.exit(0));
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
