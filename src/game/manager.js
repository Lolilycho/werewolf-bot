import { game } from "./state.js";
import { gmButtons } from "../ui/buttons.js";
import { voteSelect } from "../ui/select.js";
import { addVote, resetVotes } from "./vote.js";

export async function onMessage(msg) {
  if (msg.author.bot) return;

  if (msg.content === "!start") {

    game.players = [];
    game.alive = [];

    return msg.channel.send({
      content: "GM操作",
      components: [gmButtons()]
    });
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

      game.phase = "day";
      resetVotes();

      return i.channel.send({
        content: `${game.day}日目 投票開始`,
        components: [voteSelect()]
      });
    }

    if (i.customId === "start_night") {

      game.phase = "night";

      return i.reply("夜開始（GM処理）");
    }

    if (i.customId === "end_game") {

      return i.channel.send("試合終了 ログ出力（簡易）");
    }
  }

  if (i.isStringSelectMenu()) {

    if (i.customId === "vote") {

      const target = i.values[0];
      const ok = addVote(i.user.username, target);

      if (!ok) return i.reply({ content: "自投票は禁止", ephemeral: true });

      const msg = await i.reply({
        content: `${target} に投票`,
        fetchReply: true
      });

      setTimeout(() => msg.delete().catch(()=>{}), 5000);

      // 常時票数表示
      let text = "投票状況\n";
      for (const [k,v] of Object.entries(game.voteCount)) {
        text += `${k}: ${v}票\n`;
      }

      await i.channel.send(text);
    }
  }
}
