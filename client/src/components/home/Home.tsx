import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
	return (
		<div className='w-full mt-5 md:mt-8  flex justify-center  opacity-90'>
			<section className='md:w-8/12 p-4 gap-8 w-full  h-full flex flex-col justify-center items-center'>
				<div
					className='w-full h-96 bg-cover border bg-center p-8 rounded'
					style={{ backgroundImage: `url(multi_bg.png)` }}>
					<section className='flex flex-col items-start gap-3 p-4'>
						<h1 className='text-3xl font-bold text-blue-500'>TypeGround-multiplayer typing game</h1>
						<p className='text-lg font-serif font-medium text-white'>Increase your typing speed competing with others</p>
						<Link to={"multi"} >
							<button className='font-medium text-white py-4 px-10  bg-blue-600 rounded'>Enter</button>
						</Link>
					</section>
				</div>

				<div className='flex flex-col md:flex-row items-center gap-3 w-full'>
					<div
						className='w-full h-96 bg-cover border  bg-center p-8 rounded'
						style={{ backgroundImage: `url(multi_bg.png)` }}>
						<section className='flex flex-col items-start gap-3 p-4'>
							<h1 className='text-3xl font-bold text-blue-500'>Practice Yourself</h1>
							<p className='text-lg font-serif font-medium text-white'>Increase your typing speed.</p>
							<Link to={"solo"} >
								<button className='font-medium text-white py-4 px-10  bg-blue-600 rounded'>Practice</button>
							</Link>
						</section>
					</div>
					<div
						className='w-full h-96 bg-cover border  bg-center p-8 rounded'
						style={{ backgroundImage: `url(multi_bg.png)` }}>
						<section className='flex flex-col items-start gap-3 p-4'>
							<h1 className='text-3xl font-bold text-blue-500'>Create Room</h1>
							<p className='text-lg font-serif font-medium text-white'>Create your own room and play with yourself</p>
							<Link to={"custom"} >
								<button className='font-medium text-white py-4 px-10  bg-blue-600 rounded'>Custom</button>
							</Link>
						</section>
					</div>
				</div>

			</section>

		</div>
	)
}

export default Home
