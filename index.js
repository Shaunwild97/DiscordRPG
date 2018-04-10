'use_strict'

const {Client} = require('discord.js')
const os = require('os')
const clientHandler = require('./app/client')

const login_token = require(os.homedir() + '/.nodekeys/rpg-token.json')

const client = new Client()

client
    .on('message', clientHandler.handleMessage)
    .on('messageUpdate', clientHandler.handleMessageUpdate)
    .on('guildMemberAdd', clientHandler.handleGuildMemberAdd)

client.login(login_token.key)
    .then(() => console.log("Logged in to Discord"))
