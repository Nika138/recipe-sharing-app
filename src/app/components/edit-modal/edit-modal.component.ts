import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent {
  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<EditModalComponent>);

  isUrlSelected = true;
  isFileSelected = false;
  ingredient = new FormControl('', [Validators.required]);

  recipeForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]],
    ingredients: this.fb.array([], [Validators.required]),
    instructions: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
  });

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    if (this.ingredient.valid) {
      this.ingredients.push(
        this.fb.control(this.ingredient.value, Validators.required)
      );
      this.ingredient.reset();
    }
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  toggleImageOption(option: 'url' | 'file'): void {
    this.isUrlSelected = option === 'url';
    this.isFileSelected = option === 'file';
    this.recipeForm.patchValue({ imageUrl: '' });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        this.recipeForm.patchValue({ imageUrl: reader.result as string });
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.recipeForm.valid) {
      this.dialogRef.close(this.recipeForm.value);
    }
  }
}
