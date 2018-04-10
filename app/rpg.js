const playerConfig = require('./player_config')
const instances = require('./instances')
const locations = require('./game/world')

function registerPlayer(member) {
    playerConfig.registerPlayer(member)
    updatePlayerNickname(member)
    updatePlayerLocation(member, locations.nuahswood)
}

function updatePlayerNickname(member) {
    const config = playerConfig.getConfig(member)
    member.setNickname(`(Level ${config.level}) ${config.name}`)
}

function updatePlayerLocation(member, location) {
    const config = playerConfig.getConfig(member)
    instances.movePlayerToInstance(member, location)
    config.location = location
}

module.exports = {
    registerPlayer,
    updatePlayerNickname,
    updatePlayerLocation
}
