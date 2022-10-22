import { plains } from '../../params'

import MountainGenerator from '../types/MountainGenerator'
import LakeGenerator from '../types/LakeGenerator'
import RiverGenerator from '../types/RiverGenerator'
import RessourcesGenerator from '../types/RessourcesGenerator'

export default class PlainGenerator {
    constructor() {
        this.mountainGenerator = new MountainGenerator(
            plains.mountainGenerator.frequency,
            plains.mountainGenerator.limit
        )
        this.lakeGenerator = new LakeGenerator(
            plains.lakeGenerator.frequency,
            plains.lakeGenerator.limit
        )
        this.riverGenerator = new RiverGenerator(
            plains.riverGenerator.frequency,
            plains.riverGenerator.limit
        )
        this.ressourcesGenerator = new RessourcesGenerator(
            plains.ressourcesGenerator.frequency,
            plains.ressourcesGenerator.limit
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