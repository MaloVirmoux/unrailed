import * as THREE from 'three'

import { OutlinePass as ThreeOutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

import * as params from '../../params'

export default class OutlinePass extends ThreeOutlinePass {
    constructor(size, scene, camera, player) {
        super(size, scene, camera, [player])

        this.edgeStrength = params.outline.edgeStrength
        this.edgeGlow = params.outline.edgeGlow
        this.edgeThickness = params.outline.edgeThickness
        this.visibleEdgeColor = new THREE.Color(params.outline.visibleEdgeColor)
        this.hiddenEdgeColor = new THREE.Color(params.outline.hiddenEdgeColor)
    }
}