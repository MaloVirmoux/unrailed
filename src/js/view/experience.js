import * as THREE from 'three'

import Size from './elements/size'
import Scene from './elements/scene'
import Camera from './elements/camera'
import Renderer from './elements/renderer'
import Chunk from './map/chunk'

export default class Experience {
    constructor() {
        this.size = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.createListener()

        this.scene.add(this.camera)
        this.scene.add(new Chunk())
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
        console.log(this.scene)
    }
    
    tick() {
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}