import * as THREE from 'three'
import Utils from '../utils'

import Block from './block'

export default class Column extends THREE.Group {
    constructor() {
        super()
        this.height = 16
        this.createBlocks()
        Utils.centerPosition(this)
    }
    
    createBlocks() {
        for (let i = 0; i < this.height; i++) {
            const b = new Block()
            b.position.y = i
            this.add(b)
        }
    }
}