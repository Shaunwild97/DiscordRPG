const world = require('../world')

test('can get location facing east', () => {
    const startingLocation = world.locations.nuahswood

    const expectedLocation = world.locations.llianriver

    expect(world.getLocationFacing(startingLocation, 'e')).toBe(expectedLocation)
})


test('can get location facing west', () => {
    const startingLocation = world.locations.nuahswood

    const expectedLocation = world.locations.thonkvalley

    expect(world.getLocationFacing(startingLocation, 'w')).toBe(expectedLocation)
})

test('can get location facing north', () => {
    const startingLocation = world.locations.nuahswood

    const expectedLocation = world.locations.soujvillage

    expect(world.getLocationFacing(startingLocation, 'n')).toBe(expectedLocation)
})

test('can get location facing south', () => {
    const startingLocation = world.locations.nuahswood

    const expectedLocation = world.locations.potana

    expect(world.getLocationFacing(startingLocation, 's')).toBe(expectedLocation)
})
