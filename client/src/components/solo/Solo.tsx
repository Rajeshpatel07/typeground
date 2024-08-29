import React, { useEffect, useState } from 'react'
import Arena from '../arena/Arena'
import useSetup from '../../hooks/useSetup'
import axios from "axios";

const Solo: React.FC = () => {
	const { wpm, Text, paragraph, resetGame, setTime, isTyping, handleChange, handleKeyDown } = useSetup()
	const [para, setPara] = useState('')

	const getText = async () => {
		try {
			const req = await axios.get('/api/gettext');
			setPara(req.data.para);
			const input: HTMLElement | null = document.getElementById('input');
			if (input) {
				document.onkeydown = () => input.focus();
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getText();
	}, [])

	const restart = () => {
		resetGame()
		getText();
	}

	return (
		<div className='flex flex-col items-center justify-center gap-5 h-[90vh]'>
			<Arena
				Text={Text}
				para={para}
				paragraph={paragraph}
				setTime={setTime}
				isTyping={isTyping}
				handleChange={handleChange}
				handleKeyDown={handleKeyDown}
			/>
			<h1 className='text-white text-3xl font-serif font-bold'>Speed : {wpm}</h1>
			<section>
				<button className='px-8 py-3 text-white bg-blue-500 rounded-lg'
					onClick={restart}
				>Reset</button>
			</section>
		</div>
	)
}

export default Solo
