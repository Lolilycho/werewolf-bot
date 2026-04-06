import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function gmButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("day")
      .setLabel("昼開始")
      .setStyle(ButtonStyle.Success)
  );
}
