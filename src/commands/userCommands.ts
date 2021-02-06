import { 
    Discord,
    Command,
    CommandMessage,
    Description
 } from "@typeit/discord";
import { Client } from "@typeit/discord";
import { MessageEmbed } from "discord.js";
import config = require("../config.json");

@Discord(config.commandPrefix)
@Description("All User commands handlers.")
abstract class UserCommands {

    @Command("help")
    private handleHelp(message: CommandMessage) {
        let commands = Client.getCommands();
        let commandString = "";
        const messageEmbed = new MessageEmbed()
        .setTitle("Commands")
        .setColor(0x0000ff)
        .setDescription(`All bot commands for ${config.serverName}`);

        for(let index in commands) {
            let commandInfo = commands[index];
            let description = commandInfo["commandName"];

            commandString += description + "\n";
        }

        messageEmbed.addField("Player Commands", commandString, false);

        message.channel.send(messageEmbed);
    }

    @Command("info")
    private handleInfo(message: CommandMessage) {
        const serverInfo = {
            'Exp': '1x',
            'Item': '1x',
            'Meso': '1x',
            'Server State': 'N/A',
            'Server Location': 'N/A',
            'Release Date': 'N/A',
        };

        const messageEmbed = new MessageEmbed()
        .setColor(0x0000ff)
        .setTitle(config.serverName)
        .setDescription("KMS v316")
        .setThumbnail(config.serverImg);

        for (let key in serverInfo) {
            let value = serverInfo[key];
            messageEmbed.addField(key, value, true);
        }

        messageEmbed.setFooter(config.serverName);

        message.channel.send(messageEmbed);
    }
}