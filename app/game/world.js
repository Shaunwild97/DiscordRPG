const monster = require('./monsters')

const WORLD_SIZE = {
    width: 100,
    height: 100
}

const direction_map = {
    "n": [0, 1],
    "e": [1, 0],
    "s": [0, -1],
    "w": [-1, 0]
}

const locations = {
    "nuahswood": {
        name: "Nuah's Wood",
        channelName: "nuahs-wood",
        location: [50, 50],
        monsters: [
            monster.chicken
        ]
    },
    "llianriver": {
        name: "Llian River",
        channelName: "llians-river",
        location: [51, 50],
        monsters: [
            monster.chicken,
            monster.goblin
        ]
    },
    "thonkvalley": {
        name: "Thonk Valley",
        channelName: "thonk-valley",
        location: [49, 50],
        monsters: [
            monster.chicken,
            monster.goblin
        ]
    },
    "soujvillage": {
        name: "Souj Village",
        channelName: "souj-village",
        location: [50, 51],
        monsters: []
    },
    "potana": {
        name: "Pontana",
        channelName: "pontana",
        location: [50, 49],
        monsters: []
    }
}

const locationsMap = setupLocationsMap()

function setupLocationsMap() {
    const result = []

    for (let [key, value] of Object.entries(locations)) {
        const coords = value.location
        const x = coords[0]
        const y = coords[1]

        result[y * WORLD_SIZE.width + x] = value
    }

    return result
}

function getLocationFacing(from, direction) {
    const dir = direction.charAt(0).toLowerCase()
    const offset = direction_map[dir]

    const location = from.location
    const x = location[0] + offset[0]
    const y = location[1] + offset[1]

    return locationsMap[y * WORLD_SIZE.width + x]
}

function getLookTextForLocation(location) {
    const north = getLocationFacing(location, 'n')
    const east = getLocationFacing(location, 'e')
    const south = getLocationFacing(location, 's')
    const west = getLocationFacing(location, 'w')

    let monsters = ''

    location.monsters.forEach(m => monsters += `${m.name} `)

    return `You look around, and see: ${monsters}
    Off in the distance you can see:
    North: ${north ? north.name : 'Nothing'}
    East: ${east ? east.name : 'Nothing'}
    South: ${south ? south.name : 'Nothing'}
    West: ${west ? west.name : 'Nothing'}`
}

module.exports = {
    locations,
    getLocationFacing,
    getLookTextForLocation
}
