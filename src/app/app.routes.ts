import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { recipeResolver } from './resolver/recipe.resolver';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
    resolve: {
      recipe: recipeResolver,
    },
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
