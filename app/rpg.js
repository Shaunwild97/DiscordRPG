const playerConfig = require('./player_config')

function registerPlayer(member) {
    playerConfig.registerPlayer(member)
    updatePlayerNickname(member)
}

function updatePlayerNickname(member) {
    const config = playerConfig.getConfig(member)
    member.setNickname(`(Level ${config.level}) ${config.name}`)
}

module.exports = {
    registerPlayer,
    updatePlayerNickname
}
