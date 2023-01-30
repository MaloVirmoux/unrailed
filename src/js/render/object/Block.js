import * as THREE from 'three'

import * as params from '../../params'

import Wireframe from './Wireframe'

export default class Block extends THREE.Group {
    constructor(assets, type, depth) {
        super()
        this.name = 'Block'
        this.assets = assets
        this.type = type
        this.size = (() => {
            const probability = params.block.probability[(() => {
                switch (depth) {
                    case 0:
                        return '0'
                    case 1:
                        return '1'
                    case 2:
                        return '2'            
                    default:
                        return '3'
                }
            })()]
            const random = Math.random()
            if (random < probability.small) {
                return 'small'
            } else if (random < probability.medium) {
                return 'medium'
            } else if (random < probability.big) {
                return 'big'
            }
        })()
        const modelName = params.block.files[this.type][this.size][Math.floor(Math.random() * params.block.files[this.type][this.size].length)]
        const mesh = this.assets.models[this.type][this.size][modelName]['step_0'].clone()
        this.add(mesh)

        if (params.debug.scene.wireframe) {
            mesh.traverse((meshPart) => {
                if (meshPart instanceof THREE.Mesh) {
                    meshPart.material.polygonOffset = true
                    meshPart.material.polygonOffsetFactor = 1
                    meshPart.material.polygonOffsetUnits = 1
                    this.add(new Wireframe(meshPart))
                }
            })
        }
    }
}