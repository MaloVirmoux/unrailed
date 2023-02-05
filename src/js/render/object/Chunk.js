import * as THREE from 'three'

import * as params from '../../params'
import { getEmptyMap, mergeArrays } from '../../utils'

import Ground from './Ground'
import Block from './Block'

export default class Chunk extends THREE.Group {
    constructor(map, physChunk) {
        super()
        this.name = 'Chunk'

        this.map = map
        this.physChunk = physChunk

        this.ground = new Ground(this.map, this.depthMap)

        this.modelsMap = getEmptyMap()
        this.modelsGroup = new THREE.Group()
        this.modelsGroup.name = 'ModelsGroup'
        const blocks = this.createBlocks()
        this.modelsMap = mergeArrays(this.modelsMap, blocks.map)
        this.modelsGroup.add(blocks.group)

        this.add(this.ground, this.modelsGroup)

        this.outlined = []
    }

    createBlocks() {
        const blocksMap = getEmptyMap()
        const stones = new THREE.Group()
        stones.name = 'StonesGroup'
        const woods = new THREE.Group()
        woods.name = 'WoodsGroup'
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                if (this.map[x][y]['type'] == 'stone' || this.map[x][y]['type'] == 'wood') {
                    blocksMap[x][y] = new Block(this.map[x][y]['type']), this.map[x][y]['depth']
                    blocksMap[x][y].position.set(x, y, 0)
                    switch (this.map[x][y]['type']) {
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
        for (const id in this.physChunk.toUnOutline) {
            const coords = this.physChunk.toUnOutline[id]
            this.outlined.splice(this.outlined.indexOf(this.modelsMap[coords.x][coords.y]), 1)
            delete this.physChunk.toUnOutline[id]
        }

        for (const id in this.physChunk.toOutline) {
            const coords = this.physChunk.toOutline[id]
            this.outlined.push(this.modelsMap[coords.x][coords.y])
            delete this.physChunk.toOutline[id]
        }
        
        for (const id in this.physChunk.toRemove) {
            const coords = this.physChunk.toRemove[id]
            this.modelsMap[coords.x][coords.y].removeFromParent()
            delete this.physChunk.toRemove[id]
        }
    }
}