import { createNoise2D } from 'simplex-noise'

/** Class used to generate the lakes on a map */
export default class LakeGenerator {
    /**
     * Creates the lakes generator
     * @param {number} frequency Frequency of the lakes
     * @param {number} limit Size of the lakes
     */
    constructor(frequency, limit) {
        this.generator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    /**
     * Tells if this block is a lake
     * @param {number} x X coordinate of the block
     * @param {number} Y X coordinate of the block
     * @returns {boolean} Is this block a lake ?
     */
    get(x, y) {
        return this.generator(x * this.frequency, y * this.frequency) > this.limit
    }
}