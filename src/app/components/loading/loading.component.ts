import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="loader mx-auto"></div>`,
  standalone: true,
  styles: `
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #514b82;
  -webkit-mask: radial-gradient(circle closest-side at 50% 40%,#0000 94%, #000);
  transform-origin: 50% 40%;
  animation: l25 1s infinite linear;
}
@keyframes l25 {
  100% {transform: rotate(1turn)}
}
  @keyframes l5 {to{clip-path: inset(0 -1ch 0 0)}}`,
})
export class LoadingComponent {}
