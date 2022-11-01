import PlainGenerator from './biomes/PlainGenerator'
import PathVerifier from './PathVerifier'

import * as params from '../params'
import { getArray } from '../utils'


export default class MapGenerator {
    constructor() {
        this.length = params.chunk.length
        this.width = params.chunk.width
        this.plainGenerator = new PlainGenerator()
        this.pathVerifier = new PathVerifier()
        this.mapsList = []
    }

    getNewMap() {
        const map = getArray()
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