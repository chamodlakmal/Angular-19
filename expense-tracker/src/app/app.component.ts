import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Menubar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items!: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        routerLink: ['/'],
      },
      {
        label: 'Expenses',
        icon: 'pi pi-money-bill',
        routerLink: ['/expenses'],
      },
      {
        label: 'Add Expense',
        icon: 'pi pi-plus',
        routerLink: ['/expenses/new'],
      },
    ];
  }
}
