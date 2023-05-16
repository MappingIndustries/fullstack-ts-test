export interface Favourites {
  city: string;
  key: number;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null | string;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
  favourite: boolean;
}

export interface Search {
  key: number;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: null | string;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

interface Temperature {
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
}

export interface User {
  email: string;
  uid: string;
  favourites: Favourites[];
}

export interface States {
  favourites: Favourites[];
  setFavourites: React.Dispatch<React.SetStateAction<Favourites[]>>;
  search: Search[];
  setSearch: React.Dispatch<React.SetStateAction<Search[]>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  isTheme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  localstorage: string | null
  setLocalstorage: React.Dispatch<React.SetStateAction<string | null>>
}

export interface FormHandlers {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<Search[]>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setErrorCity: React.Dispatch<React.SetStateAction<string>>;
}
