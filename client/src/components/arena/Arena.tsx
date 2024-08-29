import React, { useEffect } from "react";

interface props {
	Text: (para: string) => void;
	paragraph: string[] | null;
	para: string;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	isTyping: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleKeyDown: (event: React.KeyboardEvent) => void;
}

const Arena: React.FC<props> = ({
	Text,
	paragraph,
	para,
	setTime,
	isTyping,
	handleChange,
	handleKeyDown
}) => {

	useEffect(() => {

		if (para) {
			Text(para);
		}
	}, [para])

	useEffect(() => {
		let interval: number;
		if (isTyping) {
			interval = setInterval(() => {
				setTime(prev => prev + 1)
			}, 1000)
		}

		return () => {
			clearInterval(interval)
		}
	}, [isTyping, setTime])




	return (
		<>
			<div className="flex flex-col items-center justify-center w-full" >
				<div className="flex flex-wrap items-center  w-9/12  md:p-20" id="textarea">
					{paragraph &&
						paragraph.map((item, index) => (
							<span key={index}
								className={`text-3xl text-gray-400 font-serif font-medium character py-1 ${index == 0 ? `active` : ``} `}>
								{item == ' ' ? '\u00A0' : item}
							</span>
						))
					}
				</div>
				<div className="flex gap-5 items-center">
					<input type="text" onChange={handleChange} id="input" onKeyDown={handleKeyDown} value={''}
						className="w-0 h-0"
					/>
				</div>
			</div>
		</>
	)
}

export default Arena
