import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacerTitleComponent } from './spacer-title.component';

describe('SpacerTitleComponent', () => {
  let component: SpacerTitleComponent;
  let fixture: ComponentFixture<SpacerTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacerTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpacerTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
