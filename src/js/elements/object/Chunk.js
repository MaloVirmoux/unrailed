import * as THREE from 'three'

import Utils from '../../Utils.js'
import Params from '../../Params.js'

import Column from './Column.js'

export default class Chunk extends THREE.Group {
    constructor(chunk) {
        super()
        this.length = Params.chunk.length
        this.chunk = chunk

        this.createColumns()

        this.utils = new Utils()
        this.utils.centerPosition(this)
    }
    
    createColumns() {
        for (let x = 0; x < this.length; x++) {
            const c = new Column(this.chunk[x])
            c.position.x = x
            this.add(c)
        }
    }
}