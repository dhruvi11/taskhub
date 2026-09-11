import { cloudWatchService } from "./cloudwatch.service";

class ResourceMonitorService {
  private interval?: NodeJS.Timeout;

  start() {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(async () => {
      const memory = process.memoryUsage();

      const uptime = process.uptime();

      await cloudWatchService.metric(
        "NodeHeapUsedMB",
        memory.heapUsed / 1024 / 1024,
        "None",
      );

      await cloudWatchService.metric(
        "NodeHeapTotalMB",
        memory.heapTotal / 1024 / 1024,
        "None",
      );

      await cloudWatchService.metric(
        "NodeRSSMB",
        memory.rss / 1024 / 1024,
        "None",
      );

      await cloudWatchService.metric("ProcessUptimeSeconds", uptime, "None");
    }, 60_000);

    this.interval.unref();
  }
}

export const resourceMonitor = new ResourceMonitorService();
