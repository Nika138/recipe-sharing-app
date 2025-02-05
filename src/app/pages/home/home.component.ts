import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
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
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  recipeService = inject(RecipeService);

  search = new FormControl('');

  destroy$ = new Subject<void>();

  recipes$?: Observable<RecipeInterface[]>;

  ngOnInit(): void {
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
                  recipe.title.toLowerCase().includes(query!.toLowerCase()) ||
                  recipe.description
                    .toLowerCase()
                    .includes(query!.toLowerCase())
              )
            )
          )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
