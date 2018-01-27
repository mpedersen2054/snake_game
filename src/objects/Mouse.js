
export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    generate(board) {
        // for straight direction only...
        this.x = Math.floor(Math.random() * 25) - 1
        this.y = Math.floor(Math.random() * 17) - 1
        console.log(`x: ${this.x}, y: ${this.y}`)
        board[this.x][this.y] = 2;
        return board
    }
}
