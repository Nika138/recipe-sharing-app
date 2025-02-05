import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeInterface } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  recipe: InputSignal<RecipeInterface | undefined> = input<RecipeInterface>();
}
