export interface IDog {
  _id: string;
  breed: string;
  image: string;
}

export interface IState {
  favorites: IDog[];
  filteredFavorites: [];
  error: string | undefined;
  loading: boolean;
}
