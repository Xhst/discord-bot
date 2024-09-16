import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "@discord/commands";
import { i18n } from "@i18n/internationalization";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription(i18n("commands.utility.ping.description")),

  async execute(interaction: CommandInteraction): Promise<void> {
    await interaction.reply("Pong!");
  },
};

export default command;
