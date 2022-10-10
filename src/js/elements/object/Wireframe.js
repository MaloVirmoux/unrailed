import * as THREE from 'three'

import Utils from '../../Utils.js'

export default class Wireframe extends THREE.LineSegments {
    constructor(obj) {
        super(
            new THREE.EdgesGeometry(obj.geometry),
            new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.1
            })
        )

        this.utils = new Utils()
        this.utils.centerPosition(this)
    }
}