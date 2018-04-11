const playerConfig = require('./player_config')
const instances = require('./instances')
const world = require('./game/world')

function registerPlayer(member) {
    playerConfig.registerPlayer(member)
    updatePlayerNickname(member)
    updatePlayerLocation(member, world.locations.nuahswood)
}

function updatePlayerNickname(member) {
    const config = playerConfig.getConfig(member)
    member.setNickname(`(Level ${config.level}) ${config.name}`)
}

async function updatePlayerLocation(member, location) {
    const config = playerConfig.getConfig(member)
    const channel = await instances.movePlayerToInstance(member, location)

    console.log('location channel: ' + config.locationChannel)

    if(config.locationChannel) {
        const oldChannel = member.guild.channels.get(config.locationChannel)
        const permissions = oldChannel.permissionOverwrites.get(member.id)

        if(permissions) {
            permissions.delete()
        }
    }

    console.log(channel)

    config.locationChannel = channel.id
    config.location = location
}

module.exports = {
    registerPlayer,
    updatePlayerNickname,
    updatePlayerLocation
}
