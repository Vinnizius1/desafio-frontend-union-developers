// ==========================================
// TIPAGEM DE USUÁRIO (API RandomUser.me)
// ==========================================

export interface UserLocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  id: {
    name: string;
    value: string | null;
  };
  gender: 'male' | 'female';
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: UserPicture;
  location: UserLocation;
  nat: string;
}

export interface UserFilterState {
  searchTerm: string;
  minAge?: number;
  maxAge?: number;
  gender?: 'all' | 'male' | 'female';
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
