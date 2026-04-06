import { game } from "../game/state.js";

export function addLog(day, type, data) {

  if (!game.logs) game.logs = [];

  game.logs.push({
    day,
    type,
    data
  });
}
