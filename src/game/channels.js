export async function createGameChannels(guild) {

  // カテゴリ作成
  const category = await guild.channels.create({
    name: "人狼",
    type: 4
  });

  // ルール
  const rule = await guild.channels.create({
    name: "rule",
    parent: category.id
  });

  // 投票
  const vote = await guild.channels.create({
    name: "投票",
    parent: category.id
  });

  // GM
  const gm = await guild.channels.create({
    name: "gm",
    parent: category.id
  });

  return {
    category,
    rule,
    vote,
    gm
  };
}
