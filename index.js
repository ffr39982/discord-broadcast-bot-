import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});

const PREFIX = process.env.PREFIX || "!";

client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "bc") {
    const text = args.join(" ");
    if (!text) return message.reply("❌ اكتب رسالة للإرسال.");

    // إرسال لجميع السيرفر
    message.guild.members.cache.forEach((member) => {
      if (!member.user.bot) {
        member.send(text).catch(() => {});
      }
    });

    message.reply("✅ تم إرسال البرودكاست.");
  }
});

client.login(process.env.TOKEN);
