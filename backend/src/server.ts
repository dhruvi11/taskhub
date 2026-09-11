import "dotenv/config";

import app from "./app";

import {
  cloudWatchService,
} from "./services/cloudwatch.service";

import {
  resourceMonitor,
} from "./services/resource-monitor.service";

import { initializeSentry } from "./config/sentry";
initializeSentry();

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    // Initialize CloudWatch
    await cloudWatchService.initialize();

    // Start resource monitoring
    resourceMonitor.start();

    // Start API server
    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
};

startServer();