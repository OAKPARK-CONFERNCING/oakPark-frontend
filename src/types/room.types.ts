export interface RoomParticipant {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageString: string;
  accountType: 'basic' | 'premium';
  isActivated: boolean;
}

export interface Room {
  _id: string;
  title: string;
  description: string;
  tag: string;
  roomImage: string;
  status: 'scheduled' | 'ongoing' | 'ended';
  participants: RoomParticipant[];
  hostId: string;
  isPrivateRoom: boolean;
  startTime: string;
  durationInSeconds: number;
  endTime: string;
  createdAt: string;
}

export interface RoomsResponse {
  rooms: Room[];
}
