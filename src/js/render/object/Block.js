import * as THREE from 'three'

import Assets from '../../Assets'

import * as params from '../../params'
import Debug from '../../Debug'

/** Class used to create a displayed block */
export default class Block extends THREE.Group {
    /**
     * Creates a block
     * @param {string} type Type of the block
     * @param {number} depth Depth of the block
     */
    constructor(type, depth) {
        super()
        this.name = 'Block'
        this.assets = new Assets()
        this.type = type
        this.size = (() => {
            const sizeSteps = params.block.sizeSteps[(() => {
                switch (depth) {
                    case 0:
                        return 'border'
                    case 1:
                        return 'close'
                    case 2:
                        return 'medium'
                    default:
                        return 'deep'
                }
            })()]
            const random = Math.random()
            if (random < sizeSteps.small) {
                return 'small'
            } else if (random < sizeSteps.medium) {
                return 'medium'
            } else if (random < sizeSteps.big) {
                return 'big'
            }
        })()
        const modelName = params.block.files[this.type][this.size][Math.floor(Math.random() * params.block.files[this.type][this.size].length)]
        const mesh = this.assets.models[this.type][this.size][modelName]['step_0'].clone()
        this.add(mesh)


        if (params.debug.scene.wireframe) Debug.addWireframe(this, mesh)
    }
}