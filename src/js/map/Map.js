import Params from '../Params.js'

import PlainGenerator from '../generator/PlainGenerator.js'
import PathVerifier from './PathVerifier.js'

export default class Map {
    constructor() {
        this.length = Params.chunk.length
        this.width = Params.chunk.width
        this.plainGenerator = new PlainGenerator()
        this.pathVerifier = new PathVerifier()
        this.map = []
    }

    generateNewChunk() {
        const chunk = new Array(this.length).fill(null).map(()=>new Array(this.width).fill(null))
        chunk.forEach((column, x) => {
            column.forEach((block, y) => {
                chunk[x][y] = this.plainGenerator.get(x, y)
            })
        })
        if(this.pathVerifier.verify(chunk, 15)) {
            this.map.push(chunk)
        } else {
            this.plainGenerator.changeMountains()
            this.generateNewChunk()
        }
        return chunk
    }

    printMap() {
        const chunk = this.map[0]
        for (let x = 0; x < chunk.length; x++) {
            for (let y = 0; y < chunk[x].length; y++) {
                process.stdout.write(chunk[x][y])
            }
            console.log('')
        }
    }
}