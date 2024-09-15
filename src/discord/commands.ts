import {
    REST,
    Routes,
    CommandInteraction,
    SlashCommandBuilder,
    RESTPostAPIChatInputApplicationCommandsJSONBody,    
} from 'discord.js';
import { readDir } from '@utils/directory';
import { join } from 'path';

export type CommandChoice = {
    name: string;
    value: string;
    option?: string;
};

export type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
    autocompletions?: string[] | CommandChoice[];
};

export async function deployCommands() {
    const guildIds = process.env.DISCORD_GUILD_IDS?.split(", ") || [];

    const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

    const commandsPath = join(__dirname, "commands");

    const files = readDir(commandsPath);

    for (const file of files) {
        const command: Command = (await import(file)).default;

        if (!command || !command.data) {
            console.error(`Cannot deploy command, invalid command file: ${file}`);
            continue;
        }

        commands.push(command.data.toJSON());
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        guildIds.forEach(async (guildId) => {

            await rest.put(
                Routes.applicationGuildCommands(process.env.DISCORD_APP_ID, guildId),
                { body: commands },
            );

            console.log(`Successfully reloaded (/) commands in guild with ID: ${guildId}.`);
        });

    } catch (error) {
        console.error(error);
    }
}