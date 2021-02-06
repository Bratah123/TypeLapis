import { createConnection } from "typeorm";
import ormconfig = require("../ormconfig.json");
import { Account } from "./entity/account";

function getAccountByName(username: string) {
    createConnection({
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
        connection.close()

        return account;

    })
    .catch(error => {
        console.log(error);
        return null;
    });

    return null;
}