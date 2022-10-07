import * as THREE from 'three'

import utils from '../../utils.js'
import Column from './Column.js'

export default class Chunk extends THREE.Group {
    constructor() {
        super()
        this.length = 64
        this.createColumns()
        Utils.centerPosition(this)
    }
    
    createColumns() {
        for (let i = 0; i < this.length; i++) {
            const c = new Column()
            c.position.x = i
            this.add(c)
        }
    }
}