export function addVote(game, voter, target) {
  game.votes.push({ day: game.day, voter, target });
}
