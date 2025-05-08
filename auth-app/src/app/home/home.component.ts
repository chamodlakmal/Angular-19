import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MatButtonModule, MatCardModule, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  #authService = inject(AuthService);
  user$ = this.#authService.user$;

  logout() {
    this.#authService.logout();
  }
}
