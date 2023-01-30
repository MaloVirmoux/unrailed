import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import * as params from './params'

export default class Assets {
    constructor(e) {
        this.manager = new THREE.LoadingManager(
            () => {
                e.start()
            },
            () => {}
        )

        this.textureLoader = new THREE.TextureLoader(this.manager).setPath('./textures/')
        this.gltfLoader = new GLTFLoader(this.manager).setPath('./models/')
        
        this.textures = {}
        this.loadTextures()
        this.models = {}
        this.loadBlocks(params.block.files)
    }

    loadTextures() {
        return null
    }

    loadBlocks(listFiles) {
        for(let type in listFiles) {
            this.models[type] = {}
            for(let size in listFiles[type]) {
                this.models[type][size] = {}
                listFiles[type][size].forEach((file) => {
                    this.models[type][size][file] = {}
                    // const steps = ['step_0', 'step_1', 'step_2']
                    const steps = ['step_0']
                    steps.forEach((step) => {
                        this.gltfLoader.load(
                            `${type}/${size}/${file}/${step}.glb`,
                            (loaded) => {
                                this.models[type][size][file][step] = loaded.scene.children[0]
                                this.models[type][size][file][step].traverse((meshPart) => {
                                    if (meshPart instanceof THREE.Mesh) {
                                        meshPart.material.color.convertLinearToSRGB()
                                    }
                                })
                            }
                        )
                    })
                })
            }
        }
    }
}