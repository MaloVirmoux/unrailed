import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'

import * as params from '../params'

export default class PhysicsChunk {
    constructor(map) {
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

        if(params.debug.render.physics) {
            this.createRender()
        }

        this.runner = MATTER.Runner.create()
    }

    createBodies() {
        const mountains = []
        const waters = []
        const woods = []
        const stones = []
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                const body = MATTER.Bodies.rectangle(x + 0.5, y + 0.5, 1, 1, {'isStatic': true})
                switch (this.map[x][y]) {
                    case 'mountain':
                        mountains.push(body)
                        break
                    case 'water':
                        waters.push(body)
                        break
                    case 'wood':
                        woods.push(body)
                        break
                    case 'stone':
                        stones.push(body)
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
            ...this.mountains,
            ...this.waters,
            ...this.woods,
            ...this.stones
        ])
    }

    start() {
        MATTER.Runner.run(this.runner, this.engine)
    }

    // TODO : Mine the blocks
    update() {
        this.player.update()
        const target = this.queryRay()
        if (target && this.target && target.body.id == this.target.body.id) {
            //
        } else {
            if (target) {
                //
            } else {
                //
            }
            this.target = target
        }
    }

    queryRay() {
        return MATTER.Query.ray(
            [
                ...this.woods.flat().filter(Boolean),
                ...this.stones.flat().filter(Boolean)
            ],
            this.player.body.position,
            MATTER.Vector.add(
                this.player.body.position,
                MATTER.Vector.mult(
                    this.player.angle,
                    params.physics.range
                )
            ),
            params.physics.hitbox.width
        )[0]
    }

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