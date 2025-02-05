import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../../components/edit-modal/edit-modal.component';
import { EditRecipeInterface } from '../../interfaces/edit-recipe.interface';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  recipeId!: string;
  recipe?: RecipeInterface;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (!id) {
        this.router.navigateByUrl('/home');
      } else {
        this.recipeId = id;
        this.recipeService.getRecipeById(this.recipeId).subscribe({
          next: (res) => {
            this.recipe = res;
            this.cdr.markForCheck();
          },
          error: (err) => {
            this.router.navigateByUrl('/home');
          },
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  // modal davamato ro ekitxeba u sure? business tool shi maq applicationebshi
  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId).subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
    });
  }

  toggleFavorite() {
    const newFavoriteStatus = !this.recipe?.isFavorite;

    this.recipeService
      .editRecipeFavoriteStatus(this.recipeId, newFavoriteStatus)
      .subscribe({
        next: (res) => {
          this.recipe = res;
          this.cdr.markForCheck();
        },
      });
  }

  openEditModal(): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: this.recipe,
    });

    dialogRef.afterClosed().subscribe((updatedRecipe: EditRecipeInterface) => {
      if (updatedRecipe) {
        this.recipeService.editRecipe(this.recipeId, updatedRecipe).subscribe({
          next: (res) => {
            this.recipe = res;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Error updating recipe:', err);
          },
        });
      }
    });
  }
}
