import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv"
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on("messageCreate",(msg)=>{
    if(msg.author.bot)return;
    msg.reply({
        content:"hi from rizz"
    })
})

client.login(process.env.TOKEN);