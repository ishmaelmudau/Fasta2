var http = require('http');
var fs = require('fs');
import { strings } from "./utilities"


var octopuses = [];
fs.readFile('testData', function(err, data) {
    if(err) throw err;

    var array = data.toString().split("\n");
    array.forEach(function(line) {
        octopuses.push(line.split("").map(function(c) {
            return parseInt(c);
        }))
    })

    console.log(tick(100))
})

function increaseNeighbor(r, c, toFlash) {

    if (r >= 0 &&
        r < octopuses.length &&
        c >= 0 &&
        c < octopuses[r].length &&
        octopuses[r][c] < 10) {
        octopuses[r][c]++;
        if (octopuses[r][c] === 10) {
            toFlash.push([r, c]);
        }
    }
}

function tickOnce() {

    var flashes = 0;
    var toFlash = [];

    octopuses.forEach(function (row, r) {
        return row.forEach(function (_, c) {
            octopuses[r][c]++;
            if (octopuses[r][c] === 10) {
                toFlash.push([r, c]);
            }
        });
    });

    while (toFlash.length > 0) {
        var _a = toFlash.pop(), r = _a[0], c = _a[1];
        if (octopuses[r][c] === 10) {
            flashes++;
            [
                [r - 1, c - 1],
                [r - 1, c],
                [r - 1, c + 1],
                [r, c - 1],
                [r, c + 1],
                [r + 1, c - 1],
                [r + 1, c],
                [r + 1, c + 1],
            ].forEach(function (_a) {
                var r = _a[0], c = _a[1];
                increaseNeighbor(r, c, toFlash);
            });
        }
    }

    octopuses.forEach(function (row, r) {
        return row.forEach(function (_, c) {
            if (octopuses[r][c] === 10) {
                octopuses[r][c] = 0;
            }
        });
    });
    return flashes;
}

function tick(number) {
    let flashes = 0
    for (let i = 0; i < number; i++) {
      flashes += tickOnce()
    }
    return flashes
  }
  

// TypeScript Solution

// const octopuses: number[][] = []
// fs.readFile('testData', function(err, data) {
//     if(err) throw err;

//     var array = data.toString().split("\n");
//     array.forEach(function(line) {
//         octopuses.push(line.split("").map(function(c) {
//             return parseInt(c);
//         }))

//     })

//     console.log(tick(100))
   
// })
// function increaseNeighbor(
//   r: number,
//   c: number,
//   toFlash: [number, number][]
// ) {
//   if (
//     r >= 0 &&
//     r < octopuses.length &&
//     c >= 0 &&
//     c < octopuses[r].length &&
//     octopuses[r][c] < 10
//   ) {
//     octopuses[r][c]++
//     if (octopuses[r][c] === 10) {
//       toFlash.push([r, c])
//     }
//   }
// }

// function tickOnce() {
//   let flashes = 0
//   const toFlash: [number, number][] = []
//   octopuses.forEach((row, r) =>
//     row.forEach((_, c) => {
//       octopuses[r][c]++
//       if (octopuses[r][c] === 10) {
//         toFlash.push([r, c])
//       }
//     })
//   )

//   while (toFlash.length > 0) {
//     const [r, c] = toFlash.pop()
//     if (octopuses[r][c] === 10) {
//       flashes++
//       ;[
//         [r - 1, c - 1],
//         [r - 1, c],
//         [r - 1, c + 1],
//         [r, c - 1],
//         [r, c + 1],
//         [r + 1, c - 1],
//         [r + 1, c],
//         [r + 1, c + 1],
//       ].forEach(([r, c]) => {
//         increaseNeighbor(r, c, toFlash)
//       })
//     }
//   }

//   octopuses.forEach((row, r) =>
//     row.forEach((_, c) => {
//       if (octopuses[r][c] === 10) {
//         octopuses[r][c] = 0
//       }
//     })
//   )

//   return flashes
// }

// function tick(n: number) {
//   let flashes = 0
//   for (let i = 0; i < n; i++) {
//     flashes += tickOnce()
//   }
//   return flashes
// }
