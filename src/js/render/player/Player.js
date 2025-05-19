import * as THREE from 'three'

import PlayerRaycaster from './PlayerRaycaster'

/** Class representing the player model */
export default class Player extends THREE.Mesh {
    /** Creates the player model */
    constructor() {
        super(
            new THREE.BoxGeometry(0.5, 1, 2),
            new THREE.MeshBasicMaterial({
                color: 0xffffff
            })
        )

        this.raycaster = new PlayerRaycaster(this)
    }

    /**
     * Updates the player coordinates
     * @param {{position: MATTER.Vector, angle: number}} coords Coordinates of the player
     */
    update(coords) {
        this.position.set(coords.position.x, coords.position.y, 1)
        this.rotation.set(0, 0, coords.angle)
    }
}