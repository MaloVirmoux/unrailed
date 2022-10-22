const debug = {
    'render': {
        'console': false,
        'physics': false
    },
    'scene': {
        'axis': false,
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
        'waterDifference' : 0.2
    }
}

const colors = {
    'mountain': {
        'top': [27, 29, 34, '#1b1d22'],
        'side': [14, 15, 17, '#'],
        'front': [18, 19, 23, '#']
    },
    'water': {
        'top': [30, 63, 102, '#1e3f66'],
        'side': [15, 32, 51, '#'],
        'front': [20, 42, 68, '#']
    },
    'wood': {
        'top': [126, 137, 61, '#7e893d'],
        'side': [64, 69, 31, '#'],
        'front': [84, 91, 40, '#']
    },
    'stone': {
        'top': [183, 176, 156, '#b7b09c'],
        'side': [92, 88, 78, '#5c584e'],
        'front': [122, 117, 104, '#7a7568']
    },
    'default': {
        'top': [86, 125, 70, '#567d46'],
        'side': [43, 63, 35, '#'],
        'front': [57, 83, 47, '#']
    }
}

const physics = {
    'speed': 0.2
}

export {debug, chunk, plains, ground, colors, physics}