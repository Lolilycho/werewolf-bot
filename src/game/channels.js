export async function createGameChannels(guild) {

  const category = await guild.channels.create({
    name: "人狼",
    type: 4
  });

  const vote = await guild.channels.create({
    name: "投票",
    parent: category.id
  });

  const gm = await guild.channels.create({
    name: "gm",
    parent: category.id
  });

  return { category, vote, gm };
}
