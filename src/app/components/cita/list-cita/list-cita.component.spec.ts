import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitaComponent } from './list-cita.component';

describe('ListCitaComponent', () => {
  let component: ListCitaComponent;
  let fixture: ComponentFixture<ListCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
