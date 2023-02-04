import * as MATTER from 'matter-js'

import Timer from './tools/Timer'

import * as params from '../params'

export default class Ray {
    constructor(physChunk) {
        this.physChunk = physChunk
        this.player = physChunk.player
        this.target
        this.countdown
    }

    queryRay(bodies) {
        const collisions = MATTER.Query.ray(
            bodies,
            this.player.body.position,
            MATTER.Vector.add(
                this.player.body.position,
                MATTER.Vector.rotate(
                    MATTER.Vector.create(
                        params.physics.range,
                        0
                    ),
                    this.player.current.angle
                )
            ),
            params.physics.hitbox.width
        )
        const toKeep = {
            body: null,
            distance: Infinity
        }
        collisions.forEach((collision, i) => {
            const distance = MATTER.Vector.magnitude(MATTER.Vector.sub(this.player.body.position, collision.body.position))
            if (distance < toKeep.distance){
                toKeep.body = collision.bodyA
                toKeep.distance = distance
            }
        })
        return toKeep.body
    }

    update() {
        const newTarget = this.queryRay([
            ...Object.values(this.physChunk.woods),
            ...Object.values(this.physChunk.stones)
        ])

        const isNewTarget = newTarget && !this.target
        const changedTarget = newTarget && this.target && newTarget.id != this.target.id
        const leftTarget = !newTarget && this.target
        const noChange = (!newTarget && !this.target) || (newTarget && this.target && newTarget.id == this.target.id)
        
        if (!noChange) {
            if (this.timer) this.timer.stop()
            if (this.target) this.physChunk.unOutlineBody(this.target)
            this.target = newTarget

            if (isNewTarget || changedTarget) {
                this.physChunk.outlineBody(this.target)
                this.timer = new Timer(() => {
                    this.physChunk.unOutlineBody(this.target)
                    this.physChunk.removeBody(this.target)
                }, params.physics.efficiency)
            }
        }
    }
}