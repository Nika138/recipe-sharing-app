import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AddRecipeInterface } from '../../interfaces/add-recipe.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  isUrlSelected: boolean = true;
  isFileSelected: boolean = false;

  ingredient = new FormControl('', [Validators.required]);

  recipeForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]],
    ingredients: this.fb.array([], [Validators.required]),
    instructions: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    isFavorite: [false, [Validators.required]],
  });

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(event?: Event): void {
    event?.preventDefault();

    if (this.ingredient.valid) {
      this.ingredients.push(
        this.fb.control(this.ingredient.value, {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
      this.ingredient.reset();
    }
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggleImageOption(option: 'url' | 'file') {
    if (option === 'url') {
      this.isUrlSelected = true;
      this.isFileSelected = false;
      this.recipeForm.patchValue({ imageUrl: '' }); // Reset imageUrl when switching to URL
    } else {
      this.isUrlSelected = false;
      this.isFileSelected = true;
      this.recipeForm.patchValue({ imageUrl: '' }); // Reset imageUrl when switching to File
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then((base64Image) => {
        this.recipeForm.patchValue({ imageUrl: base64Image });
      });
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const formData: AddRecipeInterface = {
        title: this.recipeForm.get('title')?.value,
        description: this.recipeForm.get('description')?.value,
        ingredients: this.ingredients.value as string[],
        instructions: this.recipeForm.get('instructions')?.value,
        imageUrl: this.recipeForm.get('imageUrl')?.value,
        isFavorite: this.recipeForm.get('isFavorite')?.value,
      };

      this.recipeService.addRecipe(formData).subscribe({
        next: () => {
          alert('Recipe created successfully!');
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          alert('An error occurred while creating the recipe');
        },
      });
    } else {
      alert('Please complete all required fields!');
    }
  }
}
