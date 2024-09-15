import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@discord/commands";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply("Pong!");
  },
};

export default command;
