import { Component, inject, resource } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [LoadingSpinnerComponent, ErrorAlertComponent, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  userService = inject(UserService);

  users = resource({
    loader: async () => await this.userService.getUsers(),
  });

  getErrorMessage(error: any): string {
    return error.message || 'An error occurred while fetching users.';
  }
}
