
export default class Snake {
    constructor(args) {
        this.head = { x: 3, y: 0 }
        this.tail = { x: 0, y: 0 }
        this.length = 4

        this.direction = 'right'
        this.inflectionPoints = []
    }

    generate(board) {
        let head = this.head.x
        while (head != -1) {
            board[0][head] = 1
            head--
        }
        return board
    }
}
