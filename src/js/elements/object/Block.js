import * as THREE from 'three'

import Utils from '../../Utils.js'
import Params from '../../Params.js'

import Wireframe from './Wireframe.js'

export default class Block extends THREE.Mesh {
    constructor(type) {
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
                color: colors[type],
                polygonOffset: true,
                polygonOffsetFactor: 1,
                polygonOffsetUnits: 1
            })
        )

        this.utils = new Utils()
        this.utils.centerPosition(this)

        if(Params.debug) {
            this.add(new Wireframe(this))
        }
    }
}