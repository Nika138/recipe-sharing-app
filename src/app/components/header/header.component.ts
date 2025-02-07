import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  router = inject(Router);

  burgerMenu = signal(false); // State to track whether the mobile menu is open or closed

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e instanceof NavigationEnd),
        map(() => false)
      )
      .subscribe((res) => this.burgerMenu.set(res));
  }

  toggleMenu(): void {
    this.burgerMenu.update((val) => !val); // Toggles the burger menu visibility on click
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
