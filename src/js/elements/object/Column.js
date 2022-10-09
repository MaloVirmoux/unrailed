import Params from '../../Params.js'

import * as THREE from 'three'

import Utils from '../../Utils.js'
import Block from './Block.js'

export default class Column extends THREE.Group {
    constructor(map) {
        super()
        this.params = new Params()
        this.height = this.params.chunk.width
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