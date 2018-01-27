
export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    generate(board) {
        // for straight direction only...
        this.x = Math.floor(Math.random() * 24)
        this.y = Math.floor(Math.random() * 16)
        board[this.y][this.x] = 2;
        return board
    }
}
