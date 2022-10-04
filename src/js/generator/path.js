function generatePath(y) {
    path = new Array(128).fill(null).map(()=>new Array(32).fill('.'))

    var x = 0
    while (x < 127) {
        var rdmX = rdm(3)
        var oldX = x
        x += (x + (rdmX * 32) < 127) ?
            Math.round(rdmX * 32)
        :
            127 - x
        for (let i = oldX; i < x; i++) {
            path[i][y] = 'X'
        }
        
        var rdmY = rdm(2) - 0.5
        var oldY = y
        y += (rdmY < 0) ?
        Math.round(rdmY * y)
        :
        Math.round(rdmY * (31 - y))
        if (y > oldY) {
            for (let i = oldY; i < y; i++) {
                path[x][i] = 'X'
            }
        } else if (y < oldY) {
            for (let i = oldY; i > y; i--) {
                path[x][i] = 'X'
            }
        } else {
            path[x][y] = 'X'
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

var path = generatePath(2)
printPath(path)

//export default {generatePath}