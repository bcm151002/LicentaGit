import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExameneComponent } from './examene.component';

describe('ExameneComponent', () => {
  let component: ExameneComponent;
  let fixture: ComponentFixture<ExameneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExameneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExameneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
