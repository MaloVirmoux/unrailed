import * as THREE from 'three'
import Utils from '../utils'

export default class Block extends THREE.Mesh {
    constructor() {
        super(
            new THREE.BoxGeometry(0.9, 0.9, 0.9),
            new THREE.MeshBasicMaterial({ color: '#ff0000'})
        )
        Utils.centerPosition(this)
    }
}