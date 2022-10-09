import * as THREE from 'three'

export default class Camera extends THREE.OrthographicCamera {
    constructor(size) {
        super(- size.ratio, size.ratio, 1, -1)
        this.position.set(0, 0, 10)
        this.zoom = 0.025
        this.updateProjectionMatrix()
    }

    update(size) {
        this.left = - size.ratio
        this.right = size.ratio
        this.updateProjectionMatrix()
    }
}