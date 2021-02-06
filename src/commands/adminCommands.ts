import { Command, CommandMessage, Description, Discord, Infos } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import config = require("../config.json");

@Discord(config.commandPrefix)
@Description("All Admin commands handler.")
@Infos({ forAdmins: true })
export abstract class AdminCommands {

    @Command("givedp")
    private handleGiveDP(message: CommandMessage) {
        let args = message.args["input"].split(" ")
        if(args.length < 3) {
            message.channel.send("Please provide all necessary arguments! !givedp <name> <amount>");
            return;
        }
        let playerName = args[1];
        let amount: number = +args[2];
    }

}