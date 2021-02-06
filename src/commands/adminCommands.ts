import { Command, CommandMessage, Description, Discord, Infos } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import config = require("../config.json");
import { getAccountByCharName, getCharacterByName } from "../database";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@Discord(config.commandPrefix)
@Description("All Admin commands handler.")
@Infos({ forAdmins: true })
export abstract class AdminCommands {

    @Command("givedp")
    private handleGiveDP(message: CommandMessage) {
        let args = message.content.split(" ");
        if(args.length < 3) {
            message.channel.send("Please provide all necessary arguments! !givedp <name> <amount>");
            return;
        }
        let playerName = args[1];
        let amount: number = +args[2];


        const messageEmbed = new MessageEmbed()
        .setTitle("Donation Points")
        .setColor(0x00FF00)
        .setDescription(`Successfully gave ${playerName} ${numberWithCommas(amount)} donation points.`)
        .setFooter(config.serverName)
        .setThumbnail(config.serverImg);

        let accountPromise = getAccountByCharName(playerName).then((account) => {
            if(account == null) {
                message.channel.send("That character does not exist.");
                return;
            }
            account.addDp(amount);
            account.save();
            message.channel.send(messageEmbed);
        });
        
    }

    @Command("givemeso")
    private handleGiveMeso(message: CommandMessage) {
        let args = message.content.split(" ");
        if(args.length < 3) {
            message.channel.send("Please provide all necessary arguments! !givemeso <name> <amount>");
            return;
        }
        let playerName = args[1];
        let amount: number = +args[2];


        const messageEmbed = new MessageEmbed()
        .setTitle("Mesos")
        .setColor(0x00FF00)
        .setDescription(`Successfully gave ${playerName} ${numberWithCommas(amount)} mesos.`)
        .setFooter(config.serverName)
        .setThumbnail(config.serverImg);

        let characterPromise = getCharacterByName(playerName).then((character) => {
            if(character == null) {
                message.channel.send("That character does not exist.");
                return;
            }
            character.addMesos(amount);
            character.save();
            message.channel.send(messageEmbed);
        });
        
    }

}