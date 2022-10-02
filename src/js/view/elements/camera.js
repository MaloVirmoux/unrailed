import * as THREE from 'three'

export default class Camera {
    constructor(size) {
        if (!this.instance) {
            this.instance = this
            
            this.fov = 75
            this.o = new THREE.PerspectiveCamera(
                this.fov,
                size.width / size.height
            )
        } else {
            return this.instance
        }
    }

    update(size) {
        this.o.aspect = size.width / size.height
        this.o.updateProjectionMatrix()
    }
}