import { ChannelType } from "discord.js";

export async function createChannels(guild) {
  const cat = await guild.channels.create({
    name: "人狼",
    type: ChannelType.GuildCategory
  });

  const vote = await guild.channels.create({
    name: "投票",
    type: ChannelType.GuildText,
    parent: cat.id
  });

  return { cat, vote };
}
