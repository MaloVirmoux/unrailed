import * as THREE from 'three'

import { debug } from '../../params'

export default class PlayerRaycaster extends THREE.Raycaster {
    constructor(player) {
        super(new THREE.Vector3(0, 0, 0.5), new THREE.Vector3(1, 0, 0))
        this.player = player

        if (debug.player.raycaster) {
            this.helper = new THREE.ArrowHelper(this.ray.direction, this.ray.origin, 5, 0xffffff)
            this.player.add(this.helper)
        }
    }

    update() {
        this.set(this.player.position, this.player.up)
    }
}