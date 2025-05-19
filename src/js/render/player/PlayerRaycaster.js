import * as THREE from 'three'

import Debug from '../../Debug'

import * as params from '../../params'

/** Class representing the player vision [Debug only] */
export default class PlayerRaycaster extends THREE.Raycaster {
    /**
     * Creates an arrow showing the player angle
     * @param {render.player.Player} player Player to show the vision of
     */
    constructor(player) {
        super(new THREE.Vector3(0, 0, 0.5), new THREE.Vector3(1, 0, 0))
        this.player = player

        if (params.debug.player.raycaster) Debug.addRaycasterHelper(this.player, this.ray)
    }

    /** Updates the player vision */
    update() {
        this.set(this.player.position, this.player.up)
    }
}