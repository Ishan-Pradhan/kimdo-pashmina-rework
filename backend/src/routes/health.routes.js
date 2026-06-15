// routes/health.route.js

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", async (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected";

  const isHealthy = dbStatus === "connected";

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    status: isHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      api: "connected",
      database: dbStatus,
    },
  });
});

router.get("/keep-alive", async (req, res) => {
  try {
    let dbPing = "skipped";
    if (mongoose.connection.readyState === 1) {
      // Perform a ping command to keep MongoDB connection active
      await mongoose.connection.db.command({ ping: 1 });
      dbPing = "success";
    } else {
      throw new Error("Database connection is not ready");
    }

    res.status(200).json({
      success: true,
      message: "Keep-alive pulse successful",
      timestamp: new Date().toISOString(),
      database: dbPing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Keep-alive pulse failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;