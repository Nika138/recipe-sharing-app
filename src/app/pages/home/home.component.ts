import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
