import React from 'react'

interface props {
	socket: WebSocket;
	resetGame: (socket: WebSocket) => void;
	wpm: number;
	totalMistakes: number;
}

const Results: React.FC<props> = ({ socket, resetGame, wpm, totalMistakes }) => {
	const restart = () => {
		resetGame(socket);
	};

	return (
		<>
			<h1 className='text-3xl font-serif font-bold text-white'>{wpm}</h1>
			<h1 className='text-3xl font-serif font-bold text-white'>{totalMistakes}</h1>
			<button onClick={restart}>restart</button>
		</>
	)
}

export default Results
