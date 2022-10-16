import { createNoise2D } from 'simplex-noise';

export default class LakeGenerator {
    constructor(frequency, limit) {
        this.generator = createNoise2D()
        this.frequency = frequency
        this.limit = limit
    }

    get(x, y) {
        return this.generator((x + 1) / this.frequency, (y + 1) / this.frequency) > this.limit
    }
}