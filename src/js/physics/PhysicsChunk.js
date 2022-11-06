import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'
import PhysicsRay from './PhysicsRay'

import * as params from '../params'

export default class PhysicsChunk {
    constructor(visual, map) {
        this.visual = visual
        this.map = map
        this.length = params.chunk.length
        this.width = params.chunk.width

        this.engine = MATTER.Engine.create({'gravity': {'x': 0, 'y': 0}})
        this.player = new PhysicsPlayer()
        ;({
            mountains: this.mountains,
            waters: this.waters,
            woods: this.woods,
            stones: this.stones
        } = this.createBodies())
        this.addBodies()

        this.ray = new PhysicsRay(this, this.player, this.woods, this.stones)

        if(params.debug.render.physics) {
            this.createRender()
        }

        this.runner = MATTER.Runner.create()
    }

    createBodies() {
        const mountains = {}
        const waters = {}
        const woods = {}
        const stones = {}
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                const body = MATTER.Bodies.rectangle(x + 0.5, y + 0.5, 1, 1, {'isStatic': true})
                switch (this.map[x][y]) {
                    case 'mountain':
                        mountains[body.id] = body
                        break
                    case 'water':
                        waters[body.id] = body
                        break
                    case 'wood':
                        woods[body.id] = body
                        break
                    case 'stone':
                        stones[body.id] = body
                        break
                    default:
                        break
                }
            }
        }
        return {
            mountains: mountains,
            waters: waters,
            woods: woods,
            stones: stones
        }
    }

    addBodies() {
        MATTER.Composite.add(this.engine.world, [
            this.player.body,
            // Creation of the Top Wall
            MATTER.Bodies.rectangle(this.length / 2, this.width + 5, this.length, 10, { isStatic: true }),
            // Creation of the Bottom Wall
            MATTER.Bodies.rectangle(this.length / 2, - 5, this.length, 10, { isStatic: true }),
            ...Object.values(this.mountains),
            ...Object.values(this.waters),
            ...Object.values(this.woods),
            ...Object.values(this.stones)
        ])
    }

    start() {
        MATTER.Runner.run(this.runner, this.engine)
    }

    update() {
        this.player.update()
        this.ray.update()
    }

    remove(body) {
        this.visual.removeMesh({
            'x': Math.trunc(body.position.x),
            'y': Math.trunc(body.position.y)
        })
        body.id in this.woods ? delete this.woods[body.id] : null
        body.id in this.stones ? delete this.stones[body.id] : null
        MATTER.Composite.remove(this.engine.world, body)
    }

    // For Debug
    createRender() {
        this.render = MATTER.Render.create({
            'element': document.body,
            'engine': this.engine,
            bounds: {
                min: { 
                    x: - (this.length / 2),
                    y: - (this.width / 2)
                },
                max: { 
                    x: this.length + (this.length / 2),
                    y: this.width + (this.width / 2)
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