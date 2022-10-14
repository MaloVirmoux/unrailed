import * as THREE from 'three'

import {debug} from '../../params'
import {centerPosition} from '../../utils'

import Wireframe from './Wireframe'

export default class Block extends THREE.Mesh {
    constructor(block) {
        const colors = {
            'moutain': '#1B1D22',
            'water': '#1E3F66',
            'wood': '#7E893D',
            'stone': '#B7B09C',
            'null': '#567D46'
        }
        super(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({
                color: colors[block],
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            })
        )

        centerPosition(this)

        debug ? this.add(new Wireframe(this)) : null
    }
}