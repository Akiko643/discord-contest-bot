import { MessageEmbed, Client } from 'discord.js';

export interface ChannelLike {
  id: string;
  send(payload: MessageEmbed | string): Promise<any>;
}

const subscribedChannels: Map<string, ChannelLike> = new Map();

// TODO: Implement this function
export async function lookupChannel(
  client: Client,
  id: string,
): Promise<ChannelLike | null> {
  return null;
}

export function subscribeToChannel(channel: ChannelLike) {
  console.log(`Got subscription on channel #${channel.id}`);
  subscribedChannels.set(channel.id, channel);
}
export function getSubscribedChannels(): ChannelLike[] {
  return Array.from(subscribedChannels.values());
}
