import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@discord/commands";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("testuser")
    .setDescription("Test user command"),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(
        `${interaction.user.username} ${interaction.user.id}`,
    )},
};

export default command;
