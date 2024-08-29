import { ChangeEvent, KeyboardEvent, useState } from "react";

const useSetup = () => {


	const [wpm, setWpm] = useState<number>(0);
	const [paragraph, setParagraph] = useState<Array<string> | null>(null);
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const [charIndex, setCharIndex] = useState<number>(0);
	const [mistakes, setMistakes] = useState<number>(0);
	const [time, setTime] = useState<number>(1);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [totalMistakes, setTotalMistakes] = useState<number>(0);


	const Text = (para: string) => {
		if (para.length !== 0) {
			const items = para.split('')
			setParagraph(items);
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const characters: NodeListOf<HTMLElement> = document.querySelectorAll('.character');
		const inputValue = e.target.value;
		const length = inputValue.length - 1;

		if (charIndex < characters.length - 1) {
			const typedChar = inputValue[length];
			let currentChar = characters[charIndex].innerText;
			if (currentChar === ' ') currentChar = ' '; // Handle spaces
			if (!isTyping) {
				setIsTyping(true);
			}
			if (typedChar === currentChar) {
				setCharIndex(charIndex + 1);
				if (charIndex + 1 < characters.length) {
					characters[charIndex + 1].classList.add('active');
					characters[charIndex].classList.remove('active');
					characters[charIndex].classList.add('correct');
				}
			} else {
				setCharIndex(charIndex + 1);
				setMistakes(mistakes + 1);
				setTotalMistakes(totalMistakes + 1);
				characters[charIndex].classList.remove('active');
				if (charIndex + 1 < characters.length) {
					characters[charIndex + 1].classList.add('active');
					characters[charIndex].classList.add('wrong');
				}
			}

			if (charIndex === characters.length - 1) setIsTyping(false);
			const speed = Math.floor(((charIndex - mistakes) / 5) / (time / 60))
			if (speed !== Infinity && speed !== undefined && speed !== null) {
				setWpm(speed);
			}
		} else {
			setIsTyping(false);
			setGameOver(true);
		}
	};


	const handleKeyDown = (event: KeyboardEvent) => {
		const characters = document.querySelectorAll('.character');

		if (event.key === 'Backspace' && charIndex > 0) {
			const newCharIndex = charIndex - 1;
			setCharIndex(newCharIndex);

			if (characters[newCharIndex].classList.contains('correct')) {
				characters[newCharIndex].classList.remove('correct');
			}
			if (characters[newCharIndex].classList.contains('wrong')) {
				characters[newCharIndex].classList.remove('wrong');
			}

			characters[charIndex].classList.remove('active');
			characters[newCharIndex].classList.add('active');
			setMistakes(mistakes - 1);
			const speed = Math.floor(((newCharIndex - mistakes) / 5) / (time / 60));
			if (speed !== Infinity && speed !== undefined && speed !== null) {
				setWpm(speed);
			}
		}
	};

	const resetGame = (socket?: WebSocket) => {
		if (paragraph) {
			const chars = document.querySelectorAll('.character');
			chars.forEach((char, i) => {
				char.classList.remove('correct', 'wrong', 'active');
				if (i === 0) char.classList.add('active');
			});
		}
		setMistakes(0);
		setTotalMistakes(0)
		setWpm(0);
		setTime(0);
		setIsTyping(false);
		setCharIndex(0)
		setGameOver(false);
		if (socket) {
			socket.send(JSON.stringify({
				event: "multiplay",
				username: localStorage.getItem('username'),
				socketId: localStorage.getItem('socketId')
			}))
		}
	}

	return {
		Text,
		paragraph,
		handleKeyDown,
		handleChange,
		isTyping,
		time,
		setTime,
		wpm,
		resetGame,
		gameOver,
		totalMistakes,
	}

}

export default useSetup;
