import * as THREE from 'three'

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { colors } from '../../params'

export default class Ressources {
    constructor(e) {
        this.manager = new THREE.LoadingManager(
            () => {e.start()},
            () => {}
        )

        this.textureLoader = new THREE.TextureLoader(this.manager).setPath('./textures/')
        
        this.dracoLoader = new DRACOLoader().setDecoderPath('./draco/')
        this.gltfLoader = new GLTFLoader(this.manager).setPath('./models/').setDRACOLoader(this.dracoLoader)
        
        this.textures = {}
        this.loadTextures()
        this.models = {}
        this.loadModels()
    }

    loadTextures() {
        this.textureLoader.load(
            'matcaps/stone.png',
            (loaded) => {
                this.textures.stone = loaded
            }
        )
    }

    loadModels() {
        this.models.stone = {}
        // this.gltfLoader.load(
        //     'stone/default.glb',
        //     (loaded) => {
        //         this.models.stone.default = loaded
        //     }
        // )
        this.gltfLoader.load(
            'stone/0.glb',
            (loaded) => {
                console.log(loaded)
                this.models.stone.model0 = loaded.scene.children[0]
                this.models.stone.model0.children[0].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.top[0]}, ${colors.stone.top[1]}, ${colors.stone.top[2]})`})
                this.models.stone.model0.children[1].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.side[0]}, ${colors.stone.side[1]}, ${colors.stone.side[2]})`})
                this.models.stone.model0.children[2].material = new THREE.MeshBasicMaterial({color: `rgb(${colors.stone.front[0]}, ${colors.stone.front[1]}, ${colors.stone.front[2]})`})

            }
        )
        // this.gltfLoader.load(
        //     'stone/1.glb',
        //     (loaded) => {
        //         this.models.stone.model1 = loaded
        //     }
        // )
    }
}