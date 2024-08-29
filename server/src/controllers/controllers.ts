import { Request, Response } from "express";
import { CustomRoomInterface, MultiRoomInterface } from "../interfaces/interface.js"
import { generateId } from "../utils/generateId.js";
import { paragraphs } from "../data/paragraphs.js"

export const customRooms: Map<String, CustomRoomInterface> = new Map();
export const multiplayRooms: Map<String, MultiRoomInterface> = new Map();

export const home = (req: Request, res: Response) => {
	res.send("Home Page");
}

export const createCustomRoom = async (req: Request, res: Response) => {
	const { username, socketId } = req.body;
	if (!username || !socketId) return res.status(400).json({ err: "Invalid credentials" });
	try {
		const roomId = generateId();
		if (!customRooms.has(roomId)) {
			const para = paragraphs[Math.floor(Math.random() * paragraphs.length)]
			customRooms.set(roomId, {
				creator: socketId,
				members: [{ username, socketId }],
				para
			});
			return res.status(201).json({ roomId });
		} else {
			return res.status(409).json({ err: "Room already exists" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ err: error.message });
	}
};


export const getText = (req: Request, res: Response) => {
	const para = paragraphs[Math.floor(Math.random() * paragraphs.length)];
	res.status(200).json({ para });
}
