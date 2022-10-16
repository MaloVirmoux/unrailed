import * as THREE from 'three'

import { chunk, ground, colors } from '../../params'
import { centerPosition } from '../../utils'

export default class Ground extends THREE.Mesh {
    constructor(map) {
        var vertices = []
        for (let x = 0; x < chunk.length; x++) {
            for (let y = 0; y < chunk.width; y++) {
                vertices = vertices.concat(Ground.createVertices(map, x, y))
            }
        }
        super(
            Ground.convertVerticestoGeometry(vertices),
            new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors})
        )
        centerPosition(this)
    }

    static createVertices(map, x, y) {
        const vertices = []
        const blockType = map[x][y]
        const z = ground.height.standard - (blockType == 'water' ? ground.height.waterDifference : 0)

        vertices.push(...this.getVertices(blockType, x, x + 1, y, y + 1, z, z))
        if (x == 0) {
            vertices.push(...this.getVertices(blockType, x, x, y, y + 1, 0, z))
        }
        if (y == 0) {
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y, 0, z))
        }
        if (x != chunk.length - 1 && blockType == 'water' && map[x + 1][y] != 'water') {
            vertices.push(...this.getVertices(map[x + 1][y], x + 1, x + 1, y, y + 1, z, ground.height.standard))
        }
        if (y != chunk.width - 1 && blockType == 'water' && map[x][y + 1] != 'water') {
            vertices.push(...this.getVertices(map[x][y + 1], x, x + 1, y + 1, y + 1, z, ground.height.standard))
        }
        if (blockType == 'mountain') {
            const mountainZ = ground.height.standard + (() => {
                if (x == 0 || x == chunk.length - 1 || y == 0 || y == chunk.width - 1 || map[x - 1][y] != 'mountain' || map[x + 1][y] != 'mountain' || map[x][y - 1] != 'mountain' || map[x][y + 1] != 'mountain') {
                    return ground.height.baseBorderMountain + (ground.height.variationBorderMountain * (Math.random() - 0.5))
                } else {
                    return ground.height.baseCenterMountain + (ground.height.variationCenterMountain * (Math.random() - 0.5))
                }
            })()
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y + 1, mountainZ, mountainZ))
            vertices.push(...this.getVertices(blockType, x, x, y, y + 1, ground.height.standard, mountainZ))
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y, ground.height.standard, mountainZ))
        }

        return vertices
    }

    static getVertices(blockType, fromX, toX, fromY, toY, fromZ, toZ) {
        const vertices = []
        const position = fromX == toX ? 'side' : fromY == toY ? 'front' : fromZ == toZ ? 'top' : null
        const vertice = {
            'normal': fromZ == toZ ? [0, 0, 1] : fromX == toX ? [-1, 0, 0] : fromY == toY ? [0, -1, 0] : null,
            'color': [
                colors[blockType][0] / (255 * ground['shadow'][position]),
                colors[blockType][1] / (255 * ground['shadow'][position]),
                colors[blockType][2] / (255 * ground['shadow'][position])
            ]
        }
        switch (position) {
            case 'top':
                vertices.push(
                    {'position': [fromX, fromY, fromZ], ...vertice},
                    {'position': [toX  , fromY, fromZ], ...vertice},
                    {'position': [toX  , toY  , fromZ], ...vertice},
                    {'position': [fromX, fromY, fromZ], ...vertice},
                    {'position': [toX  , toY  , fromZ], ...vertice},
                    {'position': [fromX, toY  , fromZ], ...vertice}
                )
                break
            case 'side':
                vertices.push(
                    {'position': [fromX, fromY, fromZ], ...vertice},
                    {'position': [fromX, fromY, toZ  ], ...vertice},
                    {'position': [fromX, toY  , toZ  ], ...vertice},
                    {'position': [fromX, fromY, fromZ], ...vertice},
                    {'position': [fromX, toY  , toZ  ], ...vertice},
                    {'position': [fromX, toY  , fromZ], ...vertice}
                )
                break
            case 'front':
                vertices.push(
                    {'position': [fromX, fromY, fromZ], ...vertice},
                    {'position': [toX  , fromY, fromZ], ...vertice},
                    {'position': [fromX, fromY, toZ  ], ...vertice},
                    {'position': [fromX, fromY, toZ  ], ...vertice},
                    {'position': [toX  , fromY, fromZ], ...vertice},
                    {'position': [toX  , fromY, toZ  ], ...vertice}
                )
                break
            default:
                break;
        }
        return vertices
    }

    static convertVerticestoGeometry(vertices) {
        const positions = []
        const normals = []
        const colors = []
        vertices.forEach(vertice => {
            positions.push(...vertice.position)
            normals.push(...vertice.normal)
            colors.push(...vertice.color)
        })
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        )
        geometry.setAttribute(
            'normal',
            new THREE.Float32BufferAttribute(normals, 3)
        )
        geometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(colors, 3)
        )
        return geometry
    }
}