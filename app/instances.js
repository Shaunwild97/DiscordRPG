const globals = require('./globals')

async function movePlayerToInstance(member, location) {
    const channel = await findOrCreateInstance(member, location)

    channel.overwritePermissions(member.id, {
        'VIEW_CHANNEL': true
    })
}

async function findOrCreateInstance(member, location) {
    const guild = member.guild
    const channel = guild.channels.find(c => c.name === location.channelName && c.members.size < globals.MAX_INSTANCE_SIZE)

    if (channel) {
        return channel
    }

    return createInstanceFor(member, location)
}

async function createInstanceFor(member, location) {
    const guild = member.guild
    const channel = await guild.createChannel(location.channelName)

    const gameplay = guild.channels.find('name', 'Gameplay')
    channel.setParent(gameplay)

    return channel
}


module.exports = {
    movePlayerToInstance
}
