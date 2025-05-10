import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-http-cache',
  imports: [AsyncPipe],
  templateUrl: './http-cache.component.html',
  styleUrl: './http-cache.component.css',
})
export class HttpCacheComponent implements OnInit {
  http = inject(HttpClient);

  posts$: Observable<Post[]> | null = null;

  singlePost$: Observable<Post> | null = null;

  ngOnInit(): void {
    this.getPosts();
    this.addPost();
  }

  getPosts() {
    this.posts$ = this.http.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  addPost() {
    this.singlePost$ = this.http.post<Post>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'New Post',
        body: 'This is a new post',
      }
    );
  }
}

interface Post {
  id: number;
  title: string;
  body: string;
}
