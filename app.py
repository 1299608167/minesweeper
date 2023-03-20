from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def generate_board(rows, columns, mines):
    # 与之前的实现相同
    ...

def get_cell(row, col, rows, columns, board):
    if not(0 <= row < rows) or not(0 <= col < columns):
        return ""
    return board[row][col]

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    rows = data['rows']
    columns = data['columns']
    mines = data['mines']
    board = generate_board(rows, columns, mines)
    return jsonify(board=board)

@app.route('/cell', methods=['POST'])
def get_cell_api():
    data = request.get_json()
    row = data['row']
    col = data['col']
    rows = data['rows']
    columns = data['columns']
    board = data['board']
    cell = get_cell(row, col, rows, columns, board)
    return jsonify(cell=cell)

if __name__ == "__main__":
    app.run(debug=True)