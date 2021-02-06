import "reflect-metadata";
import { Client } from "@typeit/discord";
import config = require("./config.json");

async function start() {
    const client = new Client({
        classes: [
            `${__dirname}/commands/*.ts`
        ],
        silent: false,
        variablesChar: ":"
    });

    await client.login(config.botToken);
}

start();