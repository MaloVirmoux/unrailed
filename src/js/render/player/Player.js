import * as THREE from 'three'

import PlayerRaycaster from './PlayerRaycaster'

export default class Player extends THREE.Mesh {
    constructor() {
        super(
            new THREE.BoxGeometry(0.5, 1, 2),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        )

        this.raycaster = new PlayerRaycaster(this)
    }

    update(coords) {
        this.position.set(coords.position.x, coords.position.y, 1)
        this.rotation.set(0, 0, coords.angle)
    }
}