import { Component, computed, inject, resource } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../shared/error-alert/error-alert.component';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, LoadingSpinnerComponent, ErrorAlertComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  userId = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? parseInt(id, 10) : null;
  });

  user = resource({
    request: this.userId,
    loader: async ({ request: id }) => {
      if (id === null) throw new Error('User ID is required');
      return await this.userService.getUserById(id);
    },
  });

  posts = resource({
    request: () => {
      return this.user.isLoading() || this.user.error() ? null : this.userId();
    },
    loader: async ({ request: id }) => {
      if (id === null) return [];
      return await this.userService.getUserPosts(id);
    },
  });

  getErrorMessage(error: any): string {
    return error.message || 'An error occurred while fetching users.';
  }
}
