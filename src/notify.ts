import { subscribedChannels } from '@/cli';
import {
  EventSource,
  UpcomingEvent,
  notifyIntervals,
  formatUpcomingEvent,
} from './event';

const eventSources: Map<string, EventSource> = new Map();
export function addEventSource(eventSource: EventSource, id: string) {
  if (eventSources.has(id)) {
    throw Error(`Event source with ID ${id} is already added!`);
  }
  eventSources.set(id, eventSource);
}

const upcomingEvents: Map<string, UpcomingEvent> = new Map();

// handleNewContest add new contest to upcomingEvents map and creates notifiers
function handleNewContest(contest: UpcomingEvent) {
  // Insert contest to upcomingEvents map
  if (upcomingEvents.has(contest.id)) {
    return;
  }
  upcomingEvents.set(contest.id, contest);

  // For each interval in notifyIntervals create timeout sending notification to subscribedChannels
  const currentTime = Date.now() / 1000;
  notifyIntervals.forEach(async interval => {
    const timeDist = contest.startTime - interval.remainingTime;
    await new Promise(resolve =>
      setTimeout(() => resolve, (timeDist - currentTime) * 1000),
    );
    subscribedChannels.forEach(channel => {
      channel.send(`Contest will start in ${interval.message}!!`);
      channel.send(formatUpcomingEvent(contest));
    });
  });
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const upcoming = [];
  await Promise.all(
    Array.from(eventSources.values()).map(async source => {
      const events = await source.poll();
      upcoming.push(...events);
    }),
  );
  return upcoming;
}

// checkForNewContests fetches list of upcoming events and add new contests if found
export async function checkForNewContests() {
  (await getUpcomingEvents())
    .filter(event => !upcomingEvents.has(event.id))
    .forEach(handleNewContest);
}
