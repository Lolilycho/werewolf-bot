import { game } from "./state.js";

export function checkWin() {

  const wolves = game.alive.filter(p => game.roles[p] === "人狼").length;
  const villagers = game.alive.length - wolves;

  if (wolves === 0) return "村人陣営の勝利";
  if (wolves >= villagers) return "人狼陣営の勝利";

  return null;
}
