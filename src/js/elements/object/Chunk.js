import * as THREE from 'three'

import {chunk, colors} from '../../params'
import {centerPosition} from '../../utils'

import Column from './Column'

export default class Chunk extends THREE.Group {
    constructor(map) {
        super()
        this.length = chunk.length
        this.width = chunk.width
        this.map = map

        this.createGround()
        // this.createColumns()

        centerPosition(this)
    }
    
    createGround() {
        const ground = new THREE.Mesh(
            new THREE.BoxGeometry(this.length, this.width, 1),
            this.generateMapMaterials()
        )
        centerPosition(ground)
        this.add(ground)
    }

    generateMapMaterials() {
        const materialFront = (() => {
            const ctx = document.createElement('canvas').getContext('2d')
            ctx.canvas.width = this.length
            ctx.canvas.height = 1
            const imageData = ctx.getImageData(0, 0, this.length, 1)
            for (let x = 0; x < this.length; x++) {
                const i = x * 4
                imageData.data[i+0] = colors[this.map[x][this.width - 1]]['r']
                imageData.data[i+1] = colors[this.map[x][this.width - 1]]['g']
                imageData.data[i+2] = colors[this.map[x][this.width - 1]]['b']
                imageData.data[i+3] = 255
            }
            ctx.putImageData(imageData, 0, 0)
            const texture = new THREE.CanvasTexture(ctx.canvas)
            texture.magFilter = THREE.NearestFilter
            return new THREE.MeshBasicMaterial({
                map: texture
            })
        })()
        
        const materialLeft = (() => {
            const ctx = document.createElement('canvas').getContext('2d')
            ctx.canvas.width = 1
            ctx.canvas.height = this.width
            const imageData = ctx.getImageData(0, 0, 1, this.width)
            for (let y = 0; y < this.width; y++) {
                const i = y * 4
                imageData.data[i+0] = colors[this.map[0][y]]['r']
                imageData.data[i+1] = colors[this.map[0][y]]['g']
                imageData.data[i+2] = colors[this.map[0][y]]['b']
                imageData.data[i+3] = 255
            }
            ctx.putImageData(imageData, 0, 0)
            const texture = new THREE.CanvasTexture(ctx.canvas)
            texture.magFilter = THREE.NearestFilter
            return new THREE.MeshBasicMaterial({
                map: texture
            })
        })()
        
        const materialTop = (() => {
            const ctx = document.createElement('canvas').getContext('2d')
            ctx.canvas.width = this.length
            ctx.canvas.height = this.width
            const imageData = ctx.getImageData(0, 0, this.length, this.width)
            for (let x = 0; x < this.length; x++) {
                for (let y = 0; y < this.width; y++) {
                    const i = ((y * this.length) + x) * 4
                    imageData.data[i+0] = colors[this.map[x][y]]['r']
                    imageData.data[i+1] = colors[this.map[x][y]]['g']
                    imageData.data[i+2] = colors[this.map[x][y]]['b']
                    imageData.data[i+3] = 255
                }
            }
            ctx.putImageData(imageData, 0, 0)
            const texture = new THREE.CanvasTexture(ctx.canvas)
            texture.magFilter = THREE.NearestFilter
            return new THREE.MeshBasicMaterial({
                map: texture
            })
        })()
        
        return [
            null, materialLeft,
            null, materialFront,
            materialTop, null
        ]
    }

    createColumns() {
        for (let x = 0; x < this.length; x++) {
            const c = new Column(this.map[x])
            c.position.x = x
            this.add(c)
        }
    }
}