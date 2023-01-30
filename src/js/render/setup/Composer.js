import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

export default class Composer extends EffectComposer {
    constructor(size, renderer) {
        super(renderer)
        this.update(size)
    }

    update(size) {
        this.setSize(size.width, size.height)
    }
}