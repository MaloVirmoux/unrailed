import * as THREE from 'three'

import Params from '../../Params.js'
import Utils from '../../Utils.js'

import Block from './Block.js'

export default class Column extends THREE.Group {
    constructor(map) {
        super()
        this.height = Params.chunk.width
        this.map = map

        this.createBlocks()

        this.utils = new Utils()
        this.utils.centerPosition(this)
    }
    
    createBlocks() {
        for (let y = 0; y < this.height; y++) {
            const b = new Block(this.map[y])
            b.position.y = y
            this.add(b)
        }
    }
}