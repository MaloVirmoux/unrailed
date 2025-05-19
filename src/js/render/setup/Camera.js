import * as THREE from 'three'

import * as params from '../../params'

/** Class used to create the scene camera */
export default class Camera extends THREE.OrthographicCamera {
    /**
     * Creates the camera
     * @param {render.setup.CanvaSize} size Size of the canva
     */
    constructor(size) {
        super(- size.ratio, size.ratio, 1, -1)
        this.position.set(params.chunk.length / 2, params.chunk.width / 2, params.camera.height)
        this.zoom = params.camera.zoom
        
        this.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(60))
        this.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), THREE.MathUtils.degToRad(-10))
        this.translateZ(100)

        this.updateProjectionMatrix()
    }

    /**
     * Updates the camera
     * @param {render.setup.CanvaSize} size Size of the canva
     */
    update(size) {
        this.left = - size.ratio
        this.right = size.ratio
        this.updateProjectionMatrix()
    }
}