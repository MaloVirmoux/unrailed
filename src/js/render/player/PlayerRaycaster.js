import * as THREE from 'three'

import Debug from '../../Debug'

import * as params from '../../params'

export default class PlayerRaycaster extends THREE.Raycaster {
    constructor(player) {
        super(new THREE.Vector3(0, 0, 0.5), new THREE.Vector3(1, 0, 0))
        this.player = player

        if (params.debug.player.raycaster) Debug.addRaycasterHelper(this.player, this.ray)
    }

    update() {
        this.set(this.player.position, this.player.up)
    }
}