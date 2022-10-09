import Params from '../Params.js'

import MountainGenerator from './MountainGenerator.js'
import LakeGenerator from './LakeGenerator.js'
import RiverGenerator from './RiverGenerator.js'
import RessourcesGenerator from './RessourcesGenerator.js'

export default class PlainGenerator {
    constructor() {
        this.params = new Params()
        this.mountainGenerator = new MountainGenerator(
            this.params.plains.moutainGenerator.frequency,
            this.params.plains.moutainGenerator.limit
        )
        this.lakeGenerator = new LakeGenerator(
            this.params.plains.lakeGenerator.frequency,
            this.params.plains.lakeGenerator.limit
        )
        this.riverGenerator = new RiverGenerator(
            this.params.plains.riverGenerator.frequency,
            this.params.plains.riverGenerator.limit
        )
        this.ressourcesGenerator = new RessourcesGenerator(
            this.params.plains.ressourcesGenerator.frequency,
            this.params.plains.ressourcesGenerator.limit
        )
    }

    get(x, y) {
        if(this.riverGenerator.get(x,y)) {
            return 'water'
        } else if(this.mountainGenerator.get(x, y)) {
            return 'moutain'
        } else if (this.lakeGenerator.get(x, y)) {
            return 'water'
        } else {
            return this.ressourcesGenerator.get(x, y)
        }
    }

    changeMountains() {
        this.mountainGenerator = new MountainGenerator(40, 0.7)
    }
}