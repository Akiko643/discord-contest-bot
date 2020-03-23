import { prepareNotifications } from '@/notifications/contest';

import { UpcomingEvent } from './event';
import { pollEventSources } from './platforms/eventsource';

const upcomingEvents: Map<string, UpcomingEvent> = new Map();

// handleNewContest add new contest to upcomingEvents map and creates notifiers
function handleNewContest(contest: UpcomingEvent) {
  // Insert contest to upcomingEvents map
  if (upcomingEvents.has(contest.id)) {
    return;
  }

  console.log(`Adding new contest with id ${contest.id}`);
  upcomingEvents.set(contest.id, contest);

  prepareNotifications(contest);
}

// checkForNewContests fetches list of upcoming events and add new contests if found
export function checkForNewContests() {
  return pollEventSources()
    .then(events => events.filter(event => !upcomingEvents.has(event.id)))
    .then(newEvents => newEvents.forEach(handleNewContest));
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  await checkForNewContests();
  return Array.from(upcomingEvents.values());
}
