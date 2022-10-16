import * as THREE from 'three'

export default class Wireframe extends THREE.LineSegments {
    constructor(obj) {
        super(
            new THREE.EdgesGeometry(obj.geometry),
            new THREE.LineBasicMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.1
            })
        )
    }
}