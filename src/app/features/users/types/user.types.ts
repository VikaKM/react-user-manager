export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
  avatar: string;
}