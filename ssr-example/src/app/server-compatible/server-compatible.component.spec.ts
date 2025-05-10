import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCompatibleComponent } from './server-compatible.component';

describe('ServerCompatibleComponent', () => {
  let component: ServerCompatibleComponent;
  let fixture: ComponentFixture<ServerCompatibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerCompatibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerCompatibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
