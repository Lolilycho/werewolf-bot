import { game } from "./state.js";
import { gmButtons } from "../ui/buttons.js";
import { createSelect } from "../ui/select.js";
import { addVote, resetVotes } from "./vote.js";
import { checkRunoff } from "./runoff.js";
import { initNight, setWolf, setGuard, setDivine, resolveNight } from "./night.js";
import { addLog, formatLog } from "../utils/log.js";
import { checkWin } from "./result.js";
import { createGameChannels } from "./channels.js";

export async function onMessage(msg) {
  if (msg.author.bot) return;

  if (msg.content === "!start") {

    game.players = [];
    game.alive = [];
    game.roles = {};
    game.logs = [];
    game.day = 1;

    return msg.channel.send("参加者を募集します（!join）");
  }

  if (msg.content === "!join") {
    game.players.push(msg.author.username);
    game.alive.push(msg.author.username);
    return msg.reply("参加しました");
  }
}

export async function onInteraction(i) {

  if (i.isButton()) {

    await i.deferReply();

    if (i.customId === "start_day") {

      resetVotes();

      return i.editReply({
        content: `${game.day}日目 投票開始`,
        components: [createSelect("vote", game.alive)]
      });
    }

    if (i.customId === "start_night") {

      initNight();

      return i.editReply("夜開始");
    }

    if (i.customId === "end_night") {

      const dead = resolveNight();

      addLog(game.day, "night", { ...game.nightActions });

      if (dead) {
        return i.editReply(`${dead} が死亡しました`);
      } else {
        return i.editReply("誰も死亡しませんでした");
      }
    }

    if (i.customId === "end_game") {

      const win = checkWin();

      await i.editReply(`🏆 ${win}`);

      const log = formatLog();

      await i.followUp("===試合ログ===");
      await i.followUp("```" + log + "```");
    }
  }

  if (i.isStringSelectMenu()) {

    const value = i.values[0];

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

    if (i.customId === "runoff") {
      const msg = await i.reply({ content: "決選投票完了", fetchReply: true });
      setTimeout(() => msg.delete().catch(()=>{}), 5000);
    }

    if (i.customId === "divine") {
      setDivine(value);
      return i.reply(`${value} は村人です（仮）`);
    }

    if (i.customId === "guard") {
      setGuard(value);
      return i.reply(`${value} を護衛`);
    }

    if (i.customId === "wolf") {
      setWolf(value);
      return i.reply(`${value} を襲撃`);
    }
  }
}
