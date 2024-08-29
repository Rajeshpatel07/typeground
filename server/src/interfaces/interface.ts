interface userInfo {
	username: string;
	socketId: string;
}

export interface CustomRoomInterface {
	creator: string;
	members: Array<userInfo>;
	para: string;
}

export interface MultiRoomInterface {
	open: boolean;
	members: Array<userInfo>;
	createdAt: number;
	para: string;
}

