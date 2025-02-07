import { Component, inject, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Subject,
  Observable,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  tap,
  catchError,
  takeUntil,
  EMPTY,
} from 'rxjs';
import { RecipeInterface } from '../../interfaces/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { RecipeListFilterType } from '../../types/recipe-list-filter.type';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RecipeCardComponent,
    LoadingComponent,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent {
  recipeService = inject(RecipeService);

  @Input() filter: RecipeListFilterType = 'all';

  //  component destruction lifecycle subject
  destroy$ = new Subject<void>();

  search = new FormControl('');

  isLoading = signal(true);

  // recipes observable
  recipes$?: Observable<RecipeInterface[]>;

  ngOnInit(): void {
    // fetching favorite recipes, also search recipe using title
    this.recipes$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap((query) =>
        this.recipeService.getAllRecipes().pipe(
          map((recipes) => {
            const lowerCaseQuery = query!.toLowerCase(); // Store lowercase query for efficiency

            if (this.filter === 'all') {
              return recipes.filter(
                (recipe) =>
                  recipe.title.toLowerCase().includes(lowerCaseQuery) ||
                  recipe.ingredients.some((el) => el.includes(lowerCaseQuery))
              );
            }
            return recipes.filter(
              (recipe) =>
                recipe.isFavorite &&
                (recipe.title.toLowerCase().includes(lowerCaseQuery) ||
                  recipe.ingredients.some((el) => el.includes(lowerCaseQuery)))
            );
          }),
          tap(() => this.isLoading.set(false)),
          catchError(() => {
            this.isLoading.set(false);
            return EMPTY;
          }),
          takeUntil(this.destroy$)
        )
      )
    );
  }
  // to prevent memory leak cleanup subscriptions
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
