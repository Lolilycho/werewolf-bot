import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function gmButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("assign").setLabel("役職配布").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("day").setLabel("昼").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("night").setLabel("夜").setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId("end").setLabel("終了").setStyle(ButtonStyle.Danger)
  );
}
