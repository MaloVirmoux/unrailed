import * as THREE from 'three'
import * as MATTER from 'matter-js'

import Wireframe from './render/object/Wireframe'

import * as params from './params'

/** Class used to debug the game */
export default class Debug {
    static container

    /**
     * Prints the map in the console
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensional array of the map characteristics 
     */
    static printMap(map) {
        for (let y = 0; y < params.chunk.width; y++) {
            let text = ''
            const style = []
            for (let x = 0; x < params.chunk.length; x++) {
                text += '%c   ' //'%c▓'
                const color = params.groundColors[map[x][y]['type']].top
                style.push(`background: rgb(${color[0]}, ${color[1]}, ${color[2]})`)
            }
            console.log(text, ...style)
        }
    }

    /**
     * Displays the physic engine instead of the render
     * @param {engine.Engine} physicsEngine Engine to be displayed
     */
    static createPhysicsRender(physicsEngine) {
        this.container.style.visibility = 'hidden'

        if (params.debug.render.physics) {
            const debugRender = MATTER.Render.create({
                element: document.body,
                engine: physicsEngine,
                bounds: {
                    min: { 
                        x: - (params.chunk.length / 2) * params.physics.scale,
                        y: - (params.chunk.width / 2) * params.physics.scale
                    },
                    max: { 
                        x: (params.chunk.length + (params.chunk.length / 2)) * params.physics.scale,
                        y: (params.chunk.width + (params.chunk.width / 2)) * params.physics.scale
                    }
                },
                options: {
                    hasBounds: true,
                    width: 1920,
                    height: (params.chunk.width / params.chunk.length) * 1920
                },
                pixelRatio: 10
            })
            MATTER.Render.run(debugRender)
        }
    }

    /**
     * Displays the three dimensional axis of an object
     * @param {THREE.Object3D} mesh Object to display the axis of 
     */
    static addAxisHelpers(mesh) {
        const helper = new THREE.AxesHelper(100)
        helper.position.setZ(0.001)
        mesh.add(helper)

    }

    static addWireframe(group, mesh) {
        mesh.traverse((meshPart) => {
            if (meshPart instanceof THREE.Mesh) {
                meshPart.material.polygonOffset = true
                meshPart.material.polygonOffsetFactor = 1
                meshPart.material.polygonOffsetUnits = 1
                group.add(new Wireframe(meshPart))
            }
        })
    }

    /**
     * Displays an arrow showing a raycaster
     * @param {THREE.Object3D} mesh Object to add the arrow to
     * @param {THREE.Ray} ray Ray to display 
     */
    static addRaycasterHelper(mesh, ray) {
        const helper = new THREE.ArrowHelper(ray.direction, ray.origin, params.physics.range, 0xff0000)
        mesh.add(helper)
    }
}