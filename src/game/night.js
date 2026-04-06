import { game } from "./state.js";

export function initNight() {
  game.nightActions = {
    wolf: null,
    guard: null,
    divine: null
  };
}

export function setWolf(target) {
  game.nightActions.wolf = target;
}

export function setGuard(target) {
  game.nightActions.guard = target;
}

export function setDivine(target) {
  game.nightActions.divine = target;
}

export function resolveNight() {

  let dead = game.nightActions.wolf;

  if (dead && dead === game.nightActions.guard) {
    dead = null;
  }

  if (dead) {
    game.alive = game.alive.filter(p => p !== dead);
  }

  return dead;
}
