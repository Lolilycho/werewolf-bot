export async function createGameChannels(guild, game) {

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

const spectator = await guild.channels.create({
  name: "観戦者",
  parent: category.id,
  permissionOverwrites: [
    // 全体は見れない
    {
      id: guild.id,
      deny: ["ViewChannel"]
    },

    // GMは見れる
    {
      id: game.gmId,
      allow: ["ViewChannel"]
    },

    // 観戦者だけ見れる
    ...game.spectators.map(name => {
      const member = guild.members.cache.find(m => m.user.username === name);

      if (!member) return null;

      return {
        id: member.id,
        allow: ["ViewChannel"]
      };
    }).filter(Boolean)
  ]
});

  // 個人チャンネル
  const personalChannels = {};

  for (const p of game.players) {

    const member = guild.members.cache.find(m => m.user.username === p);
    if (!member) continue;

    const ch = await guild.channels.create({
      name: `個人-${p}`,
      parent: category.id,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ["ViewChannel"]
        },
        {
          id: member.id,
          allow: ["ViewChannel"]
        }
      ]
    });

    personalChannels[p] = ch;
  }

  return {
    category,
    rule,
    vote,
    gm,
    spectator, // ← 追加
    personalChannels
  };
}
