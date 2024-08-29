import { MultiRoomInterface } from "../interfaces/interface.js";
import { generateId } from "./generateId.js"
import { paragraphs } from "../data/paragraphs.js";

export const createRoom = (multiplayRooms: Map<String, MultiRoomInterface>, username: string, socketId: string) => {
	const roomId = generateId();
	const para = paragraphs[Math.floor(Math.random() * paragraphs.length)];
	multiplayRooms.set(roomId, {
		members: [{ username, socketId }],
		open: true,
		createdAt: Date.now(),
		para
	})
	return roomId;
}

export const joinRoom = (multiplayRooms: Map<String, MultiRoomInterface>, username: string, socketId: string) => {
	let roomJoined = false;

	for (let [roomId, room] of multiplayRooms) {
		if (room.open == true) {
			if (Date.now() <= room.createdAt + 20000 && room.members.length <= 4) {
				for (let i of room.members) {
					if (i.username === username) {
						return;
					}
				}
				room.members.push({ username, socketId });
				roomJoined = true;
				return roomId;
			} else {
				room.open = false;
				if ((room.createdAt + (1000 * 60)) <= Date.now()) {
					multiplayRooms.delete(roomId);
				}
			}
		}
	}
	if (!roomJoined) {
		return createRoom(multiplayRooms, username, socketId);
	}
}
