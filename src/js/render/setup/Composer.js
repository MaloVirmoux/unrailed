import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

/** Class used to create the render composer */
export default class Composer extends EffectComposer {
    /**
     * Creates the composer
     * @param {render.setup.CanvaSize} size Size of the canva
     * @param {render.setup.Renderer} renderer Rendeder of the scene
     */
    constructor(size, renderer) {
        super(renderer)
        this.update(size)
    }

    /**
     * Updates the composer
     * @param {render.setup.CanvaSize} size Size of the canva
     */
    update(size) {
        this.setSize(size.width, size.height)
    }
}