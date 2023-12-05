export interface MutationProp<T> {
  id?: string;
  token?: string;
  payload: T;
}

export interface IuserPayload {
  name: string;
  avatar: string | File;
}


