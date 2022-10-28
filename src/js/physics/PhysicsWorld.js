import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'

import * as params from '../params'
import { getArray } from '../utils'

export default class PhysicsWorld {
    constructor() {
        this.length = params.chunk.length
        this.width = params.chunk.width

        this.engine = MATTER.Engine.create({'gravity': {'x': 0, 'y': 0}})

        this.player = new PhysicsPlayer()
        MATTER.Composite.add(this.engine.world, this.player.body)
        
        this.interactable = getArray()

        if(params.debug.render.physics) {
            this.createRender()
        }

        this.runner = MATTER.Runner.create()
        MATTER.Runner.run(this.runner, this.engine)
    }

    createBarriers(map) {
        const mountains = []
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                map[x][y] == 'mountain' ? mountains.push(MATTER.Bodies.rectangle(x - ((this.length - 1) / 2), y - ((this.width - 1) / 2), 1, 1, {'isStatic': true})) : null
            }
        }
        MATTER.Composite.add(this.engine.world, [
            // Creation of the Top Wall
            MATTER.Bodies.rectangle(0, (10 + this.width) / 2, this.length, 10, { isStatic: true }),
            // Creation of the Bottom Wall
            MATTER.Bodies.rectangle(0, - (10 + this.width) / 2, this.length, 10, { isStatic: true }),
            // Creation of the Mountains
            ...mountains
        ])
    }

    createInteractable(map) {
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                const blocktype = map[x][y]
                if (blocktype != 'default' && blocktype != 'mountain') {
                    this.interactable[x][y] = MATTER.Bodies.rectangle(x - ((this.length - 1) / 2), y - ((this.width - 1) / 2), 1, 1, {'isStatic': true})
                    MATTER.Composite.add(this.engine.world, this.interactable[x][y])
                }
            }
        }        
    }

    update() {
        this.player.update()
        this.queryRay()
    }

    queryRay() {
        return MATTER.Query.ray(this.interactable.flat().filter(Boolean), this.player.body.position, MATTER.Vector.add(this.player.body.position, MATTER.Vector.mult(this.player.angle, params.physics.range)))
    }

    createRender() {
        this.render = MATTER.Render.create({
            'element': document.body,
            'engine': this.engine,
            bounds: {
                min: { 
                    x: - this.length, 
                    y: - this.width 
                },
                max: { 
                    x: this.length, 
                    y: this.width 
                }
             },
             options: {
                 hasBounds: true,
                 width: 1920,
                 height: (this.width / this.length) * 1920
             },
            'pixelRatio': 10
        })
        MATTER.Render.run(this.render)
    }
}