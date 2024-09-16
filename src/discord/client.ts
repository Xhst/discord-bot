import { Client, Collection } from "discord.js";
import { Command } from "@discord/commands";

/**
 * A Discord client with a collection of commands.
 * 
 * This interface extends the Discord.js Client class by adding a collection of commands.
 * It's used to access the commands when handling interactions.
 */
export interface ClientWithCommands extends Client {
    commands: Collection<string, Command>;
}