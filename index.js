import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv"
import {OpenAI} from 'openai';
dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

const aiclient = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HF_TOKEN,
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if(interaction.commandName==='friendbot'){
    const userMessage = interaction.options.getString('message');
    await interaction.deferReply()
    try {
      const chatCompletion = await aiclient.chat.completions.create({
        model: "meta-llama/Llama-3.1-8B-Instruct:cerebras",
          messages: [
              {
                role: "system",
                content: "You are a kind and supportive AI friend. Respond with warmth and encouragement.",
              },
              {
                role: "user",
                content: userMessage,
              },
          ],
      });
      const replyText = chatCompletion.choices[0]?.message?.content?.trim() || "I'm here for you, always 💛";
      await interaction.editReply(replyText.slice(0, 2000));
    } catch (error) {
      console.error("HuggingFace Error:", error);
      await interaction.editReply("Sorry, I couldn't reply right now 😢");
    }
  }
});

client.login(process.env.TOKEN);
