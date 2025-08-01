import { REST, Routes } from 'discord.js';
import dotenv from "dotenv"
dotenv.config()

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'friendbot',
    description: 'Chat with a friendly AI bot',
    options: [
      {
        name: 'message',
        description: 'What do you want to say to the bot?',
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}