import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userSerice = inject(UserService);
  ngOnInit(): void {
    this.userSerice.getAllUsers();
  }
}
