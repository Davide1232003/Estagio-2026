import { useState } from "react";

const initialBoard = () => Array(9).fill(null);

const useTictacToe = () => {
    const [board, setBoard] = useState(initialBoard());
        const [isXNext, setIsXNext] = useState(true);
            const [scores, setScores] = useState({ x: 0, o: 0 });

    const WINNING_PATTENS = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTENS.length; i++) {
            const [a, b, c] = WINNING_PATTENS[i];
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        const winner = calculateWinner(board);
        if (winner || board[index]) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);

        const currentWinner = calculateWinner(newBoard);
        if (currentWinner) {
            setScores(prev => ({
                ...prev,
                [currentWinner.toLowerCase()]: prev[currentWinner.toLowerCase()] + 1
            }));
        }

        setIsXNext(!isXNext); 
    };

    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if (winner) return `Player ${winner} Wins!`;
        if (!board.includes(null)) return "DRAW!";
        return `Player ${isXNext ? "X" : "O"} turn`;
    };

    const resetGame = () => {
        setBoard(initialBoard());
        setIsXNext(true);
    };

    return { board, handleClick, calculateWinner, getStatusMessage, resetGame, scores };
};

export default useTictacToe;