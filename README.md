<h1><img src="https://skillicons.dev/icons?i=discord">&nbsp; Discord Bot</h1>
A Discord bot built using TypeScript and <a href="https://discord.js.org/">discord.js</a>.

## ⬇️ Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/discord-bot.git
    cd discord-bot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Build the project:
    ```sh
    npm run build
    ```

## ⚙️ Configuration
1. Copy the example environment file and update it with your configuration:
    ```sh
    cp example.env .env
    ```

2. Edit the `.env` file to include your Discord bot token and other necessary configurations:
    ```env
    DISCORD_TOKEN=your-discord-token
    DISCORD_APP_ID=your-app-id
    DISCORD_GUILD_IDS=guild-id-1,guild-id-2
    SERVER_PORT=3000
    LANGUAGE=en
    BOT_STATUS=online
    ENVIRONMENT=development
    ```

## ▶️ Usage
1. Start the bot:
    ```sh
    npm run start
    ```

2. For development, you can use:
    ```sh
    npm run dev
    ```

## ✨ Features
### ⚡ Commands
Commands are located in the [`src/discord/commands`](src/discord/commands) directory. Each command is defined in its own file and follows the structure defined in the [`Command`](src/discord/commands.ts) type.

Example command: [`testuser`](src/discord/commands/debug/testuser.ts)

### 🔥 Events
Events are located in the [`src/discord/events`](src/discord/events) directory. Each event is defined in its own file and follows the structure defined in the [`Event`](src/discord/events.ts) type.

Example event: [`clientReady`](src/discord/events/clientReady.ts)

### 🌍 Interationalization
The bot supports multiple languages. Language files are located in the [`assets/i18n`](assets/i18n) directory. Each language is defined in its own JSON file.

To add a new language:
1. Create a new JSON file in the `assets/i18n` directory with the language code as the filename (e.g., `it.json` for Italian).
2. Add the necessary translations to the JSON file.
3. Imports the JSON and add the language to the translations map in [`interationalization`](src/18n/interationalization.ts).
4. Update the `LANGUAGE` variable in the `.env` file to the desired language code.

By default each JSON language file follows the structure of the `en.json` file, you can change this behaviour by updating the type `LanguageKey`:
```typescript
type LanguageKey = Paths<typeof en>;
```
Example JSON structure:
```json
{
    "commands" : {
        "utility" : {
            "testuser" : {
                "description" : "Shows information about a user",
                "response" : "Name: ${0} | Id: ${1}"
            }
        }  
    }
}
```
Usage:
```typescript
import { i18n } from "@i18n/internationalization";

i18n("commands.utility.testuser.description")

// With replacements:
i18n("commands.utility.testuser.response", "Xhst", "1");
```
