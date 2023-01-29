import * as THREE from 'three'

export default class Wireframe extends THREE.LineSegments {
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