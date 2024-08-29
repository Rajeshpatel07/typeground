import React, { useEffect, useState } from 'react';

const CountDown: React.FC<{ startGame: boolean }> = ({ startGame }) => {
	const [time, setTime] = useState<number>(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(prev => {
				if (prev <= 1) {
					clearInterval(interval);
					const input: HTMLElement | null = document.getElementById('input')
					if (input) {
						document.onkeydown = () => input.focus()
					}
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [startGame]);

	return (
		<>
			{time > 0 &&
				<h1 className='text-white text-3xl font-serif font-bold'>Match starts in {time}</h1>

			}
		</>
	);
}

export default CountDown;
