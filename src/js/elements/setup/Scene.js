import * as THREE from 'three'

import { debug } from '../../params'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color('#87CEEB')

        if (debug.axis) {
            this.createHelpers()
        }
    }

    createHelpers() {
        const helper = new THREE.AxesHelper(100)
        this.add(helper)
    }
}