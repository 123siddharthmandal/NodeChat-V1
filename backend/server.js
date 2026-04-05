import "./instrument.mjs";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

import * as Sentry from "@sentry/node";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World! 123!!!!!!!!!!!");
});

// Sentry test
app.get("/debug-sentry", () => {
  throw new Error("Sentry test error!");
});

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// Routes
app.use("/api/chat", chatRoutes);

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// Start server
const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server started on port: ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;