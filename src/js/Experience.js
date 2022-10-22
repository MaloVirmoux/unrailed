import MapGenerator from './generator/MapGenerator'

import Size from './render/setup/Size'
import Scene from './render/setup/Scene'
import Camera from './render/setup/Camera'
import Renderer from './render/setup/Renderer'
import Chunk from './render/object/Chunk'
import Player from './render/player/Player'

import PhysicsWorld from './physics/PhysicsWorld'

import Assets from './render/setup/Assets'

export default class Experience {
    constructor() {
        this.mapGenerator = new MapGenerator()

        this.size = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.scene.add(this.camera)
        
        this.physics = new PhysicsWorld()
        this.phyicsPlayer = this.createPlayer()
        
        this.createListener()

        this.assets = new Assets(this)
    }

    createPlayer() {
        this.player = new Player()
        this.scene.add(this.player)
        return this.physics.player
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
        this.scene.add(new Chunk(map, this.assets))
        this.tick()
    }
    
    tick() {
        this.physics.updatePlayer()
        this.player.update(this.phyicsPlayer.position, this.phyicsPlayer.angle)
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    updatePlayer() {
        this.player.position.set(this.phyicsPlayer.position.x, this.phyicsPlayer.position.y, 0.5)
    }
}