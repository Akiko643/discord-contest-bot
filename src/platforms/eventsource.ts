import { UpcomingEvent } from '@/event';

// EventSource represents some programming contest platform API
export interface EventSource {
  // poll gets list of upcoming events. Must returns empty array if error occurred
  poll(): Promise<UpcomingEvent[]>;
}

const eventSources: Map<string, EventSource> = new Map();
export function addEventSource(eventSource: EventSource, id: string) {
  if (eventSources.has(id)) {
    throw Error(`Event source with ID ${id} is already added!`);
  }
  eventSources.set(id, eventSource);
}

export function pollEventSources(): Promise<UpcomingEvent[]> {
  return Promise.all(
    Array.from(eventSources.values()).map(source => source.poll()),
  ).then(events => events.flat());
}
