const votes = [];

export function addVote(user, target) {
  votes.push({ user, target });
  console.log(votes);
}
