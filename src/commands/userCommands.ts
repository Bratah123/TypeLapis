import { 
    Discord,
    Command,
    CommandMessage
 } from "@typeit/discord";


@Discord("!")
abstract class UserCommands {

    @Command("hello")
    private hello(message: CommandMessage) {
        message.channel.send("Hello from TypeScript!");
    }
}