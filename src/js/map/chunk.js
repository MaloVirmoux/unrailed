import * as THREE from 'three'
import Utils from '../utils'

import Column from './column'

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