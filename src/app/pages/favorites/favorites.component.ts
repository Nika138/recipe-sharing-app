import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RecipesListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {}
