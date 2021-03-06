const world = require('./game/world')

const players = {
}

function registerPlayer(member) {
    players[member.id] = createInitialConfig(member)
}

function getConfig(member) {
    const result = players[member.id]

    if (result) {
        return result
    }

    return players[member.id] = createInitialConfig(member)
}

function createInitialConfig(member) {
    return {
        name: member.user.username,
        location: world.locations.nuahswood,
        level: 1
    }
}

module.exports = {
    registerPlayer,
    getConfig
}

