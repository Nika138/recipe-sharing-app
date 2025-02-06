import { Component, input, InputSignal } from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  // Input property to receive a recipe object, using Angular signals
  recipe: InputSignal<RecipeInterface | undefined> = input<RecipeInterface>();
}
