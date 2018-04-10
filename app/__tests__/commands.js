const client = require('../client')
const playerConfig = require('../player_config')

function generateMockMessage(content) {
    const mockMember = {
        id: '222',
        user: {
            username: 'bob'
        },
        setNickname: jest.fn()
    }

    const mockReplyMessage = {
        delete: jest.fn()
    }

    const mockReply = jest.fn(() =>
        new Promise(resolve =>
            resolve(mockReplyMessage)
        )
    );

    const mockMessage = {
        member: mockMember,
        channel: {
            send: jest.fn(),
        },
        content,
        reply: mockReply,
        delete: jest.fn()
    }

    return { mockMessage, mockReplyMessage, mockMember}
}

test('Bad command pings user', () => {
    const mockMessage = {
        content: '-badcommand hello',
        reply: jest.fn(),
        delete: jest.fn()
    }

    client.handleMessage(mockMessage)

    const expectedReply = 'Command not found'

    expect(mockMessage.reply).toHaveBeenCalledWith(expectedReply)
})

test('nick command updates config', async () => {
    const { mockMessage, mockReplyMessage, mockMember } = generateMockMessage('-nick test')

    await playerConfig.registerPlayer(mockMember)

    await client.handleMessage(mockMessage)

    const expectedName = 'test'
    const expectedMessage = 'name updated to test'
    const expectedNickname = '(Level 1) test'

    expect(playerConfig.getConfig(mockMember).name).toBe(expectedName)
    expect(mockMessage.reply).toHaveBeenCalledWith(expectedMessage)
    expect(mockMember.setNickname).toHaveBeenCalledWith(expectedNickname)
})

test('command is deleted after processed for valid command', () => {
    const { mockMessage, mockReplyMessage } = generateMockMessage('-nick test')

    client.handleMessage(mockMessage)

    expect(mockMessage.delete).toHaveBeenCalled()
})

test('command is deleted after processed for invalid command', () => {
    const mockMember = {
        id: '222',
        user: {
            username: 'bob'
        },
        setNickname: jest.fn()
    }

    const mockMessage = {
        member: mockMember,
        content: '-badcommand',
        reply: jest.fn(),
        delete: jest.fn()
    }

    client.handleMessage(mockMessage)

    expect(mockMessage.delete).toHaveBeenCalled()
})

test('normal message doesnt trigger command', async () => {
    const { mockMessage, mockReplyMessage } = generateMockMessage('Hello world')

    await client.handleMessage(mockMessage)

    expect(mockMessage.channel.send).not.toBeCalled()
    expect(mockMessage.reply).not.toBeCalled()
    expect(mockMessage.delete).not.toBeCalled()
})

test('command result message is deleted after 10 seconds', async () => {
    const { mockMessage, mockReplyMessage } = generateMockMessage('-nick test')

    await client.handleMessage(mockMessage)

    expect(mockReplyMessage.delete).toHaveBeenCalledWith(10000)
})
