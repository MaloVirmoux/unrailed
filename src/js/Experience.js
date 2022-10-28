import MapGenerator from './generator/MapGenerator'

import Size from './render/setup/Size'
import Scene from './render/setup/Scene'
import Camera from './render/setup/Camera'
import Renderer from './render/setup/Renderer'
import Player from './render/player/Player'
import Chunk from './render/object/Chunk'

import PhysicsWorld from './physics/PhysicsWorld'

import Assets from './render/setup/Assets'

export default class Experience {
    constructor() {
        this.mapGenerator = new MapGenerator()

        this.size = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)

        this.player = new Player()
        this.scene.add(this.camera, this.player)
        
        this.physics = new PhysicsWorld()
        
        this.createListener()

        this.assets = new Assets(this)
    }

    createListener(){
        window.addEventListener('resize', () => {
            this.size.update()
            this.camera.update(this.size)
            this.renderer.update(this.size)
        })
    }
    
    start() {
        const map = this.mapGenerator.getNewMap()
        this.physics.createBarriers(map)
        this.physics.createInteractable(map)
        this.scene.add(new Chunk(map, this.assets))
        this.tick()
    }
    
    tick() {
        this.physics.update()
        this.player.update(this.physics.player.body.position, this.physics.player.body.angle)
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}