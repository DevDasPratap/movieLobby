export interface IMovie {
  _id?: string;
  title: string;
  genre: string[];
  rating: number;
  streamingLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MovieQuery {
  q?: string;
}