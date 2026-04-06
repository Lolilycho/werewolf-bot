import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export function createSelect(id, list, placeholder="選択") {

  const select = new StringSelectMenuBuilder()
    .setCustomId(id)
    .setPlaceholder(placeholder)
    .addOptions(list.map(v => ({ label: v, value: v })));

  return new ActionRowBuilder().addComponents(select);
}
