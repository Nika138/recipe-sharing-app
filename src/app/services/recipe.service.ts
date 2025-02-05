import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RecipeInterface } from '../interfaces/recipe.interface';
import { AddRecipeInterface } from '../interfaces/add-recipe.interface';
import { EditRecipeInterface } from '../interfaces/edit-recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/recipes';

  private readonly recipesSubject = new BehaviorSubject<RecipeInterface[]>([]);
  public readonly recipes$ = this.recipesSubject.asObservable();

  constructor() {
    this.getAllRecipes().subscribe();
  }

  addRecipe(addedRecipe: AddRecipeInterface): Observable<RecipeInterface> {
    return this.http.post<RecipeInterface>(`${this.apiUrl}`, addedRecipe).pipe(
      tap((newRecipe) => {
        const recipes = this.recipesSubject.value;
        this.recipesSubject.next([...recipes, newRecipe]);
      })
    );
  }

  getAllRecipes(): Observable<RecipeInterface[]> {
    return this.http
      .get<RecipeInterface[]>(this.apiUrl)
      .pipe(tap((recipes) => this.recipesSubject.next(recipes)));
  }

  getRecipeById(id: string): Observable<RecipeInterface> {
    return this.http.get<RecipeInterface>(`${this.apiUrl}/${id}`);
  }

  editRecipe(
    id: string,
    editedRecipe: EditRecipeInterface
  ): Observable<RecipeInterface> {
    return this.http
      .patch<RecipeInterface>(`${this.apiUrl}/${id}`, editedRecipe)
      .pipe(
        tap((EditedRecipe) => {
          const recipes = this.recipesSubject.value;
          const editedRecipes = recipes
            .filter((recipe) => recipe.id !== id)
            .concat(EditedRecipe);

          this.recipesSubject.next(editedRecipes);
        })
      );
  }

  editRecipeFavoriteStatus(
    id: string,
    isFavorite: boolean
  ): Observable<RecipeInterface> {
    return this.http
      .patch<RecipeInterface>(`${this.apiUrl}/${id}`, { isFavorite })
      .pipe(
        tap((editedRecipe) => {
          const recipes = this.recipesSubject.value;
          const editedRecipes = recipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, isFavorite: editedRecipe.isFavorite }
              : recipe
          );
          this.recipesSubject.next(editedRecipes);
        })
      );
  }

  deleteRecipe(id: string): Observable<RecipeInterface> {
    return this.http.delete<RecipeInterface>(`${this.apiUrl}/${id}`).pipe(
      tap((deletedRecipe) => {
        const recipes = this.recipesSubject.value.filter(
          (recipe) => recipe.id !== deletedRecipe.id
        );
        this.recipesSubject.next(recipes);
      })
    );
  }
}
