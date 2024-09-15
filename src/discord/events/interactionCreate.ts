import { BaseInteraction, Events } from "discord.js";
import { ClientWithCommands } from "@discord/client";

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

async function tryExecuteAutocomplete(client: ClientWithCommands, interaction: BaseInteraction): Promise<void> {
    if (!interaction.isAutocomplete()) return;

    const command = client.commands.get(interaction.commandName);

    if (command === undefined) return;
    
    const focusedOption = interaction.options.getFocused(true);

    const choices = command.autocompletions ?? [];

    // Filter the choices based on the focused option
    const filteredChoices = choices.filter((choice) => {
        const value = typeof choice === "string" ? choice : choice.value;

        if (typeof choice === "string" || (choice.option && choice.option === focusedOption.name)) {
            return value.toLowerCase().includes(focusedOption.value.toLowerCase());
        }
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
