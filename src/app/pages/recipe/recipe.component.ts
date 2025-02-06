import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { RecipeFormType } from '../../types/recipe-form.type';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { takeUntil, Subject, filter, map } from 'rxjs';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent, ClickOutsideDirective],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  recipeId!: string; // Recipe Id
  recipe?: RecipeInterface; // Recipe Interface

  isEditMode: boolean = false; // state for checking wether user is editing recipe or not

  formValues?: RecipeFormType;

  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Fetching recipe
  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$), // proper unsubscription
        map((param) => param['recipe']), // mapping to receive recipe data
        filter((recipe) => recipe !== null) // filtering null values
      )
      .subscribe((recipe) => {
        // assigning formValues from recipe
        this.formValues = {
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
          isFavorite: recipe.isFavorite,
        };
        this.recipe = recipe;
        this.recipeId = recipe.id;
      });
  }

  // go to home function
  goBack() {
    this.router.navigate(['/home']);
  }

  // delete recipe function after confirmation
  deleteRecipe(): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
      });
    }
  }

  // favorite, unfavorite function
  toggleFavorite() {
    const newFavoriteStatus = !this.recipe?.isFavorite;

    this.recipeService
      .editRecipeFavoriteStatus(this.recipeId, newFavoriteStatus)
      .subscribe({
        next: (res) => {
          this.recipe = res;
        },
      });
  }

  onSubmit(recipeForm: RecipeFormType): void {
    this.recipeService
      .editRecipe(this.recipeId, recipeForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.recipe = res;
        this.isEditMode = false;
        this.formValues = {
          title: res.title,
          description: res.description,
          ingredients: res.ingredients,
          instructions: res.instructions,
          imageUrl: res.imageUrl,
          isFavorite: res.isFavorite,
        };
      });
  }
}
