import * as THREE from 'three'

import * as params from '../../params'
import { getArray, mergeArrays } from '../../utils'

import Ground from './Ground'
import Block from './Block'

export default class Chunk extends THREE.Group {
    constructor(map, physChunk) {
        super()
        this.name = 'Chunk'
        this.length = params.chunk.length
        this.width = params.chunk.width

        this.map = map
        this.physChunk = physChunk
        this.depthMap = this.getDepthMap()

        this.ground = new Ground(this.map, this.depthMap)

        this.modelsMap = getArray()
        this.modelsGroup = new THREE.Group()
        this.modelsGroup.name = 'ModelsGroup'
        const blocks = this.createBlocks()
        this.modelsMap = mergeArrays(this.modelsMap, blocks.map)
        this.modelsGroup.add(blocks.group)

        this.add(this.ground, this.modelsGroup)
    }

    getDepthMap () {
        const depthMap = getArray()
        let toCompute = []
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                const blocktype = this.map[x][y]
                if (x == 0 || x == this.length - 1 || y == 0 || y == this.width - 1) {
                    depthMap[x][y] = 0
                } else if (this.map[x + 1][y] != blocktype || this.map[x - 1][y] != blocktype || this.map[x][y + 1] != blocktype || this.map[x][y - 1] != blocktype) {
                    depthMap[x][y] = 0
                } else {
                    toCompute.push({x: x, y: y})
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

    createBlocks() {
        const blocksMap = getArray()
        const stones = new THREE.Group()
        stones.name = 'StonesGroup'
        const woods = new THREE.Group()
        woods.name = 'WoodsGroup'
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                if (this.map[x][y] == 'stone' || this.map[x][y] == 'wood') {
                    blocksMap[x][y] = new Block(this.map[x][y], this.depthMap[x][y])
                    blocksMap[x][y].position.set(x, y, 0)
                    switch (this.map[x][y]) {
                        case 'stone':
                            stones.add(blocksMap[x][y]) 
                            break
                        case 'wood':
                            woods.add(blocksMap[x][y])
                        break
                    }
                }
            }
        }
        const blocksGroup = new THREE.Group()
        blocksGroup.name = 'BlocksGroup'
        blocksGroup.add(stones, woods)

        return {
            map: blocksMap,
            group: blocksGroup
        }
    }

    update() {
        this.physChunk.toRemove.forEach((toRemove) => {
            this.modelsMap[toRemove.x][toRemove.y].removeFromParent()
        })
    }
}