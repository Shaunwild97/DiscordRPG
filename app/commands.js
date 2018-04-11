const globals = require('./globals')
const playerConfig = require('./player_config')
const rpg = require('./rpg')
const instances = require('./instances')
const world = require('./game/world')

const commandHandler = {
    nick(message, name) {
        playerConfig.getConfig(message.member).name = name
        rpg.updatePlayerNickname(message.member)
        sendAutodeletingReply(message, `name updated to ${name}`)
    },

    look(message) {
        sendAutodeletingReply(message, world.getLookTextForLocation(playerConfig.getConfig(message.member).location))
    },

    travel(message, direction) {
        const currentLocation = playerConfig.getConfig(message.member).location
        console.log('current location: ' + currentLocation)
        const newLocation = world.getLocationFacing(currentLocation , direction)
        console.log('new Location: ' + newLocation)
        rpg.updatePlayerLocation(message.member, newLocation)
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
        sendAutodeletingReply(message, 'Command not found')
    }
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
