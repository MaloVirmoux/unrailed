import * as THREE from 'three'

import { chunk } from '../../params'
import { forEachTile } from '../../utils'

import Ground from './Ground'

export default class Chunk extends THREE.Group {
    constructor(map, assets) {
        super()
        this.length = chunk.length
        this.width = chunk.width

        this.map = map
        this.depthMap = this.getDepthMap()
        this.assets = assets

        this.ground = new Ground(this.map, this.depthMap)
        this.stones = this.createStones()
        this.add(this.ground, this.stones)

        this.position.set(- this.length / 2, - this.width / 2, 0)
    }

    createStones() {
        const group = new THREE.Group()
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                if (this.map[x][y] == 'stone') {
                    const mesh = (() => {
                        switch (this.depthMap[x][y]) {
                            case 0:
                                return this.assets.models.stone.model1.clone()
                            case 1:
                                return this.assets.models.stone.model2.clone()
                            default:
                                return this.assets.models.stone.model0.clone()
                        }
                    })()
                    mesh.position.set(x, y, 0)
                    group.add(mesh)         
                }
            }
        }
        return group
    }

    getDepthMap () {
        const depthMap = new Array(this.length).fill(null).map(()=>new Array(this.width).fill(null))
        let toCompute = []
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                const blocktype = this.map[x][y]
                if (x == 0 || x == this.length - 1 || y == 0 || y == this.width - 1) {
                    depthMap[x][y] = 0
                } else if (this.map[x + 1][y] != blocktype || this.map[x - 1][y] != blocktype || this.map[x][y + 1] != blocktype || this.map[x][y - 1] != blocktype) {
                    depthMap[x][y] = 0
                } else {
                    toCompute.push({'x': x, 'y': y})
                }
            }
        }
        let depth = 1
        while (toCompute.length != 0) {
            const failed = []
            toCompute.forEach(t => {
                if (depthMap[t.x + 1][t.y] == depth - 1 || depthMap[t.x - 1][t.y] == depth - 1 || depthMap[t.x][t.y + 1] == depth - 1 || depthMap[t.x][t.y - 1] == depth - 1) {
                    depthMap[t.x][t.y] = depth
                } else {
                    failed.push(t)
                }
            })
            depth++
            toCompute = failed
        }
        return depthMap
    }
}