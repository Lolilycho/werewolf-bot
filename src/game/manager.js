import { GameState } from "./GameState.js";
import { assignRoles } from "./roles.js";
import { gmButtons } from "../ui/buttons.js";
import { voteSelect } from "./voteUI.js";
import { addVote } from "./vote.js";
import { sendLog } from "./end.js";

const game = new GameState();

export async function handleMessage(msg) {

  if (msg.content === "!start") {
    return msg.channel.send({ content: "GM操作", components: [gmButtons()] });
  }

  if (msg.content === "!join") {
    game.players.push({ id: msg.author.id, name: msg.author.username });
    return msg.reply("参加");
  }
}

export async function handleInteraction(i) {

  if (i.isButton()) {

    if (i.customId === "assign") {
      assignRoles(game);
      return i.reply("配布完了");
    }

    if (i.customId === "day") {
      return i.channel.send({ content: "投票", components: [voteSelect(game)] });
    }

    if (i.customId === "night") {
      game.nights.push({ dead: [] });
      return i.reply("夜開始");
    }

    if (i.customId === "end") {
      return sendLog(i.channel, game);
    }
  }

  if (i.isStringSelectMenu()) {

    if (i.customId === "vote") {
      const target = i.values[0];
      addVote(game, i.user.username, target);

      const msg = await i.reply({ content: "投票完了", fetchReply: true });
      setTimeout(() => msg.delete(), 5000);
    }
  }
}
