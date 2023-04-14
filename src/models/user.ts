export interface User {
  id: number;
  login:string;
  nom: string;
  prenom:string;
  pseudo:string;
  email: string;
  jwtToken?: string;
  avatar: string;
}

export const ANONYMOUS_USER: User = <User>{};
