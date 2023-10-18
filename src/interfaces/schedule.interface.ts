export interface ISlot {
  _id: string;
  startTime: string;
  endTime: string;
}
export interface ITrainer {
  _id: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IUserBookings {
  _id: string;
  user: string;
  trainer: ITrainer;
  date: Date;
  slot: ISlot;
  createdAt: Date;
  updatedAt: Date;
}

// export interface IUserBookings {
//   bookings: IBooking[];
// }
