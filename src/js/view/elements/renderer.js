import * as THREE from 'three'

export default class Renderer {
    constructor(size) {
        if (!this.instance) {
            this.instance = this
            
            this.o = new THREE.WebGLRenderer({
                canvas: document.querySelector('canvas.webgl')
            })
            this.update(size)
        } else {
            return this.instance
        }
    }

    render(scene, camera) {
        this.o.render(scene, camera)
    }

    update(size) {
        this.o.setSize(size.width, size.height)
    }
}