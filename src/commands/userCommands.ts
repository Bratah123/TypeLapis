import { 
    Discord,
    Command,
    CommandMessage,
    Description
 } from "@typeit/discord";

 import { MessageEmbed } from "discord.js";
 import config = require("../config.json")

@Discord(config.commandPrefix)
@Description("All User commands handlers.")
abstract class UserCommands {

    @Command("info")
    private handleInfo(message: CommandMessage) {
        const serverInfo = {
            'Exp': '1x',
            'Item': '1x',
            'Meso': '1x',
            'Server State': 'N/A',
            'Server Location': 'N/A',
            'Release Date': 'N/A',
        }
        const messageEmbed = new MessageEmbed()
        .setColor(0x0000ff)
        .setTitle(config.serverName)
        .setDescription("KMS v316")
        .setThumbnail(config.serverImg);

        for (let key in serverInfo) {
            let value = serverInfo[key];
            messageEmbed.addField(key, value, true);
        }
        messageEmbed.setFooter(config.serverName)

        message.channel.send(messageEmbed);
    }
}