import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { RecipeInterface } from '../interfaces/recipe.interface';
import { AddRecipeInterface } from '../interfaces/add-recipe.interface';
import { EditRecipeInterface } from '../interfaces/edit-recipe.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/recipes'; // API endpoint for recipes

  private readonly recipesSubject = new BehaviorSubject<RecipeInterface[]>([]); //  behaviorSubject to hold and emit the list of recipes
  public readonly recipes$ = this.recipesSubject.asObservable(); // observable that components can subscribe to  receive recipe data
  private toastrService = inject(ToastrService);

  // method to add a new recipe
  addRecipe(addedRecipe: AddRecipeInterface): Observable<RecipeInterface> {
    return this.http.post<RecipeInterface>(`${this.apiUrl}`, addedRecipe).pipe(
      catchError((err) => this.handleError(err)), // handling errors
      tap((newRecipe) => {
        const recipes = this.recipesSubject.value; // get current list of recipes
        this.recipesSubject.next([...recipes, newRecipe]); // update recipes list with new recipe

        // display success toast notification
        this.toastrService.success('Recipe added successfully!', '', {
          positionClass: 'toast-top-right',
          closeButton: true,
          timeOut: 5000,
        });
      })
    );
  }

  // method to fetch all recipes
  getAllRecipes(): Observable<RecipeInterface[]> {
    return this.http.get<RecipeInterface[]>(this.apiUrl).pipe(
      catchError((err) => this.handleError(err)), // handling errors
      tap((recipes) => this.recipesSubject.next(recipes)) // update recipes list
    );
  }

  // method to fetch signle recipe by its id
  getRecipeById(id: string): Observable<RecipeInterface> {
    return this.http
      .get<RecipeInterface>(`${this.apiUrl}/${id}`)
      .pipe(catchError((err) => this.handleError(err))); // handling errors
  }

  // method to edit recipe by its id
  editRecipe(
    id: string,
    editedRecipe: EditRecipeInterface
  ): Observable<RecipeInterface> {
    return this.http
      .patch<RecipeInterface>(`${this.apiUrl}/${id}`, editedRecipe)
      .pipe(
        catchError((err) => this.handleError(err)), //handling errors
        tap((EditedRecipe) => {
          const recipes = this.recipesSubject.value; // get current list of recipes
          const editedRecipes = recipes // filter out  recipe that is being edited
            .filter((recipe) => recipe.id !== id)
            .concat(EditedRecipe);

          this.recipesSubject.next(editedRecipes); // ddd updated recipe to the list

          // display success toast notification
          this.toastrService.success(
            'Recipe has been updated successfully!',
            '',
            {
              positionClass: 'toast-top-right',
              timeOut: 5000,
              closeButton: true,
            }
          );
        })
      );
  }

  // method to change the favorite status of recipe
  editRecipeFavoriteStatus(
    id: string,
    isFavorite: boolean
  ): Observable<RecipeInterface> {
    return this.http
      .patch<RecipeInterface>(`${this.apiUrl}/${id}`, { isFavorite })
      .pipe(
        catchError((err) => this.handleError(err)), //handling errors
        tap((editedRecipe) => {
          const recipes = this.recipesSubject.value; // current list of recipes
          const editedRecipes = recipes.map((recipe) =>
            recipe.id === id
              ? { ...recipe, isFavorite: editedRecipe.isFavorite } // change favorite status of recipe
              : recipe
          );
          this.recipesSubject.next(editedRecipes); // update recipe list
        })
      );
  }

  // method to delete recipe by its id
  deleteRecipe(id: string): Observable<RecipeInterface> {
    return this.http.delete<RecipeInterface>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => this.handleError(err)), // handling errors
      tap((deletedRecipe) => {
        const recipes = this.recipesSubject.value.filter(
          (recipe) => recipe.id !== deletedRecipe.id // remove recipe from list
        );
        this.recipesSubject.next(recipes); // update recipe list

        // display success toast notification
        this.toastrService.success(
          'Recipe has been deleted successfully!',
          '',
          {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
          }
        );
      })
    );
  }

  // method to handle errors globally
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong';

    if (error.error.message) {
      errorMessage = error.error.message;
    }

    this.toastrService.error(errorMessage, 'Error occured!', {
      timeOut: 5000, // Duration (in milliseconds)
      positionClass: 'toast-top-right', // Position of the toast
      progressBar: true,
    });

    // throw error for component to handle in-component states.
    return throwError(() => new Error(errorMessage));
  }
}
