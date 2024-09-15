import { Client, Events } from "discord.js";
import { ClientWithCommands } from "../client";
import { Event } from "@discord/events";

const event: Event = {
    name: Events.ClientReady,
    once: true,
    async execute(baseClient: Client): Promise<void> {
        const client = baseClient as ClientWithCommands;

        if (client.user === null) return;

        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};

export default event;