import { Engine, Runner, Composite, Bodies, Body, Vector, Render } from 'matter-js'

import { debug, chunk, physics } from '../params'

export default class PhysicsWorld {
    constructor() {
        this.length = chunk.length
        this.width = chunk.width

        this.engine = Engine.create({'gravity': {'x': 0, 'y': 0}})
        this.player = this.createPlayer()
        Composite.add(this.engine.world, [...this.createWalls(), this.player])
        this.createControls()

        if(debug.render.physics) {
            this.createRender()
        }

        this.runner = Runner.create()
        Runner.run(this.runner, this.engine)
    }

    createWalls() {
        return [
            // Creation of the Top Wall
            Bodies.rectangle(0, (10 + this.width) / 2, this.length, 10, { isStatic: true }),
            // Creation of the Bottom Wall
            Bodies.rectangle(0, - (10 + this.width) / 2, this.length, 10, { isStatic: true })
        ]
    }

    createPlayer() {
        return Bodies.rectangle(0, 0, 0.5, 1, { friction: 0, frictionAir: 0, restitution: 0, inertia: 0 })
    }

    createControls() {
        this.direction = Vector.create(0, 0)
        const pressed = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        addEventListener('keydown', (event) => {
            // Start Up Movement
            if ((event.key == 'z' || event.key == 'Z') && !pressed.up) {
                pressed.up = true
                this.direction = Vector.add(this.direction, Vector.create(0, 1))
            // Start Down Movement
            } else if ((event.key == 's' || event.key == 'S') && !pressed.down) {
                pressed.down = true
                this.direction = Vector.add(this.direction, Vector.create(0, -1))
            // Start Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && !pressed.left) {
                pressed.left = true
                this.direction = Vector.add(this.direction, Vector.create(-1, 0))
            // Start Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && !pressed.right) {
                pressed.right = true
                this.direction = Vector.add(this.direction, Vector.create(1, 0))
            }
            this.updatePlayer()
        })
        addEventListener('keyup', (event) => {
            // End Up Movement
                   if (event.key == 'z' || event.key == 'Z') {
                pressed.up = false
                this.direction = Vector.add(this.direction, Vector.create(0, -1))
            // End Down Movement
            } else if (event.key == 's' || event.key == 'S') {
                pressed.down = false
                this.direction = Vector.add(this.direction, Vector.create(0, 1))
            // End Left Movement
            } else if (event.key == 'q' || event.key == 'Q') {
                pressed.left = false
                this.direction = Vector.add(this.direction, Vector.create(1, 0))
            // End Right Movement
            } else if (event.key == 'd' || event.key == 'D') {
                pressed.right = false
                this.direction = Vector.add(this.direction, Vector.create(-1, 0))
            }
        })
    }

    createBarriers(map) {
        this.barriers = []
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.width; y++) {
                const blocktype = map[x][y]
                blocktype == 'mountain' || blocktype == 'water' ? this.barriers.push(Bodies.rectangle(x - ((this.length - 1) / 2), y - ((this.width - 1) / 2), 1, 1, {'isStatic': true})) : null
            }
        }
        Composite.add(this.engine.world, this.barriers)
    }

    updatePlayer() {
        // Velocity equals the normalize direction multiplied by the speed
        Body.setVelocity(this.player, Vector.mult(Vector.normalise(this.direction), physics.speed))
        // If there's no input, stop the player rotation, else set angle relative to the direction
        if (Vector.magnitude(this.direction) == 0) {
            Body.setAngularVelocity(this.player, 0)
        } else {
            Body.setAngle(this.player, Vector.angle(Vector.create(0, 0), this.direction))
        }
    }

    createRender() {
        this.render = Render.create({
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
        Render.run(this.render)
    }
}