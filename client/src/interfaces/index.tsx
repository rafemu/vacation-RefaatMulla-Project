export interface IVacation {
  id: string;
  destination: string;
  description: string;
  startAt: string;
  endAt: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

export interface IUser {
  userName: string;
  password: string;
}
