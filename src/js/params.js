const debug = true

const chunk = {
    "length": 64,
    "width": 24
}

const plains = {
    "moutainGenerator": {
        "frequency": 40,
        "limit": 0.7
    },
    "lakeGenerator": {
        "frequency": 50,
        "limit": 0.75
    },
    "riverGenerator": {
        "frequency": 100,
        "limit": 0.03
    },
    "ressourcesGenerator": {
        "frequency": 30,
        "limit": 0.3
    }
}

const colors = {
    'moutain': {
        'r': 27,
        'g': 29,
        'b': 34
    },
    'water': {
        'r': 30,
        'g': 63,
        'b': 102
    },
    'wood': {
        'r': 126,
        'g': 137,
        'b': 61
    },
    'stone': {
        'r': 183,
        'g': 176,
        'b': 156
    },
    'default': {
        'r': 86,
        'g': 125,
        'b': 70
    },
}
export {debug, chunk, plains, colors}