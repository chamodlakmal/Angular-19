import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../store/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
