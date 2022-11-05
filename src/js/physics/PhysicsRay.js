import * as MATTER from 'matter-js'

import * as params from '../params'

export default class PhysicsRay {
    constructor(player, woods, stones) {
        this.player = player
        this.woods = woods
        this.stones = stones
        this.target = null
        this.countdown = null
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

    update() {
        const target = this.queryRay()

        if ((target && (!this.target || target.body.id != this.target.body.id)) || (!target && this.target)) {
            clearInterval(this.countdown)
            this.target = target
            if (target) {
                this.countdown = setInterval(() => {
                    console.log(this.target.body.id)
                }, 1000)
            }
        }
    }
}