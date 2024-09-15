import { BaseInteraction, Events } from "discord.js";
import { ClientWithCommands } from "@discord/client";

const event = {
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction): Promise<void> {

        const client = interaction.client as ClientWithCommands;

        tryExecuteChatInputCommand(client, interaction);
    },
};

async function tryExecuteChatInputCommand(client: ClientWithCommands, interaction: BaseInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
}

export default event;
