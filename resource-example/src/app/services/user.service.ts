import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { firstValueFrom, map } from 'rxjs';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private baseUrl = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(this.baseUrl));
  }
  getUserById(id: number): Promise<User> {
    return firstValueFrom(this.http.get<User>(`${this.baseUrl}/${id}`));
  }

  getUserPosts(userId: number): Promise<Post[]> {
    const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    return firstValueFrom(this.http.get<Post[]>(postsUrl));
  }

  searchUsers(query: string): Promise<User[]> {
    if (!query.trim()) {
      return Promise.resolve([]);
    }
    return firstValueFrom(
      this.http
        .get<User[]>(this.baseUrl)
        .pipe(
          map((users) =>
            users.filter(
              (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            )
          )
        )
    );
  }
}
