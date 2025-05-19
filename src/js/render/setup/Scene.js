import * as THREE from 'three'

import Debug from '../../Debug'

import * as params from '../../params'

/** Class used to create the scene */
export default class Scene extends THREE.Scene {
    /** Creates the scene */
    constructor() {
        super()
        this.background = new THREE.Color(params.environment.skyColor)

        if (params.debug.scene.axis) Debug.addAxisHelpers(this)
    }
}