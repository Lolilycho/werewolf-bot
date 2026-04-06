import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";

export function abilitySelect(game, type, id) {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`${type}_${id}`)
      .addOptions(
        game.players
          .filter(p => p.id !== id)
          .map(p => ({ label: p.name, value: p.id }))
      )
  );
}
