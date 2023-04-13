export interface Jeu {
  id: number;
  nom: string;
  description: string;
  langue: string;
  url_media:string;
  age_min: number;
  nombre_joueurs_min: number;
  nombre_joueurs_max: number;
  duree_partie: string;
  valide: boolean;
  categorie_id: number;
  theme_id: number;
  editeur_id: number;
  nb_likes: number;
  jeu:Jeu
  note: number
}
