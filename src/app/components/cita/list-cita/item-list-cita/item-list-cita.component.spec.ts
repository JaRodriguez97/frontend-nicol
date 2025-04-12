import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListCitaComponent } from './item-list-cita.component';

describe('ItemListCitaComponent', () => {
  let component: ItemListCitaComponent;
  let fixture: ComponentFixture<ItemListCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListCitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
