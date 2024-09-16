import { Client, Events, ActivityType } from "discord.js";
import { ClientWithCommands } from "../client";
import { Event } from "@discord/events";
import { arraySeparator, i18n } from "@src/i18n/internationalization";

const event: Event = {
    name: Events.ClientReady,
    once: true,
    async execute(baseClient: Client): Promise<void> {
        const client = baseClient as ClientWithCommands;

        if (client.user === null) return;

        console.log(`Ready! Logged in as ${client.user.tag}`);

        setActivity(client);
        setStatus(client);
    }
};

function setActivity(client: ClientWithCommands): void {
    const randomActivityInterval = 30000;
    const activities = i18n("activity").split(arraySeparator);

    function randomActivity() {
        const randomIndex = Math.floor(Math.random() * activities.length);

        const newActivity = activities[randomIndex];

        client.user!.setActivity(newActivity, { type: ActivityType.Custom });
    }

    randomActivity();
    setInterval(() => randomActivity(), randomActivityInterval);
}

function setStatus(client: ClientWithCommands): void {
    // Possible statuses: online, idle, dnd, invisible
    client.user!.setStatus(process.env.BOT_STATUS || "online");
}

export default event;