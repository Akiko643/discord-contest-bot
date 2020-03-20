import 'module-alias/register';

import dotenv from 'dotenv';
import Discord from 'discord.js';

import { checkForNewContests } from './notify';

import '@/platforms/codeforces';

dotenv.config();
if (!process.env.DISCORD_TOKEN) {
  throw Error('No DIRCORD_TOKEN variable found in .env file');
}

const client = new Discord.Client();
export const subscribedChannels: (
  | Discord.TextChannel
  | Discord.DMChannel
)[] = [];

client.once('ready', () => {
  setInterval(checkForNewContests, 60 * 60 * 1000);
  checkForNewContests();
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === '!join') {
    message.channel.send('Okay, I will notify you about upcoming contests!');
    subscribedChannels.push(message.channel);
  }
});

client.login(process.env.DISCORD_TOKEN);
