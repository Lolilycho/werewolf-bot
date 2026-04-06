export function assignRoles(game) {
  const base = ["人狼", "占い師", "狩人", "霊媒師", "狂人"];
  const roles = [...base];

  while (roles.length < game.players.length) roles.push("村人");

  roles.sort(() => Math.random() - 0.5);

  game.players.forEach((p, i) => {
    game.roles[p.id] = roles[i];
  });
}
