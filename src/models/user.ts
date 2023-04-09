export interface User {
  id: number;
  login:string;
  nom: string;
  prenom:string;
  pseudo:string;
  email: string;
  jwtToken?: string;
}

export const ANONYMOUS_USER: User = <User>{};
