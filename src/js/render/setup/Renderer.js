import * as THREE from 'three'

/** Class used to create the scene renderer */
export default class Renderer extends THREE.WebGLRenderer {
    /**
     * Creates the renderer
     * @param {render.setup.CanvaSize} size Size of the canva
     * @param {Element} container HTML Element to display the scene in
     */
    constructor(size, container) {
        super({
            canvas: container,
            antialias: true
        })
        this.update(size)
    }

    /**
     * Updates the renderer
     * @param {render.setup.CanvaSize} size Size of the canva
     */
    update(size) {
        this.setSize(size.width, size.height)
    }
}