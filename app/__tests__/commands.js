const client = require('../client')
const playerConfig = require('../player_config')

test('Bad command pings user', () => {
    const mockMessage = {
        content: '-badcommand hello',
        reply: jest.fn()
    }

    client.handleMessage(mockMessage)

    const expectedReply = 'Command not found'

    expect(mockMessage.reply).toHaveBeenCalledWith(expectedReply)
})

test('nick command updates config', () => {
    const mockMember = {
        id: '222',
        nickname: 'bob'
    }
   
    const mockMessage = {
        author: mockMember,
        content: '-nick test',
        reply: jest.fn()
    }
   
    playerConfig.registerPlayer(mockMember)

    client.handleMessage(mockMessage)

    const expectedName = 'test'
    const expectedMessage = 'name updated to test'

    expect(playerConfig.getConfig(mockMember).name).toBe(expectedName)
    expect(mockMessage.reply).toHaveBeenCalledWith(expectedMessage)
})
