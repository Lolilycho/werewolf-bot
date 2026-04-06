import { game } from "./state.js";

export function checkRunoff() {

  const counts = game.voteCount;
  let max = 0;

  for (const v of Object.values(counts)) {
    if (v > max) max = v;
  }

  const targets = Object.keys(counts).filter(k => counts[k] === max);

  if (targets.length > 1) {
    game.runoff = {
      targets,
      round: (game.runoff?.round || 0) + 1
    };
    return targets;
  }

  return null;
}
