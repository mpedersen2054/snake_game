
const genRandomMouseCoords = () => {
    return {
        x: Math.floor(Math.random() * 24),
        y: Math.floor(Math.random() * 16)
    }
}

export {
    genRandomMouseCoords
}
