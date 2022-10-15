import * as THREE from 'three'

import {chunk} from '../../params'
import {centerPosition} from '../../utils'

import Block from './Block'

export default class Column extends THREE.Group {
    constructor(mapColumn) {
        super()
        this.height = chunk.width
        this.mapColumn = mapColumn

        this.createBlocks()

        centerPosition(this)
    }
    
    createBlocks() {
        for (let y = 0; y < this.height; y++) {
            const b = new Block(this.mapColumn[y])
            b.position.y = y
            this.add(b)
        }
    }
}