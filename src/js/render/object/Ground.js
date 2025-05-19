import * as THREE from 'three'

import * as params from '../../params'

/** Class representing a displayed ground */
export default class Ground extends THREE.Mesh {
    /**
     * Creates a ground
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensional array of the map characteristics
     */
    constructor(map) {
        let vertices = []
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                vertices = vertices.concat(Ground.createVertices(map, x, y))
            }
        }
        super(
            Ground.convertVerticestoGeometry(vertices),
            new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors})
        )

        this.position.set(0, 0, - params.ground.height.standard)
    }

    /**
     * Creates the vertices to build the ground
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensional array of the map characteristics
     * @param {number} x X coordinates
     * @param {number} y Y coordinates
     * @returns {{position: number[], normal: number[], color: number[]}[]} Returns a list of vertices to create a ground's block
     */
    static createVertices(map, x, y) {
        const vertices = []
        const blockType = map[x][y]['type']
        const z = params.ground.height.standard - (blockType == 'water' ? params.ground.height.waterDifference : 0)

        // Creation of the Top faces Vertices
        vertices.push(...this.getVertices(blockType, x, x + 1, y, y + 1, z, z))
        // Creation of the Left faces Vertices
        if (x == 0) {
            vertices.push(...this.getVertices(blockType, x, x, y, y + 1, 0, z))
        }
        // Creation of the Front faces Vertices
        if (y == 0) {
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y, 0, z))
        }
        // Creation of the Right Water Sides Vertices
        if (x != params.chunk.length - 1 && blockType == 'water' && map[x + 1][y]['type'] != 'water') {
            vertices.push(...this.getVertices(map[x + 1][y]['type'], x + 1, x + 1, y, y + 1, z, params.ground.height.standard))
        }
        // Creation of the Back Water Sides Vertices
        if (y != params.chunk.width - 1 && blockType == 'water' && map[x][y + 1]['type'] != 'water') {
            vertices.push(...this.getVertices(map[x][y + 1]['type'], x, x + 1, y + 1, y + 1, z, params.ground.height.standard))
        }
        if (blockType == 'mountain') {
            const mountainZ = params.ground.height.standard + Math.sqrt(map[x][y]['depth'] + Math.random())
            // Creation of the Top Mountains Vertices
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y + 1, mountainZ, mountainZ))
            // Creation of the Left Mountains Vertices
            vertices.push(...this.getVertices(blockType, x, x, y, y + 1, params.ground.height.standard, mountainZ))
            // Creation of the Front Mountains Vertices
            vertices.push(...this.getVertices(blockType, x, x + 1, y, y, params.ground.height.standard, mountainZ))
        }

        return vertices
    }

    /**
     * Get the vertices 
     * @param {string} blockType Type of the block
     * @param {number} fromX Lowest X coordinate
     * @param {number} toX Highest X coordinate
     * @param {number} fromY Lowest Y coordinate
     * @param {number} toY Highest Y coordinate
     * @param {number} fromZ Lowest Z coordinate
     * @param {number} toZ Highest Z coordinate
     * @returns {{position: number[], normal: number[], color: number[]}[]} Returns a list of vertices to create a face of a ground's block
     */
    static getVertices(blockType, fromX, toX, fromY, toY, fromZ, toZ) {
        const vertices = []
        const position = (() => {
            if (fromX == toX) return 'side'
            if (fromY == toY) return 'front'
            if (fromZ == toZ) return 'top'
            return null
        })()
        const vertice = {
            normal: (() => {
                if (position == 'side') return [-1, 0, 0]
                if (position == 'front') return [0, -1, 0]
                if (position == 'top') return [1, 0, 0]
                return null
            })(),
            color: [
                params.groundColors[blockType][position][0] / 255,
                params.groundColors[blockType][position][1] / 255,
                params.groundColors[blockType][position][2] / 255 
            ]
        }
        switch (position) {
            case 'top':
                vertices.push(
                    {position: [fromX, fromY, fromZ], ...vertice},
                    {position: [toX  , fromY, fromZ], ...vertice},
                    {position: [toX  , toY  , fromZ], ...vertice},
                    {position: [fromX, fromY, fromZ], ...vertice},
                    {position: [toX  , toY  , fromZ], ...vertice},
                    {position: [fromX, toY  , fromZ], ...vertice}
                )
                break
            case 'side':
                vertices.push(
                    {position: [fromX, fromY, fromZ], ...vertice},
                    {position: [fromX, fromY, toZ  ], ...vertice},
                    {position: [fromX, toY  , toZ  ], ...vertice},
                    {position: [fromX, fromY, fromZ], ...vertice},
                    {position: [fromX, toY  , toZ  ], ...vertice},
                    {position: [fromX, toY  , fromZ], ...vertice}
                )
                break
            case 'front':
                vertices.push(
                    {position: [fromX, fromY, fromZ], ...vertice},
                    {position: [toX  , fromY, fromZ], ...vertice},
                    {position: [fromX, fromY, toZ  ], ...vertice},
                    {position: [fromX, fromY, toZ  ], ...vertice},
                    {position: [toX  , fromY, fromZ], ...vertice},
                    {position: [toX  , fromY, toZ  ], ...vertice}
                )
                break
            default:
                break
        }
        return vertices
    }

    /**
     * Converts a list of vertices to a ground geometry
     * @param {{position: number[], normal: number[], color: number[]}[]} vertices 
     * @returns {THREE.BufferGeometry} Ground geometry
     */
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