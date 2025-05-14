import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private readonly API_URL = 'https://projectapi.gerasim.in/api/UserApp';

  getAllUsers() {
    this.http.get(`${this.API_URL}/GetAllUsers`).subscribe({
      next: (response) => {
        console.log('Users fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
