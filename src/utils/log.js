import { game } from "../game/state.js";

export function addLog(day, type, data) {

  if (!game.logs) game.logs = [];

  game.logs.push({
    day,
    type,
    data
  });
}

export function formatLog() {

  let text = "";

  for (const log of game.logs) {

    text += `\n${log.day}日目\n`;

    if (log.type === "vote") {
      for (const v of log.data) {
        text += `${v.user} → ${v.target}\n`;
      }
    }

    if (log.type === "night") {
      text += `襲撃 → ${log.data.wolf || "なし"}\n`;
      text += `占い → ${log.data.divine || "なし"}\n`;
    }
  }

  text += "\n役職一覧\n";

  for (const [p,r] of Object.entries(game.roles)) {
    text += `${p}：${r}\n`;
  }

  return text;
}
