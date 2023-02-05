import * as THREE from 'three'

import Debug from '../../Debug'

import * as params from '../../params'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color(params.environment.skyColor)

        if (params.debug.scene.axis) Debug.addAxisHelpers(this)
    }
}