const monster = require('./monsters')

const locations = {
    "nuahswood": {
        name: "Nuah's Wood",
        channelName: "nuahs-wood",
        location: [0, 0],
        monsters: [
            monster.chicken
        ]
    },
    "llianriver": {
        name: "Llian River",
        channelName: "llians-river",
        location: [1, 0],
        monsters: [
            monster.chicken,
            monster.goblin
        ]
    }
}

const locationsMap = 
[
    [locations.nuahswood, locations.llianriver]
]

module.exports = locations
