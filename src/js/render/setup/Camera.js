import * as THREE from 'three'

import * as params from '../../params'

export default class Camera extends THREE.OrthographicCamera {
    constructor(size) {
        super(- size.ratio, size.ratio, 1, -1)
        this.position.set(params.chunk.length / 2, params.chunk.width / 2, 5)
        this.zoom = 0.05
        
        this.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(60))
        this.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(-10))
        this.translateZ(100)

        this.updateProjectionMatrix()
    }

    update(size) {
        this.left = - size.ratio
        this.right = size.ratio
        this.updateProjectionMatrix()
    }
}