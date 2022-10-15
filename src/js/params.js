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
    'moutain': [27, 29, 34, '1B1D22'],
    'water': [30, 63, 102, '1E3F66'],
    'wood': [126, 137, 61, '7E893D'],
    'stone': [183, 176, 156, 'B7B09C'],
    'default': [86, 125, 70, '567D46']
}

export {debug, chunk, plains, colors}