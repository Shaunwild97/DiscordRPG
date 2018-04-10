const rpg = require('../rpg')
const playerConfig = require('../player_config')

test('players initial location is nuahswood', () => {
    jest.resetModules()

    const mockMember = {
        id: '2222',
        setNickname: jest.fn(),
        user: {
            username: 'foo'
        }
    }

    rpg.registerPlayer(mockMember)

    const expectedLocation = 'Nuah\'s Wood'

    expect(playerConfig.getConfig(mockMember).location.name).toBe(expectedLocation)
})
