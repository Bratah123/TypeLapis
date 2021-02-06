import { createConnection, getConnection } from "typeorm";
import ormconfig = require("../ormconfig.json");
import { Account } from "./entity/account";
export { getOnlinePlayersAmount, getAccountByName }


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
        const account = connection.getRepository(Account)
        .createQueryBuilder("accounts")
        .where("name = :name", {name: username})
        .getOne();
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
        return amount;
    })
    .catch(error => {
        console.log(error);
        return 0;
    });

}