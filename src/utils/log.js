import { game } from "../game/state.js";

// ログ追加
export function addLog(day, type, data) {

  if (!game.logs) game.logs = [];

  game.logs.push({
    day,
    type,
    data
  });
}

// ログ整形（出力用）
export function formatLog() {

  let text = "";
  let currentDay = null;

  for (const log of game.logs) {

    if (log.day !== currentDay) {
      currentDay = log.day;
      text += `\n${currentDay}日目\n`;
    }

    if (log.type === "vote") {
      text += "▼投票履歴\n";
      for (const v of log.data) {
        text += `${v.user} → ${v.target}\n`;
      }
    }

    if (log.type === "night") {
      text += "▼夜結果\n";
      text += `襲撃 → ${log.data.wolf || "なし"}\n`;
      text += `占い → ${log.data.divine || "なし"}\n`;
      text += `護衛 → ${log.data.guard || "なし"}\n`;
    }
  }

  text += "\n▼役職内訳\n";

  for (const [p, r] of Object.entries(game.roles)) {
    text += `${p}：${r}\n`;
  }

  return text;
}
