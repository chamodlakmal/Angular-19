import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trigger',
  imports: [],
  templateUrl: './trigger.component.html',
  styleUrl: './trigger.component.css',
})
export class TriggerComponent implements OnInit {
  ngOnInit(): void {
    console.log('TriggerComponent initialized');
  }
}
