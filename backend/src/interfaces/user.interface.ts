// route: /user/:userId GET
export interface GetUserParams {
  userId: string;
}

// route: /login
export interface LoginUserBody {
  username?: string;
  password?: string;
}

// route: /signup
export interface SignupUserBody {
  name?: string;
  phone?: string;
  emailId?: string;
  username?: string;
  password?: string;
}

// route: /user/:userId DELETE
export interface DeleteUserParams {
  userId: string;
}
