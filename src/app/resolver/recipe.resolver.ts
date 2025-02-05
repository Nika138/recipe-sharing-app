import { ResolveFn, Router } from '@angular/router';
import { RecipeInterface } from '../interfaces/recipe.interface';
import { inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { catchError, delay, EMPTY } from 'rxjs';

export const recipeResolver: ResolveFn<RecipeInterface> = (route, state) => {
  const recipeService = inject(RecipeService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/']);
    return EMPTY;
  }

  return recipeService.getRecipeById(id).pipe(
    delay(300),
    catchError(() => {
      router.navigate(['/']);
      return EMPTY;
    })
  );
};
