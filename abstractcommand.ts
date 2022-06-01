import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandDataResolvable, CommandInteraction } from "discord.js"

export class Command {
    protected builder: SlashCommandBuilder
    private onExecute: (interaction: CommandInteraction) => void

    constructor(onExecute: (interaction: CommandInteraction) => void) {
        this.builder = new SlashCommandBuilder()
        this.onExecute = onExecute
    }

    execute(interaction: CommandInteraction): void {
        this.onExecute(interaction)
    }

    getJSON(): ApplicationCommandDataResolvable {
        return this.builder.toJSON() as ApplicationCommandDataResolvable
    }  

    getName(): string {
        return this.builder.name
    }
}