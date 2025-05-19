import { createNoise2D } from 'simplex-noise'

/** Class used to generate the rivers on a map */
export default class RiverGenerator {
    /**
     * Creates the rivers generator
     * @param {number} frequency Frequency of the rivers
     * @param {number} limit Size of the rivers
     */
    constructor(frequency, limit) {
        this.generator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    /**
     * Tells if this block is a river
     * @param {number} x X coordinate of the block
     * @param {number} y Y coordinate of the block
     * @returns {boolean} Is this block a river ?
     */
    get(x, y) {
        const value = this.generator(x * this.frequency, y * this.frequency)
        return (value > - this.limit) && (value < this.limit)
    }
}