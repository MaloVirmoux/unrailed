import PlainGenerator from './biomes/PlainGenerator'
import PathVerifier from './PathVerifier'

import { getArray } from '../utils'

export default class MapGenerator {
    constructor() {
        this.plainGenerator = new PlainGenerator()
        this.pathVerifier = new PathVerifier()
        this.mapsList = []
    }

    getNewMap() {
        const map = getArray()
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
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