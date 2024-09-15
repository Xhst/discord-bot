declare namespace NodeJS {
    export interface ProcessEnv {

        DISCORD_TOKEN: string;
        DISCORD_APP_ID: string;
        DISCORD_GUILD_IDS: string;
        SERVER_PORT: string;
        LANGUAGE: string;

        ENVRIONMENT: "development" | "production";
    }
}