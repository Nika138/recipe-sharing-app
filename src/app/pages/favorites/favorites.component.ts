import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { RecipeInterface } from '../../interfaces/recipe.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipeService = inject(RecipeService);

  //  component destruction lifecycle subject
  destroy$ = new Subject<void>();

  search = new FormControl('');

  // recipes observable
  recipes$?: Observable<RecipeInterface[]>;

  ngOnInit(): void {
    // fetching favorite recipes, also search recipe using title
    this.recipes$ = this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) =>
        this.recipeService
          .getAllRecipes()
          .pipe(
            map((recipes) =>
              recipes.filter(
                (recipe) =>
                  recipe.isFavorite &&
                  recipe.title.toLowerCase().includes(query!.toLowerCase())
              )
            )
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
