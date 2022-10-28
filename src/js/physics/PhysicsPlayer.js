import * as MATTER from 'matter-js'

import * as params from '../params'

export default class PhysicsPlayer {
    constructor() {
        this.body = MATTER.Bodies.rectangle(0, 0, params.physics.hitbox.width, params.physics.hitbox.length, { friction: 0, frictionAir: 0, restitution: 0, inertia: 0 })
        this.velocity = MATTER.Vector.create(0, 0)
        this.angle = MATTER.Vector.create(1, 0)
        this.createControls()
    }

    createControls() {
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
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(0, 1))
            // Start Down Movement
            } else if ((event.key == 's' || event.key == 'S') && !pressed.down) {
                pressed.down = true
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(0, -1))
            // Start Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && !pressed.left) {
                pressed.left = true
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(-1, 0))
            // Start Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && !pressed.right) {
                pressed.right = true
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(1, 0))
            }
        })
        addEventListener('keyup', (event) => {
            // End Up Movement
                   if (event.key == 'z' || event.key == 'Z') {
                pressed.up = false
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(0, -1))
            // End Down Movement
            } else if (event.key == 's' || event.key == 'S') {
                pressed.down = false
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(0, 1))
            // End Left Movement
            } else if (event.key == 'q' || event.key == 'Q') {
                pressed.left = false
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(1, 0))
            // End Right Movement
            } else if (event.key == 'd' || event.key == 'D') {
                pressed.right = false
                this.velocity = MATTER.Vector.add(this.velocity, MATTER.Vector.create(-1, 0))
            }
        })
    }

    update() {
        // Velocity equals the normalize direction multiplied by the speed
        MATTER.Body.setVelocity(this.body, MATTER.Vector.mult(MATTER.Vector.normalise(this.velocity), params.physics.speed))
        // If there's no input, stop the player rotation, else set angle relative to the direction
        if (MATTER.Vector.magnitude(this.velocity) == 0) {
            MATTER.Body.setAngularVelocity(this.body, 0)
        } else {
            this.angle = MATTER.Vector.normalise(this.velocity)
            MATTER.Body.setAngle(this.body, MATTER.Vector.angle(MATTER.Vector.create(0, 0), this.angle))
        }
    }
}