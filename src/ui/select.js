import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export function createSelect(id, options) {

  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(id)
      .setPlaceholder("選択してください")
      .addOptions(
        options.map(o => ({
          label: o,
          value: o
        }))
      )
  );
}
