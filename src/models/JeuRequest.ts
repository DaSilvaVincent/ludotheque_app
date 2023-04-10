export interface JeuRequest {
  id: number;
  nom: string;
  description: string;
  langue: string;
  age_min: number;
  nombre_joueurs_min: number;
  nombre_joueurs_max: number;
  duree_partie: string;
  categorie_id: number;
  theme_id: number;
  editeur_id: number;
}
