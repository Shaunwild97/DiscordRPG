const playerConfig = require('../player_config')

test('player config doesnt error when no config', () => {
    jest.resetModules()

    const mockMember = {
        id: '1335',
        user: {
            username: 'bar'
        }
    }

    expect(() => {
        playerConfig.getConfig(mockMember)
    }).not.toThrowError()
})

test('players initial name is correct', () => {
    jest.resetModules()

    const mockMember = {
        id: '2222',
        user: {
            username: 'foo'
        }
    }

    playerConfig.registerPlayer(mockMember)

    const expectedName = 'foo'

    expect(playerConfig.getConfig(mockMember).name).toBe(expectedName)
})
