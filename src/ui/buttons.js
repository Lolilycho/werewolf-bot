import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function gmButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("create_game")
      .setLabel("ゲーム開始")
      .setStyle(ButtonStyle.Success),

    new ButtonBuilder()
      .setCustomId("start_day")
      .setLabel("昼開始")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("start_night")
      .setLabel("夜開始")
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId("end_night")
      .setLabel("夜終了")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("end_game")
      .setLabel("試合終了")
      .setStyle(ButtonStyle.Danger)
  );
}

export function joinButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("join_gm")
      .setLabel("GM参加")
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId("join_player")
      .setLabel("プレイヤー参加")
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId("join_spectator")
      .setLabel("観戦者参加")
      .setStyle(ButtonStyle.Secondary)
  );
}
