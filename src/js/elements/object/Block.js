import * as THREE from 'three'

import { debug } from '../../params'

import Wireframe from './Wireframe'

export default class Block extends THREE.Mesh {
    constructor() {
        super(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            })
        )

        debug ? this.add(new Wireframe(this)) : null
    }
}