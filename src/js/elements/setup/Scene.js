import * as THREE from 'three'

import {debug} from '../../params'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color('#87CEEB')

        debug ? this.createHelpers() : null
    }

    createHelpers() {
        const helper = new THREE.AxesHelper(100)
        helper.position.z = 1
        this.add(helper)
    }
}