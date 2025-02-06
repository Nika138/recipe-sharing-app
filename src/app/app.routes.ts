import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { recipeResolver } from './resolver/recipe.resolver';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (c) => c.FavoritesComponent
      ),
  },
  {
    path: 'add-recipe',
    loadComponent: () =>
      import('./pages/add-recipe/add-recipe.component').then(
        (c) => c.AddRecipeComponent
      ),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./pages/recipe/recipe.component').then((c) => c.RecipeComponent),
    resolve: {
      recipe: recipeResolver,
    },
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
