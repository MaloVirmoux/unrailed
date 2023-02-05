const debug = {
    render: {
        console: false,
        physics: false
    },
    scene: {
        axis: false,
        wireframe: false
    },
    player: {
        raycaster: true
    }
}

const camera = {
    height: 3,
    zoom: 0.1
}

const chunk = {
    length: 32,
    width: 16
}

const environment = {
    skyColor: '#87ceeb'
}

const plains = {
    mountainGenerator: {
        frequency: 40,
        limit: 0.7
    },
    lakeGenerator: {
        frequency: 50,
        limit: 0.75
    },
    riverGenerator: {
        frequency: 100,
        limit: 0.03
    },
    ressourcesGenerator: {
        frequency: 30,
        limit: 0.3
    }
}

const ground = {
    height: {
        standard : 1,
        waterDifference : 0.2
    }
}

const block = {
    files: {
        stone: {
            small: ['small_0', 'small_1', 'small_2'],
            medium: ['medium_0'],
            big: ['big_0']
        },
        wood: {
            small: ['small_0'],
            medium: ['medium_0', 'medium_1'],
            big: ['big_0']
        }
    },
    probability: {
        '0': {
            small: 1,
            medium: 0,
            big: 0
        },
        '1': {
            small: 0.5,
            medium: 1,
            big: 0
        },
        '2': {
            small: 0.1,
            medium: 0.8,
            big: 1
        },
        '3': {
            small: 0,
            medium: 0.75,
            big: 1
        }
    }
}

const groundColors = {
    mountain: {
        top: [27, 29, 34],      // #1b1d22
        front: [18, 19, 23],    // #121317
        side: [14, 15, 17]      // #0e0f11
    },
    water: {
        top: [30, 63, 102],     // #1e3f66
        front: [20, 42, 68],    // #142a44
        side: [15, 32, 51]      // #0f2033
    },
    wood: {
        top: [126, 137, 61],    // #7e893d
        front: [84, 91, 40],    // #545b28
        side: [64, 69, 31]      // #40451f
    },
    stone: {
        top: [183, 176, 156],   // #b7b09c
        front: [122, 117, 104], // #7a7568
        side: [92, 88, 78]      // #5c584e
    },
    default: {
        top: [86, 125, 70],     // #567d46
        front: [57, 83, 47],    // #39532f
        side: [43, 63, 35]      // #2b3f23
    }
}

const outline = {
    edgeStrength: 2,
    edgeGlow: 0,
    edgeThickness: 0.1,
    visibleEdgeColor: '#ffffff',
    hiddenEdgeColor: '#ffffff'
}

const physics = {
    speed: 0.2,
    range: 3,
    hitbox: {
        length: 1,
        width: 0.5
    },
    efficiency: 500
}

export {
    debug,
    camera,
    chunk,
    environment,
    plains,
    ground,
    block,
    groundColors,
    outline,
    physics
}