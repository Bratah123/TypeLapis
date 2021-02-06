// This Account Entity represents an Azure Account in Database
import { Column, Entity, PrimaryGeneratedColumn, TableColumn, createConnection } from "typeorm";
import ormconfig = require("../../ormconfig.json")

@Entity({name: "accounts"})
export class Account {

    @PrimaryGeneratedColumn({name: "id"})
    id: number

    @Column({name: "name"})
    name: string;

    @Column()
    password: string;

    @Column({name: "2ndpassword"})
    secondPassword: string;

    @Column({name: "using2ndpassword"})
    usingPic: number;

    @Column({name: "loggedin"})
    loggedIn: number;

    @Column({name: "createdat"})
    createDat: string

    @Column({name: "lastlogin"})
    lastLogin: string;

    @Column({name: "banned"})
    banned: number;

    @Column({name: "banreason"})
    banReason: string;

    @Column({name: "gm"})
    gm: number;

    @Column({name: "email"})
    email: string;

    @Column({name: "macs"})
    macs: string;

    @Column({name: "tempban"})
    tempBan: string;

    @Column({name: "greason"})
    gReason: string;

    @Column({name: "mPoints"})
    maplePoints: number;

    @Column({name: "gender"})
    gender: number;

    @Column({name: "nxCash"})
    nxCash: number;

    @Column({name: "SessionIP"})
    sessionIP: string;

    @Column({name: "ip"})
    ip: string;

    @Column({name: "pin"})
    pin: string;

    @Column({name: "vpoints"})
    votePoints: number;

    @Column({name: "idcode1"})
    idCode1: number;

    @Column({name: "idcode2"})
    idCode2: number;

    @Column({name: "lastconnect"})
    lastConnect: number;

    @Column({name: "aimkind"})
    aimKind: number;

    @Column({name: "promote"})
    promote: number;

    @Column({name: "chrslot"})
    characterSlot: number;

    @Column({name: "realcash"})
    donationPoints: number;

    @Column({name: "connecterKey"})
    connectorKey: number;

    @Column({name: "maincharacter"})
    mainCharacter: number;

    @Column({name: "connecterIP"})
    connecterIP: string;

    @Column({name: "banby"})
    banBy: string;

    @Column({name: "blockgamelimit"})
    blockGameLimit: number;

    @Column({name: "blockgamedays"})
    blockGameDays: number;

    public addDp(amount: number) {
        this.donationPoints += amount;
    }

    public save() {
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
            let accountRepo = connection.getRepository(Account);
            await accountRepo.save(this);
            await connection.close();
        })
        .catch(error => {
            console.log(error);
        });
    }

}