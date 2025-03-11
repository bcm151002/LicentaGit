import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErasmusComponent } from './erasmus.component';

describe('ErasmusComponent', () => {
  let component: ErasmusComponent;
  let fixture: ComponentFixture<ErasmusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErasmusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErasmusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
