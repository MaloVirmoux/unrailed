import * as THREE from 'three'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { colors } from '../../params'

export default class Assets {
    constructor(e) {
        this.manager = new THREE.LoadingManager(
            () => {
                e.start()
            },
            () => {}
        )

        this.textureLoader = new THREE.TextureLoader(this.manager).setPath('./textures/')
        
        this.dracoLoader = new DRACOLoader().setDecoderPath('./draco/')
        this.gltfLoader = new GLTFLoader(this.manager).setPath('./models/').setDRACOLoader(this.dracoLoader)
        
        this.textures = {}
        this.loadTextures()
        this.models = {}
        this.loadModels({
            'stone': ['model0', 'model1', 'model2', 'model3', 'model4']
        })
    }

    loadTextures() {
        return null
    }

    loadModels(listModels) {
        this.models.stone = {}
        listModels.stone.forEach((file) => {
            this.gltfLoader.load(
                `stone/${file}.glb`,
                (loaded) => {

                    this.models.stone[file] = loaded.scene.children[0]
                    this.models.stone[file].children[0].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.top[0]}, ${colors.stone.top[1]}, ${colors.stone.top[2]})`})
                    this.models.stone[file].children[1].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.side[0]}, ${colors.stone.side[1]}, ${colors.stone.side[2]})`})
                    this.models.stone[file].children[2].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.front[0]}, ${colors.stone.front[1]}, ${colors.stone.front[2]})`})
                }
            )
        })
    }
}