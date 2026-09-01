import {
  CreateLogGroupCommand,
  CreateLogStreamCommand,
  DescribeLogGroupsCommand,
  DescribeLogStreamsCommand,
  PutLogEventsCommand,
  PutRetentionPolicyCommand,
} from "@aws-sdk/client-cloudwatch-logs";

import {
  PutMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";

import {
  cloudWatchClient,
  cloudWatchLogsClient,
  CLOUDWATCH_LOG_GROUP,
  CLOUDWATCH_LOG_STREAM,
  CLOUDWATCH_METRIC_NAMESPACE,
  CLOUDWATCH_LOG_RETENTION_DAYS,
} from "../config/cloudwatch";

class CloudWatchService {
  private initialized = false;

  private async ensureLogGroup() {
    try {
      const result =
        await cloudWatchLogsClient.send(
          new DescribeLogGroupsCommand({
            logGroupNamePrefix:
              CLOUDWATCH_LOG_GROUP,
          })
        );

      const exists =
        result.logGroups?.some(
          (group) =>
            group.logGroupName ===
            CLOUDWATCH_LOG_GROUP
        );

      if (!exists) {
        await cloudWatchLogsClient.send(
          new CreateLogGroupCommand({
            logGroupName:
              CLOUDWATCH_LOG_GROUP,
          })
        );
      }
    } catch (error) {
      const name =
        error instanceof Error
          ? error.name
          : "";

      if (
        name !==
        "ResourceAlreadyExistsException"
      ) {
        throw error;
      }
    }
  }

  private async ensureLogStream() {
    try {
      const result =
        await cloudWatchLogsClient.send(
          new DescribeLogStreamsCommand({
            logGroupName:
              CLOUDWATCH_LOG_GROUP,
            logStreamNamePrefix:
              CLOUDWATCH_LOG_STREAM,
          })
        );

      const exists =
        result.logStreams?.some(
          (stream) =>
            stream.logStreamName ===
            CLOUDWATCH_LOG_STREAM
        );

      if (!exists) {
        await cloudWatchLogsClient.send(
          new CreateLogStreamCommand({
            logGroupName:
              CLOUDWATCH_LOG_GROUP,
            logStreamName:
              CLOUDWATCH_LOG_STREAM,
          })
        );
      }
    } catch (error) {
      const name =
        error instanceof Error
          ? error.name
          : "";

      if (
        name !==
        "ResourceAlreadyExistsException"
      ) {
        throw error;
      }
    }
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      await this.ensureLogGroup();
      await this.ensureLogStream();

      try {
        await cloudWatchLogsClient.send(
          new PutRetentionPolicyCommand({
            logGroupName:
              CLOUDWATCH_LOG_GROUP,
            retentionInDays:
              CLOUDWATCH_LOG_RETENTION_DAYS,
          })
        );
      } catch (error) {
        console.error(
          "CloudWatch retention setup failed:",
          error
        );
      }

      this.initialized = true;

      console.log(
        `[CloudWatch] Initialized: ${CLOUDWATCH_LOG_GROUP}/${CLOUDWATCH_LOG_STREAM}`
      );
    } catch (error) {
      console.error(
        "[CloudWatch] Initialization failed:",
        error
      );
    }
  }

  async log(
    level: "INFO" | "WARN" | "ERROR",
    message: string,
    metadata: Record<string, unknown> = {}
  ) {
    const payload = {
      timestamp:
        new Date().toISOString(),
      level,
      service: "taskhub-backend",
      message,
      ...metadata,
    };

    // Always keep local logs too.
    if (level === "ERROR") {
      console.error(
        JSON.stringify(payload)
      );
    } else if (level === "WARN") {
      console.warn(
        JSON.stringify(payload)
      );
    } else {
      console.log(
        JSON.stringify(payload)
      );
    }

    try {
      await this.initialize();

      await cloudWatchLogsClient.send(
        new PutLogEventsCommand({
          logGroupName:
            CLOUDWATCH_LOG_GROUP,

          logStreamName:
            CLOUDWATCH_LOG_STREAM,

          logEvents: [
            {
              timestamp: Date.now(),
              message:
                JSON.stringify(payload),
            },
          ],
        })
      );
    } catch (error) {
      // Observability must never break the API.
      console.error(
        "[CloudWatch] Log delivery failed:",
        error
      );
    }
  }

  async metric(
    metricName: string,
    value: number,
    unit:
      | "Count"
      | "Milliseconds"
      | "Bytes"
      | "Percent"
      | "None" = "None",
    dimensions: Record<
      string,
      string
    > = {}
  ) {
    try {
      await cloudWatchClient.send(
        new PutMetricDataCommand({
          Namespace:
            CLOUDWATCH_METRIC_NAMESPACE,

          MetricData: [
            {
              MetricName: metricName,

              Value: value,

              Unit: unit,

              Timestamp: new Date(),

              Dimensions:
                Object.entries(
                  dimensions
                ).map(
                  ([Name, Value]) => ({
                    Name,
                    Value,
                  })
                ),
            },
          ],
        })
      );
    } catch (error) {
      console.error(
        `[CloudWatch] Metric ${metricName} failed:`,
        error
      );
    }
  }
}

export const cloudWatchService =
  new CloudWatchService();