export interface GetUserParams {
  userId: string;
}

export interface LoginUserBody {
  username?: string;
  password?: string;
}

export interface SignupUserBody {
  name?: string;
  phone?: string;
  emailId?: string;
  username?: string;
  password?: string;
}

export interface RemoveUserParams {
  userId: string;
}
