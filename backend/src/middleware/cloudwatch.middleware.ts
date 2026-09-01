import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  cloudWatchService,
} from "../services/cloudwatch.service";

export const cloudWatchRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime.bigint();

  res.on("finish", async () => {
    const end = process.hrtime.bigint();

    const latency =
      Number(end - start) / 1_000_000;

    const statusCode =
      res.statusCode;

    const route =
      req.route?.path
        ? `${req.baseUrl}${req.route.path}`
        : req.path;

    const userId =
      req.user?.userId;

    const level =
      statusCode >= 500
        ? "ERROR"
        : statusCode >= 400
        ? "WARN"
        : "INFO";

    await cloudWatchService.log(
      level,
      "API request",
      {
        method: req.method,
        route,
        statusCode,
        latencyMs:
          Number(latency.toFixed(2)),
        userId,
        userAgent:
          req.get("user-agent"),
      }
    );

    await cloudWatchService.metric(
      "RequestCount",
      1,
      "Count",
      {
        Method: req.method,
      }
    );

    await cloudWatchService.metric(
      "RequestLatency",
      latency,
      "Milliseconds"
    );

    if (statusCode >= 400) {
      await cloudWatchService.metric(
        "ErrorCount",
        1,
        "Count",
        {
          ErrorType:
            statusCode >= 500
              ? "5xx"
              : "4xx",
        }
      );
    }
  });

  next();
};