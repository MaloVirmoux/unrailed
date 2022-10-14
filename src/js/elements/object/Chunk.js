import * as THREE from 'three'

import {map} from '../../params'
import {centerPosition} from '../../utils'

import Column from './Column'

export default class Chunk extends THREE.Group {
    constructor(chunk) {
        super()
        this.length = map.length
        this.chunk = chunk

        this.createColumns()

        centerPosition(this)
    }
    
    createColumns() {
        for (let x = 0; x < this.length; x++) {
            const c = new Column(this.chunk[x])
            c.position.x = x
            this.add(c)
        }
    }
}