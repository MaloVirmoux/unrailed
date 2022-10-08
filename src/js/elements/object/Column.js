import Params from '../../Params.js'

import * as THREE from 'three'

import Utils from '../../Utils.js'
import Block from './Block.js'

export default class Column extends THREE.Group {
    constructor() {
        super()
        this.params = new Params()
        this.height = this.params.map.width
        this.createBlocks()

        this.utils = new Utils()
        this.utils.centerPosition(this)
    }
    
    createBlocks() {
        for (let i = 0; i < this.height; i++) {
            const b = new Block()
            b.position.y = i
            this.add(b)
        }
    }
}