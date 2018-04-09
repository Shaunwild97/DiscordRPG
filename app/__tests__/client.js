const client = require('../client')

test('user is assigned nickname when they join', () => {
    const mockMember = {
        user: {
            username: "test"
        },
        setNickname: jest.fn()
    }

    client.handleGuildMemberAdd(mockMember)

    const expectedNickname = '(Level 1) test'

    expect(mockMember.setNickname).toHaveBeenCalledWith(expectedNickname)
})
