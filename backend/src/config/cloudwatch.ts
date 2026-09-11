import { CloudWatchClient } from "@aws-sdk/client-cloudwatch";

import { CloudWatchLogsClient } from "@aws-sdk/client-cloudwatch-logs";

const region = process.env.AWS_REGION;

if (!region) {
  throw new Error("AWS_REGION is not configured");
}

export const cloudWatchClient = new CloudWatchClient({
  region,
});

export const cloudWatchLogsClient = new CloudWatchLogsClient({
  region,
});

export const CLOUDWATCH_LOG_GROUP =
  process.env.CLOUDWATCH_LOG_GROUP || "/taskhub/backend";

export const CLOUDWATCH_LOG_STREAM =
  process.env.CLOUDWATCH_LOG_STREAM || "backend";

export const CLOUDWATCH_METRIC_NAMESPACE =
  process.env.CLOUDWATCH_METRIC_NAMESPACE || "TaskHub/Backend";

export const CLOUDWATCH_LOG_RETENTION_DAYS = Number(
  process.env.CLOUDWATCH_LOG_RETENTION_DAYS || 14,
);
