import * as THREE from 'three'

import { OutlinePass as ThreeOutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

import * as params from '../../params'

/** Class used to create a glowing effect in the render */
export default class OutlinePass extends ThreeOutlinePass {
    /**
     * Creates the glowing effect
     * @param {render.setup.CanvaSize} size Size of the canva
     * @param {THREE.Scene} scene Scene  displayed
     * @param {THREE.Camera} camera Camera running
     * @param {string} bodyVisibility Visibility of the body to outline ["visible", "hidden", "always"]
     */
    constructor(size, scene, camera, bodyVisibility) {
        super(size, scene, camera)

        this.edgeStrength = params.outline.edgeStrength
        this.edgeGlow = params.outline.edgeGlow
        this.edgeThickness = params.outline.edgeThickness
        switch (bodyVisibility) {
            case 'visible':
                this.visibleEdgeColor = new THREE.Color(params.outline.visibleEdgeColor)
                this.hiddenEdgeColor = new THREE.Color('#000000')
                break;
            case 'hidden':
                this.visibleEdgeColor = new THREE.Color('#000000')
                this.hiddenEdgeColor = new THREE.Color(params.outline.hiddenEdgeColor)
                break;
            case 'always':
            default:
                this.visibleEdgeColor = new THREE.Color(params.outline.visibleEdgeColor)
                this.hiddenEdgeColor = new THREE.Color(params.outline.hiddenEdgeColor)
                break;
        }
    }
}