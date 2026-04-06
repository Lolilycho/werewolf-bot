import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export function voteSelect(game) {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("vote")
      .setPlaceholder("投票")
      .addOptions(
        game.players.map(p => ({
          label: p.name,
          value: p.id
        }))
      )
  );
}
