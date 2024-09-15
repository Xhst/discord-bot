import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@discord/commands";
import { i18n } from "@i18n/internationalization";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("testuser")
    .setDescription(i18n("commands.utility.testuser.description")),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply(
        `${interaction.user.username} ${interaction.user.id}`,
    )},
};

export default command;
