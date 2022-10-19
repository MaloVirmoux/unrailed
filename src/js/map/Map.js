import PlainGenerator from '../generator/PlainGenerator'
import PathVerifier from './PathVerifier'

import { chunk } from '../params'

export default class Map {
    constructor() {
        this.length = chunk.length
        this.width = chunk.width
        this.plainGenerator = new PlainGenerator()
        this.pathVerifier = new PathVerifier()
        this.mapsList = []
    }

    generateNewMap() {
        const map = new Array(this.length).fill(null).map(()=>new Array(this.width).fill(null))
        map.forEach((column, x) => {
            column.forEach((block, y) => {
                map[x][y] = this.plainGenerator.get(x, y)
            })
        })
        if(this.pathVerifier.verify(map, 15)) {
            this.mapsList.push(map)
        } else {
            this.plainGenerator.changeMountains()
            this.generateNewMap()
        }

        return map
    }
}