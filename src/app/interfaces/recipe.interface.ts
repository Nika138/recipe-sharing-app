export interface RecipeInterface {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  isFavorite?: boolean;
}
