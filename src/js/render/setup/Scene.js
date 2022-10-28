import * as THREE from 'three'

import * as params from '../../params'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color('#87CEEB')

        if (params.debug.scene.axis) {
            this.createHelpers()
        }
    }

    createHelpers() {
        const helper = new THREE.AxesHelper(100)
        helper.position.setZ(0.001)
        this.add(helper)
    }
}