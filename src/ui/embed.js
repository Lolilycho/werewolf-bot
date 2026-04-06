import { EmbedBuilder } from "discord.js";
import { name } from "../utils/name.js";

export function dayLog(game, day) {
  const votes = game.votes.filter(v => v.day === day);
  const n = game.nights[day - 1];

  return new EmbedBuilder()
    .setTitle(`📅 ${day}日目`)
    .addFields(
      {
        name: "投票結果",
        value: votes.map(v => `${name(v.voter)} → ${name(v.target)}`).join("\n") || "なし"
      },
      {
        name: "夜行動",
        value: n
          ? `襲撃 → ${n.dead.length ? n.dead.join(", ") : "なし"}`
          : "なし"
      }
    );
}
