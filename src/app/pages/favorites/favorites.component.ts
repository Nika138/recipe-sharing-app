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
import { FormControl } from '@angular/forms';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RecipeCardComponent, CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipeService = inject(RecipeService);

  destroy$ = new Subject<void>();

  recipes$?: Observable<RecipeInterface[]>;

  ngOnInit(): void {
    this.recipes$ = this.recipeService
      .getAllRecipes()
      .pipe(map((recipes) => recipes.filter((recipe) => recipe.isFavorite)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
