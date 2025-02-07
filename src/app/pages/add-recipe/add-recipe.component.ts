import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AddRecipeInterface } from '../../interfaces/add-recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { RecipeFormType } from '../../types/recipe-form.type';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent, LoadingComponent],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  isLoading = signal(false);

  // Sending request to add recipe
  onSubmit(recipeFormData: RecipeFormType): void {
    this.isLoading.set(true);
    const recipeData: AddRecipeInterface = recipeFormData;

    this.recipeService.addRecipe(recipeData).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        alert('An error occurred while creating the recipe');
      },
    });
  }
}
