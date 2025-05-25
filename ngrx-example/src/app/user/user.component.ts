import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../store/user/user.model';
import { Store } from '@ngrx/store';
import {
  selectAllUsers,
  selectError,
  selectLoading,
} from '../store/user/user.selector';
import { UserActions } from '../store/user/user.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  store = inject(Store);

  constructor() {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  refreshUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }
}
