import { createNoise2D } from 'simplex-noise';

function generateMap() {
    return new Array(128).fill(null).map(()=>new Array(32).fill(null))
}

function generatePath(map, currentY) {
    var currentX = 0
    while (currentX < 128) {
        var changeX = Math.min(Math.round(rdm(3) * 32), 127 - currentX)
        var toX = currentX + changeX
        for (currentX; currentX <= toX; currentX++) {
            for (let y = 0; y < 32; y++) {
                if (y < currentY) {
                    map[currentX][y] = 'S'
                } else if(y == currentY) {
                    map[currentX][y] = 'T'
                } else if (y > currentY) {
                    map[currentX][y] = 'N'
                }
            }
        }
        
        if (currentX != 128) {
            var changeY = Math.round((rdm(2) - 0.5) * 32)
            changeY = changeY < 0 ? Math.max(changeY, - currentY) : Math.min(changeY, 31 - currentY)
            var minY = Math.min(currentY, currentY + changeY)
            var maxY = Math.max(currentY, currentY + changeY)
            for (let y = 0; y < 32; y++) {
                if (y < minY) {
                    map[currentX][y] = 'S'
                } else if(y >= minY && y <= maxY) {
                    map[currentX][y] = 'T'
                } else if (y > maxY) {
                    map[currentX][y] = 'N'
                }
            }
            currentX += 1
            currentY += changeY
        }
    }
    return map
}

function rdm(n) {
    var r = 0
    for (var i = 0; i < n; i += 1) {
        r += Math.random()
    }
    return r / n
}

/* -----=====----- */

const factor = 0.025
const northNoise = createNoise2D()
function northGen(x, y) {
    return northNoise(factor * x, factor * y)
}

const southNoise = createNoise2D()
function southGen(x, y) {
    return southNoise(factor * x, factor * y)
}

const genericNoise = createNoise2D()
function genericGen(x, y) {
    return genericNoise(factor * x, factor * y)
}

function generateMountain(map) {
    const limit = 0.7
    for (let x = 0; x <= 127; x++) {
        for (let y = 0; y <= 31; y++) {
            switch (map[x][y]) {
                case 'N':
                    map[x][y] = northGen(x, y) > limit ? 'X' : ' '
                    break
                case 'S':
                    map[x][y] = southGen(x, y) > limit ? 'X' : ' '
                    break
                default:
                    map[x][y] = genericGen(x, y) > limit ? 'X' : ' '
            }
        }
    }
    return map
}

/* -----=====----- */
var toVisit = []
var visited = []

function checkPath(map, startY) {
    var maxX = 0
    toVisit.push({'x': 0, 'y': startY})
    
    while(maxX != 127 && toVisit.length != 0) {
        var v = toVisit.pop()
        visited.push(v)
        // console.log('Visiting : ' + v.x + ';' + v.y)
        if(map[v.x][v.y] != 'X') {
            createNeighbours(map, v.x, v.y)
        }
        maxX = Math.max(maxX, v.x)
    }
}

function createNeighbours(map, currentX, currentY) {
    // Behind
    if(currentX > 0) {
        var behindTile = {'x': currentX - 1, 'y': currentY}
        if(isNotIn(visited, behindTile) && isNotIn(visited, behindTile)){
            toVisit.unshift(behindTile)
            map[currentX][currentY] = 'b'
        }
    }
    // Right
    if(currentY < 31) {
        var rightTile = {'x': currentX, 'y': currentY + 1}
        if(isNotIn(visited, rightTile) && isNotIn(visited, rightTile)){
            toVisit.push(rightTile)
            map[currentX][currentY] = 'r'
        }
    }
    // Left
    if(currentY > 0) {
        var leftTile = {'x': currentX, 'y': currentY - 1}
        if(isNotIn(visited, leftTile) && isNotIn(visited, leftTile)){
            toVisit.push(leftTile)
            map[currentX][currentY] = 'l'
        }
    }
    // Front
    if(currentX < 127) {
        var frontTile = {'x': currentX + 1, 'y': currentY}
        if(isNotIn(visited, frontTile) && isNotIn(visited, frontTile)){
            toVisit.push(frontTile)
            map[currentX][currentY] = 'f'
        }
    }
}

function isNotIn(visited, tile) {
    return !(visited.find(t => (t.x == tile.x && t.y == tile.y)))
}

/* -----=====----- */

function printPath(path) {
    for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < path[i].length; j++) {
            process.stdout.write(path[i][j])
        }
        console.log('')
    }
}

var map = generateMap()
// map = generatePath(map, 15)
map = generateMountain(map)
checkPath(map, 15)
printPath(map)
// test()


//export default {generatePath}

/* -----=====----- */

function test() {
    var testArray = [{'x': 32, 'y': 34}]
    
    console.log(testArray.includes({'x': 32, 'y': 34}))

    visited.find(v => (v.x == frontTile.x && v.y == frontTile.y))
}