import { useEffect, useState } from 'react';
import Arena from '../arena/Arena';
import useSetup from '../../hooks/useSetup';
import Players from '../result/Players';
import { useSocket } from '../../context/Socket';
import CountDown from '../result/CountDown';
import Results from '../result/Results';

// Define the player interface
interface playerInterface {
	username: string;
	wpm?: string;
}

const Multi: React.FC = () => {
	// State to manage players and game state
	const [player, setPlayer] = useState<Array<playerInterface>>([{
		username: localStorage.getItem('username') || '',
	}]);
	const [para, setPara] = useState<string>('');
	const [startGame, setStartGame] = useState<boolean>(false);

	// Destructure values from useSetup hook
	const {
		wpm,
		gameOver,
		resetGame,
		Text,
		paragraph,
		setTime,
		totalMistakes,
		isTyping,
		handleChange,
		handleKeyDown
	} = useSetup();

	// Get socket from context
	const { socket } = useSocket();

	// Effect to send initial connection message to the server
	useEffect(() => {
		if (socket) {
			socket.send(JSON.stringify({
				event: "multiplay",
				username: localStorage.getItem('username'),
				socketId: localStorage.getItem('socketId')
			}));
		}
	}, [socket]);

	// Effect to handle incoming socket messages
	useEffect(() => {
		const handleSocketMessage = (event: MessageEvent) => {
			const message = JSON.parse(event.data);
			switch (message.event) {
				case 'joinRoom':
					if (message.para) {
						setPara(message.para);
					}
					if (message.roomId) {
						localStorage.setItem('roomId', message.roomId);
					}
					if (message.members.length > 0) {
						setPlayer(prev => [...prev, ...message.members]);
					}
					if (message.startGame) {
						setStartGame(true);
					}
					break;

				case 'newPlayer':
					setPlayer(prev => [...prev, { username: message.members.username }]);
					break;

				case 'wpm':
					if (message.username) {
						const elem: HTMLElement | null = document.getElementById(message.username);
						if (elem) {
							elem.innerText = message.wpm;
						}
					}
					break;

				case 'getReady':
					setStartGame(message.getReady);
					break;

				default:
					break;
			}
		};

		if (socket) {
			socket.addEventListener('message', handleSocketMessage);
		}

		return () => {
			if (socket) {
				socket.removeEventListener('message', handleSocketMessage);
			}
		};
	}, [socket]);

	// Effect to send WPM and game start messages to the server
	useEffect(() => {
		if (socket) {
			if (isTyping) {
				socket.send(JSON.stringify({
					event: 'multiwpm',
					roomId: localStorage.getItem('roomId'),
					username: localStorage.getItem('username'),
					wpm,
				}));
			}
			if (startGame) {
				socket.send(JSON.stringify({
					event: 'getReady',
					roomId: localStorage.getItem('roomId'),
				}));
			}
		}
	}, [wpm, socket, isTyping, startGame]);

	return (
		<div className='flex flex-col items-center justify-center gap-5 h-[90vh]'>
			{!gameOver ? (
				<>
					{startGame && <CountDown startGame={startGame} />}
					<Arena
						Text={Text}
						para={para}
						paragraph={paragraph}
						setTime={setTime}
						isTyping={isTyping}
						handleChange={handleChange}
						handleKeyDown={handleKeyDown}
					/>
					{!startGame && (
						<h1 className='text-3xl text-white font-seif font-bold'>
							Waiting for other players to Join...
						</h1>
					)}
					<Players player={player} wpm={wpm} />
				</>
			) : (
				<>
					{socket && (
						<Results
							socket={socket}
							resetGame={resetGame}
							wpm={wpm}
							totalMistakes={totalMistakes}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default Multi;
