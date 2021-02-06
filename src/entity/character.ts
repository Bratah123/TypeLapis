// This class represents an Azure Character in Database

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}