import * as THREE from 'three'

export default class Camera extends THREE.OrthographicCamera {
    constructor(size) {
        super(- size.ratio, size.ratio, 1, -1)
        this.position.z = 1
        this.zoom = 0.05
        this.updateProjectionMatrix()
    }

    update(size) {
        this.left = - size.ratio
        this.right = size.ratio
        this.updateProjectionMatrix()
    }
}