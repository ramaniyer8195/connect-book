export interface AuthApiContext {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
