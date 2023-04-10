export interface Jeu {
  id: number;
  nom: string;
  description: string;
  langue: string;
  url_media:string;
  age_min: number;
  nombre_joueur_min: number;
  nombre_joueur_max: number;
  duree_partie: string;
  valide: boolean;
}
