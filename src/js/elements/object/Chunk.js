import * as THREE from 'three'

import { chunk } from '../../params'

import Ground from './Ground'

export default class Chunk extends THREE.Group {
    constructor(map) {
        super()
        this.length = chunk.length
        this.width = chunk.width
        this.map = map

        this.add(new Ground(map))
    }
}