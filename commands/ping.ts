import { SlashCommandBuilder } from "@discordjs/builders"
import { Command } from "../abstractcommand"

module.exports = class Ping extends Command {

    constructor() {
        super(async interaction => {
            interaction.reply("pong")
        })
        super.builder = new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Pong")
    }
}