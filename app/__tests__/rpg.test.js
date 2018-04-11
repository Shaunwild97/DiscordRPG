const rpg = require('../rpg')
const playerConfig = require('../player_config')
const {Collection} = require('discord.js')

test('players initial location is nuahswood', () => {
    jest.resetModules()

    const mockChannels = new Collection()

    mockChannels.set('252', {
        id: '252',
        name: 'nuahs-wood',
        members: {
            size: 22
        },
        overwritePermissions: jest.fn()
    })

    const mockMember = {
        id: '2222',
        setNickname: jest.fn(),
        user: {
            username: 'foo'
        },
        guild: {
            channels: mockChannels
        }
    }

    rpg.registerPlayer(mockMember)

    const expectedLocation = 'Nuah\'s Wood'

    console.log(playerConfig.getConfig(mockMember))

    expect(playerConfig.getConfig(mockMember).location.name).toBe(expectedLocation)
    expect(playerConfig.getConfig(mockMember).locationChannel).toBe('252')
})
