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
        user: {
            username: 'bob'
        },
        setNickname: jest.fn()
    }
   
    const mockMessage = {
        member: mockMember,
        content: '-nick test',
        reply: jest.fn()
    }
   
    playerConfig.registerPlayer(mockMember)

    client.handleMessage(mockMessage)

    const expectedName = 'test'
    const expectedMessage = 'name updated to test'
    const expectedNickname = '(Level 1) test'

    expect(playerConfig.getConfig(mockMember).name).toBe(expectedName)
    expect(mockMessage.reply).toHaveBeenCalledWith(expectedMessage)
    expect(mockMember.setNickname).toHaveBeenCalledWith(expectedNickname)
})
