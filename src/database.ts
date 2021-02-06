import { createConnection, getConnection } from "typeorm";
import ormconfig = require("../ormconfig.json");
import { Account } from "./entity/account";
import { Character } from "./entity/character";
export { getOnlinePlayersAmount, getAccountByName, getCharacterByName }


// All these functions return promises

function getAccountByName(username: string) {

    return createConnection({
        type: "mysql",
        host: ormconfig.host,
        port: 3306,
        username: ormconfig.username,
        password: ormconfig.password,
        database: ormconfig.database,
        entities: [
            Account
        ],
        synchronize: ormconfig.synchronize,
        logging: false
    })
    .then(async connection => {
        const account = await connection.getRepository(Account)
        .createQueryBuilder("accounts")
        .where("name = :name", {name: username})
        .getOne();
        await connection.close()
        return account;

    })
    .catch(error => {
        console.log(error);
        return null;
    });
}

function getOnlinePlayersAmount() {

    return createConnection({
        type: "mysql",
        host: ormconfig.host,
        port: 3306,
        username: ormconfig.username,
        password: ormconfig.password,
        database: ormconfig.database,
        entities: [
            Account
        ],
        synchronize: ormconfig.synchronize,
        logging: false
    })
    .then(async connection => {
        const amount = await connection.getRepository(Account)
        .createQueryBuilder("accounts")
        .where("loggedin > 0")
        .getCount();
        await connection.close();
        return amount;
    })
    .catch(error => {
        console.log(error);
        return 0;
    });

}

function getCharacterByName(name: string) {

    return createConnection({
        type: "mysql",
        host: ormconfig.host,
        port: 3306,
        username: ormconfig.username,
        password: ormconfig.password,
        database: ormconfig.database,
        entities: [
            Character
        ],
        synchronize: ormconfig.synchronize,
        logging: false
    })
    .then(async connection => {
        const character = await connection.getRepository(Character)
        .createQueryBuilder("characters")
        .where("name = :ign", {ign: name})
        .getOne();
        await connection.close();
        return character;
    })
    .catch(error => {
        console.log(error);
        return null;
    });

}