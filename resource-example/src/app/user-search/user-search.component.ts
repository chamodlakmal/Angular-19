import { Component, inject, resource, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-search',
  imports: [
    FormsModule,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    RouterLink,
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css',
})
export class UserSearchComponent {
  private userService = inject(UserService);

  searchQuery = signal<string>('');
  searchText = '';

  private searchTimeout: any;

  users = resource({
    request: this.searchQuery,
    loader: async ({ request: query }) => {
      if (!query) return [];
      return await this.userService.searchUsers(query);
    },
  });

  onSearchInput() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      console.log('Search input:', this.searchText);
      this.searchQuery.set(this.searchText.trim());
    }, 400);
  }

  getErrorMessage(error: any): string {
    return error.message || 'An error occurred while fetching users.';
  }
}
