import { DiscordApp } from "@discord/app";
import { Server } from "./server";
import { config } from 'dotenv';
import 'tsconfig-paths/register';

config();

const server = new Server();
server.start();

const discordApp = new DiscordApp();
discordApp.start();