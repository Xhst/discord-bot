import { Client, Collection } from "discord.js";
import { Command } from "@discord/commands";

export interface ClientWithCommands extends Client {
    commands: Collection<string, Command>;
}