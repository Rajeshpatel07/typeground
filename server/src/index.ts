import { createServer } from 'http'
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws'
import { config } from 'dotenv';
import router from './routes/routes.js';
import { endGame, getReady, joinCustomRoom, Matchwpm, multiplay } from './utils/socket.js';
import { customRooms, multiplayRooms } from './controllers/controllers.js';
import { generateId } from './utils/generateId.js';
import status from 'express-status-monitor'
config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server })

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(status());

wss.on('connection', (ws) => {

	//WARN: This will give error for typescript.
	//@ts-ignore
	ws.id = generateId();

	ws.send(JSON.stringify({
		event: 'connect',
		//WARN: This will give error for typescript.
		//@ts-ignore
		socketId: ws.id
	}))

	console.log("connected")

	ws.on('message', (event) => {
		const message = JSON.parse(String(event));
		switch (message.event) {
			case 'joinRoom': joinCustomRoom(wss, ws, message, customRooms);
				break;
			case 'multiplay': multiplay(wss, ws, message, multiplayRooms);
				break;
			case 'customwpm': Matchwpm(wss, ws, message, customRooms);
				break;
			case 'multiwpm': Matchwpm(wss, ws, message, multiplayRooms);
				break;
			case 'getReady': getReady(wss, message, multiplayRooms);
				break;
			case 'endGame': endGame(message, multiplayRooms);
				break;
		}
	})
	ws.on('close', () => {
		console.log("closed")
	})
});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server running on port ${port}`));

