import { createRoom, joinRoom } from "./multiplayer.js"


export const joinCustomRoom = (wss, ws, message, customRooms) => {
	const { roomId, username } = message
	if (!customRooms.has(roomId)) return ws.send(JSON.stringify({ event: "error", err: "Cannot find the roomId" }));
	const room = customRooms.get(roomId);
	room.members.push({ username, socketId: ws.id });
	ws.send(JSON.stringify({ event: "customRoomJoin", membes: room.members }))

	wss.clients.forEach(client => {
		room.members.forEach(user => {
			if (user.socketId != ws.id && client.id == user.socketId) {
				client.send(JSON.stringify({ event: "customRoomJoin", members: room.members }))
			}
		});
	})
}

export const Matchwpm = (wss, ws, message, multiplayRooms) => {
	const { roomId, username, wpm } = message;
	if (multiplayRooms.has(roomId)) {
		const room = multiplayRooms.get(roomId);

		room.members.forEach(user => {
			wss.clients.forEach(client => {
				if (user.socketId != ws.id && client.id == user.socketId) {
					client.send(JSON.stringify({ event: "wpm", username, wpm }))
				}
			});
		})
	}
}

export const multiplay = (wss, ws, message, multiplayRooms): void => {
	const { username, socketId } = message;
	if (multiplayRooms.size == 0) {
		const roomId = createRoom(multiplayRooms, username, socketId);
		const room = multiplayRooms.get(roomId)
		return ws.send(JSON.stringify({
			event: 'joinRoom',
			roomId,
			members: room.members.filter(user => user.username !== username),
			para: multiplayRooms.get(roomId).para
		}));
	} else {
		const roomId = joinRoom(multiplayRooms, username, socketId);

		if (!roomId) {
			return;
		}

		const room = multiplayRooms.get(roomId);
		if (room.members.length == 4) {
			ws.send(
				JSON.stringify({
					event: 'joinRoom',
					roomId,
					members: room.members.filter(user => user.username !== username),
					para: room.para, startGame: true
				})
			);
		} else {
			ws.send(
				JSON.stringify({
					event: 'joinRoom',
					roomId,
					members: room.members.filter(user => user.username !== username),
					para: room.para,
					startGame: false
				})
			);
		}

		room.members.forEach(user => {
			wss.clients.forEach(client => {
				if (user.socketId != ws.id && client.id == user.socketId) {
					client.send(JSON.stringify({
						event: "newPlayer",
						members: room.members[room.members.length - 1]
					}))
				}
			});
		})
	}
}

export const getReady = (wss, message, multiplayRooms) => {
	const { roomId } = message;
	const room = multiplayRooms.get(roomId);
	if (room) {
		room.members.forEach(user => {
			wss.clients.forEach(client => {
				if (client.id == user.socketId) {
					client.send(JSON.stringify({ event: "getReady", getReady: true }))
				}
			});
		})
	}
}

export const endGame = (message, multiplayRooms) => {
	const { username, roomId } = message;
	const room = multiplayRooms.get(roomId);
	if (room) {
		room.members = room.members.filter(user => user.username != username);
	}
}
