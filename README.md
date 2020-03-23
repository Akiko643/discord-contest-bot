# discord-contest-bot

![Build and deploy](https://github.com/Akiko643/discord-contest-bot/workflows/Build%20and%20deploy/badge.svg?branch=master)

A bot sending notifications about upcoming contests to Discord.

Currently supported platforms:

- [Codeforces](https://codeforces.com)
- [Leetcode](https://leetcode.com)

## Setup

- [Create Discord application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
- [Add bot to server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)
- Run bot

### Using Docker:

We provide docker image at: [akiko643/discord-contest-bot](https://hub.docker.com/r/akiko643/discord-contest-bot)

All you need is to load image and pass bot's token to container:

```bash
docker run -dit --name discord-contest-bot -e DISCORD_TOKEN=<your token here> akiko643/discord-contest-bot
```

### Running manually:

```bash
npm install
npm run build
```

- And then pass token as environment variable or use `.env` file:

```
DISCORD_TOKEN=<your token here>
```

## Contributing

PR's and issues are welcome 😉
