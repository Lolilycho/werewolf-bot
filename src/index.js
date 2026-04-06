import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { handleMessage, handleInteraction } from "./game/manager.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => console.log("Bot起動"));

client.on("messageCreate", handleMessage);
client.on("interactionCreate", handleInteraction);

client.login(process.env.TOKEN);
