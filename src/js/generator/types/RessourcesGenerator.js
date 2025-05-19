import { createNoise2D } from 'simplex-noise'

/** Class used to generate the ressources on a map */
export default class RessourcesGenerator {
    /**
     * Creates the ressources generator
     * @param {number} frequency Frequency of the ressources
     * @param {number} limit Size of the ressources
     */
    constructor(frequency, limit) {
        this.woodGenerator = createNoise2D()
        this.stoneGenerator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    /**
     * Tells if this block is a ressource, or not
     * @param {number} x X coordinate of the block
     * @param {number} Y X coordinate of the block
     * @returns {string} Ressource type, or default
     */
    get(x, y) {
        const wood = this.woodGenerator(x * this.frequency, y * this.frequency)
        const stone = this.stoneGenerator(x * this.frequency, y * this.frequency)
        if (wood >= stone & wood > this.limit) {
            return 'wood'
        } else if (stone > wood & stone > this.limit) {
            return 'stone'
        } else {
            return 'default'
        }
    }
}