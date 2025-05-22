import PlainGenerator from './biomes/PlainGenerator'

import * as params from '../params'
import { getEmptyMap } from '../utils'
import Debug from '../Debug'

/** Class used to generate the map */
export default class MapGenerator {
    /** Creates the map generator */
    constructor() {
        this.plainGenerator = new PlainGenerator()
        this.mapsList = []
    }

    /**
     * Creates a new map array with all its characteristics merged
     * @returns {{type: string, distance:number, depth: number}[][]} Two dimensional array of characteristics
     */
    getNewMap() {
        const layersMap = this.getLayersMap()

        const map = getEmptyMap()
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                map[x][y] = {
                    type: layersMap['types'][x][y],
                    distance: layersMap['distances'][x][y],
                    depth: layersMap['depths'][x][y]
                }
            }
        }
        if (params.debug.render.console) Debug.printMap(map)

        return map
    }

    /**
     * Creates a new map array with all its characteristics splitted
     * @returns {{type: string[][], distance:number[][], depth: number[][]}} Dictionnary of two dimensional array of characteristics
     */
    getLayersMap() {
        let layersMap = {
            types: this.getTypesMap()
        }

        layersMap['distances'] = this.getDistancesMap(layersMap['types'], 7)
        /** TODO : Improve to shrink mountains and rerun lake, river, & ressources instead */
        if (Math.min(...layersMap['distances'][params.chunk.length - 1]) == Infinity) {
            this.plainGenerator = new PlainGenerator()
            layersMap = this.getLayersMap()
        }

        layersMap['depths'] = this.getDepthsMap(layersMap['types'])
        
        return layersMap
    }

    /**
     * Generates a map array, each cell being a string with the type of block
     * @returns {string[][]} Two dimensional array of types
     */
    getTypesMap() {
        const typesMap = getEmptyMap()

        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                // X and Y are offset of 1 to prevent issue with the noise in (x, 0) & (0, y)
                typesMap[x][y] = this.plainGenerator.get(x + 1, y + 1)
            }
        }

        return typesMap
    }

    /**
     * Generates a map array, each cell being the distance from the starting point
     * @returns {number[][]} Two dimensional array of distances
     */
    getDistancesMap(typesMap, startY) {
        const distancesMap = getEmptyMap()
        
        const next = []
        if (typesMap[0][startY] != 'mountain') {
            distancesMap[0][startY] = 0
            next.push({x:0, y:startY})
        }
        while (next.length > 0) {
            const current = next.shift()
            const distance = distancesMap[current.x][current.y] + 1
            if (current.x > 0 && typesMap[current.x - 1][current.y] != 'mountain' && distancesMap[current.x - 1][current.y] == undefined) {
                distancesMap[current.x - 1][current.y] = distance
                next.push({x: current.x - 1, y: current.y})
            }
            if (current.x < params.chunk.length - 1 && typesMap[current.x + 1][current.y] != 'mountain' && distancesMap[current.x + 1][current.y] == undefined) {
                distancesMap[current.x + 1][current.y] = distance
                next.push({x: current.x + 1, y: current.y})
            }
            if (current.y > 0 && typesMap[current.x][current.y - 1] != 'mountain' && distancesMap[current.x][current.y - 1] == undefined) {
                distancesMap[current.x][current.y - 1] = distance
                next.push({x: current.x, y: current.y - 1})
            }
            if (current.y < params.chunk.width - 1  && typesMap[current.x][current.y + 1] != 'mountain' && distancesMap[current.x][current.y + 1] == undefined) {
                distancesMap[current.x][current.y + 1] = distance
                next.push({x: current.x, y: current.y + 1})
            }
        }
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                if (distancesMap[x][y] == undefined) distancesMap[x][y] = Infinity
            }
            
        }

        return distancesMap
    }

    /**
     * Generates a map array, each cell being the depth in a type patch
     * @returns {number[][]} Two dimensional array of depths
     */
    getDepthsMap (typesMap) {
        const depthsMap = getEmptyMap()

        let toCompute = []
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                const blocktype = typesMap[x][y]
                if (x == 0 || x == params.chunk.length - 1 || y == 0 || y == params.chunk.width - 1) {
                    depthsMap[x][y] = 0
                } else if (typesMap[x + 1][y] != blocktype || typesMap[x - 1][y] != blocktype || typesMap[x][y + 1] != blocktype || typesMap[x][y - 1] != blocktype) {
                    depthsMap[x][y] = 0
                } else {
                    toCompute.push({x: x, y: y})
                }
            }
        }
        let depth = 1
        while (toCompute.length != 0) {
            const failed = []
            toCompute.forEach(t => {
                if (depthsMap[t.x + 1][t.y] == depth - 1 || depthsMap[t.x - 1][t.y] == depth - 1 || depthsMap[t.x][t.y + 1] == depth - 1 || depthsMap[t.x][t.y - 1] == depth - 1) {
                    depthsMap[t.x][t.y] = depth
                } else {
                    failed.push(t)
                }
            })
            depth++
            toCompute = failed
        }

        return depthsMap
    }
}