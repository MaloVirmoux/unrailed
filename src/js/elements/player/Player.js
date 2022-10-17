import * as THREE from 'three'

export default class Player extends THREE.Mesh {
    constructor() {
        super(
            new THREE.BoxGeometry(0.5, 1, 2),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        )
    }

    update(position, rotation) {
        this.position.set(position.x, position.y, 1)
        this.rotation.set(0, 0, rotation)
    }
}