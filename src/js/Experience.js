import Size from './elements/setup/Size.js'
import Scene from './elements/setup/Scene.js'
import Camera from './elements/setup/Camera.js'
import Renderer from './elements/setup/Renderer.js'
import Chunk from './elements/object/Chunk.js'

export default class Experience {
    constructor() {
        this.size = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.scene.add(this.camera)
        
        this.createListener()
    }

    createChunk(chunk) {
        this.scene.add(new Chunk(chunk))
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
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}