import * as THREE from 'three'

import * as params from '../../params'

export default class PlayerRaycaster extends THREE.Raycaster {
    constructor(player) {
        super(new THREE.Vector3(0, 0, 0.5), new THREE.Vector3(1, 0, 0))
        this.player = player

        if (params.debug.player.raycaster) {
            this.helper = new THREE.ArrowHelper(this.ray.direction, this.ray.origin, params.physics.range, 0xff0000)
            this.player.add(this.helper)
        }
    }

    update() {
        this.set(this.player.position, this.player.up)
    }
}