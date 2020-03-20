import { UpcomingEvent, EventSource } from './event';

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
  // For each interval in notifyIntervals create timeout sending notification to subscribedChannels
}

// checkForNewContests fetches list of upcoming events and add new contests if found
export function checkForNewContests() {
  eventSources.forEach(async source => {
    const events = await source.poll();
    events
      .filter(event => !upcomingEvents.has(event.id))
      .forEach(handleNewContest);
  });
}
