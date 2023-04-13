export interface RegisterRequest {
  login: string;
  email: string;
  nom: string;
  prenom: string;
  pseudo:string;
  password: string;
}

export interface AdherentRequest {
  id: number;
  login: string;
  email: string;
  nom: string;
  prenom: string;
  pseudo:string;
  password: string;
  avatar: string;
}
