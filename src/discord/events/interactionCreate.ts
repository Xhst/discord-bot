import { BaseInteraction, Events } from "discord.js";
import { ClientWithCommands } from "@discord/client";
import { i18n } from "@i18n/internationalization";

const event = {
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction): Promise<void> {

        const client = interaction.client as ClientWithCommands;

        tryExecuteChatInputCommand(client, interaction);
        tryExecuteAutocomplete(client, interaction);
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
                content: i18n("chat-input-command.generic-error"),
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: i18n("chat-input-command.generic-error"),
                ephemeral: true,
            });
        }
    }
}

async function tryExecuteAutocomplete(client: ClientWithCommands, interaction: BaseInteraction): Promise<void> {
    if (!interaction.isAutocomplete()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command || !command.autocompletions) return;
    
    const focusedOption = interaction.options.getFocused(true);

    // Filter the choices based on the focused option
    const filteredChoices = command.autocompletions.filter((choice) => {
        const value = typeof choice === "string" ? choice : choice.value;

        return (typeof choice === "string" || (choice.option && choice.option === focusedOption.name))
                && value.toLowerCase().includes(focusedOption.value.toLowerCase());
    });

    // Convert the choices to the format that Discord expects
    const results = filteredChoices.map((choice) => {
        return {
            name: typeof choice === "string" ? choice : choice.name,
            value: typeof choice === "string" ? choice : choice.value,
        };
    });

    // Respond to the interaction with the autocompletion results
    // Discord only allows up to 25 results to be sent
    // The catch is used to prevent the bot from crashing if the response fails
    await interaction.respond(results.slice(0, 25)).catch(() => {});
}

export default event;
