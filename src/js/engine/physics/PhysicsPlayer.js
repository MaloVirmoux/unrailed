import * as MATTER from 'matter-js'
import * as TWEEN from '@tweenjs/tween.js'

import * as params from '../../params'

/** Class representing the physical player */
export default class PhysicsPlayer {
    /** Creates a physical player */
    constructor() {
        this.body = MATTER.Bodies.rectangle(
            0,
            0,
            params.physics.hitbox.width * params.physics.scale,
            params.physics.hitbox.length * params.physics.scale,
            {friction: 0, frictionAir: 0, restitution: 0, inertia: 0, chamfer: { radius: 0.25 * params.physics.scale }}
        )
        this.direction = MATTER.Vector.create()
        this.angle = MATTER.Vector.create(1, 0)
        this.current = {
            velocity: {
                x: 0,
                y: 0
            },
            angle: 0
        }
        this.createControls()
    }

    /** Creates the event listeners to control the player */
    createControls() {
        const pressed = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        let tween
        
        const togglePressed = (dir) => {
            const velocity = MATTER.Vector.mult(MATTER.Vector.normalise(this.direction), params.physics.speed * params.physics.scale)
            const angle = MATTER.Vector.magnitude(this.direction) != 0 ? MATTER.Vector.angle(MATTER.Vector.create(), MATTER.Vector.normalise(this.direction)) : this.current.angle
            const to = {
                velocity: {
                    x: velocity.x,
                    y: velocity.y
                },
                angle: angle
            }
            if(typeof(tween) == TWEEN.Tween) {
                tween.stop()
            }
            tween = new TWEEN.Tween(this.current).to(to, 50).start()
            pressed[dir] = !pressed[dir]
        }

        addEventListener('keydown', (event) => {
            // Start Up Movement
            if ((event.key == 'z' || event.key == 'Z') && !pressed.up) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, params.physics.scale))
                togglePressed('up')
            // Start Down Movement
            } else if ((event.key == 's' || event.key == 'S') && !pressed.down) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, -params.physics.scale))
                togglePressed('down')
            // Start Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && !pressed.left) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(-params.physics.scale, 0))
                togglePressed('left')
            // Start Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && !pressed.right) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(params.physics.scale, 0))
                togglePressed('right')
            }
        })
        
        addEventListener('keyup', (event) => {
            // End Up Movement
            if ((event.key == 'z' || event.key == 'Z') && pressed.up) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, -params.physics.scale))
                togglePressed('up')
            // End Down Movement
            } else if ((event.key == 's' || event.key == 'S') && pressed.down) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, params.physics.scale))
                togglePressed('down')
            // End Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && pressed.left) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(params.physics.scale, 0))
                togglePressed('left')
            // End Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && pressed.right) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(-params.physics.scale, 0))
                togglePressed('right')
            }
        })
    }

    /** Updates the player velocity & angle */
    update() {
        MATTER.Body.setVelocity(this.body, this.current.velocity)
        MATTER.Body.setAngle(this.body, this.current.angle)
        MATTER.Body.setAngularVelocity(this.body, 0)
    }
}