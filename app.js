const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

function generateBoard(rows, columns, mines) {
    const board = new Array(rows).fill(null).map(() => new Array(columns).fill(0));
    let placedMines = 0;

    while (placedMines < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * columns);

        if (board[row][col] === 0) {
            board[row][col] = 'M';
            placedMines++;

            for (let r = row - 1; r <= row + 1; r++) {
                for (let c = col - 1; c <= col + 1; c++) {
                    if (
                        r >= 0 &&
                        r < rows &&
                        c >= 0 &&
                        c < columns &&
                        board[r][c] !== 'M'
                    ) {
                        board[r][c]++;
                    }
                }
            }
        }
    }

    return board;
}

function getCell(row, col, rows, columns, board) {
    if (row < 0 || row >= rows || col < 0 || col >= columns) {
        return '';
    }
    return board[row][col];
}

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/templates/index.html'));
});

app.post('/generate', (req, res) => {
    const { rows, columns, mines } = req.body;
    const board = generateBoard(rows, columns, mines);
    res.json({ board });
});

app.post('/cell', (req, res) => {
    const { row, col, rows, columns, board } = req.body;
    const cell = getCell(row, col, rows, columns, board);
    res.json({ cell });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});