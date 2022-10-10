import * as THREE from 'three'

import Params from '../../Params'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color('#87CEEB')

        if(Params.debug) {
            this.createHelpers()
        }
    }

    createHelpers() {
        const helper = new THREE.AxesHelper(100)
        helper.position.z = 1
        this.add(helper)
    }
}