const rpg = require('./rpg')
const commands = require('./commands')
const globals = require('./globals')

function handleMessage(message) {
    const content = message.content

    if(content.startsWith(globals.BOT_PREFIX)) {
        commands.handleCommand(message)
    }
}

function handleMessageUpdate(oldMessage, newMessage) {

}

function handleGuildMemberAdd(member) {
    rpg.registerPlayer(member)
}

module.exports = {
    handleMessage,
    handleMessageUpdate,
    handleGuildMemberAdd
}
