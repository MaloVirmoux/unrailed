import * as THREE from 'three'

import { chunk, colors } from '../../params'
import { centerPosition } from '../../utils'

import Ground from './Ground'

export default class Chunk extends THREE.Group {
    constructor(map) {
        super()
        this.length = chunk.length
        this.width = chunk.width
        this.map = map

        this.add(new Ground(map))

        centerPosition(this)
    }
}