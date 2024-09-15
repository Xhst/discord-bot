import { Client, Collection, GatewayIntentBits } from "discord.js";
import { Command, deployCommands } from "@discord/commands";
import { ClientWithCommands } from "@discord/client";
import { Event } from "@discord/events";
import { readDir } from "@utils/directory";
import { join } from "path";


export class DiscordApp {

    private client: ClientWithCommands;

    private readonly commandsPath: string;
    private readonly eventsPath: string;

    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        }) as ClientWithCommands;

        this.commandsPath = join(__dirname, "commands");
        this.eventsPath = join(__dirname, "events");

        this.client.commands = new Collection<string, Command>();
    }

    public async start(): Promise<void> {
        await this.registerCommands();
        await deployCommands();

        await this.registerEvents();

        await this.client.login(process.env.DISCORD_TOKEN);
    }

    private async registerCommands(): Promise<void> {
        const commandFiles = readDir(this.commandsPath);

        for (const file of commandFiles) {

            // Dynamically import the command module
            const command: Command = (await import(file)).default;

            if (!command || !command.data || !command.execute) {
                console.error(`Cannot register command, invalid command file: ${file}`);
                continue;
            }

            this.client.commands.set(command.data.name, command);
        }
    }

    private async registerEvents(): Promise<void> {
        const eventFiles = readDir(this.eventsPath);

        let eventCount = 0;

        for (const file of eventFiles) {

            // Dynamically import the event module
            const event: Event = (await import(file)).default;

            // Register the event with the client
            if (event.once) {
                this.client.once(event.name, (...args) => event.execute(...args));
            } else {
                this.client.on(event.name, (...args) => event.execute(...args));
            }

            eventCount++;
        }

        console.log(`Registerd ${eventCount} events.`);
    }

}