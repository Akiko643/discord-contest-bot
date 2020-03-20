export type UpcomingEvent = {
  id: string;
  name: string;
  type: string;
  startTime: number;
};

// EventSource represents some programming contest platform API
export interface EventSource {
  // poll gets list of upcoming events
  poll(): Promise<UpcomingEvent[]>;
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

// notifyIntervals defines when bot should notify users about upcoming events
export const notifyIntervals = [
  1 * day,
  2 * hour,
  1 * hour,
  30 * minute,
  5 * minute,
];
