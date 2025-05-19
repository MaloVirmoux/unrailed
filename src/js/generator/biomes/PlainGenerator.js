import * as params from '../../params'

import MountainGenerator from '../types/MountainGenerator'
import LakeGenerator from '../types/LakeGenerator'
import RiverGenerator from '../types/RiverGenerator'
import RessourcesGenerator from '../types/RessourcesGenerator'

/** Class used to generate the plains maps */
export default class PlainGenerator {
    /** Creates a plain generator */
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

    /**
     * Gets the type of the block at the given coords
     * @param {number} x X coordinate of the block
     * @param {number} Y X coordinate of the block
     * @returns {string} Type of the block
     */
    get(x, y) {
        if(this.riverGenerator.get(x, y)) {
            return 'water'
        } else if(this.mountainGenerator.get(x, y)) {
            return 'mountain'
        } else if (this.lakeGenerator.get(x, y)) {
            return 'water'
        } else {
            return this.ressourcesGenerator.get(x, y)
        }
    }

    /** Changes the mountains generator in case of impossible path */
    changeMountains() {
        this.mountainGenerator = new MountainGenerator(
            params.plains.mountainGenerator.frequency,
            params.plains.mountainGenerator.limit
        )
    }
}