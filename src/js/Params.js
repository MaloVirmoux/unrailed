export default class Params {
    constructor() { return null }

    static debug = true

    static chunk = {
        "length": 64,
        "width": 24
    }
    
    static plains = {
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
}