import { ResolveFn, Router } from '@angular/router';
import { RecipeInterface } from '../interfaces/recipe.interface';
import { inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { catchError, delay, EMPTY } from 'rxjs';

// Resolver function to fetch recipe data before navigating to a route
export const recipeResolver: ResolveFn<RecipeInterface> = (route, state) => {
  const recipeService = inject(RecipeService);
  const router = inject(Router);

  const id = route.paramMap.get('id'); // extracting the recipe id from route parameters

  // if id is not found, navigate to the homepage and return an empty observable
  if (!id) {
    router.navigate(['/']);
    return EMPTY;
  }

  return recipeService.getRecipeById(id).pipe(
    delay(300), // ddding slight delay
    catchError(() => {
      router.navigate(['/']);
      return EMPTY;
    })
  );
};
