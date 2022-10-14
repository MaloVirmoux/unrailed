import * as THREE from 'three'

import {map} from '../../params'
import {centerPosition} from '../../utils'

import Block from './Block'

export default class Column extends THREE.Group {
    constructor(column) {
        super()
        this.height = map.width
        this.column = column

        this.createBlocks()

        centerPosition(this)
    }
    
    createBlocks() {
        for (let y = 0; y < this.height; y++) {
            const b = new Block(this.column[y])
            b.position.y = y
            this.add(b)
        }
    }
}