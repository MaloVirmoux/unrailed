function generatePath(currentY) {
    path = new Array(128).fill(null).map(()=>new Array(32).fill('.'))

    var currentX = 0
    while (currentX < 128) {
        var changeX = Math.min(Math.round(rdm(3) * 32), 127 - currentX)
        var toX = currentX + changeX
        for (currentX; currentX <= toX; currentX++) {
            for (let y = 0; y < 32; y++) {
                if (y < currentY) {
                    path[currentX][y] = 'S'
                } else if(y == currentY) {
                    path[currentX][y] = 'T'
                } else if (y > currentY) {
                    path[currentX][y] = 'N'
                }
            }
        }
        
        if (currentX != 128) {
            var changeY = Math.round((rdm(2) - 0.5) * 32)
            changeY = changeY < 0 ? Math.max(changeY, - currentY) : Math.min(changeY, 31 - currentY)
            minY = Math.min(currentY, currentY + changeY)
            maxY = Math.max(currentY, currentY + changeY)
            for (let y = 0; y < 32; y++) {
                if (y < minY) {
                    path[currentX][y] = 'S'
                } else if(y >= minY && y <= maxY) {
                    path[currentX][y] = 'T'
                } else if (y > maxY) {
                    path[currentX][y] = 'N'
                }
            }
            currentX += 1
            currentY += changeY
        }
    }
    return path
}

function rdm(n) {
    var r = 0
    for (var i = 0; i < n; i += 1) {
        r += Math.random()
    }
    return r / n
}

function printPath(path) {
    for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < path[i].length; j++) {
            process.stdout.write(path[i][j])
        }
        console.log('')
    }
}

var path = generatePath(15)
printPath(path)

//export default {generatePath}