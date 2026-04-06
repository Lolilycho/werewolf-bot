import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { game } from "../game/state.js";

export function voteSelect() {

  const options = game.alive.map(p => ({
    label: p,
    value: p
  }));

  const select = new StringSelectMenuBuilder()
    .setCustomId("vote")
    .setPlaceholder("投票先を選択")
    .addOptions(options);

  return new ActionRowBuilder().addComponents(select);
}
