
const genRandomMouseCoords = () => {
    return {
        x: Math.floor(Math.random() * 24),
        y: Math.floor(Math.random() * 16)
    }
}

const genBlankBoard = () => {
    const dems = { w: 24, h: 16 }
    let initialBoard = []

    for (let i = 0; i < dems.h; i++) {
        let row = []
        for (let k = 0; k < dems.w; k++) {
            row.push(0)
        }
        initialBoard.push(row)
    }
    return initialBoard
}

export {
    genRandomMouseCoords,
    genBlankBoard
}
