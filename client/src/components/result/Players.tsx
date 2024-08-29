import React, { useEffect } from 'react'

interface playerInterface {
	username: string;
	wpm?: string;
}

const Players: React.FC<{ player: Array<playerInterface> | null, wpm: number }> = ({ player, wpm }) => {

	useEffect(() => {
		const username = localStorage.getItem('username');
		if (username) {
			const elem: HTMLElement | null = document.getElementById(username);
			if (elem) {
				elem.innerText = wpm.toString();
			}
		}
	}, [wpm])

	return (
		<section className=' w-9/12 grid grid-cols-2 grid-rows-2  place-content-center gap-4 md:w-7/12'>
			{player &&
				player.map((item, index) => (
					<div className='flex items-center justify-between bg-gray-800 px-8 py-6 rounded-md w-full border' key={index}>
						<p className='text-yellow-600'>{item.username}</p>
						<p className='text-white' id={item.username}>0</p>
					</div>
				))}
		</section>
	)
}

export default Players
