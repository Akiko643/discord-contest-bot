import { getSubscribedChannels } from '@/notifications/channels';
import { UpcomingEvent, notifyIntervals, formatUpcomingEvent } from '@/event';

// prepareNotifications creates timeouts within intervals specified in notifyIntervals
export function prepareNotifications(contest: UpcomingEvent) {
  notifyIntervals.forEach(async interval => {
    const timeDist = contest.startTime - interval.remainingTime;
    await new Promise(resolve =>
      setTimeout(resolve, timeDist * 1000 - Date.now()),
    );
    getSubscribedChannels().forEach(channel => {
      channel
        .send(`Contest will start in ${interval.message}!`)
        .catch(console.error);
      channel.send(formatUpcomingEvent(contest)).catch(console.error);
    });
  });
}
