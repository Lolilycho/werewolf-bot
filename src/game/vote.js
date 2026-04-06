import { game } from "./state.js";

export function resetVotes() {
  game.votes = [];
  game.voteCount = {};
}

export function addVote(user, target) {

  if (user === target) return false;

  game.votes.push({ user, target });

  if (!game.voteCount[target]) game.voteCount[target] = 0;
  game.voteCount[target]++;

  return true;
}
