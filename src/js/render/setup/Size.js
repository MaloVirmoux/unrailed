import * as THREE from 'three'

let instance = null

export default class Size extends THREE.Vector2 {
    constructor() {
        if (!instance) {
            instance = super()
            
            this.update()
        } else {
            return instance
        }
    }

    update() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = window.innerWidth / window.innerHeight 
    }
}