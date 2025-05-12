import {
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      deferBlockBehavior: DeferBlockBehavior.Manual,
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should render the defer block in different states', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const deferBlockFixture = (await fixture.getDeferBlocks())[0];

    expect(fixture.nativeElement.innerHTML).toContain('Loading...');

    await deferBlockFixture.render(DeferBlockState.Loading);

    expect(fixture.nativeElement.innerHTML).toContain('Fetching...');

    await deferBlockFixture.render(DeferBlockState.Complete);
    expect(fixture.nativeElement.innerHTML).toContain('large-component works!');

    await deferBlockFixture.render(DeferBlockState.Error);
    expect(fixture.nativeElement.innerHTML).toContain('Something went wrong!');
  });
});
