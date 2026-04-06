export async function createGameChannels(guild, players) {

  const category = await guild.channels.create({
    name: "人狼",
    type: 4
  });

  const rule = await guild.channels.create({
    name: "rule",
    parent: category.id
  });

  const vote = await guild.channels.create({
    name: "投票",
    parent: category.id
  });

  const gm = await guild.channels.create({
    name: "gm",
    parent: category.id
  });

  for (const p of players) {
    await guild.channels.create({
      name: `個人-${p.name}`,
      parent: category.id,
      permissionOverwrites: [
        { id: guild.id, deny: ["ViewChannel"] },
        { id: p.id, allow: ["ViewChannel"] }
      ]
    });
  }

  return { category, rule, vote, gm };
}
