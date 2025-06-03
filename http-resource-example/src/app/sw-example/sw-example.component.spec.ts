import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwExampleComponent } from './sw-example.component';

describe('SwExampleComponent', () => {
  let component: SwExampleComponent;
  let fixture: ComponentFixture<SwExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
