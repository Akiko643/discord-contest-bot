import { getSubscribedChannels } from '@/notifications/channels';
import { UpcomingEvent, formatUpcomingEvent } from '@/event';

const minute = 60;
const hour = 60 * minute;
const day = 24 * hour;

// notifyIntervals defines when bot should notify users about upcoming events
export const notifyIntervals = [
  { remainingTime: 1 * day, message: 'one day' },
  { remainingTime: 2 * hour, message: 'two hours' },
  { remainingTime: 1 * hour, message: 'one hour' },
  { remainingTime: 30 * minute, message: '30 minutes' },
  { remainingTime: 10 * minute, message: 'ten minutes' },
  { remainingTime: 5 * minute, message: 'five minutes' },
];

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
