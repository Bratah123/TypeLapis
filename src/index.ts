import "reflect-metadata";
import { Client } from "@typeit/discord";

async function start() {
    const client = new Client({
        classes: [
            `${__dirname}/commands/*.ts`
        ],
        silent: false,
        variablesChar: ":"
    });


    await client.login("NzQ2NDk2Nzg1MjExNDU3NjE5.X0BLTg.I9pySGRWDAO8gB4n2oL5OhGM2Pw")
}

start()