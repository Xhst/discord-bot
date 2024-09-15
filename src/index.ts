import { DiscordApp } from "@discord/app";
import { Server } from "./server";
import { config } from 'dotenv';

config();

const server = new Server();
server.start();

const discordApp = new DiscordApp();
discordApp.start();