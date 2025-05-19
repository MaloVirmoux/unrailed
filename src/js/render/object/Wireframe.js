import * as THREE from 'three'

/** Class used to create a wireframe display */
export default class Wireframe extends THREE.LineSegments {
    /**
     * Creates the wireframe texture
     * @param {THREE.Mesh} obj Mesh of the body to create the wireframe of
     */
    constructor(obj) {
        super(
            new THREE.EdgesGeometry(obj.geometry),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.5
            })
        )
        this.position.copy(obj.parent.position)
        this.scale.copy(obj.parent.scale)
    }
}