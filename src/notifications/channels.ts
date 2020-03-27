import fs from 'fs';
import { MessageEmbed, Client } from 'discord.js';

export interface ChannelLike {
  id: string;
  send(payload: MessageEmbed | string): Promise<any>;
}

const subscribedChannels: Map<string, ChannelLike> = new Map();

export async function loadSubscribedChannels(client: Client) {
  const subscribedChannelIDs: string[] = await new Promise(resolve =>
    fs.readFile('subscribedChannels.json', (err?: Error, rawData?: Buffer) => {
      if (err) {
        console.error(err);
        resolve([]);
      }
      resolve(JSON.parse(rawData?.toString('utf-8') ?? '[]'));
    }),
  );
  return Promise.all(
    subscribedChannelIDs.map(id =>
      client.channels
        .fetch(id)
        .then((channel: unknown) =>
          subscribedChannels.set(id, channel as ChannelLike),
        ),
    ),
  );
}

// saveChannels saves subscribed channel IDs to separate file asynchronously
async function saveChannels() {
  fs.writeFile(
    'subscribedChannels.json',
    JSON.stringify(Array.from(subscribedChannels.keys())),
    err => err && console.error(err),
  );
}

export function unsubcribeFromChannel(channel: ChannelLike) {
  if (subscribedChannels.has(channel.id)) {
    subscribedChannels.delete(channel.id);
    saveChannels();
    return true;
  }
  console.log(`Haven't subcription on channel #${channel.id}`);
  return false;
}

export function subscribeToChannel(channel: ChannelLike) {
  if (subscribedChannels.has(channel.id)) {
    return false;
  }
  console.log(`Got subscription on channel #${channel.id}`);
  subscribedChannels.set(channel.id, channel);
  saveChannels();
  return true;
}

export function getSubscribedChannels(): ChannelLike[] {
  return Array.from(subscribedChannels.values());
}
