import * as THREE from 'three'

import { chunk } from '../../params'

import Ground from './Ground'

export default class Chunk extends THREE.Group {
    constructor(map, ressources) {
        super()
        this.length = chunk.length
        this.width = chunk.width

        this.map = map
        this.ressources = ressources

        this.ground = new Ground(map)
        this.stones = this.createStones()
        this.add(this.ground, this.stones)

        this.position.set(- this.length / 2, - this.width / 2, 0)
    }

    createStones() {
        const group = new THREE.Group()
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                if (this.map[x][y] == 'stone') {
                    const mesh = this.ressources.models.stone.model0.clone()
                    mesh.position.set(x, y, 0)
                    group.add(mesh)         
                }
            }
        }
        return group
    }
}