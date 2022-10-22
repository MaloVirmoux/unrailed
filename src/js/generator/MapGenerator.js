import PlainGenerator from './biomes/PlainGenerator'
import PathVerifier from './PathVerifier'

import { chunk } from '../params'

export default class MapGenerator {
    constructor() {
        this.length = chunk.length
        this.width = chunk.width
        this.plainGenerator = new PlainGenerator()
        this.pathVerifier = new PathVerifier()
        this.mapsList = []
    }

    getNewMap() {
        const map = new Array(this.length).fill(null).map(()=>new Array(this.width).fill(null))
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                map[x][y] = this.plainGenerator.get(x, y)
            }
        }
        if(this.pathVerifier.verify(map, 15)) {
            this.mapsList.push(map)
        } else {
            this.plainGenerator.changeMountains()
            this.getNewMap()
        }

        return map
    }
}