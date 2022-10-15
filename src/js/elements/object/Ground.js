import * as THREE from 'three'

import { chunk, colors } from '../../params'
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
        const z = blockType == 'water' ? 0.8 : 1
        const vertice = {
            'color': [colors[blockType][0] / 255, colors[blockType][1] / 255, colors[blockType][2] / 255]
        }

        const top = { 'normal': [0, 0, 1], ...vertice }
        vertices.push(
            {'position': [x    , y    , z], ...top},
            {'position': [x + 1, y    , z], ...top},
            {'position': [x + 1, y + 1, z], ...top},
            {'position': [x    , y    , z], ...top},
            {'position': [x + 1, y + 1, z], ...top},
            {'position': [x    , y + 1, z], ...top}
        )
        
        if (x == 0) {
            const leftSide = { 'normal': [- 1, 0, 0], ...vertice }
            vertices.push(
                {'position': [x, y    , 0], ...leftSide},
                {'position': [x, y    , z], ...leftSide},
                {'position': [x, y + 1, z], ...leftSide},
                {'position': [x, y    , 0], ...leftSide},
                {'position': [x, y + 1, z], ...leftSide},
                {'position': [x, y + 1, 0], ...leftSide}
            )
        }

        if (y == 0) {
            const frontSide = { 'normal': [0, -1, 0], ...vertice }
            vertices.push(
                {'position': [x    , y, 0], ...frontSide},
                {'position': [x + 1, y, 0], ...frontSide},
                {'position': [x    , y, z], ...frontSide},
                {'position': [x    , y, z], ...frontSide},
                {'position': [x + 1, y, 0], ...frontSide},
                {'position': [x + 1, y, z], ...frontSide}
            )
        }

        if (x != chunk.length - 1 && blockType == 'water' && map[x + 1][y] != 'water') {
            const rightWaterSide = {
                'normal': [-1, 0, 0],
                'color': [colors[map[x + 1][y]][0] / (255 * 2), colors[map[x + 1][y]][1] / (255 * 2), colors[map[x + 1][y]][2] / (255 * 2)]
            }
            vertices.push(
                {'position': [x + 1, y    , z], ...rightWaterSide},
                {'position': [x + 1, y    , 1], ...rightWaterSide},
                {'position': [x + 1, y + 1, 1], ...rightWaterSide},
                {'position': [x + 1, y    , z], ...rightWaterSide},
                {'position': [x + 1, y + 1, 1], ...rightWaterSide},
                {'position': [x + 1, y + 1, z], ...rightWaterSide}
            )
        }
        
        if (y != chunk.width - 1 && blockType == 'water' && map[x][y + 1] != 'water') {
            const backWaterSide = {
                'normal': [0, -1, 0],
                'color': [colors[map[x][y + 1]][0] / (255 * 1.5), colors[map[x][y + 1]][1] / (255 * 1.5), colors[map[x][y + 1]][2] / (255 * 1.5)]
            }
            vertices.push(
                {'position': [x    , y + 1, z], ...backWaterSide},
                {'position': [x + 1, y + 1, z], ...backWaterSide},
                {'position': [x    , y + 1, 1], ...backWaterSide},
                {'position': [x    , y + 1, 1], ...backWaterSide},
                {'position': [x + 1, y + 1, z], ...backWaterSide},
                {'position': [x + 1, y + 1, 1], ...backWaterSide}
            )
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