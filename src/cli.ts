import dotenv from 'dotenv';
import Discord from 'discord.js';

dotenv.config();
if (!process.env.DISCORD_TOKEN) {
  throw Error('No DIRCORD_TOKEN variable found in .env file');
}

const subscribedChannels: (Discord.TextChannel | Discord.DMChannel)[] = [];

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === '!join') {
    message.channel.send('Okay, I will notify you about upcoming contests!');
    subscribedChannels.push(message.channel);
  }
});

client.login(process.env.DISCORD_TOKEN);
