import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RecipeService } from '../../services/recipe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditRecipeInterface } from '../../interfaces/edit-recipe.interface';
import { RecipeFormType } from '../../types/recipe-form.type';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  @Input() formValues?: RecipeFormType;
  @Output() submitEvent = new EventEmitter<RecipeFormType>();

  isUrlSelected: boolean = true;
  isFileSelected: boolean = false;

  ingredient = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
  ]);

  recipeForm: FormGroup = this.fb.nonNullable.group({
    title: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(45)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(150),
      ],
    ],
    ingredients: this.fb.array(
      [],
      [Validators.required, Validators.maxLength(20)]
    ),
    instructions: [
      '',
      [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(500),
      ],
    ],
    imageUrl: ['', [Validators.required]],
    isFavorite: [false, [Validators.required]],
  });

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    if (this.formValues) {
      this.recipeForm.patchValue({
        title: this.formValues.title,
        description: this.formValues.description,
        ingredients: this.formValues.ingredients,
        instructions: this.formValues.instructions,
        imageUrl: this.formValues.imageUrl,
        isFavorite: this.formValues.isFavorite,
      });

      // Add the new ingredients
      this.formValues.ingredients.forEach((ingredient) => {
        this.ingredients.push(this.fb.control(ingredient));
      });
    }
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
      const formData: EditRecipeInterface = {
        title: this.recipeForm.get('title')?.value,
        description: this.recipeForm.get('description')?.value,
        ingredients: this.ingredients.value as string[],
        instructions: this.recipeForm.get('instructions')?.value,
        imageUrl: this.recipeForm.get('imageUrl')?.value,
        isFavorite: this.recipeForm.get('isFavorite')?.value,
      };

      this.submitEvent.emit(formData);

      // this.recipeService.addRecipe(formData).subscribe({
      //   next: () => {
      //     this.router.navigate(['/home']);
      //   },
      //   error: (err: HttpErrorResponse) => {
      //     alert('An error occurred while creating the recipe');
      //   },
      // });
    } else {
      alert('Please complete all required fields!');
      this.recipeForm.markAllAsTouched(); // to trigger validation errors
    }
  }
}
