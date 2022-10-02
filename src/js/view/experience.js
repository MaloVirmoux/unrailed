import * as THREE from 'three'

import Size from './elements/size.js'
import Camera from './elements/camera.js'
import Renderer from './elements/renderer.js'

export default class Experience {
    constructor() {
        this.size = new Size()
        this.scene = new THREE.Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.createListener()

        this.scene.add(this.camera.o)
    }

    createListener(){
        window.addEventListener('resize', () => {
            this.size.update()
            this.camera.update(this.size)
            this.renderer.update(this.size)
        })
    }
    
    start() {
        this.tick()
    }
    
    tick() {
        this.renderer.render(this.scene, this.camera.o)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}