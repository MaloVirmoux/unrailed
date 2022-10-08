export default class Params {
    constructor() {
        if (!this.instance) {
            this.instance = this
            
            this.map = {
                "length": 128,
                "width": 32
            }
            this.plains = {
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
        } else {
            return this.instance
        }
    }
}