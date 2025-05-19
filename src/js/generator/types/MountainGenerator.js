import { createNoise2D } from 'simplex-noise'

/** Class used to generate the mountains on a map */
export default class MountainGenerator {
    /**
     * Creates the mountains generator
     * @param {number} frequency Frequency of the mountains
     * @param {number} limit Size of the mountains
     */
    constructor(frequency, limit) {
        this.generator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    /**
     * Tells if this block is a mountain
     * @param {number} x X coordinate of the block
     * @param {number} Y X coordinate of the block
     * @returns {boolean} Is this block a mountain ?
     */
    get(x, y) {
        return this.generator(x * this.frequency, y * this.frequency) > this.limit
    }
}