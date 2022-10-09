import * as THREE from 'three'

export default class Scene extends THREE.Scene {
    constructor() {
        super()
        this.background = new THREE.Color('#87CEEB')
        this.createHelpers()
    }

    createHelpers() {
        const helper = new THREE.AxesHelper(100)
        helper.position.z = 1
        this.add(helper)
    }
}