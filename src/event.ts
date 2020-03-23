import Discord from 'discord.js';

export type UpcomingEvent = {
  id: string;
  url: string;
  name: string;
  type?: string;
  platform: string;
  startTime: number;
};

// EventSource represents some programming contest platform API
export interface EventSource {
  // poll gets list of upcoming events
  poll(): Promise<UpcomingEvent[]>;
}

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

export function formatUpcomingEvent(
  event: UpcomingEvent,
): Discord.MessageEmbed {
  let message = new Discord.MessageEmbed()
    .setURL(event.url)
    .setColor('#0099ff')
    .setTitle(`${event.name} on ${event.platform}`)
    .addField('Start time', new Date(event.startTime * 1000).toString());
  if (event.type) message = message.addField('Type', event.type);
  return message;
}
