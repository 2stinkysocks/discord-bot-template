import { Client, Intents, User, Guild } from 'discord.js'
import fs from 'fs'
import dotenv from 'dotenv'
import { Command } from './abstractcommand'

dotenv.config()

const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS]})

let commands: Array<Command> = new Array<Command>();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const c = require(`./commands/${file.replace('.ts', '')}`);
	commands.push(new c())
}

client.once('ready', () => {
    console.log("Bot has started in " + client.guilds.cache.size + " guilds.")
    try {
        if(process.env.ENV === "production") {
            for(const command of commands) {
                client.application?.commands.create(command.getJSON())
                console.log("Registered global command: " + command.getName())
            }
        } else {
            const guild = client.guilds.cache.get(process.env.TEST_GUILD_ID as string)
            for(const command of commands) {
                guild?.commands.create(command.getJSON())
                console.log("Registered local command: " + command.getName())
            }
        }
    } catch(e) {
        console.error(e)
    }
})

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return
    for(const command of commands) {
        if(command.getName() === interaction.commandName) {
            command.execute(interaction)
        }
    }
})

client.login(process.env.BOT_TOKEN)