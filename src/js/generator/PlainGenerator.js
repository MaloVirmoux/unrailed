import Params from '../Params.js'

import MountainGenerator from './MountainGenerator.js'
import LakeGenerator from './LakeGenerator.js'
import RiverGenerator from './RiverGenerator.js'
import RessourcesGenerator from './RessourcesGenerator.js'

export default class PlainGenerator {
    constructor() {
        this.mountainGenerator = new MountainGenerator(
            Params.plains.moutainGenerator.frequency,
            Params.plains.moutainGenerator.limit
        )
        this.lakeGenerator = new LakeGenerator(
            Params.plains.lakeGenerator.frequency,
            Params.plains.lakeGenerator.limit
        )
        this.riverGenerator = new RiverGenerator(
            Params.plains.riverGenerator.frequency,
            Params.plains.riverGenerator.limit
        )
        this.ressourcesGenerator = new RessourcesGenerator(
            Params.plains.ressourcesGenerator.frequency,
            Params.plains.ressourcesGenerator.limit
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