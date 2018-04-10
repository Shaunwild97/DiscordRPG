const instances = require('../instances')
const locations = require('../game/world')

const { Collection } = require('discord.js')

test('player can be moved when no instance', async () => {
    const mockChannels = new Collection()

    const mockChannel = {
        overwritePermissions: jest.fn(),
        setParent: jest.fn()
    }

    const mockGuild = {
        channels: mockChannels,
        createChannel: jest.fn(() => new Promise(resolve => resolve(mockChannel)))
    }

    const mockMember = {
        id: '222',
        guild: mockGuild
    }

    const mockLocation = {
        channelName: 'test-place'
    }

    await instances.movePlayerToInstance(mockMember, mockLocation)

    const expectedOverwrites = {
        'VIEW_CHANNEL': true
    }

    expect(mockGuild.createChannel).toHaveBeenCalledWith('test-place')
    expect(mockChannel.overwritePermissions).toHaveBeenCalledWith('222', expectedOverwrites)
})

test('player can be moved when free channel', async () => {
    const mockChannels = new Collection()

    const mockChannel = {
        name: 'test-place',
        members: {
            size: 22
        },
        overwritePermissions: jest.fn()
    }

    mockChannels.set('221', mockChannel)

    const mockGuild = {
        channels: mockChannels,
    }

    const mockMember = {
        id: '222',
        guild: mockGuild
    }

    const mockLocation = {
        channelName: 'test-place'
    }

    await instances.movePlayerToInstance(mockMember, mockLocation)

    const expectedOverwrites = {
        'VIEW_CHANNEL': true
    }

    expect(mockChannel.overwritePermissions).toHaveBeenCalledWith('222', expectedOverwrites)
})

test('player can be moved when instance exceeds max players', async () => {
    const mockChannels = new Collection()

    const mockChannelFull = {
        name: 'test-place',
        members: {
            size: 150
        }
    }

    mockChannels.set('221', mockChannelFull)

    const mockChannel = {
        overwritePermissions: jest.fn(),
        setParent: jest.fn()
    }

    const mockGuild = {
        channels: mockChannels,
        createChannel: jest.fn(() => new Promise(resolve => resolve(mockChannel)))
    }

    const mockMember = {
        id: '222',
        guild: mockGuild
    }

    const mockLocation = {
        channelName: 'test-place'
    }

    await instances.movePlayerToInstance(mockMember, mockLocation)


    const expectedOverwrites = {
        'VIEW_CHANNEL': true
    }

    expect(mockGuild.createChannel).toHaveBeenCalledWith('test-place')
    expect(mockChannel.overwritePermissions).toHaveBeenCalledWith('222', expectedOverwrites)
})

test('channels are added to category channel', async () => {
    const mockChannels = new Collection()

    const mockCategory = {
        name: 'Gameplay'
    }

    const mockChannel = {
        overwritePermissions: jest.fn(),
        setParent: jest.fn()
    }

    mockChannels.set('111', mockCategory)

    const mockGuild = {
        channels: mockChannels,
        createChannel: jest.fn(() => new Promise(resolve => resolve(mockChannel)))
    }

    const mockMember = {
        id: '222',
        guild: mockGuild
    }

    const mockLocation = {
        channelName: 'test-place'
    }

    await instances.movePlayerToInstance(mockMember, mockLocation)

    expect(mockChannel.setParent).toHaveBeenCalledWith(mockCategory)
})


