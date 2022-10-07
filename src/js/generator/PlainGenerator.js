import params from "../params.json" assert {type: 'json'}

import MountainGenerator from './MountainGenerator.js'
import RessourcesGenerator from './RessourcesGenerator.js'

export default class PlainGenerator {
    constructor() {
        this.mountainGenerator = new MountainGenerator(params.plains.moutainGenerator.frequency, params.plains.moutainGenerator.limit)
        this.ressourcesGenerator = new RessourcesGenerator(params.plains.ressourcesGenerator.frequency, params.plains.ressourcesGenerator.limit)
    }

    get(x, y) {
        if(this.mountainGenerator.get(x, y)) {
            return 'M'
        } else {
            return this.ressourcesGenerator.get(x, y)
        }
    }

    changeMountains() {
        this.mountainGenerator = new MountainGenerator(40, 0.7)
    }
}