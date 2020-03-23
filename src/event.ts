import { MessageEmbed } from 'discord.js';

export type UpcomingEvent = {
  id: string;
  url: string;
  name: string;
  type?: string;
  platform: string;
  startTime: number;
};

export function formatUpcomingEvent(event: UpcomingEvent): MessageEmbed {
  let message = new MessageEmbed()
    .setURL(event.url)
    .setColor('#0099ff')
    .setTitle(`${event.name} on ${event.platform}`)
    .addField('Start time', new Date(event.startTime * 1000).toString());
  if (event.type) message = message.addField('Type', event.type);
  return message;
}
