import { Client, Collection } from "discord.js";
import { Command } from "./commands";

export interface ClientWithCommands extends Client {
    commands: Collection<string, Command>;
}