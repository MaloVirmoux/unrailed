const debug = {
    'render': {
        'console': false,
        'physics': false
    },
    'scene': {
        'axis': true,
        'wireframe': false
    },
    'player': {
        'raycaster': true
    }
}

const chunk = {
    'length': 64,
    'width': 24
}

const plains = {
    'mountainGenerator': {
        'frequency': 40,
        'limit': 0.7
    },
    'lakeGenerator': {
        'frequency': 50,
        'limit': 0.75
    },
    'riverGenerator': {
        'frequency': 100,
        'limit': 0.03
    },
    'ressourcesGenerator': {
        'frequency': 30,
        'limit': 0.3
    }
}

const ground = {
    'height': {
        'standard' : 1,
        'waterDifference' : 0.2,
        'baseBorderMountain': 1,
        'variationBorderMountain' : 1,
        'baseCenterMountain': 2,
        'variationCenterMountain' : 2
    },
    'shadow': {
        'top': 1,
        'side': 2,
        'front': 1.5
    }
}

const colors = {
    'mountain': [27, 29, 34, '1B1D22'],
    'water': [30, 63, 102, '1E3F66'],
    'wood': [126, 137, 61, '7E893D'],
    'stone': [183, 176, 156, 'B7B09C'],
    'default': [86, 125, 70, '567D46']
}

const physics = {
    'speed': 0.2
}

export {debug, chunk, plains, ground, colors, physics}