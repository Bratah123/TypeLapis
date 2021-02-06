// This class represents an Azure Character in Database

import { Column, Entity, PrimaryGeneratedColumn, createConnection } from "typeorm";
import ormconfig = require("../../ormconfig.json");

@Entity({name: "characters"})
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "accountid"})
    accountId: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @Column()
    meso: number;

    @Column()
    job: number;

    @Column()
    fame: number;

    public addMesos(amount: number) {
        this.meso += amount;
    }

    public save() {
        createConnection({
            type: "mysql",
            host: ormconfig.host,
            port: ormconfig.port,
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
            let accountRepo = connection.getRepository(Character);
            await accountRepo.save(this);
            await connection.close();
        })
        .catch(error => {
            console.log(error);
        });
    }

}