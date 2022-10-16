import * as THREE from 'three'

export default class Player extends THREE.Mesh {
    constructor() {
        super(
            new THREE.SphereGeometry(0.5),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        )
    }
}