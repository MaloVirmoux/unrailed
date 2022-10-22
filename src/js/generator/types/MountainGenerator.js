import { createNoise2D } from 'simplex-noise'

export default class MountainGenerator {
    constructor(frequency, limit) {
        this.generator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    get(x, y) {
        return this.generator(x / this.frequency, y / this.frequency) > this.limit
    }
}