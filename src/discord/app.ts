import { Client, Collection, GatewayIntentBits } from "discord.js";
import { ClientWithCommands } from "./client";
import { Command, deployCommands } from "./commands";
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
        await deployCommands();

        await this.client.login(process.env.DISCORD_TOKEN);
    }
}