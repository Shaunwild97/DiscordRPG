const playerConfig = require('../player_config')

test('player config doesnt error when no config', () => {
    jest.resetModules()

    const mockMember = {
        id: '1335'
    }

    expect(() => {
        playerConfig.getConfig(mockMember)
    }).not.toThrowError()
})
