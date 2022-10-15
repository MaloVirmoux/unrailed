import { createNoise2D } from 'simplex-noise';

export default class RessourcesGenerator {
    constructor(frequency, limit) {
        this.woodGenerator = createNoise2D()
        this.stoneGenerator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    get(x, y) {
        const wood = this.woodGenerator(x / this.frequency, y / this.frequency)
        const stone = this.stoneGenerator(x / this.frequency, y / this.frequency)
        if (wood >= stone & wood > this.limit) {
            return 'wood'
        } else if (stone > wood & stone > this.limit) {
            return 'stone'
        } else {
            return 'default'
        }
    }
}