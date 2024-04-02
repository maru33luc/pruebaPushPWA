import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovServicesComponent } from './gov-services.component';

describe('GovServicesComponent', () => {
  let component: GovServicesComponent;
  let fixture: ComponentFixture<GovServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GovServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
