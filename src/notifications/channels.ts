import { MessageEmbed, Client } from 'discord.js';

export interface ChannelLike {
  id: string;
  send(payload: MessageEmbed | string): Promise<any>;
}

const subscribedChannels: ChannelLike[] = [];

// TODO: Implement this function
export async function lookupChannel(
  client: Client,
  id: string,
): Promise<ChannelLike | null> {
  return null;
}

export function subscribeToChannel(channel: ChannelLike) {
  console.log(`Got subscription on channel #${channel.id}`);
  subscribedChannels.push(channel);
}
export function getSubscribedChannels(): ChannelLike[] {
  return subscribedChannels;
}
