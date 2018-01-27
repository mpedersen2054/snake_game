
export default class Snake {
    constructor(args) {
        this.head = { x: 3, y: 0 }
        this.tail = { x: 0, y: 0 }
        this.length = 4

        this.direction = 'RIGHT'
        this.inflectionPoints = []
    }

    init(board) {
        // generate initial snake
        let head = this.head.x
        while (head != -1) {
            board[0][head] = 1
            head--
        }
        return board
    }

    move(board, direction) {

        // check if 

        return { success: true, board: board }
    }
}
