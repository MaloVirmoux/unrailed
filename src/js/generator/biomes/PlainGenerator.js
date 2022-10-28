import * as params from '../../params'

import MountainGenerator from '../types/MountainGenerator'
import LakeGenerator from '../types/LakeGenerator'
import RiverGenerator from '../types/RiverGenerator'
import RessourcesGenerator from '../types/RessourcesGenerator'

export default class PlainGenerator {
    constructor() {
        this.mountainGenerator = new MountainGenerator(
            params.plains.mountainGenerator.frequency,
            params.plains.mountainGenerator.limit
        )
        this.lakeGenerator = new LakeGenerator(
            params.plains.lakeGenerator.frequency,
            params.plains.lakeGenerator.limit
        )
        this.riverGenerator = new RiverGenerator(
            params.plains.riverGenerator.frequency,
            params.plains.riverGenerator.limit
        )
        this.ressourcesGenerator = new RessourcesGenerator(
            params.plains.ressourcesGenerator.frequency,
            params.plains.ressourcesGenerator.limit
        )
    }

    get(x, y) {
        if(this.riverGenerator.get(x,y)) {
            return 'water'
        } else if(this.mountainGenerator.get(x, y)) {
            return 'mountain'
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