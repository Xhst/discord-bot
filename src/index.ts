import { Server } from "./server";
import { DiscordApp } from "./discord/app";
import { config } from 'dotenv';

config();

const server = new Server();
server.start();

const discordApp = new DiscordApp();
discordApp.start();