import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer {
    constructor(size, container) {
        super({
            canvas: container,
            antialias: true
        })
        this.update(size)
    }

    update(size) {
        this.setSize(size.width, size.height)
    }
}