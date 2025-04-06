import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCitaComponent } from './read-cita.component';

describe('ReadCitaComponent', () => {
  let component: ReadCitaComponent;
  let fixture: ComponentFixture<ReadCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
