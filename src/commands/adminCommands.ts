import { Command, CommandMessage, Description, Discord, Infos } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import config = require("../config.json");
import { getAccountByCharName } from "../database";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

@Discord(config.commandPrefix)
@Description("All Admin commands handler.")
@Infos({ forAdmins: true })
export abstract class AdminCommands {

    @Command("givedp")
    private handleGiveDP(message: CommandMessage) {
        let args = message.content.split(" ")
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
        .setFooter(config.serverName);

        let accountPromise = getAccountByCharName(playerName).then((account) => {
            if(account == null) {
                message.channel.send("That character does not exist.");
            }
            account.addDp(amount);
            account.save();
            message.channel.send(messageEmbed);
        });
        
    }

}