const debug = true

const map = {
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

export {debug, map, plains}