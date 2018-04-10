const globals = require('./globals')
const playerConfig = require('./player_config')
const rpg = require('./rpg')

const commandHandler = {
    nick(message, name) {
        playerConfig.getConfig(message.member).name = name
        rpg.updatePlayerNickname(message.member)
        sendAutodeletingReply(message, `name updated to ${name}`)
    }
}

function handleCommand(message) {
    const content = message.content
    const splicedCommand = content.slice(globals.BOT_PREFIX.length, content.length)

    const args = splicedCommand.split(' ')
    const command = args.shift()

    args.unshift(message) //This is so hacky I love it

    const commandExec = commandHandler[command]

    if (commandExec) {
        commandExec(...args)
    } else {
        message.reply('Command not found')
    }

    message.delete()
}

function sendAutodeletingReply(message, content) {
    message.reply(content)
        .then(m => m.delete(10000))
        .catch(console.error)
    message.delete()
}

module.exports = {
    handleCommand
}
