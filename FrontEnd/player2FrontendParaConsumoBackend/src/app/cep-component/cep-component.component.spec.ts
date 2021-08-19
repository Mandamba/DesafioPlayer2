import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepComponentComponent } from './cep-component.component';

describe('CepComponentComponent', () => {
  let component: CepComponentComponent;
  let fixture: ComponentFixture<CepComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CepComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CepComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
