import Params from '../../Params.js'

import * as THREE from 'three'

import Utils from '../../Utils.js'
import Column from './Column.js'

export default class Chunk extends THREE.Group {
    constructor() {
        super()
        this.params = new Params()
        this.length = this.params.map.length
        this.createColumns()

        this.utils = new Utils()
        this.utils.centerPosition(this)
    }
    
    createColumns() {
        for (let i = 0; i < this.length; i++) {
            const c = new Column()
            c.position.x = i
            this.add(c)
        }
    }
}