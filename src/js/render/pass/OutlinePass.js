import * as THREE from 'three'

import { OutlinePass as ThreeOutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

import * as params from '../../params'

export default class OutlinePass extends ThreeOutlinePass {
    constructor(size, scene, camera, type) {
        super(size, scene, camera)

        this.edgeStrength = params.outline.edgeStrength
        this.edgeGlow = params.outline.edgeGlow
        this.edgeThickness = params.outline.edgeThickness
        switch (type) {
            case 'visible':
                this.visibleEdgeColor = new THREE.Color(params.outline.visibleEdgeColor)
                this.hiddenEdgeColor = new THREE.Color('#000000')
                break;
            case 'hidden':
                this.visibleEdgeColor = new THREE.Color('#000000')
                this.hiddenEdgeColor = new THREE.Color(params.outline.hiddenEdgeColor)
                break;
            case 'both':
            default:
                this.visibleEdgeColor = new THREE.Color(params.outline.visibleEdgeColor)
                this.hiddenEdgeColor = new THREE.Color(params.outline.hiddenEdgeColor)
                break;
        }
    }
}