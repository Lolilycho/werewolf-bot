import { game } from "./state.js";
import { gmButtons } from "../ui/buttons.js";
import { createSelect } from "../ui/select.js";
import { addVote, resetVotes } from "./vote.js";
import { checkRunoff } from "./runoff.js";
import { initNight, setWolf, setGuard, setDivine, resolveNight } from "./night.js";

export async function onMessage(msg) {
  if (msg.author.bot) return;

  if (msg.content === "!start") {
    game.players = [];
    game.alive = [];
    return msg.channel.send({ content: "GM操作", components: [gmButtons()] });
  }

  if (msg.content === "!join") {
    game.players.push(msg.author.username);
    game.alive.push(msg.author.username);
    return msg.reply("参加しました");
  }
}

export async function onInteraction(i) {

  if (i.isButton()) {

    if (i.customId === "start_day") {
      resetVotes();

      return i.channel.send({
        content: `${game.day}日目 投票開始`,
        components: [createSelect("vote", game.alive)]
      });
    }

    if (i.customId === "start_night") {

      initNight();

      // 霊媒（即）
      await i.channel.send("霊媒結果：なし（簡易）");

      return i.reply("夜開始");
    }

    if (i.customId === "end_night") {

      const dead = resolveNight();

      if (dead) {
        return i.channel.send(`${dead} が死亡しました`);
      } else {
        return i.channel.send("誰も死亡しませんでした");
      }
    }
  }

  if (i.isStringSelectMenu()) {

    const value = i.values[0];

    // 投票
    if (i.customId === "vote") {

      if (!addVote(i.user.username, value)) {
        return i.reply({ content: "自投票禁止", ephemeral: true });
      }

      const msg = await i.reply({ content: "投票完了", fetchReply: true });
      setTimeout(() => msg.delete().catch(()=>{}), 5000);

      const runoff = checkRunoff();

      if (runoff) {
        return i.channel.send({
          content: `決選投票：${runoff.join(",")}`,
          components: [createSelect("runoff", runoff)]
        });
      }
    }

    // 決選投票
    if (i.customId === "runoff") {

      const msg = await i.reply({ content: "決選投票完了", fetchReply: true });
      setTimeout(() => msg.delete().catch(()=>{}), 5000);
    }

    // 占い
    if (i.customId === "divine") {
      setDivine(value);
      return i.reply(`${value} は村人です（仮）`);
    }

    // 狩人
    if (i.customId === "guard") {
      setGuard(value);
      return i.reply(`${value} を護衛`);
    }

    // 人狼（GM）
    if (i.customId === "wolf") {
      setWolf(value);
      return i.reply(`${value} を襲撃`);
    }
  }
}

import { checkWin } from "./result.js";
import { formatLog } from "../utils/log.js";

if (i.customId === "end_game") {

  const win = checkWin();

  await i.reply(`勝敗が決まりました：${win}`);

  const log = formatLog();

  await i.channel.send("===試合結果===");
  await i.channel.send("```" + log + "```");
}

if (msg.content === "!start") {

  game.players = [];
  game.alive = [];
  game.roles = {};
  game.votes = [];
  game.voteCount = {};
  game.logs = [];   // ← ★重要
  game.day = 1;

  return msg.channel.send({
    content: "GM操作",
    components: [gmButtons()]
  });
}

import { addLog } from "../utils/log.js";
import { checkRunoff } from "./runoff.js";

function endVote(channel) {

  // ログ保存
  addLog(game.day, "vote", [...game.votes]);

  const runoff = checkRunoff();

  if (runoff) {
    return channel.send({
      content: `決選投票：${runoff.join(",")}`,
      components: [createSelect("runoff", runoff)]
    });
  }

  // 処刑
  let max = 0;
  let target = null;

  for (const [k,v] of Object.entries(game.voteCount)) {
    if (v > max) {
      max = v;
      target = k;
    }
  }

  if (target) {
    game.alive = game.alive.filter(p => p !== target);
    channel.send(`${target} が処刑されました`);
  }

  game.day++;
}

import { resolveNight } from "./night.js";
import { addLog } from "../utils/log.js";

if (i.customId === "end_night") {

  const dead = resolveNight();

  // ログ保存
  addLog(game.day, "night", { ...game.nightActions });

  if (dead) {
    await i.channel.send(`${dead} が死亡しました`);
  } else {
    await i.channel.send("誰も死亡しませんでした");
  }

  return;
}

import { formatLog } from "../utils/log.js";
import { checkWin } from "./result.js";

if (i.customId === "end_game") {

  const win = checkWin();

  await i.channel.send(`🏆 ${win}`);

  const log = formatLog();

  await i.channel.send("===試合ログ===");
  await i.channel.send("```" + log + "```");
}
