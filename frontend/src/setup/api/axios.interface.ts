export interface LoginUserBody {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  createdAt: string;
  emailId: string;
  name: string;
  phone: string;
  updatedAt: string;
  username: string;
  _id: string;
}

export interface SignupUserBody {
  name: string;
  phone: string;
  emailId: string;
  username: string;
  password: string;
}
