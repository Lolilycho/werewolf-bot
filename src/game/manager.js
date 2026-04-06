import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { gmButtons } from "../ui/buttons.js";
import { addVote } from "./vote.js";

export async function handleMessage(msg) {
  if (msg.author.bot) return;

  if (msg.content === "!start") {
    return msg.channel.send({
      content: "GM操作",
      components: [gmButtons()]
    });
  }
}

export async function handleInteraction(i) {
  if (i.isButton()) {

    if (i.customId === "day") {
      const select = new StringSelectMenuBuilder()
        .setCustomId("vote")
        .setPlaceholder("投票先を選択")
        .addOptions([
          { label: "A", value: "A" },
          { label: "B", value: "B" }
        ]);

      const row = new ActionRowBuilder().addComponents(select);

      return i.channel.send({
        content: "投票してください",
        components: [row]
      });
    }
  }

  if (i.isStringSelectMenu()) {

    if (i.customId === "vote") {
      addVote(i.user.username, i.values[0]);

      const msg = await i.reply({
        content: "投票完了",
        fetchReply: true
      });

      setTimeout(() => msg.delete(), 5000);
    }
  }
}
