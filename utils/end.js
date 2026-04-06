import { dayLog } from "../ui/embed.js";

export async function sendLog(channel, game) {
  for (let i = 1; i <= game.day; i++) {
    await channel.send({ embeds: [dayLog(game, i)] });
  }
}
