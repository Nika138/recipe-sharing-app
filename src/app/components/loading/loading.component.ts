import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loader"></div>`,
  standalone: true,
  styles: `
  .loader {
    width: fit-content;
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    clip-path: inset(0 100% 0 0);
    animation: l5 2s steps(11) infinite;
  }
  .loader:before {
    content:"Loading..."
  }
  @keyframes l5 {to{clip-path: inset(0 -1ch 0 0)}}`,
})
export class LoadingComponent {}
