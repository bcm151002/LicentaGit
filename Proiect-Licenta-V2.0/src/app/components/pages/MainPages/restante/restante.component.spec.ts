import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestanteComponent } from './restante.component';

describe('RestanteComponent', () => {
  let component: RestanteComponent;
  let fixture: ComponentFixture<RestanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
